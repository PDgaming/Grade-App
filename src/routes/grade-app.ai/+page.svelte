<script>
    import "./chatWindow.css";
    import { GoogleGenerativeAI } from "@google/generative-ai";

    let messages = [];
    let userInput = "";

    let GeminiInput = "";

    let shouldShowWelcomeMessage = true;

    function sendMessage() {
        shouldShowWelcomeMessage = false;
        const userInput = document.getElementById("userInput").value.trim();
        messages = [...messages, { content: userInput, sender: "user" }];
        document.getElementById("userInput").value = "";
        run(userInput);
    }

    const API_KEY = "AIzaSyD3pylacar54cPdqHQDPc1bWHBEU_-97uE";

    const genAI = new GoogleGenerativeAI(API_KEY);

    async function run(prompt) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        messages = [...messages, { content: text, sender: "Gemini" }];
    }
</script>

<svelte:head>
    <title>Grade-App AI (powered by Bard)</title>
</svelte:head>

<div class="main">
    <h3>Bard</h3>
    <div class="chatWindow">
        <div class="chatLog">
            {#if shouldShowWelcomeMessage}
                <h1 id="hello-message">Hello There!</h1>
                <p id="how-to">
                    Start a conversation with Bard by typing in a prompt in the
                    text input below.
                </p>
            {/if}
            {#each messages as userMessage}
                <div class={userMessage.sender}>
                    <h1>{userMessage.sender}:</h1>
                    <p>{userMessage.content}</p>
                </div>
            {/each}
        </div>
        <div class="input-area">
            <input
                type="text"
                id="userInput"
                placeholder="Enter a prompt here"
            />
            <button type="button" on:click={sendMessage}>Send</button>
        </div>
    </div>
</div>

<style>
    .user {
        color: white;
        font-size: 25px;
        margin-left: 15px;
    }

    .Gemini {
        color: white;
        font-size: 25px;
        margin-left: 15px;
    }
    h1 {
        color: white;
        margin-top: 50px;
        margin-left: 20px;
        font-weight: bold;
    }

    p {
        color: white;
        font-size: 25px;
        margin-left: 20px;
    }

    h3 {
        color: white;
        margin-top: 15px;
        margin-left: 30px;
    }

    .chatWindow {
        height: 85vh;
        width: 92vw;
        margin-top: 25px;
        margin-left: 4vw;
        border-radius: 30px;
        background-color: #131314;
    }

    input {
        position: relative;
        top: 30px;
        left: 18vw;
        height: 8vh;
        width: 55vw;
        border: 1px solid white;
        border-radius: 30px;
        background-color: #131314;
        color: white;
        padding-left: 20px;
    }

    input:hover {
        border: 2px solid white;
    }

    button {
        position: relative;
        top: 30px;
        left: 19vw;
        background-color: #131314;
        color: white;
        height: 40px;
        width: 70px;
        border: 1px solid white;
    }

    .input-area {
        position: fixed;
        top: 78vh;
        height: 120px;
        width: 92vw;
        z-index: 1;
        border-radius: 30px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        background-color: #131314;
    }

    .chatLog {
        overflow-y: scroll;
        overflow-x: hidden;
        margin-left: 11vw;
        height: 68vh;
        width: 72vw;
        background-color: #131314;
    }
</style>
