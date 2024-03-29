<script>
  import Loader from "../components/loader.svelte"; // imports Loader from components
  import "./chatWindow.css"; // imports css stylesheet
  import { GoogleGenerativeAI } from "@google/generative-ai"; // imports GoogleGenerativeAI

  let messages = []; // array to store user and ai messages
  let userInput = ""; // variable to store user message

  let GeminiInput = ""; // variable to store ai message

  let shouldShowWelcomeMessage = true; // shouldShowWelcomeMessage is true by default to show shouldShouldWelcomeMessage
  let shouldload = false; // shouldload is false by default to not show loader

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
      run(userInput); // userInput goes to run to get response from API
    }
  }

  const API_KEY = "AIzaSyC_7G07jTGL9Ys-rkzmEsP9UQin99umeZA"; // API key

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
      .replace(/\./g, ".<br>") // replaces "." with line break
      .replace(/\*/g, ""); // replaces "*" with ""

    // Create a single message with line breaks
    const message = {
      content: formattedText,
      sender: "Gemini",
    }; // stores formatted AI text in message

    messages = [...messages, message]; // appends formatted text to messages
  }
</script>

<svelte:head>
  <title>Grade-App AI (powered by Google's Gemini)</title>
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
        Start a conversation with Bard by typing in a prompt in the text input
        below.
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
    height: 9vh;
    width: 65vw;
    border: 1px solid white;
    border-radius: 25px;
    background-color: #1e1f20;
    color: white;
    padding-left: 20px;
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
    top: 78vh;
    left: 8vw;
    height: 100px;
    width: 85vw;
    background-color: transparent;
  }

  .chatLog {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 8%;
    height: 85vh;
    width: 85vw;
    background-color: transparent;
    padding-bottom: 100px;
    align-items: center;
  }
  #gemini-safety {
    position: relative;
    top: -10px;
    left: 26vw;
    color: white;
  }
  :root {
    @media (prefers-reduced-motion: no-preference) {
      overflow: hidden;
    }
  }

  @media screen and (max-width: 1170px) {
    p {
      font-size: 22px;
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
      font-size: 23px;
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
      font-size: 24px;
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
      font-size: 25px;
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
      font-size: 22px;
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
