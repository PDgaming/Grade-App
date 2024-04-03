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
  <div class="hero-section">
    <img class="laptopImg" src={laptop} alt="laptop.img" loading="lazy" />
    <div class="home" id="home">
      <h8>Grade App</h8><br />
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
    </div>
    <button
      type="button"
      class="btn btn-primary loginButton"
      on:click={loginPage}>Login</button
    >
    <button
      type="button"
      class="btn btn-primary signUpButton"
      on:click={registerPage}>Register</button
    >
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
      Contact our team at <u>gradeappbyapp@gmail.com</u> for more information on
      how you can create an account.
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
      - The Grade App team(including PD) for their hard work and dedication in
      developing this educational tool.
    </p>
  </div>
  <div class="contact" id="contact">
    <h7 id="contacth">Contact</h7>

    <p>
      If you have any questions or feedback, please feel free to reach out at
      <u>gradeappbyapp@gmail.com</u>
    </p>
  </div>
  <h2 id="happy-learning-with-grade-app">
    Happy learning with Grade App! 📚🤖🚀
  </h2>
</div>

<style>
  .brandName {
    display: none;
  }
  h7 {
    display: block;
  }
  h7,
  p {
    margin-left: 10px;
  }
  .loginButton {
    margin-left: 3vw;
  }
  .signUpButton {
    margin-left: 10vw;
  }
  .hero-section {
    border-bottom: 1px solid #333;
  }
  .home {
    margin-top: -380px;
    width: 50%;
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
    color: white;
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
  }
  .laptopImg {
    width: 35%;
    margin-left: 790px;
    margin-top: 60px;
  }
  /* Responsive for nav */
  @media screen and (max-width: 1170px) {
    .laptopImg {
      margin-left: 740px;
    }
    .home {
      margin-top: -360px;
    }
    h8 {
      font-size: 65px;
    }
    p {
      font-size: 22px;
    }
    #homep {
      font-size: 21px;
    }
    #featuresh {
      margin-left: 42%;
    }
    #usageh {
      margin-left: 43%;
    }
    #acknowledgementh {
      margin-left: 35%;
    }
  }
  /* Responsive for nav */
  @media screen and (max-width: 1090px) {
    .laptopImg {
      margin-left: 690px;
    }
    .home {
      margin-top: -320px;
    }
    h8 {
      font-size: 60px;
    }
    p {
      font-size: 21px;
    }
    #homep {
      font-size: 20px;
    }
    #usageh {
      margin-left: 44%;
    }
    #acknowledgementh {
      margin-left: 34%;
    }
  }

  /* Responsive for nav */
  @media screen and (max-width: 1060px) {
    .laptopImg {
      margin-left: 660px;
    }
    .home {
      margin-top: -300px;
      width: 55%;
    }
    p {
      font-size: 20px;
    }
    #homep {
      font-size: 19px;
    }
    #acknowledgementh {
      margin-left: 35%;
    }
    #contacth {
      margin-left: 43%;
    }
  }

  /* Responsive for nav */
  @media screen and (max-width: 990px) {
    .brandName {
      display: block;
      background: linear-gradient(
        90deg,
        rgba(72, 148, 229) 0%,
        rgba(138, 121, 203) 30%
      );
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 50px;
      margin-left: 37%;
      margin-top: 20px;
    }
    .laptopImg {
      margin-left: 620px;
    }
    .home {
      margin-top: -310px;
      width: 60%;
    }
    p {
      font-size: 19px;
    }
    #homep {
      font-size: 18px;
    }
    #usageh {
      margin-left: 44%;
    }
    .loginButton {
      margin-left: 20px;
    }
    .signUpButton {
      margin-left: 20px;
    }
  }

  /* Responsive for tablets */
  @media screen and (max-width: 800px) {
    .laptopImg {
      display: none;
    }

    .brandName {
      margin-left: 35%;
    }

    .home {
      margin-top: 55px;
      width: auto;
    }
    p {
      font-size: 18px;
    }
    #homep {
      font-size: 17px;
    }
    #featuresh {
      margin-left: 41%;
    }
    #usageh {
      margin-left: 43%;
    }
    #acknowledgementh {
      margin-left: 30%;
    }
    #contacth {
      margin-left: 42%;
    }
  }

  /* Responsive for mobiles */
  @media screen and (max-width: 400px) {
    .home {
      margin-top: 50px;
      width: auto;
    }
    .brandName {
      margin-left: 23%;
      font-size: 45px;
    }
    h7 {
      font-size: 200%;
    }
    p {
      font-size: 18px;
    }
    #homep {
      font-size: 17px;
    }
    #featuresh {
      margin-left: 35%;
    }
    #usageh {
      margin-left: 38%;
    }
    #acknowledgementh {
      margin-left: 17%;
    }
    #contacth {
      margin-left: 35%;
    }
    h8 {
      font-size: 40px;
    }
    .btn {
      margin-bottom: 60%;
    }
    .loginButton {
      margin-left: 30px;
    }
    .signUpButton {
      margin-left: 60px;
    }
  }
</style>
