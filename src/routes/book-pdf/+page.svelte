<script>
  import "../index.css";
  import ncertData from "./ncert-pdf-data";

  let selectedClass = "";
  let selectedSubject = "";
  let selectedBook = "";
  let selectedChapter = "";
  let pdfUrl;

  function searchBook() {
    if (selectedClass && selectedSubject && selectedBook) {
      pdfUrl =
        ncertData.classes[selectedClass].subject[selectedSubject].book[
          selectedBook
        ].chapters[selectedChapter];
      window.open(pdfUrl, "_blank");
    } else {
      pdfUrl = ""; // Clear URL if selections are incomplete
    }
  }
  function downloadBook() {
    if (selectedClass && selectedSubject && selectedBook) {
      pdfUrl =
        ncertData.classes[selectedClass].subject[selectedSubject].book[
          selectedBook
        ].chapters["download"];
      window.location.href = pdfUrl;
    } else {
      pdfUrl = ""; // Clear URL if selections are incomplete
    }
  }
</script>

<svelte:head>
  <title>Grade App - Book PDFs</title>
</svelte:head>

<select bind:value={selectedClass}>
  <option value="">Select Class</option>
  {#each Object.keys(ncertData.classes) as classKey}
    <option value={classKey}>{classKey.replace(/_/g, " ")}</option>
  {/each}
</select>

<select bind:value={selectedSubject}>
  <option value="">Select Subject</option>
  {#if selectedClass}
    {#each Object.keys(ncertData.classes[selectedClass].subject) as subjectKey}
      <option value={subjectKey}>{subjectKey}</option>
    {/each}
  {/if}
</select>

<select bind:value={selectedBook}>
  <option value="">Select Book</option>
  {#if selectedClass && selectedSubject}
    {#each Object.keys(ncertData.classes[selectedClass].subject[selectedSubject].book) as chapterKey}
      <option>{chapterKey.replace(/_/g, " ")}</option>
    {/each}
  {/if}
</select>

<select bind:value={selectedChapter}>
  <option value="">Select Chapter</option>
  {#if selectedClass && selectedSubject && selectedBook}
    {#each Object.keys(ncertData.classes[selectedClass].subject[selectedSubject].book[selectedBook].chapters) as chapterKey}
      <option value={chapterKey}>{chapterKey.replace(/_/g, " ")}</option>
    {/each}
  {/if}
</select>
<button type="button" class="btn btn-primary" on:click={searchBook}
  >Search</button
>
<button type="button" class="btn btn-primary" on:click={downloadBook}
  >Download Complete book</button
>

<style>
</style>
