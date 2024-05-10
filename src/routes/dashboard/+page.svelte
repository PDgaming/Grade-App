<script>
  import "../index.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  
  let name = "Your Name";

  function freeTrial() {
    goto("/free-trial");
  }
  function premiumLogin() {
    goto("/premium-login");
  }
  function books() {
    goto("/book-pdf");
  }
  onMount(() => {
    name = sessionStorage.getItem("Display Name");
    const email = sessionStorage.getItem("Email");
    console.log(name, email)
  })
</script>

<svelte:head>
  <title>Grade App - Dashboard</title>
</svelte:head>
<h1>Hello There {name}, welcome To Your Dashboard!</h1>
<h2>So what would you like to do today?</h2>
<div class="buttons">
  <span class="buttonsContainer" style="margin-top: 15px;">
    <h4>Try our Grade App AI:</h4>
    <button
    type="button"
    class="btn btn-primary grade-app"
    on:click={premiumLogin}
    href="/premium-login"
    style="width: 140px;">Grade App</button
    >
  </span><br>
  <span class="buttonsContainer">
    <h4>Access any NCERT books for free:</h4>
    <button
    type="button"
    class="btn btn-primary books"
    on:click={books}
    style="width: 140px;"
    href="/book-pdf">Books</button
    >
  </span><br>
  <span class="buttonsContainer">
    <h4>Try our Grade App AI for free:</h4>
    <button
    type="button"
    class="btn btn-primary try-it"
    on:click={freeTrial}
    style="width: 160px;">Try It for free</button
    >
  </span>
</div>

<style>
  h1 {
    margin-top: 50px;
    font-weight: bold;
  }
  h1, h2, h4 {
    color: white;
  }
  .try-it,
  .grade-app,
  .books {
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
