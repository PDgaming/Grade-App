<script>
  import { goto } from "$app/navigation";
  import { initializeApp } from "firebase/app";
  import "./index.css";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
    <h2>We have migrated to Google only login</h2>
    <button
      id="loginWithGoogleButton"
      class="btn btn-primary"
      on:click={loginWithGoogle}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
        id="google-icon"
        ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        /></svg
      ></button
    ><br />
    <span id="register">
      <a href="/register">Register</a>
    </span>
  </div>
</center>

<center id="responsive">
  <h2>We have migrated to Google only login</h2>
  <button
    id="loginWithGoogleButton"
    class="btn btn-primary"
    on:click={loginWithGoogle}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      id="google-icon"
      ><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      /></svg
    ></button
  ><br />
  <span id="register">
    <a href="/register">Register</a>
  </span>
</center>

<style>
  #login-text {
    margin-top: 30px;
  }
  h2 {
    color: white;
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
  #loginWithGoogleButton {
    margin-bottom: 10px;
    font-size: 20px;
    margin-top: 50px;
  }
  #register a {
    text-decoration: none;
    color: #007bff;
  }
  #responsive {
    display: none;
  }
  #google-icon {
    width: 30px;
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
