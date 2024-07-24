<script>
  import "./styles.css";
  import "./index.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { registerServiceWorker } from "../registerServiceWorker";
  import { afterNavigate } from "$app/navigation";
  import posthog from "posthog-js";
  import { browser } from "$app/environment";

  registerServiceWorker();
  // let statusCode;
  // async function getStatus() {
  //   try {
  //     const myResponse = await fetch(window.location.href);
  //     statusCode = myResponse.status;
  //     if (statusCode !== 200) {
  //       window.location.href = "https://http.dog/" + statusCode + ".jpg";
  //     }
  //   } catch (err) {
  //     console.log("There was an error:", err);
  //   }
  // }
  // afterNavigate(() => {
  //   getStatus();
  // });

  // export const load = async () => {
  //   if (browser) {
  //     posthog.init("phc_i3hWQZpgjcNd9f1WfNQEj5QfjzbZYS4ZegNui55fvLE", {
  //       api_host: "https://us.i.posthog.com",
  //       person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  //     });
  //   }
  //   return;
  // };
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
    color: white;
  }
</style>
