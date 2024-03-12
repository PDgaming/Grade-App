<script>
  import "./chatWindow.css";
  import { GoogleGenerativeAI } from "@google/generative-ai";

  let messages = []; //array to store user and ai messages
  let userInput = "";

  let GeminiInput = "";

  let shouldShowWelcomeMessage = true;

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function sendMessage() {
    shouldShowWelcomeMessage = false;
    const userInput = document.getElementById("userInput").value.trim(); // gets user input
    messages = [...messages, { content: userInput, sender: "User" }]; // add user input to messages
    document.getElementById("userInput").value = ""; // removes old message from the input
    run(userInput); // sends user message to ai to get response
  }

  const API_KEY = "AIzaSyD3pylacar54cPdqHQDPc1bWHBEU_-97uE";

  const genAI = new GoogleGenerativeAI(API_KEY); // generates a new ai to using the api key to get responses

  async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // generates a new model using genAI

    const result = await model.generateContent(prompt); // takes in prompt and generates a result
    const response = await result.response; // takes result and generates a response
    const text = response.text(); //takes the text of the response and puts in "text"

    // Remove "*" characters from the text
    const cleanText = text.replace(/\*/g, "");

    // Split text at "**" (optional, only if line breaks needed)
    const messageLines = cleanText.split(/\*\*/).map((line) => {
      return line.startsWith("Gemini:") ? line : line;
    });

    // Create a single message (keep as single message or split for line breaks)
    const message = {
      content: messageLines.join("\n") || cleanText, // Adjust based on line break logic
      sender: "Gemini",
    };

    messages = [...messages, message];
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
        <p style="margin-left:35px;">{userMessage.content}</p>
      </div>
    {/each}
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
      width: 65vw;
      border-radius: 20px;
    }
    #gemini-safety {
      text-align: center;
      font-size: 12px;
      left: 0vw;
    }
  }
</style>
