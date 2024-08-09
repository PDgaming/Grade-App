<script lang="ts">
  import "./styles.css"; //imports styles.css file
  import "./index.css"; //imports index.css file
  import { registerServiceWorker } from "../registerServiceWorker"; //imports registerService Worker function from registerServiceWorker to register the service worker
  import { afterNavigate } from "$app/navigation"; //imports afterNavigate
  import "../app.css"; //imports app.css file for tailwindcss support

  registerServiceWorker(); //registers the service worker
  let statusCode: number; //declares a variable status code for the website status code
  //function to get status
  async function getStatus() {
    //tries to run the following code
    try {
      const myResponse = await fetch(window.location.href); //gets website url
      statusCode = myResponse.status; //sets the status variable as the status of the website
      //checks if the status is not 200 or the success code
      if (statusCode !== 200) {
        window.location.href = "https://http.dog/" + statusCode + ".jpg"; //redirects to http dog to show the error with a cute dog
      }
    } catch (err) {
      console.log("There was an error:", err); //shows error if any error was caught
    }
  }
  //runs after the every page has loaded
  afterNavigate(() => {
    getStatus(); //runs getStatus to check the response code for each page
  });
</script>

<div class="app">
  <main>
    <slot></slot>
  </main>
</div>

<style>
  :global(body) {
    background: #131314;
    background-attachment: fixed;
    color: white;
  }
</style>
