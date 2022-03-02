<script lang="ts">
  import type User from "$lib/classes/user";
  import { createEventDispatcher, onMount } from "svelte";
  import { userStore } from "../stores";
  import type Inventory from "$lib/classes/user/inventory";
  export let isOpen;
  let user: User;
  let inventory: Inventory;
  onMount(() => {
    userStore.subscribe((value) => {
      if (value) {
        user = value;
        inventory = value.inventory;
      }
    });
  });

  const dispatch = createEventDispatcher();

  function toggleClose() {
    dispatch("close");
  }

</script>

<dialog open={isOpen} class="inventory-dialog">
  <article style="width:100%;height:80vh;">
    <header>
      <a href="#close" aria-label="Close" class="close" on:click={toggleClose}></a>
      Inventory
    </header>
    <div id="content">
      {#if user && inventory}
        {#each inventory.slots as slot} 
          {#if slot !== null}
            <li>{slot.quantity}X { slot.itemId }</li>
          {:else}
            <li>VOID</li>
          {/if}
        {/each}
      {/if}
    </div>
  </article>
</dialog>

<style>
  .inventory-dialog {
    width: 100%;
    height: 80vh;
  }

  #content {
    overflow: scroll;
  }
</style>