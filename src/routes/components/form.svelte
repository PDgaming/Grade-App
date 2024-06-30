<form>
  <input type="email" class="emailInput" id="email" placeholder="Email" /><br />
  <input
    type="password"
    class="passwordInput"
    id="password"
    placeholder="Password"
  />
</form>

<style>
  input {
    font-size: 25px;
    border: none;
    border-radius: 5px;
    background-color: #191919;
    color: white;
  }
  .emailInput,
  .passwordInput {
    width: 31vw;
  }
  .emailInput {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .passwordInput {
    margin-bottom: 30px;
  }
  @media (max-width: 1000px) {
    .emailInput,
    .passwordInput {
      width: 60vw;
    }
    input {
      font-size: 25px;
      border: none;
      border-radius: 5px;
      background-color: #9c9c9c;
      color: rgb(0, 0, 0);
    }
  }
  @media (max-width: 900px) {
    .emailInput,
    .passwordInput {
      width: 70vw;
    }
  }
  @media (max-width: 900px) {
    .emailInput,
    .passwordInput {
      width: 80vw;
    }
  }
</style>
