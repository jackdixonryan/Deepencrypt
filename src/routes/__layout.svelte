<script lang="ts">
import Navigation from "../components/Navigation.svelte";
import Toolbar from "../components/Toolbar.svelte";
import { userStore } from "../stores/index";
import supabase from "$lib/supabase";
import { fetchGameUser } from "$lib/helpers";
import { onMount } from "svelte";


onMount(async() => {
  const user = supabase.auth.user();

  if (user) {
    const player = await fetchGameUser(user.id);
    userStore.set(player);
  } else {
    console.log("WE have no USER");
  }
});
</script>

<main class="container">
  <Navigation></Navigation>
  <slot></slot>
</main>
<Toolbar />

<style>
  main {
    font-family: 'VT323', monospace;
  }
</style>