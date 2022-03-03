<script lang="ts">
  import type User from "$lib/classes/user";
  import { onMount } from "svelte";
  import { userStore } from "../stores";
  import type Inventory from "$lib/classes/user/inventory";
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
</script>

<h1 style="margin-bottom: 0.5rem;">THE WORKSHOP</h1>

{#if inventory}
<div class="flex-container">
  <div class="inventory">
    <article>
      <header>
        INVENTORY
      </header>
      {#each inventory.slots as inventoryItem}
        {#if inventoryItem}
          {inventoryItem.quantity}x {inventoryItem.itemId}
        {/if}
      {/each}
    </article>
  </div>
  <div class="crafting">
    <article>
      <header>
        CRAFT
      </header>
    </article>
  </div>
</div>
{/if}

<style>
  .flex-container { 
    display: flex;
  }

  .inventory {
    flex: 1;
  }

  .crafting {
    flex: 1;
  }
</style>