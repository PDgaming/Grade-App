<script>
    import "./register.css"

    function signUp() {
        const email = document.getElementById("email").value; // gets email from input field
        const password = document.getElementById("password").value; // gets password from input field
        console.log(email, password); // logs email and password
        alert("We are still working on this page! Please contant us at gradeappbyapp@gmail.com to register an account")
    }
</script>

<svelte:head>
	<title>Grade App - Register</title>
</svelte:head>

<div class="container">
    <h1>Register</h1>
    <form>
        <div id="SignUpForm">
            <input
                type="email"
                class="emailInput"
                id="email"
                placeholder="Email"
            /><br />

            <input
                type="password"
                class="passwordInput"
                id="password"
                placeholder="Password"
            />

            <button on:click={signUp}>Register</button>
            <h1 style="font-size: 20px;">
                Already have an account? <a href="/login">Login</a>
            </h1>
        </div>
    </form>
</div>
