<script lang="ts">
  import Loader from "../../components/loader.svelte"; // imports Loader from components
  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"; // imports GoogleGenerativeAI
  import { GradeAppDatabase } from "../../supabaseClient";
  import { onMount } from "svelte";
  import NotLoggedIn from "../../components/notLoggedIn.svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import HighlightedContent from "../../components/highlightedContent.svelte";

  let notLoggedIn = false;
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
  onMount(() => {
    const userEmail = sessionStorage.getItem("Email");
    if (!userEmail) {
      notLoggedIn = true;
    }
    try {
      initializeEverything();
    } catch (error) {
      console.log(error);
    }
    //@ts-ignore
    getUserMessagesFromDb(userEmail).then(() => {
      const chatLog = document.getElementById("chatlog");
      setTimeout(() => {
        if (chatLog) {
          chatLog.scrollTo(0, chatLog.scrollHeight);
        }
      }, 1000);
    });
  });
  async function getUserMessagesFromDb(userEmail: string) {
    try {
      const { data, error } = await GradeAppDatabase.from("User-messages")
        .select()
        .eq("user", userEmail);
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
        shouldShowWelcomeMessage = false;
      } else {
        showToast(
          "Error",
          "There was an error getting your Messages from Database",
          2500,
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration, // 0 or negative to avoid auto-remove
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
      // component: BootstrapToast, // allows to override toast component/template per toast
    });
  };
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
      run(userInput); // userInput goes to run to get response from API
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
            history: [
              {
                role: "user",
                parts: [
                  "You are an Socratic Teacher. And I am your Student. Also please try to keep your replies as short as possible.",
                ],
              },
              {
                role: "model",
                parts: [
                  "Ah, welcome, my dear student. I see you have chosen to embark on a journey of self-discovery. Tell me, what brings you to my humble abode? What questions dance in your mind, waiting to be untangled? \n\nRemember, my role is not to impart knowledge, but to guide you towards it. We shall journey together,  unveiling truths through  thought-provoking questions and patient contemplation. \n\nSo, tell me, what is it you wish to explore?  What are you curious about?  Let us begin our quest. \n",
                ],
              },
            ],
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
          sender: "model",
        }; // stores formatted AI text in message
        messages = [...messages, message]; // appends formatted text to messages
        writeDataInDb(prompt, text);
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
</script>

<ToastContainer let:data>
  <FlatToast {data} />
</ToastContainer>

<svelte:head>
  <title>Grade-App AI (powered by Google's Gemini)</title>
</svelte:head>

{#if !notLoggedIn}
  <div class="main">
    <div class="chatlog" id="chatlog">
      <div class="welcome-message p-2">
        {#if shouldShowWelcomeMessage}
          <h1 id="hello-message" class="text-5xl text-white">Hello There!</h1>
          <p id="how-to" class="text-2xl">
            Start a conversation with Gemini by typing in a prompt in the text
            input below.
          </p>
        {/if}
      </div>
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
  .senders {
    font-size: 1.6em;
  }
  .content {
    font-size: 1.3em;
  }
  .chatlog {
    height: 88vh;
    overflow-y: scroll;
    margin-bottom: 5px;
  }
  textarea {
    min-height: 8vh;
    max-height: 80px;
    height: 8vh;
    width: 60vw;
    border-radius: 10px;
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
