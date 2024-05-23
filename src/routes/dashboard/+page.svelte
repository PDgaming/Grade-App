<script>
  import "../index.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { supabase } from "../supabaseClient";

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
  function freeTrial() {
    goto("/free-trial");
  }
  async function gradeAi(email) {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("Email") // Select both email and member columns
        .eq("Email", email)
        .single()
        .select("Member");
      if (error) {
        if (error.details == "The result contains 0 rows") {
          alert(
            "Your email is not found in the database! If you do not have a premium account, please go to /premium-register to use Grade-AI"
          );
          goto("/premium-register");
        } else {
          alert("There was an error!!");
        }
        // Handle the error appropriately
        return; // Or throw an exception if needed
      } else {
        if (data) {
          const memberOrNot = data.Member;
          if (memberOrNot) {
            goto("/grade-app.ai");
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
        on:click={gradeAi(userEmail)}
        href="/premium-login"
        style="width: 140px;">Grade AI</button
      >
    </span><br />
    <span class="buttonsContainer">
      <h4 id="trial-text">Try our Grade App AI for free:</h4>
      <button
        type="button"
        class="btn btn-primary try-it"
        on:click={freeTrial}
        style="width: 160px;">Try It for free</button
      >
    </span><br />
    <span class="buttonsContainer">
      <h4 id="register-text">
        Register for a premium account to acess Grade AI:
      </h4>
      <button
        type="button"
        class="btn btn-primary register"
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

  /* Responsive for mobiles */
  @media screen and (max-width: 400px) {
    .try-it {
      height: 50px;
      margin-left: 15px;
    }
    .btn {
      font-size: 18px;
    }
    .register {
      height: 50px;
      margin-left: 15px;
    }
    #trial-text {
      width: 200px;
    }
    #register-text {
      width: 200px;
    }
  }
</style>
