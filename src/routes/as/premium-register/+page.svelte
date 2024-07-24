<svelte:head>
  <title>Grade App - Register</title>
</svelte:head>

<span id="normal">
  <div class="container">
    <h2>
      We are so sorry for the inconvinience caused.<br />
      But we currently do not support on-site payment.<br />
      Please Contact
      <a href="mailto:gradeapbyapp@gmail.com">gradeappbyapp@gmail.com</a> to create
      a premium account.
    </h2>
  </div>
</span>
<span id="responsive">
  <h2>
    We are so sorry for the inconvinience caused.<br />
    But we currently do not support on-site payment.<br />
    Please Contact
    <a href="mailto:gradeapbyapp@gmail.com">gradeappbyapp@gmail.com</a> to create
    a premium account.
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
