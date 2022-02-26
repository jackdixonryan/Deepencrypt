
<script lang="ts">
  import { goto } from "$app/navigation";

  async function getLicense() { 
    goto("/get-license");
  }
</script>

<section>
  <h1>ERWD PROTOCOL</h1>
  <p>Welcome, <strong>USER</strong>. We are certain your journey to reach this point was long and difficult. Welcome to the mainframe of the ERWD program, October 11, 2493 LAST UPDATE. We hope that your arrival at this point was not too taxing.</p>
  <p>Here at ERWD, we pride ourselves on <kbd class="red">ERROR: PRODUCT DESCRIPTION HAS BEEN REDACTED.</kbd> and we are pleased that you will join us on this journey. New employees, like you, can write files, create data, mine resources, and learn about the company from the ERWD website. Isn't that neat?</p>
  <p><kbd class="red">USER NOT FOUND</kbd> has been given complete access to the system, including all of the modules, pages, and designs! Your job on day one includes:</p>
  <ul>
    <li>Crafting your own portal page</li>
    <li>Mining your first company resource</li>
    <li>Hunting your first bug bounty</li>
    <li>Creating a</li>
  </ul>

  <article class="loader">
    <h3>* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *</h3>
    <h2>SYSTEM OVERRIDE</h2>

    <p style="text-align:justify;">Hello. Welcome to ERWD's ashes. Call me the prospector. I'm going to go ahead and override the system's orientation protocol. There was some interesting stuff in it, once, but no longer. It's been mined to hell, enough that most of its core functions are glitchy - not glitchy enough to know the ERWD hasn't been in commission for 1300 years, apparently.</p>
    <p style="text-align:justify;">I know this is all slightly confusing and a bit unpleasant, but you will find answers in time. For the moment, the system's authentication protocols are offline... well, that's not entirely true. Myself and a colleague have gutted them completely to open the floodgates for enterprising web prospectors and archaeologists to come in and make their fortune, or find the knowledge they seek. We're not fools though! The gold rushes of ancient times taught us one thing: Those who control the means of access, control the system. So we've implemented our own authentication protocol. That makes some people angry, but... Well, I just don't care. Go ahead and click in when you're ready. Otherwise, enjoy missing out on the fortune of a lifetime.</p>
    
    <button on:click={getLicense}>Get an ERWD Prospector's License</button>

  </article>
</section>

<style>
  .red {
    background-color: red;
  }

  .loader {
    text-align: center;
  }
</style>

