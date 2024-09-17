<script lang="ts">
  import { onMount } from "svelte";
  let freePlan = "Sign Up";
  let basePlan = "Sign Up";
  let proPlan = "Sign Up";
  let freeIsDisabled = false;
  let baseIsDisabled = false;
  let proIsDisabled = false;
  import { UsersDatabase } from "../supabaseClient";
  import { base } from "$app/paths";
  import Footer from "../components/footer.svelte";

  onMount(() => {
    const email = sessionStorage.getItem("Email");
    //@ts-ignore
    getCurrentPlan(email);
  });
  async function getCurrentPlan(email: string) {
    const { data, error } = await UsersDatabase.from("Users")
      .select("Membership")
      .eq("Email", email);
    if (data) {
      switch (data[0].Membership) {
        case "free":
          freePlan = "Current Plan";
          freeIsDisabled = true;
          baseIsDisabled = false;
          proIsDisabled = false;
          break;
        case "tier-1":
          basePlan = "Current Plan";
          baseIsDisabled = true;
          freeIsDisabled = false;
          proIsDisabled = false;
          break;
        case "tier-2":
          proPlan = "Current Plan";
          proIsDisabled = true;
          freeIsDisabled = false;
          baseIsDisabled = false;
          break;
      }
    } else {
      console.log(error);
    }
  }
  function handleClick(event: MouseEvent) {
    if (proIsDisabled) {
      event.preventDefault();
    }
  }
</script>

<svelte:head>
  <title>Grade App - Premium Register</title>
</svelte:head>

<center><h1 class="text-4xl">Choose your plan</h1></center>

<div class="plans">
  <div class="free-plan plan">
    <ul class="price">
      <li class="header text-3xl font-bold">Free</li>
      <li class="text-4xl font-bold mb-4">Free!!</li>
      <li><i class="fa-solid fa-check"></i>Free Trial</li>
      <li>
        <i class="fa-solid fa-check"></i>Access to other applications from PD
        Enterprise
      </li>
      <a
        href="/"
        class="btn"
        class:disabled={freeIsDisabled}
        on:click|preventDefault={handleClick}>{freePlan}</a
      >
    </ul>
  </div>
  <div class="base-plan plan">
    <ul class="price">
      <li class="header text-3xl font-bold">Base</li>
      <li class="text-2xl font-bold mb-4">
        <span class="text-4xl font-bold">
          <span style="font-family:Arial;">&#8377;</span>
          10
        </span>
        /month
      </li>
      <li><i class="fa-solid fa-check"></i>Access to Grade AI - Base model</li>
      <li>
        <i class="fa-solid fa-check"></i>Access to other applications from PD
        Enterprise
      </li>
      <a
        href="/"
        class="btn"
        class:disabled={baseIsDisabled}
        on:click|preventDefault={handleClick}>{basePlan}</a
      >
    </ul>
  </div>
  <div class="pro-plan plan">
    <ul class="price">
      <li class="header text-3xl font-bold">Pro</li>
      <li class="text-2xl font-bold mb-4">
        <span class="text-4xl font-bold">
          <span style="font-family:Arial;">&#8377;</span> 20
        </span>
        /month
      </li>
      <li><i class="fa-solid fa-check"></i>Access to Grade AI - Base model</li>
      <li>
        <i class="fa-solid fa-check"></i>Access to Grade AI - Socratic model
      </li>
      <li>
        <i class="fa-solid fa-check"></i>Access to other applications from PD
        Enterprise
      </li>
      <a
        href="/"
        class="btn"
        class:disabled={proIsDisabled}
        on:click|preventDefault={handleClick}>{proPlan}</a
      >
    </ul>
  </div>
</div>
<Footer />

<style>
  .btn {
    width: 100%;
    font-size: 1.4em;
    margin-top: auto;
  }
  .btn.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  /* Create three columns of equal width */
  .plans {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  .plan {
    width: 300px;
    height: 550px;
    background-color: #111;
    border-radius: 30px;
    margin: 20px;
    display: flex;
    flex-direction: column;
  }
  .price {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
