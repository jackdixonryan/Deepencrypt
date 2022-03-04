
<script lang="ts" context="module">
  export function load({ params }) {
    const { id } = params;
    return { props: { id } };
  }
</script>

<script lang="ts">
  import { getPage } from "$lib/services/page.service";
  import { onMount } from "svelte";
  import { userStore } from "../../stores";
  import type Mineable from "$lib/classes/resources/mineable";
  import type Page from "$lib/classes/resources/page";
  import type User from "$lib/classes/user";
  import ContextMenu from "../../components/contextMenu/ContextMenu.svelte";

  export let id: string;
  let page: Page; 
  let user: User;
  let resources: Mineable[];


  userStore.subscribe((value: User) => {
    user = value;
  });

  onMount(async () => {
    const response: { page: Page, resources: Mineable[] } = await getPage(id);
    page = response.page;
    resources = response.resources;
  });

</script>

{#if page}
  <h1>PAGE { id }</h1>
  {#if resources && resources.length > 0}
    <table>
      <thead>
        <tr>
          <th>Resource ID</th>
          <th>Resource Type</th>
        </tr>
      </thead>
      <tbody>
        {#each resources as resource}
          <tr data-element={`mineable:${resource.id}`}>
            <th data-element={`mineable:${resource.id}`}>{resource.id}</th>
            <td data-element={`mineable:${resource.id}`}>{resource.type.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <ContextMenu context={{ page, user, resources }}/>
  {:else}
    PAGE is DEAD
  {/if}
{:else}
  PAGE not FOUND
{/if}
