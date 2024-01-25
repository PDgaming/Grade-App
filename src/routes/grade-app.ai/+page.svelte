<script>
    import "./chatWindowStyle.css";

    // Function to send a message and handle bot response
    async function sendMessage() {
        const userInput = document.getElementById("userInput").value.trim();
        console.log(userInput);
    }

    // Event listener for when the user presses Enter in the input field
    document
        .getElementById("userInput")
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
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
