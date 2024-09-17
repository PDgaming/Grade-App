<script lang="ts">
  import "./styles.css"; //imports styles.css file
  import { registerServiceWorker } from "../registerServiceWorker"; //imports registerService Worker function from registerServiceWorker to register the service worker
  import "../app.css"; //imports app.css file for tailwindcss support
  import { onMount } from "svelte";

  registerServiceWorker(); //registers the service worker
</script>

<div class="app">
  <center>
    <div class="banner text-red-600 font-bold">
      We might be shutting down soon!!
    </div>
  </center>
  <main>
    <slot></slot>
  </main>
</div>

<style>
</style>
