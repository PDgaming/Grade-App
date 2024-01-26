<script>
    import "./chatWindowStyle.css";
    import { GoogleGenerativeAI } from "@google/generative-ai";

    let messages = [];
    let userInput = "";

    let GeminiInput = "";

    function sendMessage() {
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

<div class="main">
    <div class="title">
        <h1>Grade App</h1>
    </div>
    <div class="chat-container">
        {#each messages as userMessage}
            <div class={userMessage.sender}>
                <h1>{userMessage.sender}</h1> <p>{userMessage.content}</p>
            </div>
        {/each}
    </div>
    <div class="typebox">
        <input type="text" id="userInput" placeholder="Type your question..." />
        <button type="button" class="btn btn-primary" on:click={sendMessage}
            >Send</button
        >
    </div>
</div>
