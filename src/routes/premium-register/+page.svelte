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
  <form>
    <div id="SignUpForm">
      <input
        type="email"
        class="emailInput"
        id="email"
        placeholder="Email"
      /><br />

      <input
        type="password"
        class="passwordInput"
        id="password"
        placeholder="Password"
      />

      <button on:click={signUp}>Register</button>
      <h1 style="font-size: 20px;">
        Already have an account? <a href="/login">Login</a>
      </h1>
      <a href="/">Go Back to Home Page</a>
    </div>
  </form>
</div>

<style>
  .container,
  div {
    text-align: center;
  }
  button {
    cursor: pointer;
  }

  .container {
    margin-top: 120px;
    background-color: #1e1f20;
    padding: 20px;
    border-radius: 30px;
  }
  h1 {
    font-size: 50px;
    color: white;
  }
  button,
  input {
    font-size: 20px;
  }
  input {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .emailInput {
    margin-top: 50px;
    margin-right: 40px;
    margin-left: 30px;
    margin-bottom: 55px;
    width: 76%;
  }
  .passwordInput {
    margin-bottom: 100px;
    width: 76%;
  }
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.2s;
    width: 400px;
    margin-bottom: 10px;
  }
  button:hover {
    background-color: #0056b3;
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

    .emailInput {
      margin-top: 30px;
      margin-right: 40px;
      margin-left: 30px;
      width: 76%;
    }

    .passwordInput {
      margin-bottom: 60px;
      width: 76%;
    }

    button {
      width: 360px;
    }
  }

  /* Responsive for tablets */
  @media screen and (max-width: 800px) {
    .container {
      width: 80%;
      height: 70%;
    }

    .emailInput {
      margin-top: 30px;
      margin-right: 40px;
      margin-left: 30px;
      width: 76%;
    }

    .passwordInput {
      margin-bottom: 60px;
      width: 76%;
    }

    button {
      width: 360px;
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

    .emailInput {
      margin-top: 45px;
      margin-left: 27px;
      margin-bottom: 70px;
      width: 77%;
    }

    .passwordInput {
      margin-bottom: 50px;
      width: 75%;
    }

    button {
      width: 280px;
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

    .emailInput {
      margin-top: 45px;
      margin-left: 15px;
      margin-bottom: 70px;
      width: 90%;
    }

    .passwordInput {
      margin-bottom: 50px;
      width: 90%;
    }

    button {
      width: 200px;
    }
  }
</style>
