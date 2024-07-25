<script lang="ts">
  //@ts-ignore
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { supabase } from "../../supabaseClient";
  import NotLoggedIn from "../components/notLoggedIn.svelte";
  import "./index.css";

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
  async function gradeAi(email: string) {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("Email, Member") // Select both email and member columns
        .eq("Email", email)
        .single();
      if (error) {
        console.log("There was an error!!");
        console.log(error);
        // Handle the error appropriately
        return; // Or throw an exception if needed
      } else {
        if (data) {
          const member = data.Member;
          if (member) {
            goto("/en/grade-app.ai");
          } else {
            alert(
              "You have an account but your account is inactive. Contact gradeappbyapp@gmail.com to reactivate your account"
            );
          }
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle unexpected errors gracefully
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
      <a
        class="btn grade-app"
        on:click={(e) => {
          e.preventDefault();
          gradeAi(userEmail);
        }}
        href="/"><h6>Grade_AI</h6></a
      >
    </span><br />
    <span class="buttonsContainer">
      <h4 id="trial-text">Try our Grade App AI for free:</h4>
      <a class="btn try-it" href="/en/free-trial"><h6>Trial</h6></a>
    </span><br />
    <span class="buttonsContainer">
      <h4 id="register-text">Try our AI powered quizes:</h4>
      <a class="btn register" href="/en/quizzes"><h6>Quiz</h6> </a>
    </span><br />
    <span class="buttonsContainer">
      <h4 id="register-text">Register for a premium account:</h4>
      <a class="btn register" href="/en/premium-register"><h6>Register</h6></a>
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
