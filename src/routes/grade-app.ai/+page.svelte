<script>
  import Loader from "../components/loader.svelte"; // imports Loader from components
  import "./chatWindow.css"; // imports css stylesheet
  import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"; // imports GoogleGenerativeAI
  import { supabase } from "../supabaseClient";
  import { onMount } from "svelte";
  import NotLoggedIn from "../components/notLoggedIn.svelte";

  let notLoggedIn = false;
  let messages = []; // array to store user and ai messages
  let messagesForTTS = [];
  let userInput = ""; // variable to store user message
  let GeminiInput = ""; // variable to store ai message
  let shouldShowWelcomeMessage = true; // shouldShowWelcomeMessage is true by default to show shouldShouldWelcomeMessage
  let shouldload = false; // shouldload is false by default to not show loader

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[18];
    if (text) {
      speechSynthesis.speak(utterance);
    }
  }
  onMount(() => {
    if (!sessionStorage.getItem("Display Name")) {
      notLoggedIn = true;
    }
    try {
      initializeEverything();
    } catch (error) {
      console.log(error);
    }
  });
  function speakText() {
    if (messages[messages.length - 1].sender == "Gemini") {
      speak(messages[messages.length - 1].content);
    }
  }
  function handleKeyDown(event) {
    // function to handle key down
    if (event.key === "Enter") {
      // condition to check if key pressed is Enter
      sendMessage(); // if condition is true sendMessage function runs
    }
  }
  async function writeDataInDb(prompt, response) {
    const email = sessionStorage.getItem("Email");
    try {
      const { data, error } = await supabase.from("User-messages").insert({
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
    const userInput = document.getElementById("userInput").value.trim(); // gets user input
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
    document.getElementById("userInput").value = ""; // removes old message from the input
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
  let chatSession;
  async function getApiKey() {
    const { data, error } = await supabase.from("API-Key").select();
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
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // generates a new model using genAI
        try {
          chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
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
  async function run(prompt) {
    if (chatSession) {
      try {
        shouldload = true; // sets shouldload to true to show loader
        const result = await chatSession.sendMessage(prompt);
        const text = result.response.text();
        shouldload = false; // sets shouldload to false to not show loader

        const formattedText = text // variable to store formatted text
          .replace(/\*\*/g, "") // replaces "**" with line break
          .replace(/\*/g, ""); // replaces "*" with ""

        // Create a single message with line breaks
        const message = {
          content: formattedText,
          sender: "Gemini",
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
</script>

<svelte:head>
  <title>Grade-App AI (powered by Google's Gemini)</title>
</svelte:head>
{#if !notLoggedIn}
  <div class="main">
    <div class="header">
      <h3>Gemini</h3>
    </div>
    <div class="chatLog">
      <!-- Shows welcome message -->
      {#if shouldShowWelcomeMessage}
        <!-- shows welcome message if shouldShowWelcomeMessage if true -->
        <h1 id="hello-message">Hello There!</h1>
        <p id="how-to">
          Start a conversation with Gemini by typing in a prompt in the text
          input below.
        </p>

        <!-- Adds messages to the DOM -->
      {/if}
      {#each messages as userMessage}
        <div class={userMessage.sender}>
          <h3>{userMessage.sender}:</h3>
          <p style="margin-left:35px;">{@html userMessage.content}</p>
        </div>
      {/each}
      {#if shouldload}
        <!-- shows loader id shouldload is true -->
        <Loader />
      {/if}
      <center>
        <div class="input-area">
          <input
            type="text"
            id="userInput"
            placeholder="Enter a prompt here"
            on:keydown={handleKeyDown}
          />
          <button type="button" on:click={sendMessage}>Send</button>
          <button type="button" on:click={speakText}>Speak</button>
        </div>
      </center>
    </div>
    <center>
      <h6 id="gemini-safety">
        Gemini may display inaccurate info about people, so double-check its
        responses.
      </h6>
    </center>
  </div>
{/if}
{#if notLoggedIn}<NotLoggedIn />{/if}

<style>
  :root {
    @media (prefers-reduced-motion: no-preference) {
      overflow: hidden;
    }
  }
  .header {
    height: 50px;
  }
  .User {
    color: white;
    font-size: 25px;
  }

  .Gemini {
    color: white;
    font-size: 25px;
  }
  h1,
  h3,
  p {
    color: white;
  }
  h1 {
    margin-top: 50px;
    font-weight: bold;
  }
  p {
    font-size: 21px;
  }

  h3 {
    margin-top: 5px;
    margin-left: 10px;
  }

  input {
    position: relative;
    top: 15px;
    height: 55px;
    width: 65vw;
    border: 1px solid white;
    border-radius: 25px;
    background-color: #1e1f20;
    color: white;
    padding-left: 15px;
  }
  input:focus {
    border: none;
  }
  button {
    position: relative;
    top: 15px;
    background-color: #131314;
    color: white;
    height: 40px;
    width: 70px;
    border: 1px solid white;
    border-radius: 10px;
  }
  .input-area {
    position: fixed;
    top: 80vh;
    height: 87px;
    width: 96vw;
    background-color: transparent;
  }
  .chatLog {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 10px;
    height: 84vh;
    width: 98vw;
    background-color: transparent;
    padding-bottom: 100px;
    align-items: center;
    padding-left: 10px;
  }
  #gemini-safety {
    color: white;
  }
</style>
