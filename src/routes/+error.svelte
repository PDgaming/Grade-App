<script lang="ts">
  import { page } from "$app/stores"; //imports page store
  import { onMount } from "svelte";

  let httpDogURLStatusCode: string;
  async function getStatus() {
    try {
      const currentURL = $page.url.href;
      const myResponse = await fetch(currentURL); //gets website url
      const statusCode: number = myResponse.status;
      //checks if the status is not 200 or the success code
      if (statusCode !== 200) {
        httpDogURLStatusCode = `${statusCode}`;
      }
    } catch (err) {
      console.log("There was an error:", err); //shows error if any error was caught
    }
  }
  onMount(() => {
    getStatus();
  });
  $: imgSrc = `https://http.dog/${httpDogURLStatusCode}.jpg`;
</script>

<center>
  <iframe src={imgSrc} title="Error"></iframe>
</center>
<center>
  <a href="/" class="btn text-3xl mt-5">Go To Home</a>
</center>

<style>
  iframe {
    width: 41.16rem;
    height: 36rem;
  }
</style>
