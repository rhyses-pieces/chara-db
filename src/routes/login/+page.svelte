<script lang="ts">
  import { enhance } from '$app/forms';
  export let form;
  let register = false;
</script>

<section>
  <form method="post" action="?/login" use:enhance>
    {#if register}
      <label for="username">Username</label>
      <input type="text" name="username" id="username" />
    {/if}

    <label for="email">Email</label>
    <input type="email" name="email" id="email" value={form?.email ?? ''} />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" />

    {#if register}
      <button type="submit" formaction="?/register">Register</button>
    {:else}
      <button type="submit">Log in</button>
    {/if}
  </form>

  {#if form?.success}
    <p>{form.message}</p>
  {/if}

  <a href="#top" on:click={() => register = !register}>
    {register ? 'Already have an account? Log in!' : `Don't have an account? Sign up!`}
  </a>
  
</section>