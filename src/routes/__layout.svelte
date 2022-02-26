<script lang="ts">
  import Navigation from "../components/Navigation.svelte";
  import Toolbar from "../components/Toolbar.svelte";
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