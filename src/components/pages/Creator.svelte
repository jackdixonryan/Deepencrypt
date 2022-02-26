<script lang="ts">
export let isOpen: boolean;
export let currentUser;
import { types } from "../../game/utility/page";
import { userStore } from "../../stores";
import { createPage } from "../../lib/helpers";

let selectedType;
let building = false; 
let currentProgress = 0;

async function newPage() {
  const { timeToComplete } = selectedType;
  building = true;
  const interval = setInterval(() => {
    if (currentProgress < timeToComplete) {
      currentProgress += 0.1;
    }
  }, 100);
  setTimeout(async () => {
    const { page, user } = await createPage("basic", currentUser);
    userStore.set(user);
    clearInterval(interval);
    building = false;
    currentProgress = 0;
  }, timeToComplete * 1000);
}

function closeDialog() {
  isOpen = false;
}

</script>

<dialog open={isOpen}>
  <article class="wide">
    <header>
      Create a Page
    </header>
    <div class="flex">
      <div class="flex-child">
        <fieldset>
          <legend>Page Type</legend>
          {#each types as type} 
            <label for={type.name}>
              <input type="radio" id={type.name} name={type.name} value={type} bind:group={selectedType} />
              {type.name}
            </label>
          {/each}
        </fieldset>
      </div>
      <div class="flex-child">
        {#if selectedType}
          <ul>
            <li>NAME: { selectedType.name }</li>
            <li>TIME TO COMPLETE: {selectedType.timeToComplete} Seconds</li>
            <li>XP REWARD: {selectedType.xp}</li>
          </ul>
          <button on:click={newPage} disabled={building}>
            Create Page
          </button>
        {:else}
          No type selected.
        {/if}
      </div>
    </div>
    {#if selectedType && building}
      Page build Progress...
      <progress value={currentProgress} max={selectedType.timeToComplete}></progress>
    {/if} 
    <footer>
      <button class="secondary" on:click={closeDialog}>X</button>
    </footer>
  </article>
</dialog>

<style>
  .flex { 
    display: flex;
  }
  
  .flex-child {
    flex: 1;
  }


  .wide {
    width: 100%;
  }
</style>