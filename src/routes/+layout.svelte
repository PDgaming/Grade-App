<script>
  import "./styles.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { registerServiceWorker } from "../registerServiceWorker";

  registerServiceWorker();
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>
