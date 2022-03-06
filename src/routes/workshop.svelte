<script lang="ts">
  import type User from "$lib/classes/user";
  import { onMount } from "svelte";
  import { userStore } from "../stores";
  import type Inventory from "$lib/classes/user/inventory";
  import ContextMenu from "../components/contextMenu/ContextMenu.svelte";
  import ScriptCreator from "../components/workshop/ScriptCreator.svelte";

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
<ScriptCreator />
<ContextMenu />
{/if}
