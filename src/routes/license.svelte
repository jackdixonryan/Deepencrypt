<script lang="ts">
import { goto } from "$app/navigation";

import supabase from "$lib/supabase";
import type { User } from "@supabase/supabase-js";
import { userStore } from "../stores";
import { onMount } from "svelte";

let user: User;
let player;

onMount(() => {
  user = supabase.auth.user();
  userStore.subscribe((userRecord) => {
    player = userRecord;
  });
});
</script>

{#if user && player}
<section>
  <!-- <h1>{}</h1> -->
  <article>
    Welcome to your new profile. I'm pleased that you decided to join us - it is free, after all, so why not? You have been issued a license to prospect this site. This license bears with it a license number. Your license number is your identifier on this site, and it will be the source of truth for everything about you - your currency balance, your skill rankings, your pages, your titles, and your achievements. Go ahead and take a look.
  </article>

  <article>
    <header>
      <hgroup>
        <h4>License No.</h4>
        <h3>{ user.id }</h3>
      </hgroup>
    </header>
    <h4>BASIC</h4>
    <ul>
      <li>TOTAL LEVEL: 0</li>
      <li>EMAIL: {user.email}</li>
      <li>CREATED ON: {user.created_at}</li>
      <li>LAST SEEN: {user.last_sign_in_at}</li>
    </ul>
    <h4>SKILLS</h4>
      <ul>
        {#each Object.entries(player.skillMatrix) as [skillName, xp]}
          <li>{ skillName }: { xp }</li>
        {/each}
      </ul>
  </article>

  <article>
    <p>So, you haven't trained any skills yet. That's alright. You haven't got a toolbar yet, that's probably part of the problem. When you're ready, click the button to begin the toolbar tutorial and start your journey toward prosperity.</p>
    <a href="/introduction/toolbar"><button>START TUTORIAL</button></a>
  </article>
</section>
{:else}
<section>
  <article>
    <header>Already Licensed?</header>
    <a href="/access-license">
      <button>Access your License</button>
    </a>
  </article>
  <article>
    <header>Looks like you haven't got a license yet.</header>
    A working license is required to interact with the mainframe. Without a license, I fear there's nothing we can do for you. Fortunately, myself and my comrades are willing to issue you a license for no additional fee.
    <footer>
      <a href="/get-license"><button>Get a License</button></a>
    </footer>
  </article>
</section>
{/if}