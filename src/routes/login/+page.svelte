<script lang="ts">
  import { goto } from "$app/navigation"; //imports goto for redirecting
  import { initializeApp } from "firebase/app"; //imports initialize to initialize firebase app
  import "./index.css"; //imports index.css file
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; //imports getAuth, GoogleAuthProvider, signWithPopup for get auth function, google sign in support and signWithPopup to google sign in with a popup
  import { UsersDatabase } from "../supabaseClient"; //imports UsersDatabase to access the userdatabase for email login
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts

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
  //uses auth in the device language
  auth.useDeviceLanguage();
  //declares provider for google
  const provider = new GoogleAuthProvider();
  //function for showing toasts
  const showToast = (
    title: string,
    body: string,
    duration: number,
    type: string
  ) => {
    const toast = toasts.add({
      title: title,
      description: body,
      duration: duration,
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
    });
  };
  //function for loggin in with Email
  async function loginWIthEmail() {
    const emailObject = document.getElementById("email") as HTMLInputElement; //gets email element
    const passwordObject = document.getElementById(
      "password"
    ) as HTMLInputElement; //gets password element
    const email = emailObject.value; //gets email
    const password = passwordObject.value; //gets password
    //checks if email and password exist and are not empty
    if (email && password) {
      //gets user data from database
      const { data, error } = await UsersDatabase.from("Users")
        .select() //selects all rows
        .eq("Email", email) //gets the row that has a value of email in the email column
        .eq("Password", password); //gets the row that has a value of password in the password column
      //checks is data exists and is not empty
      if (data) {
        //checks if users exist
        if (data.length > 0) {
          showToast("Success", "Login Successfull!!", 2500, "success"); //shows a login successfull toast
          sessionStorage.setItem("Email", email); //sets email as an item in sessionStorage
          sessionStorage.setItem("Member", data[0].GradeAppMember); //sets member as an item in sessionStorage
          setTimeout(() => {
            goto("/dashboard");
          }, 2500); //waits for 2500ms or 2.5s before redirecting to dashboard
        } else {
          //shows an error toast if user doesn't exist
          showToast(
            "Error",
            "User Doesn't Exist, please Register",
            2500,
            "error"
          );
        }
      } else {
        //shows error if data does not exist
        console.log(error);
      }
    } else {
      //shows an error if email and password does not exist or is empty
      showToast(
        "Error",
        "Please enter both your email and password",
        2500,
        "error"
      );
    }
  }
  //function to check if user exits in database(for google login)
  async function checkIfUserExistsInDatabase(email: string) {
    //
    try {
      const { data, error } = await UsersDatabase.from("Users").insert({
        Email: email,
        Member: false,
      });

      showToast("Success", "Login Successfull!!", 2500, "success");
      setTimeout(() => {
        goto("/dashboard");
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
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-4">
    <center>
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
      <form class="card-body" style="color: white">
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input type="text" class="grow" placeholder="Email" id="email" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            class="grow"
            placeholder="Password"
            id="password"
          />
        </label>
        <button
          id="loginButton"
          class="btn btn-primary"
          on:click={loginWIthEmail}>Login</button
        >
      </form>
      <span id="register">
        <a href="/register">Register</a>
      </span>
    </center>
  </div>
</center>

<style>
  #login-text {
    margin-top: 30px;
  }
  h1 {
    font-size: 55px;
  }
  .oAuthLoginButtons {
    display: inline-flex;
    gap: 10px;
    margin-top: 10px;
  }
  #loginButton {
    font-size: 25px;
    margin-bottom: 10px;
  }
  #register a {
    text-decoration: none;
    color: #007bff;
  }
  #google-icon {
    width: 30px;
  }
</style>
