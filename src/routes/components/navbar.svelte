<div class="main">
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <img src="/logo.webp" alt="Logo" id="logo" />
        <li class="nav-item grade-app">
          <a class="nav-link active" href="/" style="color: white;">Grade App</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active homeNav" href="#home" style="color: white;"
            >Home</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link active features"
            href="#features"
            style="color: white;">Features</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active usage" href="#usage" style="color: white;"
            >Usage</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#acknowledgments"
            id="acknowledgments"
            style="color: white;">Acknowledgments</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link active contact"
            href="#contact"
            style="color: white;">Contact</a
          >
        </li>
        <li class="nav-item login-link">
          <a class="nav-link active" href="/login" id="login">Login</a>
        </li>
        <li class="nav-item register-link">
          <a class="nav-link active" href="/register" id="register">Register</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<style>
  #logo {
    width: 40px;
    height: 40px;
    position: relative;
    top: 7px;
    left: 30px;
    border-radius: 100px;
  }
  li {
    margin-top: 5px;
  }
  #login,
  #register {
    color: white;
    text-decoration: underline;
    font-size: 19px;
  }
  #register {
    margin-right: 15px;
  }
  .container-fluid {
    padding: 0;
  }
  .navbar-nav {
    background-color: #17171b;
    display: flex;
    justify-content: space-between;
    height: 60px;
    width: 100vw;
    margin-top: -10px;
    margin-left: -10px;
    box-shadow: 0px 0px 50px -20px white;
  }
  .navbar-nav:hover {
    box-shadow: 0px 0px 50px -10px white;
  }
  .nav-item {
    font-size: 20px;
  }
  .navbar {
    background-attachment: fixed;
  }
  .nav-link {
    text-decoration: none;
    color: #333;
  }
  /* Responsive for nav */
  @media screen and (max-width: 1170px) {
    #logo {
      margin-top: 10px;
    }
    .nav-item {
      justify-content: space-between;
      width: 45px;
      margin-top: 10px;
    }
    .navbar-nav {
      height: 70px;
    }
    .homeNav {
      margin-left: -30px;
    }
    .usage {
      margin-left: -20px;
    }
    .features {
      margin-left: -25px;
    }
    #acknowledgments {
      margin-left: -50px;
    }
    .grade-app {
      margin-left: 3vw;
      margin-top: 0px;
    }
    .navbar-nav {
      width: 1180px;
    }
    .nav-item {
      margin-right: 100px;
    }
    .login-link,
    .register-link,
    .nav-item {
      font-size: 18px;
    }
  }
  /* Responsive for nav */
  @media screen and (max-width: 1090px) {
    .homeNav {
      margin-left: 7vw;
    }
  }

  /* Responsive for nav */
  @media screen and (max-width: 1060px) {
    .homeNav {
      margin-left: 5vw;
    }
  }

  /* Responsive for nav */
  @media screen and (max-width: 990px) {
    .navbar {
      display: none;
    }
  }
</style>
