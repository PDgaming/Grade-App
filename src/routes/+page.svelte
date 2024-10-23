<script lang="ts">
  import Footer from "./components/footer.svelte";
</script>

<svelte:head>
  <title>Grade App</title>
</svelte:head>

<div class="main">
  <div class="content-wrap">
    <center>
      <h1 class="text-6xl mb-2">Looking for Grade App?</h1>
      <h1 class="text-3xl">
        We have changed our domain to
        <a class="underline" href="https://grade-ai.pages.dev">Grade AI</a>
      </h1>
    </center>
  </div>
  <Footer />
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  :global(footer) {
    margin-top: auto;
  }
</style>
