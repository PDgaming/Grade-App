<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <ul class="navbar-nav">
      <img src="/logo.webp" alt="Logo" id="logo" />
      <li class="nav-item grade-app">
        <a class="nav-link active" href="/" style="color: white;">Grade App</a>
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
        <a class="nav-link active contact" href="#contact" style="color: white;"
          >Contact</a
        >
      </li>
    </ul>
  </div>
</nav>

<style>
  :root {
    --image-size: 70px;
  }
  .navbar {
    background-attachment: fixed;
  }
  .navbar .container-fluid {
    padding: 0;
  }
  .navbar-nav {
    background-color: #17171b;
    justify-content: space-evenly;
    padding: 10px;
    height: 90px;
    width: 100vw;
    margin-top: -10px;
    box-shadow: 0px 0px 40px -20px white;
  }
  .navbar-nav:hover {
    box-shadow: 0px 0px 40px -10px white;
  }
  #logo {
    width: var(--image-size);
    height: var(--image-size);
    position: relative;
    border-radius: 100px;
    cursor: pointer;
  }
  .nav-item {
    font-size: 30px;
  }
  a {
    transition: ease 500ms all;
  }
  a:hover {
    color: red;
    text-decoration: underline;
    transform: scale(1.2);
    transition: ease 500ms all;
  }
  @media (max-width: 990px) {
    .nav-item {
      display: none;
    }
  }
</style>
