<script>
    import "./login.css";
    import { goto } from "$app/navigation";
    import { initializeApp } from "firebase/app";
    import {
        AuthErrorCodes,
        getAuth,
        signInWithEmailAndPassword,
    } from "firebase/auth";

    const firebaseConfig = {
        apiKey: "AIzaSyB_MSh9YlBu7GGN5wxZjY7kGN4bU697GO4",

        authDomain: "grade-app-16e2d.firebaseapp.com",

        projectId: "grade-app-16e2d",

        storageBucket: "grade-app-16e2d.appspot.com",

        messagingSenderId: "942886540823",

        appId: "1:942886540823:web:29caeac2695fecc3d4ee52",

        measurementId: "G-WD1M20G6LX",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const login = async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            console.log(userCredential.user);
            alert("Login Successfill!!");
            goto("/grade-app.ai");
        } catch (error) {
            console.log(error.code);
            alert("Something went wrong please try again.")
        }
    };
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
