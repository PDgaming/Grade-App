<script>
  import { initializeApp } from "firebase/app";
  import { getStorage } from "firebase/storage";
  import ImageURLData from "./imageUrlData";

  // config for firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB_MSh9YlBu7GGN5wxZjY7kGN4bU697GO4",

    authDomain: "grade-app-16e2d.firebaseapp.com",

    projectId: "grade-app-16e2d",

    storageBucket: "grade-app-16e2d.appspot.com",

    messagingSenderId: "942886540823",

    appId: "1:942886540823:web:29caeac2695fecc3d4ee52",

    measurementId: "G-WD1M20G6LX",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage();

  let imageUrl = "";
  let selectedClass = "";
  let selectedSubject = "";
  const httpsReference =
    "https://firebasestorage.googleapis.com/v0/b/grade-app-16e2d.appspot.com/o/images%2Fmultiplication-table.jpg?alt=media&token=8f85193f-4149-4074-968f-cdec3e325fcb";

  async function searchNotes() {
    if (selectedClass && selectedSubject) {
      let link =
        ImageURLData.Classes[selectedClass].subjects[selectedSubject].link;
      console.log(link);
      imageUrl = link;
    } else {
      console.log("Please select a class and subject first");
    }
  }
</script>

<div class="select-form">
  <select class="form-select" bind:value={selectedClass}>
    <option value="">Select Class</option>
    {#each Object.keys(ImageURLData.Classes) as classKey}
      <option value={classKey}>{classKey.replace(/_/g, " ")}</option>
    {/each}
  </select>

  <select class="form-select" bind:value={selectedSubject}>
    <option value="">Select Subject</option>
    {#if selectedClass}
      {#each Object.keys(ImageURLData.Classes[selectedClass].subjects) as subjectKey}
        <option value={subjectKey}>{subjectKey}</option>
      {/each}
    {/if}
  </select>
</div>
<div class="buttons">
  <button type="button" class="btn btn-primary" on:click={searchNotes}
    >Search</button
  >
</div>
<img src={imageUrl} alt="" />
<h45 style="color: white;">*This feature is under development</h45>

<style>
  img {
    width: 50%;
    height: 50%;
  }
  .select-form {
    display: flex;
    width: 55vw;
    margin-top: 20px;
    margin-left: 1vw;
  }
  select {
    height: 40px;
    width: 150px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  button {
    font-size: 20px;
    width: 31vw;
    margin-top: 20px;
    margin-left: 1vw;
  }
</style>
