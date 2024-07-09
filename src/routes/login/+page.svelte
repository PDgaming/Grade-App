<script>
  import { goto } from "$app/navigation";
  import { initializeApp } from "firebase/app";
  import "./index.css";
  import {
    AuthErrorCodes,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import Form from "../components/form.svelte";

  // config for firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB_MSh9YlBu7GGN5wxZjY7kGN4bU697GO4",

    authDomain: "grade-app-16e2d.firebaseapp.com",

    projectId: "grade-app-16e2d",

    storageBucket: "grade-app-16e2d.appspot.com",

    messagingSenderId: "942886540823",

    appId: "1:942886540823:web:29caeac2695fecc3d4ee52",

    measurementId: "G-WD1M20G6LX",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase authentication
  const auth = getAuth(app);
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();

  const login = async (event) => {
    event.preventDefault(); // prevents the site from reloading on button click
    const email = document.getElementById("email").value; // gets email from the input field
    const password = document.getElementById("password").value; // gets password from the input field

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); // creates user credentials with email and password to sign in
      sessionStorage.setItem("Email", email);
      sessionStorage.setItem("Password", password);
      alert("Login Successfill!!"); // shows success message
      goto("/dashboard"); // redirects user to chat window
    } catch (error) {
      console.log(error); // logs error code
      if (error.code == AuthErrorCodes.INVALID_EMAIL) {
        alert("Error: " + error.code + ". Please recheck your credentials"); // shows error message if user credentials are wrong
      } else {
        alert(
          "Error: " + error.code + ". Something went wrong please try again."
        ); // shows error message if somthing else went wrong
      }
    }
  };

  async function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        sessionStorage.setItem("Display Name", user.displayName);
        sessionStorage.setItem("Email", user.email);
        alert("Login Successfill!!"); // shows success message
        goto("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage);
      });
  }
</script>

<svelte:head>
  <title>Grade App - Login</title>
</svelte:head>

<center id="login-text">
  <h1>Login</h1>
</center>

<center id="normal">
  <div class="container">
    <Form />
    <button
      id="loginWithGoogleButton"
      class="btn btn-primary"
      on:click={loginWithGoogle}>Google</button
    ><br />
    <button id="loginButton" class="btn btn-primary" on:click={login}
      >Login</button
    ><br />
    <span id="register">
      <a href="/register">Register</a>
    </span>
  </div>
</center>

<center id="responsive">
  <Form />
  <button
    id="loginWithGoogleButton"
    class="btn btn-primary"
    on:click={loginWithGoogle}>Google</button
  ><br />
  <button id="loginButton" class="btn btn-primary" on:click={login}
    >Login</button
  ><br />
  <span id="register">
    <a href="/register">Register</a>
  </span>
</center>

<style>
  #login-text {
    margin-top: 30px;
  }
  .container {
    background-color: #2c2f34;
    margin-top: 40px;
    border-radius: 10px;
    width: 35vw;
    height: 310px;
    text-align: center;
  }
  h1 {
    font-size: 55px;
    color: white;
  }
  #loginButton,
  #loginWithGoogleButton {
    margin-bottom: 10px;
  }
  #loginWithGoogleButton {
    font-size: 20px;
  }
  #loginButton {
    font-size: 25px;
    width: 120px;
  }
  #register a {
    text-decoration: none;
    color: #007bff;
  }
  #responsive {
    display: none;
  }
  @media (max-width: 1000px) {
    #normal {
      display: none;
    }
    #responsive {
      display: block;
    }
  }
</style>
