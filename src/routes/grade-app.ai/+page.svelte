<script>
    import "./chatWindowStyle.css";
    import { GoogleGenerativeAI } from "@google/generative-ai";
    
    let userInputs = [];
    let GeminiResponses = [];
    function sendMessage() {
        const userInput = document.getElementById("userInput").value.trim();
        userInputs = [...userInputs, userInput];
        document.getElementById("userInput").value = "";
        run(userInput);
    }

    const API_KEY="AIzaSyD3pylacar54cPdqHQDPc1bWHBEU_-97uE";

    const genAI = new GoogleGenerativeAI(API_KEY);

    async function run(prompt) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        GeminiResponses = [...GeminiResponses, text];
    }
</script>

<div class="main">
    <div class="title">
        <text style="position: relative; top: 8px;">Grade App</text>
    </div>
    <div class="chat">
        <p>
            {#each userInputs as userInput}
                {userInput}
            {/each}<br>
            {#each GeminiResponses as GeminiResponse}
                {GeminiResponse}
            {/each}<br>
        </p>
    </div>
    <div class="typebox">
        <input type="text" id="userInput" placeholder="Type your question..." />
        <button type="button" class="btn btn-primary" on:click={sendMessage}
            >Send</button
        >
    </div>
    <div class="messagingArea">
        <div class="chatLog" id="chatLog"></div>
    </div>
</div>
