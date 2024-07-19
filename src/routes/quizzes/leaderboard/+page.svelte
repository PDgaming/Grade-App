<script>
  import { supabase } from "../../supabaseClient";
  import { onMount } from "svelte";

  let leaderBoardData = null;
  onMount(() => {
    getLeaderBoardData();
  });

  async function getLeaderBoardData() {
    const { data, error } = await supabase.from("Leaderboard").select();
    if (data) {
      leaderBoardData = data;
    } else {
      console.log(
        `There was an error getting Leaderboard Data from Database, ${error}`
      );
    }
  }
</script>

<center>
  <h1><u> Leaderboard </u></h1>
</center>
{#if leaderBoardData}
  <center>
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Grade</th>
          <th>Rank</th>
        </tr>
        {#each leaderBoardData as data, index}
          <tr>
            <td key={index + 1}>{index + 1}</td>
            <td>
              {data.User.replace("@gmail.com", "")}
            </td>
            <td>
              {data.Grade}
            </td>
            <td>
              {data.Rank}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </center>
{/if}

<style>
  table {
    color: white;
    max-height: 80vh;
    width: 90vw;
    margin-top: 30px;
  }
  table,
  th,
  td {
    border: 1px solid white;
  }
</style>
