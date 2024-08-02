<script lang="ts">
  //@ts-ignore
  import { goto } from "$app/navigation";
  import { initializeApp } from "firebase/app";
  import "./index.css";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { UsersDatabase } from "../../supabaseClient";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import LoginForm from "../components/loginForm.svelte";

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

  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration, // 0 or negative to avoid auto-remove
      placement: "bottom-right",
      //@ts-ignore
      type: "info",
      theme: "dark",
      //@ts-ignore
      placement: "bottom-right",
      showProgress: true,
      //@ts-ignore
      type: type,
      //@ts-ignore
      theme: "dark",
      onClick: () => {},
      onRemove: () => {},
      // component: BootstrapToast, // allows to override toast component/template per toast
    });
  };
  async function loginWIthEmail() {
    const emailObject = document.getElementById("email") as HTMLInputElement;
    const passwordObject = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const email = emailObject.value;
    const password = passwordObject.value;

    if (email && password) {
      const { data, error } = await UsersDatabase.from("Users")
        .select()
        .eq("Email", email)
        .eq("Password", password);

      if (data) {
        if (data.length > 0) {
          showToast("Success", "Login Successfull!!", 2500, "success");
          sessionStorage.setItem("Email", email);
          sessionStorage.setItem("Member", data[0].GradeAppMember);
          setTimeout(() => {
            goto("/en/dashboard");
          }, 2500);
        } else {
          showToast(
            "Error",
            "User Doesn't Exist, please Register",
            2500,
            "error"
          );
        }
      } else {
        console.log(error);
      }
    } else {
      showToast(
        "Error",
        "Please enter both your email and password",
        2500,
        "error"
      );
    }
  }
  async function checkIfUserExistsInDatabase(email: string) {
    try {
      const { data, error } = await UsersDatabase.from("Users").insert({
        Email: email,
        Member: false,
      });

      showToast("Success", "Login Successfull!!", 2500, "success");
      setTimeout(() => {
        goto("/en/dashboard");
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  }
  async function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //@ts-ignore
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        //@ts-ignore
        sessionStorage.setItem("Display Name", user.displayName);
        //@ts-ignore
        sessionStorage.setItem("Email", user.email);
        //@ts-ignore
        checkIfUserExistsInDatabase(user.email);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage);
      });
  }
</script>

<ToastContainer let:data>
  <FlatToast {data} />
</ToastContainer>

<svelte:head>
  <title>Grade App - Login</title>
</svelte:head>

<center id="login-text">
  <h1>Login</h1>
</center>
<center id="normal">
  <div class="container">
    <div class="oAuthLoginButtons">
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
      >
    </div>
    <hr style="margin-bottom: 30px;" />
    <LoginForm />
    <button id="loginButton" class="btn btn-primary" on:click={loginWIthEmail}
      >Login</button
    >

    <br />
    <span id="register">
      <a href="/en/register">Register</a>
    </span>
  </div>
</center>

<center id="responsive">
  <div class="oAuthLoginButtons" style="margin-top: 40px; margin-bottom: 30px;">
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
    >
  </div>
  <LoginForm />
  <button id="loginButton" class="btn btn-primary" on:click={loginWIthEmail}
    >Login</button
  >

  <br />
  <span id="register">
    <a href="/en/register">Register</a>
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
    height: auto;
    padding-bottom: 10px;
    text-align: center;
  }
  h1 {
    font-size: 55px;
  }
  .oAuthLoginButtons {
    display: inline-flex;
    gap: 10px;
    margin-top: 10px;
  }
  #loginWithGoogleButton {
    font-size: 20px;
  }
  #loginButton {
    font-size: 25px;
    width: 120px;
    margin-bottom: 10px;
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
