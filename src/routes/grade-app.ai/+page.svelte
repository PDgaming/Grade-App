<script>
    import "./chatWindowStyle.css";

    // Function to send a message and handle bot response
    async function sendMessage() {
        const userInput = document.getElementById("userInput").value.trim();
        console.log(userInput);
    }
</script>

<div class="main">
    <div class="title">
        <text style="position: relative; top: 8px;">Grade App</text>
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
