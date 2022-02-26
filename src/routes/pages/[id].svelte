
<script lang="ts" context="module">
  export function load({ params }) {
    const { id } = params;
    return { props: { id } };
  }
</script>

<script lang="ts">
  import { addXp, getPage } from "../../lib/helpers";
  import { onMount } from "svelte";
  import { userStore } from "../../stores";

  export let id;
  let page; 
  let user;
  let resources;

  userStore.subscribe((value) => {
    user = value;
  });

  onMount(async () => {
    const response = await getPage(id);
    page = response.page;
    resources = response.resources;
  });

  function harvestResource(e) {
    const resource = resources.find((r) => r.id === e.target.id);
    
    setTimeout(async () => {
      await addXp(user.id, "mining", resource.type.xp);
    }, resource.type.timeToComplete);
    
  }

</script>

{#if page}
  <h1>PAGE { id }</h1>
  {#if resources && resources.length > 0}
    <table>
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Resource Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each resources as resource}
          <tr>
            <th>{resource.id}</th>
            <td>{resource.type.name}</td>
            <td>
              <button on:click={harvestResource} id={resource.id}>HARVEST</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    PAGE is DEAD
  {/if}
{:else}
  PAGE not FOUND
{/if}
