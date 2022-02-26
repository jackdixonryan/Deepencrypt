
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
  let currentResource;
  let miningIntervalId;

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
    currentResource = resource;
    miningIntervalId = setInterval(async () => {
      await addXp(user.id, "mining", resource.type.xp);
      user.addXp("mining", resource.type.xp);
      userStore.set(user);
    }, resource.type.timeToComplete * 1000);
  }

  function stopHarvesting() {
    clearInterval(miningIntervalId);
    currentResource = null;
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
              {#if currentResource && currentResource.id === resource.id}
                <button on:click={stopHarvesting} id={resource.id} class="contrast">STOP</button>
              {:else}
                <button on:click={harvestResource} id={resource.id}>HARVEST</button>
              {/if}
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
