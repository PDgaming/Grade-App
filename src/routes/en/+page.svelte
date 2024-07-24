<script>
  import Navbar from "./components/navbar.svelte";
  import "../index.css";
  import { goto } from "$app/navigation";

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
    <h7 id="featuresh">Features</h7>
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
    <h7 id="usageh">Usage</h7>
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
    <h7 id="acknowledgementh">Acknowledgments</h7>

    <p>- Thanks to Google for providing the API for Gemini.</p>
    <p>
      - The Grade App team for their hard work and dedication in developing this
      educational tool.
    </p>
    <p>- And AAB for designing the logo and helping in the design process.</p>
  </div>
  <div class="contact" id="contact">
    <h7 id="contacth">Contact</h7>
    <p>
      If you have any questions or feedback, please feel free to reach out at
      <a href="mailto:gradeappbyapp@gmail.com">gradeappbyapp@gmail.com</a>
    </p>
  </div>
  <h2 id="happy-learning-with-grade-app">
    Happy learning with Grade App! 📚🤖🚀
  </h2>
  <!-- <div class="footer" id="footer">
    <div id="footer-top">
      <div class="logo-and-title">
        <img src={logo} alt="logo" id="footer-logo" />
        <h1 id="title">Grade App</h1>
      </div>
      <div id="footer-content">
        <div id="footer-acknowledgement">
          <a href="#acknowledgments">Acknowledgments</a><br />
          <a href="https://www.google.com">- Google</a><br />
          <a href="https://github.com/PDgaming/Grade-App/graphs/contributors">
            - The Grade App team
          </a><br />
          <a
            href="https://www.instagram.com/itz__atif__564?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          >
            - AAB
          </a><br />
        </div>
        <div id="footer-contact">
          <a href="#contact">Contact</a><br />
          <p9>
            <a href="mailto:gradeappbyapp@gmail.com">gradeappbyapp@gmail.com</a>
          </p9>
        </div>
      </div>
      <div id="footer-bottom">Copyright © 2024 Grade App</div>
    </div>
  </div> -->
</div>

<style>
  :root {
    --laptop-image-size: 550px;
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
    width: 900px;
    margin-top: 40px;
  }
  .buttons button {
    width: 120px;
    height: 40px;
  }
  .buttons .loginButton {
    margin-right: 100px;
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
    margin-left: 45%;
    margin-bottom: 55px;
  }
  #usageh {
    margin-left: 47%;
  }
  #acknowledgementh {
    margin-left: 38%;
  }
  #contacth {
    margin-left: 43%;
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
  /* #footer {
    background-color: #19191d;
    height: 200px;
    color: white;
    display: flex;
    flex-direction: column;
  }
  #footer-bottom {
    background-color: #15161b;
    text-align: center;
    margin-top: auto;
  }
  #footer-logo {
    width: 80px;
    margin-top: 10px;
    margin-left: 63px;
  }
  #footer-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #footer-acknowledgement a,
  #footer-contact a {
    text-decoration: none;
    color: white;
  }
  #footer-acknowledgement {
    margin-left: 100px;
  }
  #title {
    margin-left: 10px;
  } */
</style>
