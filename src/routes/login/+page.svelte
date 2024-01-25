<script>
    import "./login.css";
    import { goto } from '$app/navigation';

    const emails = ["produnyadehingia12345@gmail.com"];
    const passwords = ["PDgrade12345"];

    function login(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const emailInEmails = emails.includes(email);
        const passwordInPasswords = passwords.includes(password);

        if (emailInEmails && passwordInPasswords) {
            console.log("Login Successfull!!");
            alert("Login Successfull!!");
            goto("/grade-app.ai");
        } else if (!emailInEmails && !passwordInPasswords) {
            console.log("Both email and password are wrong");
            alert("Both email and password are wrong");
        } else if (!emailInEmails) {
            console.log("Wrong email");
            alert("Wrong email");
        } else if (!passwordInPasswords) {
            console.log("Wrong password");
            alert("Wrong password");
        } else if (!emailInEmails && !passwordInPasswords) {
            console.log("Both email and password are wrong");
            alert("Both email and password are wrong");
        }
    }
</script>

<svelte:head>
    <title>Grade App - Login</title>
</svelte:head>

<div class="container">
    <h1>Login</h1>
    <form>
        <div id="loginForm">
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
            <button id="loginButton" on:click={login}>Login</button>
            <h1 style="font-size: 20px;">
                Don't have an account? <a href="/register">Sign Up</a>
            </h1>
        </div>
    </form>
</div>
