<script lang="ts">
  import { goto } from "$app/navigation"; //imports goto for redirecting
  import { onMount } from "svelte"; //imports onMount
  import NotLoggedIn from "../components/notLoggedIn.svelte"; //imports NotLoggedIn component
  import "./index.css"; //imports index.css
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; //imports toasts

  let name = "User"; //declares name variable with default value of "User"
  let member = "false"; //declares member variable with default value of "false"
  let notLoggedIn = false; //declares notLoggedIn variable with default value of false
  let userEmail = ""; //declares userEmail variable with default value of ""
  //runs when the page is loaded
  onMount(() => {
    //checks if user is logged in by is Display Name exists in sessionStorage
    if (sessionStorage.getItem("Display Name")) {
      //@ts-ignore
      name = sessionStorage.getItem("Display Name"); //sets name variable to the display name from sessionstorage
      member = String(sessionStorage.getItem("Member")); //sets member variable to the member status from sessionstorage
    } else {
      //if display name does not exist in sessionStorage
      //@ts-ignore
      name = sessionStorage.getItem("Email"); //sets name variable to the email from sessionstorage
      member = String(sessionStorage.getItem("Member")); //sets member variable to the member status from sessionstorage
    }
    //checks if name is null
    if (name == null) {
      notLoggedIn = true; //sets notLoggedIn to true
    }
    //@ts-ignore
    userEmail = sessionStorage.getItem("Email"); //sets userEmail to the email from sessionstorage
  });
  //function for redirecting to gradeApp
  async function gradeAi() {
    //checks if member is true
    if (member == "true") {
      goto("/grade-app.ai"); //redirects to grade-app.ai
    } else {
      //if member is active
      alert(
        "You have an account but your account is inactive. Contact gradeappbyapp@gmail.com to reactivate your account"
      ); //shows error if member is not active
    }
  }
</script>

<svelte:head>
  <title>Grade App - Dashboard</title>
</svelte:head>

{#if !notLoggedIn}
  <h1>Hello There {name}, <br />welcome To Your Dashboard!!</h1>
  <h2>So what would you like to do today?</h2>
  <div class="buttons">
    <span class="buttonsContainer">
      <h4>Use our Grade App AI:</h4>
      <a class="btn grade-app" href="/" on:click|preventDefault={gradeAi}>
        <h6>Grade_AI</h6>
      </a>
    </span><br />
    <span class="buttonsContainer">
      <h4 id="trial-text">Try our Grade App AI for free:</h4>
      <a class="btn try-it" href="/free-trial"><h6>Trial</h6></a>
    </span><br />
    <span class="buttonsContainer">
      <h4 id="register-text">Register for a premium account:</h4>
      <a class="btn register" href="/premium-register"><h6>Register</h6></a>
    </span>
  </div>
{/if}
{#if notLoggedIn}<NotLoggedIn />{/if}

<style>
  h1 {
    margin-top: 10px;
    font-weight: bold;
  }
  h2 {
    margin-top: 15px;
  }
  h4 {
    margin-top: 5px;
  }
  a {
    color: rgb(255, 255, 255);
    text-decoration: underline;
  }
  a:hover {
    color: rgb(204, 204, 204);
  }
  .buttons {
    margin-top: 10px;
  }
  .try-it,
  .grade-app,
  .register {
    font-size: 15px;
  }
  .buttonsContainer {
    display: inline-flex;
  }
  @media (max-width: 1000px) {
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 25px;
    }
    h4 {
      font-size: 20px;
    }
    h6 {
      margin-top: -2px;
      font-size: 15px;
    }
  }
  @media (max-width: 850px) {
    h1 {
      font-size: 28px;
    }
    h6 {
      margin-top: -3px;
    }
  }
  @media (max-width: 700px) {
    h1 {
      font-size: 25px;
    }
    h2 {
      font-size: 24px;
    }
    h6 {
      margin-top: -3px;
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 23px;
    }
    h2 {
      font-size: 22px;
    }
  }
  @media (max-width: 375px) {
    h1,
    h2 {
      font-size: 20px;
    }
    h4 {
      font-size: 19px;
    }
    h6 {
      font-size: 14px;
    }
  }
</style>
