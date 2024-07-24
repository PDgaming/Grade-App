<script>
  import Loader from "../components/loader.svelte"; // imports Loader from components
  import "./chatWindow.css"; // imports css stylesheet
  import { GoogleGenerativeAI } from "@google/generative-ai"; // imports GoogleGenerativeAI
  import { onMount } from "svelte";
  import { supabase } from "../../supabaseClient";
  import NotLoggedIn from "../components/notLoggedIn.svelte";

  // import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
  const firebaseConfig = {
    apiKey: "AIzaSyB_MSh9YlBu7GGN5wxZjY7kGN4bU697GO4",

    authDomain: "grade-app-16e2d.firebaseapp.com",

    databaseURL: "https://grade-app-16e2d-default-rtdb.firebaseio.com",

    projectId: "grade-app-16e2d",

    storageBucket: "grade-app-16e2d.appspot.com",

    messagingSenderId: "942886540823",

    appId: "1:942886540823:web:29caeac2695fecc3d4ee52",

    measurementId: "G-XCTQN883KL",
  };
  // Variables
  let notLoggedIn = false;
  let messages = []; // array to store user and ai messages
  let userInput = ""; // variable to store user message
  let GeminiInput = ""; // variable to store ai message
  let shouldShowWelcomeMessage = true; // shouldShowWelcomeMessage is true by default to show shouldShouldWelcomeMessage
  let shouldload = false; // shouldload is false by default to not show loader
  let queriesLeft = 5;

  function handleKeyDown(event) {
    // function to handle key down
    if (event.key === "Enter") {
      // condition to check if key pressed is Enter
      sendMessage(); // if condition is true sendMessage function runs
    }
  }
  function sendMessage() {
    // function to send messages to API
    shouldShowWelcomeMessage = false; // sets shouldShowWelcomeMessage to false to not show welcome message
    const userInput = document.getElementById("userInput").value.trim(); // gets user input
    messages = [...messages, { content: userInput, sender: "User" }]; // add user input to messages
    document.getElementById("userInput").value = ""; // removes old message from the input
    if (userInput == "") {
      // checks if userInput is empty
      messages = [
        ...messages,
        { content: "Sorry, you didn't enter a prompt!", sender: "Gemini" }, // returns error message
      ]; // add userinput to messages
    } else {
      // if userInput is not empty
      if (queriesLeft == 0 || sessionStorage.getItem("Queries Left") == 0) {
        alert(
          "0 Queries Left! Please contact gradeappbyapp@gmail.com to create an account to enjoy the full app and ask as many questions as you want."
        );
      } else if (queriesLeft != 0) {
        run(userInput); // userInput goes to run to get response from API
        queriesLeft = queriesLeft - 1;
        sessionStorage.setItem("Queries Left", queriesLeft);
      }
    }
  }
  async function getApiKey() {
    const { data, error } = await supabase.from("API-Key").select();
    if (data) {
      return data[0].API_KEY;
    } else {
      console.log(error);
    }
  }
  let model;
  async function initializeAI() {
    try {
      const API_KEY = await getApiKey();
      const genAI = new GoogleGenerativeAI(API_KEY); // generates a new ai to using the api key to get responses
      return genAI;
    } catch (error) {
      console.log(`Error initializing AI: ${error}`);
    }
  }

  async function setupModel() {
    try {
      const genAI = await initializeAI();
      model = genAI.getGenerativeModel({ model: "gemini-pro" }); // generates a new model using genAI
    } catch (error) {
      console.error("Error setting up model:", error);
    }
  }
  async function run(prompt) {
    if (model) {
      try {
        shouldload = true; // sets shouldload to true to show loader
        const result = await model.generateContent(prompt); // takes in prompt and generates a result
        const response = await result.response; // takes result and generates a response
        const text = response.text(); //takes the text of the response and puts in "text"
        shouldload = false; // sets shouldload to false to not show loader

        const formattedText = text // variable to store formatted text
          .replace(/\*\*/g, "<br>") // replaces "**" with line break
          .replace(/\*/g, ""); // replaces "*" with ""

        // Create a single message with line breaks
        const message = {
          content: formattedText,
          sender: "Gemini",
        }; // stores formatted AI text in message

        messages = [...messages, message]; // appends formatted text to messages
        writeDataInDb(prompt, text);
      } catch (error) {
        console.log(errro);
      }
    } else {
      console.log("Model not initialized");
      return;
    }
  }
  setupModel()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
  async function writeDataInDb(prompt, response) {
    const email = sessionStorage.getItem("Email");
    try {
      const { data, error } = await supabase
        .from("Free-trial-messages")
        .insert({
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
  onMount(() => {
    sessionStorage.setItem("Queries Left", queriesLeft);

    if (!sessionStorage.getItem("Email")) {
      notLoggedIn = true;
    }
  });
</script>

<svelte:head>
  <title>Grade-App AI (powered by Google's Gemini) Free Trial</title>
</svelte:head>

{#if !notLoggedIn}
  <div class="main">
    <center>
      <div class="header">
        <h2>Gemini</h2>
      </div>
    </center>
    <div class="chatLog">
      <!-- Shows welcome message -->
      {#if shouldShowWelcomeMessage}
        <!-- shows welcome message if shouldShowWelcomeMessage if true -->
        <h1 id="hello-message">Hello There!</h1>
        <p id="how-to">
          Start a conversation with Gemini by typing in a prompt in the text
          input below.
        </p>
        <p id="free-trial">
          This is a free trail version of Grade App. You will only be able to
          ask 5 questions.<br />To ask as many questions as you want and to use
          the complete app contact <u>gradeappbyapp@gmail.com</u>
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
  h2,
  h3 {
    color: white;
  }
  h1 {
    margin-top: 50px;
    font-weight: bold;
  }
  #free-trial {
    width: 60vw;
  }
  p {
    font-size: 21px;
  }

  h2 {
    margin-top: 5px;
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
