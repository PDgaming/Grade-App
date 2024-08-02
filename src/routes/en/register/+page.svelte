<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<span id="normal">
  <div class="container">
    <h2>
      You can directly login and there is no need to register.<br /><a
        href="/en/login">login</a
      >
    </h2>
  </div>
</span>
<span id="responsive">
  <h2>
    You can directly login and there is no need to register.<br /><a
      href="/en/login">login</a
    >
  </h2>
</span>

<style>
  .container {
    background-color: #1e1f20;
    text-align: center;
    margin-top: 100px;
    padding: 20px;
    border-radius: 20px;
  }
  a {
    text-decoration: none;
    color: #007bff;
  }
  #responsive {
    margin-top: 100px;
    text-align: center;
    display: none;
  }
  @media (max-width: 574px) {
    #normal {
      display: none;
    }
    #responsive {
      display: block;
    }
  }
</style>
