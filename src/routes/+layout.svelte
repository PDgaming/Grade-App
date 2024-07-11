<script>
  import "./styles.css";
  import "./index.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { registerServiceWorker } from "../registerServiceWorker";
  import { afterNavigate } from "$app/navigation";

  registerServiceWorker();

  let statusCode;
  async function getStatus() {
    try {
      const myResponse = await fetch(window.location.href);
      statusCode = myResponse.status;
      if (statusCode !== 200) {
        window.location.href = "https://http.dog/" + statusCode + ".jpg";
      }
    } catch (err) {
      console.log("There was an error:", err);
    }
  }
  afterNavigate(() => {
    getStatus();
  });
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
    background: #131314;
    background-attachment: fixed;
  }
  :global(h1, h2, h3, h4, h5, h6, p) {
    color: white;
  }
</style>
