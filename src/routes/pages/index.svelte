
<script lang="ts">
import supabase from "$lib/db";
import { onMount } from "svelte";
import { userStore } from "../../stores";
import Creator from "../../components/pages/Creator.svelte";

let pages;
let currentUser; 
let creatorOpen = false;

onMount(async () => {
  const tablesCall = await supabase.from("pages").select("*").limit(50);
  pages = tablesCall.data;

  userStore.subscribe((val) => {
    currentUser = val;
  });
});

async function openPageCreator() {
  creatorOpen = true;
}

</script>

<section>
  <h2>ERWD PAGE DIRECTORY</h2>
  {#if pages}
    {#if pages.length > 0}
    <table>
      <thead>
        <tr>
          <th>Page ID</th>
          <th>Page Type</th>
          <th>Creator</th>
          <th>Resource Count</th>
        </tr>
      </thead>
      <tbody>
      {#each pages as page}
        <tr>
          <th>
            <a href="/pages/{page.id}">
              {page.id}
            </a>
          </th>
          <td>{page.type}</td>
          <td>{page.created_by}</td>
          <td>{page.numberOfResources}</td>
        </tr>
      {/each}
      </tbody>
    </table>
    {:else}
      ERWD SYSTEM MESSAGE: This mainframe looks fresh. There's no data here yet. Please try to architect a page to begin the process of creation.
    {/if}
  {:else}
    ERWD SYSTEM ERRROR: directory synthesis failed; 
  {/if}
</section>
<section>
  <button on:click={openPageCreator}>CREATE A PAGE</button>
</section>
<Creator isOpen={creatorOpen} currentUser={currentUser}></Creator>
