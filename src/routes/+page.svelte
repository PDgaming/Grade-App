<script>
  import Navbar from "./components/navbar.svelte"; //imports navbar component from components
  import "./index.css"; //imports index.css file
  import { goto } from "$app/navigation"; //imports goto for redirecting
  import logo from "./images/logo.webp"; //imports logo image from images

  //function to redirect to login page
  function loginPage() {
    goto("/login"); //redirects to login page using goto
  }

  //function to redirect to register page
  function registerPage() {
    goto("/register"); //redirects to register page using goto
  }
</script>

<svelte:head>
  <title>Grade App</title>
</svelte:head>

<div class="main">
  <Navbar />

  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div>
        <h8 id="grade-app" class="text-5xl font-bold">Grade App</h8>
        <p class="py-6" id="homep">
          Grade App is an AI powered educational chatting application that
          leverages the power of Google's Gemini to provide answers to academic
          questions based on NCERT (National Council of Educational Research and
          Training) books.
        </p>
        <p>
          It's designed to help students and educators easily access accurate
          and reliable information related to their studies in a conversational
          format.
        </p>
        <div class="buttons">
          <button
            type="button"
            class="btn btn-primary loginButton"
            on:click={loginPage}>Login</button
          >
          <button
            type="button"
            class="btn btn-primary registerButton"
            on:click={registerPage}>Register</button
          >
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="features" id="features">
    <center>
      <h7 id="featuresh">Features</h7>
    </center>
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
  <hr />
  <div class="usage" id="usage">
    <center>
      <h7 id="usageh">Usage</h7>
    </center>
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
      Contact our team at
      <a href="mailto:gradeappbyapp@gmail.com">gradeappbyapp@gmail.com</a> for more
      information on how you can create an account.
    </p>

    <p>
      Enjoy the benefits of instant, accurate, and reliable academic assistance
      by our AI ChatBot by typing in your questions
    </p>
  </div>
  <hr />
  <div class="acknowledgments" id="acknowledgments">
    <center>
      <h7 id="acknowledgementh">Acknowledgments</h7>
    </center>

    <p>- Thanks to Google for providing the API for Gemini.</p>
    <p>
      - The Grade App team for their hard work and dedication in developing this
      educational tool.
    </p>
    <p>- And AAB for designing the logo and helping in the design process.</p>
  </div>
  <hr />
  <div class="contact" id="contact">
    <center>
      <h7 id="contacth">Contact</h7>
    </center>
    <p>
      If you have any questions or feedback, please feel free to reach out at
      <a href="mailto:gradeappbyapp@gmail.com">gradeappbyapp@gmail.com</a>
    </p>
  </div>
  <h2 id="happy-learning-with-grade-app">
    Happy learning with Grade App! 📚🤖🚀
  </h2>
  <hr />
  <footer class="footer bg-base-200 text-base-content p-10">
    <aside>
      <img src={logo} alt="logo" id="footer-logo" />
      <p>
        PD Enterprise
        <br />
        Providing reliable tech tools for students since 2024
      </p>
    </aside>
    <nav>
      <h6 class="footer-title">Services</h6>
      <a href="https://grade-app.pages.dev" class="link link-hover">Grade App</a
      >
      <a href="https://cnotes.pages.dev" class="link link-hover">Cnotes</a>
    </nav>
    <nav>
      <h6 class="footer-title">Company</h6>
      <a href="https://pd-enterprise.pages.dev/about-us" class="link link-hover"
        >About us</a
      >
      <a href="https://pd-enterprise.pages.dev/contact" class="link link-hover"
        >Contact</a
      >
    </nav>
    <nav>
      <h6 class="footer-title">Social</h6>
      <div class="grid grid-flow-col gap-4">
        <a href="https://x.com/grade_app">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            ></path>
          </svg>
        </a>
        <a href="https://www.youtube.com/channel/UC7Fbtm9fpj1pMK-5iiNfz5w">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            ></path>
          </svg>
        </a>
      </div>
    </nav>
  </footer>
</div>

<style>
  :root {
    --laptop-image-size: 550px;
    --image-size: 90px;
  }
  .hero-section {
    display: inline-flex;
    margin-top: 30px;
    width: 98vw;
  }
  .hero-section .home {
    width: 50vw;
    margin-top: 80px;
    margin-left: 30px;
    margin-bottom: 140px;
  }
  .buttons {
    height: 60px;
    margin-top: 40px;
  }
  .buttons button {
    width: 120px;
    height: 40px;
  }
  .buttons .loginButton {
    margin-right: 100px;
    margin-bottom: 10px;
  }
  h7 {
    display: block;
  }
  h7,
  p {
    margin-left: 10px;
  }
  .features,
  .usage,
  .acknowledgments,
  .contact {
    padding-bottom: 45px;
  }
  .contact {
    border: none;
    padding-bottom: 0px;
    margin-bottom: 50px;
  }
  #homep {
    font-size: 23px;
    font-weight: 600;
  }
  #featuresh,
  #usageh,
  #acknowledgementh,
  #contacth {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  p {
    font-size: 22px;
  }
  h7 {
    font-size: 40px;
    background: linear-gradient(
      90deg,
      rgba(72, 148, 229) 35%,
      rgba(138, 121, 203) 50%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h8 {
    font-size: 90px;
    background: linear-gradient(
      90deg,
      rgba(72, 148, 229) 0%,
      rgba(138, 121, 203) 70%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  #happy-learning-with-grade-app {
    color: #ef926e;
    margin-bottom: 30px;
  }
  #footer-logo {
    width: var(--image-size);
    border-radius: 100px;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    .hero-section .home {
      width: 95vw;
    }
  }
  @media (max-width: 990px) {
    h7,
    p {
      margin-left: 9px;
    }
  }
  @media (max-width: 570px) {
    #home {
      margin-top: 0;
      margin-left: 10px;
    }
    .hero-section {
      margin-top: 0;
    }
  }
</style>
