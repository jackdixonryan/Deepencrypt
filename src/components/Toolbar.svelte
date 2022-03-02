<script lang="ts">
  let inventoryOpen = false;
  import Inventory from "./Inventory.svelte";

  function toggleInventory() {
    console.log("EVENT_RECEIVED");
    if (inventoryOpen === true) {
      inventoryOpen = false;
    } else {
      inventoryOpen = true;
    }
  }

</script>

<nav class="bottom-flex">
  <Inventory isOpen={inventoryOpen} on:close={toggleInventory}/>
  <button class="outline contrast">SKILLS</button>
  <button class="outline contrast" on:click={toggleInventory}>INVENTORY</button>
  <button class="outline contrast">EQUIPMENT</button>
  <button class="outline contrast">TASKS</button>
</nav>

<style>
.bottom-flex {
  width: auto;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #11191f;
}

.contrast {
  height: 100%;
  margin-bottom: 0px;
}
</style>