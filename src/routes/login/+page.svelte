<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import type { PageData } from './$types';
  
  export let data: PageData;
  let register = false;

  const toastStore = getToastStore();

  const { form, errors, enhance } = superForm(data.loginForm, {
    onUpdated() {
      if (data.loginForm.message) {
        toastStore.trigger({
          message: data.loginForm.message,
          classes: ($errors) ? 'variant-filled-error' : 'variant-filled-success',
        });
      }
    },
    resetForm: true,
  });

  const {
    form: registerForm,
    errors: registerErrors,
    enhance: registerEnhance,
    message: registerMessage,
  } = superForm(data.registerForm, {
    onUpdated () {
      if ($registerMessage) {
        toastStore.trigger({
          message: $registerMessage,
          classes: ($registerErrors) ? 'variant-filled-error' : 'variant-filled-success',
        });
      }
    },
    resetForm: true,
  });

  
</script>

<section>
  {#if register}
  <h1>Register</h1>
    <form method="post" action="?/register" use:registerEnhance>
      <label for="username">Username</label>
      <input 
        type="text" 
        name="username" 
        id="username"
        aria-invalid={$registerErrors.username ? 'true' : undefined}
        aria-describedby={$registerErrors.username ? 'username-error' : undefined}
        bind:value={$registerForm.username} 
      />
      <div id="username-help">
        Usernames should contain the following:
        <ul>
          <li>At least 2 or more characters.</li>
          <li>Contain only alphanumeric characters.</li>
          <li>No special characters or whitespaces.</li>
          <li>Cannot contain a single string of repeating characters (example: <pre>ddddd</pre>)</li>
        </ul>
      </div>
      {#if $registerErrors.username}
        <span id="username-error" class="text-sm text-error-50-900-token">{$registerErrors.username}</span>
      {/if}

      <label for="email">Email</label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        bind:value={$registerForm.email}
      />

      <label for="password">Password</label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        autocomplete="new-password"
        bind:value={$registerForm.password} 
      />

      <button type="submit">Register</button>
    </form>
  {:else}
  <h1>Login</h1>
    <form method="post" action="?/login" use:enhance>
      <label for="email">Email</label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        autocomplete="username"
        bind:value={$form.email} 
      />

      <label for="password">Password</label>
      <input type="password" name="password" id="password" bind:value={$form.password} />

      <button type="submit">Log in</button>
    </form>
  {/if}

  <a href="#top" on:click={() => register = !register}>
    {register ? 'Already have an account? Log in!' : `Don't have an account? Sign up!`}
  </a>
  
</section>