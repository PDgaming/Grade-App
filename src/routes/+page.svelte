<script lang="ts">
  import Navbar from "./components/navbar.svelte"; //imports navbar component from components
  import "./index.css"; //imports index.css file
  import Footer from "./components/footer.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { UsersDatabase } from "./supabaseClient";

  onMount(async () => {
    const sessionCookie = decodeURIComponent(document.cookie);
    if (sessionCookie.includes("Session_id")) {
      try {
        const { data, error } = await UsersDatabase.from("Users")
          .select()
          .eq("session_id", sessionCookie.split("=")[1]);
        if (data) {
          sessionStorage.setItem("Email", data[0].Email);
          sessionStorage.setItem("Membership", data[0].Membership);
          goto("/dashboard");
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  function smoothScroll(event: Event) {
    event.preventDefault();
    const target = (event.target as HTMLAnchorElement).getAttribute("href");
    if (target && target.startsWith("#")) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
</script>

<svelte:head>
  <title>Grade App</title>
</svelte:head>

<div class="main">
  <Navbar />
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div id="home">
        <h1 id="main-headings" class="text-5xl font-bold">Grade App</h1>
        <p class="py-6" id="homep">
          Grade App is an AI powered educational chatting application that
          leverages the power of Google's Gemini to help students clear doubt
          and understand new concepts.
        </p>
        <p>Designed by students for students.</p>
        <div class="buttons">
          <a class="btn btn-primary loginButton" href="/login">Login</a>
          <a class="btn btn-primary registerButton" href="/register">Register</a
          >
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="features mb-5" id="features">
    <center>
      <h2 id="sub-headings">Features</h2>
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
  <div class="usage mb-5" id="usage">
    <center>
      <h2 id="sub-headings">Unlock the Power of AI for Your Studies</h2>
    </center>
    <div class="content ml-2">
      <div class="card-container">
        <div class="card">
          <div class="card-content">
            <h3>Already a user?</h3>
            <p>Log in now and continue your learning journey!</p>
            <a class="btn btn-primary mt-3 ml-2" href="/login">Login</a>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <h3>New to Grade App?</h3>
            <p>Register for free today!</p>
            <a class="btn btn-primary mt-8 ml-2" href="/register">Register</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="acknowledgments mb-5" id="acknowledgments">
    <center>
      <h2 id="sub-headings">With Graditude</h2>
    </center>
    <div class="content ml-2">
      <h3 class="text-3xl">
        Grade App wouldn't be possible without the support of some amazing
        people and technologies:
      </h3>
      <ul class="ml-2">
        <li>
          <p>
            We extend our deepest gratitude to <a
              class="link link-hover"
              href="https://www.google.com">Google</a
            >
            for providing the groundbreaking
            <a class="link link-hover" href="https://gemini.google.app"
              >Gemini API</a
            >, which forms the heart of Grade App's intelligence.
          </p>
        </li>
        <li>
          <p>
            A massive thank you to our dedicated <a
              class="link link-hover"
              href="https://pd-enterprise.pages.dev/our-team">Grade App team!</a
            > Their passion, creativity, and countless hours of work have brought
            this vision to life.
          </p>
        </li>
        <li>
          <p>
            And a special shout-out to <a
              class="link link-hover"
              href="https://instagram.com">AAB</a
            > for their incredible design talent, including the creation of our beautiful
            logo.
          </p>
        </li>
      </ul>
    </div>
  </div>
  <hr />
  <div class="contact mb-5" id="contact">
    <center>
      <h1 id="sub-headings">Contact</h1>
    </center>
    <div class="content ml-2">
      <p>
        Have questions, feedback, or just want to say hi? We'd love to hear from
        you!
      </p>
      <a href="mailto:gradeappbyapp@gmail.com" class="btn btn-primary mt-2 ml-5"
        >Email Us</a
      >
    </div>
  </div>
  <hr />
  <Footer />
</div>

<style>
  :root {
    --laptop-image-size: 550px;
  }
  p {
    font-size: 1.4em;
  }
  .card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    width: 330px;
    background: #252527;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.2);
    margin: 20px;
    text-align: center;
    padding: 15px;
  }
  .card:hover {
    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.4);
  }
  .card-content h3 {
    font-size: 1.6em;
    margin-bottom: 8px;
  }
  .card-content p {
    font-size: 1.1em;
    line-height: 1.3;
  }
  .buttons {
    height: 60px;
    margin-top: 30px;
  }
  .buttons .loginButton {
    margin-right: 100px;
  }
  #homep {
    font-size: 1.5em;
    font-weight: 600;
  }
  #sub-headings {
    font-size: 3.5em;
    background: linear-gradient(
      90deg,
      rgba(72, 148, 229) 35%,
      rgba(138, 121, 203) 50%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  #main-headings {
    font-size: 7em;
    background: linear-gradient(
      90deg,
      rgba(72, 148, 229) 0%,
      rgba(138, 121, 203) 70%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
