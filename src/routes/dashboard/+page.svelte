<script>
  import "../index.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  // import { initializeApp } from "firebase/app";
  // import { getFirestore, getDoc, doc } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyB_MSh9YlBu7GGN5wxZjY7kGN4bU697GO4",

    authDomain: "grade-app-16e2d.firebaseapp.com",

    projectId: "grade-app-16e2d",

    storageBucket: "grade-app-16e2d.appspot.com",

    messagingSenderId: "942886540823",

    appId: "1:942886540823:web:29caeac2695fecc3d4ee52",

    measurementId: "G-WD1M20G6LX",
  };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);

  let name = "Your Name";
  let notLoggedIn = false;

  // const userDocRef = doc(db, "Users/user-email-password");
  let email = "";
  let password = "";
  onMount(() => {
    // if (sessionStorage.getItem("Display Name")) {
    //   name = sessionStorage.getItem("Display Name");
    // } else {
    //   name = sessionStorage.getItem("Email");
    // }
    // email = sessionStorage.getItem("Email");
    // password = sessionStorage.getItem("Password");
  });
  function freeTrial() {
    goto("/free-trial");
  }
  async function gradeAi(email, password) {
    // try {
    //   const docSnap = await getDoc(userDocRef);
    //   if (docSnap.exists()) {
    //     const docData = docSnap.data();
    //     // Access specific fields using docData object (e.g., docData.name, docData.age)
    //     if (password == null) {
    //       if (Object.keys(docData).includes(email)) {
    //         goto("/grade-app.ai");
    //       } else {
    //         alert(
    //           "You do not have a premium account. Register a premium account by contacting gradeappbyapp@gmail.com"
    //         );
    //       }
    //     } else {
    //       if (
    //         Object.keys(docData).includes(email) &&
    //         Object.values(docData).includes(password)
    //       ) {
    //         goto("/grade-app.ai");
    //       } else {
    //         alert(
    //           "You do not have a premium account. Register a premium account by contacting gradeappbyapp@gmail.com"
    //         );
    //       }
    //     }
    //   } else {
    //     alert("No document found with the provided reference.");
    //     // Handle the case where the document doesn't exist
    //   }
    // } catch (error) {
    //   alert("Error fetching document:", error);
    //   // Handle errors
    // }
  }
  function notes() {
    goto("/notes");
  }
  function register() {
    goto("/premium-register");
  }
</script>

<svelte:head>
  <title>Grade App - Dashboard</title>
</svelte:head>
{#if !notLoggedIn}
  <h1>Hello There {name}, welcome To Your Dashboard!</h1>
  <h2>So what would you like to do today?</h2>
  <div class="buttons">
    <span class="buttonsContainer" style="margin-top: 15px;">
      <h4>Use our Grade App AI:</h4>
      <button
        type="button"
        class="btn btn-primary grade-app"
        on:click={gradeAi(email, password)}
        href="/premium-login"
        style="width: 140px;">Grade AI</button
      >
    </span><br />
    <span class="buttonsContainer">
      <h4>Try our Grade App AI for free:</h4>
      <button
        type="button"
        class="btn btn-primary try-it"
        on:click={freeTrial}
        style="width: 160px;">Try It for free</button
      >
    </span><br />
    <span class="buttonsContainer">
      <h4>Register for a premium account to acess Grade AI:</h4>
      <button
        type="button"
        class="btn btn-primary try-it"
        on:click={register}
        style="width: 160px;">Register</button
      >
    </span>
  </div>
{/if}
{#if notLoggedIn}
  <div class="not-logged-in">
    <h2>
      You have not logged in!! Please go to <a href="/login">Login</a> to login
    </h2>
  </div>
{/if}

<style>
  h1 {
    margin-top: 50px;
    font-weight: bold;
  }
  h1,
  h2,
  h4 {
    color: white;
  }
  .try-it,
  .grade-app {
    font-size: 20px;
  }
  button {
    width: 40vw;
    margin-top: -10px;
    margin-left: 1vw;
  }
  .buttons {
    margin-top: 20px;
  }
  .buttonsContainer {
    display: inline-flex;
    margin-bottom: 20px;
  }
</style>
