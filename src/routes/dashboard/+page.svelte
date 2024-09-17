<script lang="ts">
  import { goto } from "$app/navigation"; //imports goto for redirecting
  import { onMount } from "svelte"; //imports onMount
  import NotLoggedIn from "../components/notLoggedIn.svelte"; //imports NotLoggedIn component
  import "./index.css"; //imports index.css
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts"; //imports toasts, toastContainer and flatToast to show toasts

  let name = "User"; //declares name variable with default value of "User"
  let membership = "free"; //declares member variable with default value of "false"
  let notLoggedIn = false; //declares notLoggedIn variable with default value of false
  let userEmail = ""; //declares userEmail variable with default value of ""
  //runs when the page is loaded
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
  onMount(() => {
    //checks if user is logged in by is Display Name exists in sessionStorage
    if (sessionStorage.getItem("Display Name")) {
      //@ts-ignore
      name = sessionStorage.getItem("Display Name"); //sets name variable to the display name from sessionstorage
      membership = String(sessionStorage.getItem("Membership")); //sets member variable to the member status from sessionstorage
    } else {
      //if display name does not exist in sessionStorage
      //@ts-ignore
      name = sessionStorage.getItem("Email"); //sets name variable to the email from sessionstorage
      membership = String(sessionStorage.getItem("Membership")); //sets member variable to the member status from sessionstorage
    }
    //checks if name is null
    if (name == null) {
      notLoggedIn = true; //sets notLoggedIn to true
    }
    //@ts-ignore
    userEmail = sessionStorage.getItem("Email"); //sets userEmail to the email from sessionstorage
  });
  //function for redirecting to gradeApp
  async function gradeAiSocratic() {
    //checks if member is true
    // if (membership == "tier-2") {
    goto("/grade-app.ai/socratic-model"); //redirects to grade-app.ai
    // } else {
    //   showToast(
    //     "Error",
    //     "Sorry you do not own a tier-2 account needed to access this model.",
    //     3500,
    //     "error"
    //   );
    // }
  }
  async function gradeAiBase() {
    //checks if member is true
    // if (membership == "tier-1" || membership == "tier-2") {
    goto("/grade-app.ai/base-model"); //redirects to grade-app.ai
    // } else {
    //   showToast(
    //     "Error",
    //     "Sorry you do not own a tier-1 account needed to access this model.",
    //     3500,
    //     "error"
    //   );
    // }
  }
</script>

<svelte:head>
  <title>Grade App - Dashboard</title>
</svelte:head>

<ToastContainer let:data>
  <FlatToast {data} />
</ToastContainer>

{#if !notLoggedIn}
  <h1 class="text-3xl">
    Hello There {name}, <br />welcome To Your Dashboard!!
  </h1>
  <h2 class="text-xl">So what would you like to do today?</h2>

  <div class="card-container">
    <div class="card">
      <div class="card-content">
        <h3>Grade AI</h3>
        <p>Use Our Grade AI(Socractic)</p>
        <a
          href="/dashboard"
          on:click|preventDefault={gradeAiSocratic}
          class="btn">Use It</a
        >
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <h3>Grade AI</h3>
        <p>Use Our Grade AI(base model)</p>
        <a href="/dashboard" on:click|preventDefault={gradeAiBase} class="btn"
          >Use It</a
        >
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <h3>Premium</h3>
        <p>Register for a Premium Account</p>
        <a href="/premium-register" class="btn">Register</a>
      </div>
    </div>
  </div>
{/if}
{#if notLoggedIn}<NotLoggedIn />{/if}

<style>
  .card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    width: 325px;
    background: #252527;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    margin: 20px;
    text-align: center;
  }
  .card-content h3 {
    font-size: 28px;
    margin-bottom: 8px;
  }
  .card-content p {
    color: #9a9a9a;
    font-size: 15px;
    line-height: 1.3;
  }
  .card-content .btn {
    background-color: #333;
    text-decoration: none;
    margin-top: 16px;
    margin-bottom: 10px;
  }
  h1 {
    margin-top: 10px;
    font-weight: bold;
  }
  h2 {
    margin-top: 15px;
  }
  a {
    color: rgb(255, 255, 255);
    text-decoration: underline;
  }
  a:hover {
    color: rgb(204, 204, 204);
  }
</style>
