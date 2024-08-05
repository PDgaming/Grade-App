<script>
  import Navbar from "./components/navbar.svelte";
  import "./index.css";
  import { goto } from "$app/navigation";
  import logo from "./images/logo.webp";

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
  <Navbar />
  <div class="hero-section">
    <div class="home" id="home">
      <h8 id="grade-app">Grade App</h8><br />
      <p id="homep">
        Grade App is an AI powered educational chatting application that
        leverages the power of Google's Gemini to provide answers to academic
        questions based on NCERT (National Council of Educational Research and
        Training) books.
      </p>
      <p>
        It's designed to help students and educators easily access accurate and
        reliable information related to their studies in a conversational
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
  <div class="footer" id="footer">
    <div id="footer-top">
      <div class="logo-and-title">
        <img src={logo} alt="logo" id="footer-logo" />
        <h1 id="title">Grade App</h1>
      </div>
      <div id="footer-contact">
        <a href="#contact">Contact</a><br />
        <p9>
          <a href="mailto:gradeappbyapp@gmail.com">gradeappbyapp@gmail.com</a>
        </p9>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --laptop-image-size: 550px;
    --image-size: 50px;
  }
  .hero-section {
    display: inline-flex;
    border-bottom: 1px solid #333;
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
    border-bottom: 1px solid #333;
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
  #footer {
    background-color: #19191d;
    display: flex;
    flex-direction: column;
  }
  #footer-logo {
    width: var(--image-size);
    height: var(--image-size);
    margin-top: 10px;
    border-radius: 100px;
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  #footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
