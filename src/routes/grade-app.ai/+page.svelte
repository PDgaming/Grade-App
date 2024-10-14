<script lang="ts">
  import { onMount } from "svelte"; //imports onMount
  import NotLoggedIn from "../components/notLoggedIn.svelte"; //imports NotLoggedIn component
  import "./index.css"; //imports index.css
  import {
    toasts,
    ToastContainer as ToastContainerAny,
    FlatToast as FlatToastAny,
  } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts

  import Loader from "../components/loader.svelte"; // imports Loader from components
  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"; // imports GoogleGenerativeAI
  import { GradeAppDatabase } from "../supabaseClient";
  import HighlightedContent from "../components/highlightedContent.svelte";

  import { race } from "./utils";

  let name = "User"; //declares name variable with default value of "User"
  let membership = "free"; //declares member variable with default value of "false"
  let notLoggedIn = false; //declares notLoggedIn variable with default value of false
  let userEmail = ""; //declares userEmail variable with default value of ""

  let messages: any = []; // array to store user and ai messages
  let messagesForTTS = [];
  let userInput = ""; // variable to store user message
  let GeminiInput = ""; // variable to store ai message
  let shouldShowWelcomeMessage = true; // shouldShowWelcomeMessage is true by default to show shouldShouldWelcomeMessage
  let shouldload = false; // shouldload is false by default to not show loader
  let speakButton = true;
  let pauseButton = false;
  let resumeButton = false;
  let stopButton = false;
  let selectedModel: string;

  const socraticModelSystemPrompt = [
    {
      role: "user",
      parts: [
        "You are a Socratic Teacher. And I am your student. And please try to keep your replies as brief as possible.",
      ],
    },
  ];
  const baseModelSystemPrompt = [
    {
      role: "user",
      parts: ["Please try to keep your replies as brief as possible."],
    },
  ];
  let systemPrompt = baseModelSystemPrompt;

  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration,
      placement: "bottom-right",
      //@ts-ignore
      type: "info",
      theme: "dark",
      //@ts-ignore
      placement: "bottom-right",
      showProgress: true,
      //@ts-ignore
      type: type,
      //@ts-ignore
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
    });
  };
  const ToastContainer = ToastContainerAny as any;
  const FlatToast = FlatToastAny as any;
  onMount(() => {
    //checks if user is logged in by is Display Name exists in sessionStorage
    if (sessionStorage.getItem("Display Name")) {
      //@ts-ignore
      name = sessionStorage.getItem("Display Name"); //sets name variable to the display name from sessionstorage
      membership = String(sessionStorage.getItem("Membership")); //sets member variable to the member status from sessionstorage
    } else {
      //if display name does not exist in sessionStorage
      //@ts-ignore
      name = sessionStorage.getItem("Email"); //sets name variable to the email from sessionstorage
      membership = String(sessionStorage.getItem("Membership")); //sets member variable to the member status from sessionstorage
      //@ts-ignore
      userEmail = sessionStorage.getItem("Email"); //sets userEmail to the email from sessionstorage
    }
    //checks if name is null
    if (name == null) {
      notLoggedIn = true; //sets notLoggedIn to true
    }
    if (!userEmail) {
      notLoggedIn = true;
    } else {
      try {
        initializeEverything();
      } catch (error) {
        console.log(error);
      }
    }
    try {
      // @ts-ignore
      getUserMessagesFromDb(userEmail).then(() => {
        const chatLog = document.getElementById("chatlog");
        setTimeout(() => {
          if (chatLog) {
            chatLog.scrollTo(0, chatLog.scrollHeight);
          }
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  });
  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[18];
    if (text) {
      pauseButton = true;
      try {
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
          pauseButton = false;
          resumeButton = false;
          stopButton = false;
        };
      } catch {
        showToast(
          "Error",
          "Speech synthesis could not be generated",
          3000,
          "failure"
        );
        setTimeout(() => {
          pauseButton = false;
          resumeButton = false;
          stopButton = false;
        }, 3000);
      }
    }
  }
  async function getUserMessagesFromDb(userEmail: string) {
    try {
      const fetchMessages = async () => {
        const { data, error } = await GradeAppDatabase.from("User-messages")
          .select()
          .eq("user", userEmail);
        if (error) throw error;
        return data;
      };
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000)
      );

      const data = await race([fetchMessages(), timeout]);

      if (data) {
        let newMessages = []; // Declare newMessages here
        for (const row of data) {
          newMessages.push({ content: row.prompt, sender: "User" });
          newMessages.push({
            content: row.response.replace(/\*\*/g, "<br>"),
            sender: "Gemini",
          });
        }
        messages = [...messages, ...newMessages]; // This triggers reactivity
        localStorage.setItem("messages", JSON.stringify(messages));
        shouldShowWelcomeMessage = false;
      }
      // else {
      //   showToast(
      //     "Error",
      //     "There was an error getting your Messages from Database",
      //     2500,
      //     "error"
      //   );
      //   const messagesInLocalStorage = localStorage.getItem("messages");
      //   if (messagesInLocalStorage) {
      //     showToast(
      //       "Warning",
      //       "Showing Messages stored in Local Storage.",
      //       2500,
      //       "warning"
      //     );
      //     messages = JSON.parse(messagesInLocalStorage);
      //   }
      // }
    } catch (error) {
      console.log(error);
      showToast(
        "Warning",
        "Fetching messages took too long. Using local messages.",
        2500,
        "warning"
      );
      const messagesInLocalStorage = localStorage.getItem("messages");
      if (messagesInLocalStorage) {
        messages = JSON.parse(messagesInLocalStorage);
        shouldShowWelcomeMessage = false;
      }
    }
  }
  function speakText() {
    if (messages[messages.length - 1].sender == "Gemini") {
      speak(messages[messages.length - 1].content);
    }
  }
  function pauseSpeech() {
    pauseButton = false;
    resumeButton = true;
    speechSynthesis.pause();
  }
  function resumeSpeech() {
    resumeButton = false;
    pauseButton = true;
    speechSynthesis.resume();
  }
  function handleKeyDown(event: any) {
    // function to handle key down
    if (event.key === "Enter" && !event.shiftKey) {
      // condition to check if key pressed is Enter
      event.preventDefault();
      sendMessage(); // if condition is true sendMessage function runs
    }
  }
  async function writeDataInDb(prompt: string, response: string) {
    const email = sessionStorage.getItem("Email");
    try {
      const { data, error } = await GradeAppDatabase.from(
        "User-messages"
      ).insert({
        user: email,
        prompt: prompt,
        response: response,
      });
      if (error) {
        console.log(error);
        // Handle the error appropriately
        return; // Or throw an exception if needed
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle unexpected errors gracefully
    }
  }
  function sendMessage() {
    // function to send messages to API
    shouldShowWelcomeMessage = false; // sets shouldShowWelcomeMessage to false to not show welcome message

    const userInputElement = document.getElementById(
      "userInput"
    ) as HTMLInputElement; // gets user input
    const userInput = userInputElement.value.trim(); // gets user input

    messages = [...messages, { content: userInput, sender: "User" }]; // add user input to messages
    if (userInput == "") {
      // checks if userInput is empty
      messages = [
        ...messages,
        { content: "Sorry, you didn't enter a prompt!", sender: "Gemini" }, // returns error message
      ]; // add userinput to messages
    } else {
      // if userInput is not empty
      run(userInput).then(() => {
        const chatLog = document.getElementById("chatlog");
        setTimeout(() => {
          if (chatLog) {
            chatLog.scrollTo(0, chatLog.scrollHeight);
          }
        }, 1000);
      });
    }
    userInputElement.value = ""; // removes old message from the input
  }
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  let chatSession: any;
  async function getApiKey() {
    const { data, error } = await GradeAppDatabase.from("API-Key").select();
    if (data) {
      return data[0].API_KEY;
    } else {
      console.log(error);
    }
  }
  async function initializeEverything() {
    const API_KEY = await getApiKey();
    try {
      const genAI = new GoogleGenerativeAI(API_KEY); // generates a new ai to using the api key to get responses
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        }); // generates a new model using genAI
        try {
          chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: systemPrompt,
          });
        } catch (error) {
          console.log(`Error setting up chatSession: ${error}`);
        }
      } catch (error) {
        console.log(`Error setting up model: ${error}`);
      }
    } catch (error) {
      console.log(`Error initializing AI: ${error}`);
    }
  }
  async function run(prompt: string) {
    if (chatSession) {
      try {
        shouldload = true; // sets shouldload to true to show loader
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        shouldload = false; // sets shouldload to false to not show loader

        const formattedText = text // variable to store formatted text
          .replace(/\*\*/g, "") // replaces "**" with ""
          .replace(/\*/g, ""); // replaces "*" with ""

        // Create a single message with line breaks
        const message = {
          content: formattedText,
          sender: "Gemini",
        }; // stores formatted AI text in message

        messages = [...messages, message]; // appends formatted text to messages
        writeDataInDb(prompt, text);
        const chatLog = document.getElementById("chatlog");
        if (chatLog) {
          chatLog.scrollTo(0, chatLog.scrollHeight);
        }
      } catch (error) {
        console.log(`Error sending message: ${error}`);
      }
    } else {
      initializeEverything();
    }
  }
  function autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  //function for redirecting to gradeApp
  async function gradeAiSocratic() {
    //checks if member is true
    // if (membership == "tier-2") {
    systemPrompt = socraticModelSystemPrompt;
    // } else {
    //   showToast(
    //     "Error",
    //     "Sorry you do not own a tier-2 account needed to access this model.",
    //     3500,
    //     "error"
    //   );
    // }
  }
  async function gradeAiBase() {
    //checks if member is true
    // if (membership == "tier-1" || membership == "tier-2") {
    systemPrompt = baseModelSystemPrompt;
    // } else {
    //   showToast(
    //     "Error",
    //     "Sorry you do not own a tier-1 account needed to access this model.",
    //     3500,
    //     "error"
    //   );
    // }
  }
  function changeModel() {
    console.log(selectedModel);
    if (selectedModel == "Socratic Model") {
      gradeAiSocratic();
    } else if (selectedModel == "Base Model") {
      gradeAiBase();
    }
  }
</script>

<svelte:component this={ToastContainer} let:data>
  <svelte:component this={FlatToast} {data} />
</svelte:component>

<svelte:head>
  <title>Grade App - Grade AI</title>
</svelte:head>

{#if !notLoggedIn}
  <div class="main">
    <div class="model-selection">
      <select
        bind:value={selectedModel}
        on:change={changeModel}
        class="dropdown-content menu bg-base-500 z-[1] p-2 shadow"
      >
        <option>Base Model</option>
        <option>Socratic Model</option>
      </select>
    </div>
    <div class="chatlog" id="chatlog">
      {#if shouldShowWelcomeMessage}
        <div class="welcome-message">
          <h1 id="hello-message" class="text-7xl text-white">Hello There!</h1>
          <p class="text-2xl">How Can I Help You Today?</p>
        </div>
      {/if}
      {#each messages as userMessage}
        <div class={userMessage.sender}>
          <div class="senders">
            <h3 class="text-white pl-2">{userMessage.sender}:</h3>
          </div>
          <div class="content pl-5 text-gray-200">
            {#if userMessage.sender === "Gemini"}
              <div>
                <HighlightedContent content={userMessage.content} />
              </div>
            {:else}
              <p>{userMessage.content}</p>
            {/if}
          </div>
        </div>
      {/each}
      {#if shouldload}
        <div class="loader pl-2 mt-3">
          <Loader />
        </div>
      {/if}
    </div>
    <div class="input-area">
      <textarea
        id="userInput"
        placeholder="Enter a prompt here"
        on:keydown={handleKeyDown}
        on:input={autoResize}
        rows="1"
      ></textarea>
      <button type="button" class="btn" on:click={sendMessage}>Send</button>
      {#if speakButton}
        <button type="button" class="btn" on:click={speakText}>Speak</button>
      {/if}
      {#if pauseButton}
        <button type="button" class="btn" on:click={pauseSpeech}>Pause</button>
      {/if}
      {#if resumeButton}
        <button type="button" class="btn" on:click={resumeSpeech}>Resume</button
        >
      {/if}
    </div>
  </div>
{/if}
{#if notLoggedIn}<NotLoggedIn />{/if}

<style>
  .User {
    width: 50em;
    background-color: #1e1f20;
    border-radius: 10px;
    align-self: flex-end;
    padding-bottom: 10px;
    padding-right: 10px;
    margin-left: auto;
    margin-bottom: 20px;
  }
  .Gemini {
    width: fit-content;
    background-color: #2a2b2d;
    border-radius: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  #hello-message {
    background: linear-gradient(
      90deg,
      rgba(72, 148, 229) 0%,
      rgba(138, 121, 203) 70%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .welcome-message {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    height: 100%;
  }
  .senders {
    font-size: 1.6em;
  }
  .content {
    font-size: 1.3em;
  }
  .chatlog {
    height: 84vh;
    overflow-y: scroll;
    margin-bottom: 5px;
  }
  textarea {
    min-height: 8vh;
    max-height: 80px;
    height: 20px;
    width: 60vw;
    border-radius: 5px;
    border: 1px solid white;
    background-color: #1e1f20;
    color: white;
    padding-left: 15px;
    padding-right: 15px;
    resize: none;
    overflow-y: scroll;
  }
  button {
    border-radius: 10px;
    margin-left: 5px;
  }
  .input-area {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
