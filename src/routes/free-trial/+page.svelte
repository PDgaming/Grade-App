<script>
  import Loader from "../components/loader.svelte"; // imports Loader from components
  import "./chatWindow.css"; // imports css stylesheet
  import { GoogleGenerativeAI } from "@google/generative-ai"; // imports GoogleGenerativeAI
  import { onMount } from "svelte";
  import { supabase } from "../supabaseClient";
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
  onMount(() => {
    sessionStorage.setItem("Queries Left", queriesLeft);
  });
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
          "0 Queries Left! Please contact gradeappbyapp@gmail.com to create an account to enjoy the full app and ask as many questions as you want.",
        );
      } else if (queriesLeft != 0) {
        run(userInput); // userInput goes to run to get response from API
        queriesLeft = queriesLeft - 1;
        sessionStorage.setItem("Queries Left", queriesLeft);
      }
    }
  }

  const API_KEY = "AIzaSyD5t-e0VhB5tKMwTwZ102FYh2NQcFR624A"; // API key

  const genAI = new GoogleGenerativeAI(API_KEY); // generates a new ai to using the api key to get responses

  async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // generates a new model using genAI
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
  }

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
</script>

<svelte:head>
  <title>Grade-App AI (powered by Google's Gemini) Free Trial</title>
</svelte:head>

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
        Start a conversation with Gemini by typing in a prompt in the text input
        below.
      </p>
      <p id="free-trial">
        This is a free trail version of Grade App. You will only be able to ask
        5 questions. Also all queries asked will be added to our database. <br
        />To ask as many questions as you want and to use the complete app
        contact <u>gradeappbyapp@gmail.com</u>
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
  </div>
  <div class="input-area">
    <input
      type="text"
      id="userInput"
      placeholder="Enter a prompt here"
      on:keydown={handleKeyDown}
    />
    <button type="button" on:click={sendMessage}>Send</button>
  </div>
  <h6 id="gemini-safety">
    Gemini may display inaccurate info about people, so double-check its
    responses.
  </h6>
</div>

<style>
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
  h1 {
    color: white;
    margin-top: 50px;
    font-weight: bold;
  }
  #free-trial {
    width: 60vw;
  }
  p {
    color: white;
    font-size: 21px;
  }

  h3 {
    color: white;
    margin-top: 5px;
    margin-left: 10px;
  }

  input {
    position: relative;
    top: 15px;
    left: 9vw;
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
    left: 10vw;
    background-color: #131314;
    color: white;
    height: 40px;
    width: 70px;
    border: 1px solid white;
    border-radius: 10px;
  }
  .input-area {
    position: fixed;
    top: 81vh;
    left: 8vw;
    height: 90px;
    width: 85vw;
    background-color: transparent;
  }
  .chatLog {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 5%;
    height: 90vh;
    width: 91vw;
    background-color: transparent;
    padding-bottom: 100px;
    align-items: center;
  }
  #gemini-safety {
    position: relative;
    top: -30px;
    left: 26vw;
    color: white;
  }
  :root {
    @media (prefers-reduced-motion: no-preference) {
      overflow: hidden;
    }
  }

  @media screen and (max-width: 1170px) {
    #hello-message {
      font-size: 40px;
    }
    p {
      font-size: 20px;
    }
    input {
      left: 8vw;
      height: 10vh;
      width: 65vw;
    }
    button {
      top: 17px;
      left: 9vw;
    }
    #gemini-safety {
      left: 23vw;
    }
  }
  @media screen and (max-width: 1090px) {
    p {
      font-size: 20px;
    }
    #hello-message {
      font-size: 35px;
    }
    button {
      top: 16px;
      left: 7vw;
    }
    input {
      left: 6vw;
      width: 66vw;
    }
    #gemini-safety {
      left: 20vw;
    }
  }

  @media screen and (max-width: 1060px) {
    p {
      font-size: 20px;
    }
    #hello-message {
      font-size: 33px;
    }
    button {
      top: 16px;
      left: 6vw;
    }
    input {
      left: 5vw;
      width: 72vw;
    }
    #gemini-safety {
      left: 21vw;
    }
  }

  /* Responsive for tablets */
  @media screen and (max-width: 800px) {
    p {
      font-size: 20px;
    }
    #hello-message {
      font-size: 30px;
    }
    button {
      top: 16px;
      left: 1vw;
    }
    input {
      left: 0vw;
      width: 75vw;
    }
    #gemini-safety {
      font-size: 13px;
      left: 15vw;
    }
  }

  /* Responsive for mobiles */
  @media screen and (max-width: 400px) {
    p {
      font-size: 19px;
    }
    #hello-message {
      font-size: 30px;
    }
    button {
      top: 16px;
      left: -3vw;
    }
    input {
      left: -4vw;
      height: 8vh;
      width: 66vw;
      border-radius: 20px;
    }
    #gemini-safety {
      text-align: center;
      font-size: 12px;
      left: 0vw;
    }
  }
  /* Responsive for vivo 1724 */
  @media screen and (max-width: 390px) {
    input {
      width: 64vw;
    }
  }
</style>
