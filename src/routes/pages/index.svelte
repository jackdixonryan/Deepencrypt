
<script lang="ts">
import supabase from "$lib/supabase";
import Page from "../../game/lib/resources/page";
import { onMount } from "svelte";
import { createPage } from "$lib/helpers";
import { userStore } from "../../stores";
let pages;

let currentUser; 

onMount(async () => {
  const tablesCall = await supabase.from("pages").select("*").limit(50);
  pages = tablesCall.data;

  userStore.subscribe((val) => {
    currentUser = val;
  });
});

async function newPage() {
  const { page, user } = await createPage("basic", currentUser);
  userStore.set(user);
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
        </tr>
      </thead>
      <tbody>
      {#each pages as page}
        <tr>
          <th>{page.id}</th>
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
  <button on:click={newPage}>CREATE A PAGE</button>
</section>