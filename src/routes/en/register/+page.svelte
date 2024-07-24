<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<span id="normal">
  <div class="container">
    <h2>
      We are so sorry for the inconvinience caused.<br /><br />
      But since Cross Origin redirect sign-in is no longer supported on many modern
      browsers including<br />
      <ul>
        <li>Google Chrome M115+</li>
        <li>Firefox 109+</li>
        <li>Safari 16.1+</li>
      </ul>
      We have migrated to Google only login<br />
      <a href="/en/login">login</a>
    </h2>
  </div>
</span>
<span id="responsive">
  <h2>
    We are so sorry for the inconvinience caused.<br /><br />
    But since Cross Origin redirect sign-in is no longer supported on many modern
    browsers including<br />
    <ul>
      <li>Google Chrome M115+</li>
      <li>Firefox 109+</li>
      <li>Safari 16.1+</li>
    </ul>
    We have migrated to Google only login<br />
    <a href="/login">login</a>
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
