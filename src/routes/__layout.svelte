<script lang="ts">
import { onMount } from "svelte";

import Navigation from "../components/Navigation.svelte";
import Toolbar from "../components/Toolbar.svelte";
import XpTooltip from "../components/XpTooltip.svelte";

import { userStore } from "../stores/index";
import supabase from "$lib/db";
import { getUser } from "$lib/services/user.service";


onMount(async() => {
  const user = supabase.auth.user();

  if (user) {
    const player = await getUser(user.id);
    userStore.set(player);
  } else {
    console.log("WE have no USER");
  }
});
</script>

<main class="container">
  <XpTooltip></XpTooltip>
  <Navigation></Navigation>
  <slot></slot>
</main>
<Toolbar />

<style>
  main {
    font-family: 'VT323', monospace;
  }
</style>