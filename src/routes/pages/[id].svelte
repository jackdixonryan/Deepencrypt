
<script lang="ts" context="module">
  export function load({ params }) {
    const { id } = params;
    return { props: { id } };
  }
</script>

<script lang="ts">
  import { getPage } from "../../lib/helpers";
  import { onMount } from "svelte";
 
  export let id;
  let page; 

  onMount(async () => {
    page = await getPage(id);
    console.log(page);
  });

</script>

<h1>PAGE { id }</h1>