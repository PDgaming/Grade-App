<div class="main">
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <img src="/logo.webp" alt="Logo" id="logo" />
        <li class="nav-item">
          <a class="nav-link active homeNav" href="/" style="color: white;"
            >Grade App</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active homeNav" href="#home" style="color: white;"
            >Home</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#features" style="color: white;"
            >Features</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#usage" style="color: white;"
            >Usage</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#acknowledgments"
            style="color: white;">Acknowledgments</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#contact" style="color: white;"
            >Contact</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/login" id="login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/register" id="register">Register</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<style>
  #logo {
    width: 50px;
    height: 50px;
    position: relative;
    top: 5px;
    left: 30px;
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
    box-shadow: 0px 0px 50px 1px white;
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
    .nav-item {
      margin-right: 100px;
    }
    .homeNav {
      margin-left: 10vw;
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
