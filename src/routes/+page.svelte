<script>
  import Navbar from "./components/navbar.svelte";
  import "./index.css";
  import { goto } from "$app/navigation";
  import laptop from "./images/laptop.webp";

  // Takes to login page
  function loginPage() {
    goto("/login");
  }

  // Takes to register page
  function registerPage() {
    goto("/register");
  }
</script>

<svelte:head>
  <title>Grade App</title>
</svelte:head>

<div class="main">
  <h1 class="brandName">Grade App</h1>
  <Navbar />
  <img class="laptopImg" src={laptop} alt="laptop.img" />
  <div class="home" id="home">
    <h8>Grade App</h8><br />
    <p style="font-size: 22px;font-weight:600;">
      Grade App is an educational chatting application that leverages the power
      of Google's AI Gemini to provide answers to academic questions based on NCERT
      (National Council of Educational Research and Training) books.
    </p>
    <p>
      It's designed to help students and educators easily access accurate and
      reliable information related to their studies in a conversational format.
    </p>
  </div>
  <button type="button" class="btn btn-primary loginButton" on:click={loginPage}
    >Login</button
  >
  <button
    type="button"
    class="btn btn-primary signUpButton"
    on:click={registerPage}>Register</button
  >
  <div class="features" id="features">
    <h7>Features</h7>
    <p>
      - Chat with an AI Assistant: Have real-time conversations with the
      AI-powered assistant that is trained on NCERT books.
    </p>

    <p>
      - Get Accurate Answers: Receive accurate and relevant answers to your
      academic questions, ensuring you have the right information at your
      fingertips.
    </p>

    <p>
      - Educational Resource: Use Grade App as a supplementary resource to aid
      your studies, providing clarification and support on a wide range of
      academic topics.
    </p>

    <p>
      - User-Friendly Interface: The user interface is designed to be intuitive
      and easy to use, making it accessible to students of all ages.
    </p>
  </div>
  <div id="usage">
    <h7>Usage</h7>
    <p>
      <b>If you already have an account:</b> <br />
      1. Click on "Login" button above.<br />
      2. Enter your email and password and click "Login".<br />
    </p>
    <p>
      <b>If you don't have an account:</b><br />
      1. Click on the "Register" Button above.<br />
      2. Enter your email and password and click "Register".<br />
      Or<br />
      Contact our team at <u>gradeappbyapp@gmail.com</u> for more information on
      how you can create an account.
    </p>

    <p>
      Enjoy the benefits of instant, accurate, and reliable academic assistance
      by our AI ChatBot by typing in your questions
    </p>
  </div>
  <div id="acknowledgments">
    <h7>Acknowledgments</h7>

    <p>- Thanks to Google for providing the API for Gemini.</p>
    <p>
      - The Grade App team(including PD) for their hard work and dedication in
      developing this educational tool.
    </p>
  </div>
  <div id="contact">
    <h7>Contact</h7>

    <p>
      If you have any questions or feedback, please feel free to reach out at
      <u>gradeappbyapp@gmail.com</u>
    </p>
  </div>
  <h2 style="color: #f25e22;">Happy learning with Grade App! 📚🤖🚀</h2>
</div>
