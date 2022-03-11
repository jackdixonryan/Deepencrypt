<script lang="ts">
  import { types } from "$lib/helpers/craftable";
  import type { CraftableType } from "$lib/helpers/craftable";
  import { userStore } from "../../stores";
  import Inventory from "../Inventory.svelte";
  import Craftable from "$lib/classes/resources/craftable";
  import { updateUserExperience, updateUserInventory } from "$lib/services/user.service";
  import type { Yield } from "$lib/types";

  let selectedScript;
  let disabled: boolean = true;

  $: { 
    if (selectedScript) {
      disabled = false;
    }
  }

  function getQuantityOfItem(itemId: string) {
    const inventory = $userStore.inventory;
    console.log(inventory);
    const item = inventory.getItem(itemId);
    if (item) {
      console.log(item);
      return item.quantity.toString();
    } else {
      return "0";
    }
  }

  function hasItems(type: CraftableType): boolean {
    let hasItems: boolean = true;
    type.itemsRequired.forEach((itemSummary) => {
      const userQuantity = getQuantityOfItem(itemSummary.itemId);
      if (userQuantity < itemSummary.quantity) {
        hasItems = false;
      }
    });

    return hasItems;
  }

  async function createScript() { 

    console.log($userStore); 

    const type = types.find((type) => type.name === selectedScript);
    console.log(type);

    const intervalId = setInterval(async () => {
      if (hasItems(type)) {
        const script = new Craftable({
          type: type.name,
        });

        // remove items from the user's inventory.
        try {
          for (let i = 0; i < script.type.itemsRequired.length; i++) {
            const item = script.type.itemsRequired[i];
            $userStore.inventory.removeItem(item.itemId);
            await updateUserInventory($userStore.id, $userStore.inventory);
          }
          await updateUserExperience($userStore.id, "scripting", script.type.xp);
          
          script.type.yields.forEach((loot: Yield) => {
            $userStore.inventory.addItem({ itemId: loot.name, quantity: loot.quantity });
          });

          await updateUserInventory($userStore.id, $userStore.inventory);
        } catch(error) {
          console.error(error);
        }

      } else {
        clearInterval(intervalId);
      }
    }, type.timeToComplete * 1000);
  }

</script>

<article>
  <header>SCRIPTING</header>

  <fieldset>
  {#each types as type}
    <label for={type.name}>
    <input type="radio" id={type.name} name={type.name} style="display:inline-block" bind:group={selectedScript} value={type.name} disabled={hasItems(type) === false }/>
      (lvl {type.requiredLevel}) { type.name }
    </label>
    <ul style="margin-left: 1rem;">
      { #each type.itemsRequired as itemRequired }
        <li style="margin-left: 1rem;">{ getQuantityOfItem(itemRequired.itemId)}/{ itemRequired.quantity } { itemRequired.itemId }</li>
      { /each }
    </ul>
  {/each}
  </fieldset>

  <footer>
    <button disabled={disabled === true} on:click={createScript}>CREATE SCRIPT</button>
  </footer>
</article>
