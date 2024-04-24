<script>
  import "../index.css";
  import { goto } from "$app/navigation";

  function freeTrial() {
    goto("/free-trial");
  }
  function premiumLogin() {
    goto("/premium-login");
  }
  function books() {
    goto("/book-pdf");
  }
</script>

<svelte:head>
  <title>Grade App - Dashboard</title>
</svelte:head>
<h1>Hello There, welcome To Your Dashboard!</h1>
<button
  type="button"
  class="btn btn-primary grade-app"
  on:click={premiumLogin}
  href="/premium-login"
  style="width: 140px;">Grade App</button
>
<button
  type="button"
  class="btn btn-primary try-it"
  on:click={freeTrial}
  style="width: 160px;">Try It for free</button
>
<button
  type="button"
  class="btn btn-primary books"
  on:click={books}
  style="width: 150px;"
  href="/book-pdf">Books</button
>

<style>
  h1 {
    color: white;
    margin-top: 50px;
    font-weight: bold;
  }
  .try-it,
  .grade-app,
  .books {
    font-size: 20px;
  }
</style>
