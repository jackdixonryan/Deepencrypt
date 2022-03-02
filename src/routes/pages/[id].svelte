
<script lang="ts" context="module">
  export function load({ params }) {
    const { id } = params;
    return { props: { id } };
  }
</script>

<script lang="ts">
  import { getPage } from "$lib/services/page.service";
  import { onMount } from "svelte";
  import { userStore } from "../../stores";
  import type Mineable from "$lib/classes/resources/mineable";
  import type Page from "$lib/classes/resources/page";
  import type User from "$lib/classes/user";
  import type { Yield } from "$lib/types";
  import { updateUserInventory, updateUserExperience } from "$lib/services/user.service";

  export let id: string;
  let page: Page; 
  let user: User;
  let resources: Mineable[];
  let currentResource: Mineable;
  let miningIntervalId;

  userStore.subscribe((value: User) => {
    user = value;
  });

  onMount(async () => {
    const response: { page: Page, resources: Mineable[] } = await getPage(id);
    page = response.page;
    resources = response.resources;
  });

  function harvestResource(e) {
    const resource: Mineable = resources.find((r: Mineable) => r.id === e.target.id);
    currentResource = resource;
    miningIntervalId = setInterval(async () => {
      const loot: Yield[] = currentResource.harvest();
      if (loot.length > 0) {
        loot.forEach(async (item: Yield) => {
          console.log({ item });
          user.inventory.addItem({ itemId: item.name, quantity: item.quantity });
          await updateUserInventory(user.id);
        });        
      }
      await updateUserExperience(user.id, "mining", resource.type.xp);
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
