
<script lang="ts">
  import { goto } from "$app/navigation";
  import { userStore } from "../stores";
  
  import supabase from "$lib/db";
  
  let errorMessage: string;
  let email: string;
  let password: string;

  async function getLicense(): Promise<void> {
    const { user, error } = await supabase.auth.signIn({
      email, password
    });

    if (error) {
      errorMessage = error.message;
    } else {
      userStore.set(user);
      goto("/license");
    }
  }
</script>
  
  <section>
    <article>
      <h1>ACCESS LICENSE</h1>
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
        </div>
        <button type="button" on:click={getLicense}>Access License</button>
        {#if errorMessage}
          <p style="color: red; text-align: center;">{ errorMessage }</p>
        {/if}
      </form>
    </article>
  </section>