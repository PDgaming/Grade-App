<script>
  import { goto } from "$app/navigation";
  import { initializeApp } from "firebase/app";
  import {
    AuthErrorCodes,
    getAuth,
    createUserWithEmailAndPassword,
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

  const registerApp = initializeApp(firebaseConfig); // initializes app using config info
  const auth = getAuth(registerApp);

  async function register() {
    event.preventDefault(); // prevents the site from reloading on button click
    const email = document.getElementById("email").value; // gets email from input field
    const password = document.getElementById("password").value; // gets password from input field
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(
          "Registration successful!! But to use Grade-AI, you will need a premium account, to create a premium account contact gradeappbyapp@gmail.com"
        );
        goto("/login");
      })
      .catch((error) => {
        alert(`Error: ${error.code}.`);
      });
  }
</script>

<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<center id="register-text">
  <h1>Register</h1>
</center>

<center id="normal">
  <div class="container">
    <Form />

    <button on:click={register} class="btn btn-primary registerButton"
      >Register</button
    ><br />
    <span id="login"><a href="/login">Login</a> </span>
  </div>
</center>

<center id="responsive">
  <Form />

  <button on:click={register} class="btn btn-primary registerButton"
    >Register</button
  ><br />
  <span id="login"><a href="/login">Login</a> </span>
</center>

<style>
  #register-text {
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
  .registerButton {
    margin-bottom: 10px;
    font-size: 25px;
    width: 120px;
  }
  #login a {
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
