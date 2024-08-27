<script lang="ts">
  import Navbar from "./components/navbar.svelte"; //imports navbar component from components
  import "./index.css"; //imports index.css file
  import { goto } from "$app/navigation"; //imports goto for redirecting
  import logo from "./images/logo.webp"; //imports logo image from images
  import { onMount } from "svelte";
  import { UsersDatabase } from "./supabaseClient";

  onMount(() => {
    checkSession();
  });
  //function to redirect to login page
  function loginPage() {
    goto("/login"); //redirects to login page using goto
  }

  //function to redirect to register page
  function registerPage() {
    goto("/register"); //redirects to register page using goto
  }

  async function checkSession(): Promise<boolean> {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("sessionId=")) {
        const parts = cookie.split("=");

        if (parts.length === 2) {
          const sessionId = parts[1];

          const { data: user, error } = await UsersDatabase.from("Users")
            .select()
            .eq("session_id", sessionId);

          if (error) {
            console.log(error);
            return false;
          }
          if (user && user.length > 0) {
            sessionStorage.setItem("Email", user[0].Email);
            sessionStorage.setItem("Member", user[0].GradeAppMember);

            return true;
          }
        }
      }
    }
    return false;
  }

  onMount(async () => {
    const ifLoggedIn = await checkSession();
    if (ifLoggedIn) {
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
    --image-size: 70px;
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
  #footer-logo {
    width: var(--image-size);
    border-radius: 100px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  @media (max-width: 990px) {
    h7,
    p {
      margin-left: 9px;
    }
  }
</style>
