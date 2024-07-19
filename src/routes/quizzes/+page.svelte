<script>
  import "../index.css";
  import { onMount } from "svelte";
  import NotLoggedIn from "../components/notLoggedIn.svelte";

  let name = "User";
  let notLoggedIn = false;

  let userEmail = "";
  onMount(() => {
    if (sessionStorage.getItem("Display Name")) {
      name = sessionStorage.getItem("Display Name");
    } else {
      name = sessionStorage.getItem("Email");
    }
    if (name == null) {
      notLoggedIn = true;
    }
    userEmail = sessionStorage.getItem("Email");
  });
</script>

<svelte:head>
  <title>Grade App - Quizes</title>
</svelte:head>
{#if !notLoggedIn}
  <h1>Hello There {name}, <br />welcome To Your Quizes Dashboard!!</h1>
  <h2>So what would you like to do today?</h2>
  <div class="buttons">
    <span class="buttonsContainer">
      <h4>Take a quiz:</h4>
      <a class="btn grade-app" href="/quizzes/quiz/"
        ><h6>Quiz (Coming Soon!!)</h6></a
      >
    </span><br />
    <span class="buttonsContainer">
      <h4>View Leaderboard:</h4>
      <a class="btn grade-app" href="/quizzes/leaderboard/"
        ><h6>Leaderboard</h6></a
      >
    </span><br />
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
  .grade-app {
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
