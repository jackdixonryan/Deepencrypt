<script lang="ts">
import { onMount } from "svelte";

import Navigation from "../components/Navigation.svelte";
import Toolbar from "../components/Toolbar.svelte";
import XpTooltip from "../components/XpTooltip.svelte";

import { contextMenuStore, userStore } from "../stores/index";
import supabase from "$lib/db";
import { getUser } from "$lib/services/user.service";


onMount(async() => {
  const user = supabase.auth.user();

  if (user) {
    const player = await getUser(user.id);
    userStore.set(player);
    if (!$contextMenuStore.user) {
      contextMenuStore.set({
        userCurrentlySkilling: false,
        userLevels: player.getLevels(),
        lastUserTarget: null,
        lastUserMethod: null,
        user: player,
        currentPage: null,
        resourcesAvailable: []
      });  
    }
  } else {
    console.log("WE have no USER");
  }
});
</script>

<div class="wrapper">
  <main class="main-content">
    <XpTooltip></XpTooltip>
    <Navigation></Navigation>
    <slot></slot>
  </main>
</div>

<style>
  .wrapper {
    font-family: 'VT323', monospace;
  }

  .main-content {
    padding: 1rem;
  }
</style>