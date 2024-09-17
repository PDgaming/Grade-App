<script lang="ts">
  import Navbar from "./components/navbar.svelte"; //imports navbar component from components
  import "./index.css"; //imports index.css file
  import Footer from "./components/footer.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const sessionCookie = decodeURIComponent(document.cookie);
    if (sessionCookie.includes("Session_id")) {
      goto("/dashboard");
    }
  });
</script>

<svelte:head>
  <title>Grade App</title>
</svelte:head>

<div class="main">
  <Navbar />
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div id="home">
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
          <a class="btn btn-primary loginButton" href="/login">Login</a>
          <a class="btn btn-primary registerButton" href="/register">Register</a
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
    <div class="card-container">
      <div class="card">
        <div class="card-content">
          <h3>Chat with an AI Assistant</h3>
          <p>
            Have real-time conversations with the a powerfull AI assistant that
            is trained to not only answer your questions but also make you
            understand the concepts.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <h3>Get Accurate Answers</h3>
          <p>
            Receive accurate and relevant answers to your questions, ensuring
            you have the right information.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <h3>Educational Resource</h3>
          <p>
            Use Grade App as a supplementary resource to aid your studies,
            providing clarification and support on a wide range of academic
            topics.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <h3>User-Friendly Interface</h3>
          <p>
            The user interface is designed to be intuitive and easy to use,
            making it accessible to students of all ages.
          </p>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="usage" id="usage">
    <center>
      <h7 id="usageh">Unlock the Power of AI for Your Studies</h7>
    </center>

    <b><h1 class="text-2xl ml-1">Already a Grade App user?</h1> </b>
    <p>Log in now and continue your learning journey! (Link to login)</p>

    <b>
      <h1 class="text-2xl ml-1">New to Grade App?</h1>
    </b>
    <p>Register for free today!</p>
    <a class="btn btn-primary mt-2 ml-5" href="/register">Register</a>
  </div>
  <hr />
  <div class="acknowledgments" id="acknowledgments">
    <center>
      <h7 id="acknowledgementh">With Graditude</h7>
    </center>
    <h1 class="text-3xl ml-1">
      Grade App wouldn't be possible without the support of some amazing people
      and technologies:
    </h1>
    <ul>
      <li>
        <p>
          We extend our deepest gratitude to Google for providing the
          groundbreaking Gemini API, which forms the heart of Grade App's
          intelligence.
        </p>
      </li>
      <li>
        <p>
          A massive thank you to our dedicated Grade App team! Their passion,
          creativity, and countless hours of work have brought this vision to
          life.
        </p>
      </li>
      <li>
        <p>
          And a special shout-out to AAB for their incredible design talent,
          including the creation of our beautiful logo.
        </p>
      </li>
    </ul>
  </div>
  <hr />
  <div class="contact" id="contact">
    <center>
      <h7 id="contacth">Contact</h7>
    </center>
    <p>
      Have questions, feedback, or just want to say hi? We'd love to hear from
      you!
    </p>
    <a href="mailto:gradeappbyapp@gmail.com" class="btn btn-primary mt-2 ml-5"
      >Email Us</a
    >
  </div>
  <hr />
  <Footer />
</div>

<style>
  :root {
    --laptop-image-size: 550px;
  }
  .card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    width: 325px;
    background: #252527;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    margin: 20px;
    text-align: center;
  }
  .card-content h3 {
    font-size: 25px;
    margin-bottom: 8px;
  }
  .card-content p {
    color: #9f9f9f;
    font-size: 18px;
    line-height: 1.3;
    padding-bottom: 20px;
  }
  .buttons {
    height: 60px;
    margin-top: 40px;
    margin-bottom: 50px;
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
  @media (max-width: 990px) {
    h7,
    p {
      margin-left: 9px;
    }
  }
</style>
