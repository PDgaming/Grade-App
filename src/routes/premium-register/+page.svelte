<script>
  async function signUp() {
    alert(
      "Please contact gradeappbyapp@gmail.com to register and account. Thank you!"
    );
    event.preventDefault(); // prevents the site from reloading on button click
    const email = document.getElementById("email").value; // gets email from input field
    const password = document.getElementById("password").value; // gets password from input field
  }
</script>

<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<div class="container">
  <h1>Register</h1>
  <h2>Contact <a href="mailto:gradeapbyapp@gmail.com">gradeappbyapp@gmail.com</a> to create a premium account.</h2>
    <h1 style="font-size: 20px;">
      Already have an account? <a href="/login">Login</a>
    </h1>
</div>

<style>
  .container,
  div {
    text-align: center;
  }
  .container {
    margin-top: 120px;
    background-color: #1e1f20;
    padding: 20px;
    border-radius: 30px;
  }
  h1 {
    font-size: 50px;
  }
  h1, h2 {
    color: white;
  }
  a {
    text-decoration: none;
    color: #007bff;
  }

  /* Responsive for tablets */
  @media screen and (max-width: 1280px) {
    .container {
      width: 90%;
    }
  }

  /* Responsive for tablets */
  @media screen and (max-width: 800px) {
    .container {
      width: 80%;
      height: 70%;
    }
  }

  /* Responsive for tablets */
  @media screen and (max-width: 770px) {
    .container {
      width: 90%;
      height: 80%;
    }

    h1 {
      font-size: 30px;
    }
  }

  /* Responsive for mobiles */
  @media screen and (max-width: 400px) {
    .container {
      width: 100%;
      height: 100vh;
      border-radius: 0px;
    }

    h1 {
      font-size: 60px;
    }
  }
</style>
