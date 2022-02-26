
<script lang="ts">
import { goto } from "$app/navigation";
import { createGameUser } from "$lib/helpers";
import supabase from "$lib/supabase";

let errorMessage: string;
let email: string;
let password: string;
let passwordConfirmation: string;

async function getLicense(): Promise<void> {
  if (!email || !password || !passwordConfirmation) {
    errorMessage = `All three fields are required to obtain a license.`;
  } else if (password !== passwordConfirmation) {
    errorMessage = `Passwords do not match.`;
  } else {
    const { user, error } = await supabase.auth.signUp({
      email, password
    });

    if (error) {
      errorMessage = error.message;
    } else {
      await createGameUser(user);
      goto("/license");
    }
  }
}
</script>

<section>
  <article>
    <h1>GET A LICENSE</h1>
    <p>We're so pleased you've decided to do things our way. Fortunately for you, it's all free. Myself and my colleague will only charge a modest tax on all transactions you make on the ERWD marketplace. Pretty good deal, right?</p>
    <p>Just punch in some basic information below and we'll get you set up with a license.</p>
    <form>
      <div class="grid">
        <label for="email">
          Email
          <input type="email" id="email" name="email" placeholder="Email" required bind:value={email} />
        </label>
        <label for="password">
          Password
          <input type="password" id="password" name="password" placeholder="Password" bind:value={password} />
        </label>
        <label for="confirm-password">
          Password
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" bind:value={passwordConfirmation} />
        </label>
      </div>
      <button type="button" on:click={getLicense}>Get a License</button>
      {#if errorMessage}
        <p style="color: red; text-align: center;">{ errorMessage }</p>
      {/if}
    </form>
  </article>
</section>