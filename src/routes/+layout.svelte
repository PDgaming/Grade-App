<script>
  import "./styles.css";
  import "./index.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { registerServiceWorker } from "../registerServiceWorker";

  registerServiceWorker();
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
</style>
