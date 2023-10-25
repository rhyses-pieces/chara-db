<script lang="ts">
  import { enableCode } from '$lib/store';
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { createDialog, createSwitch, melt } from '@melt-ui/svelte';
    import { X } from 'lucide-svelte';

  export let data;
  export let form;

  let { session, user, characters } = data;
  let editUser = false;
  let loading = false;
  $: ({ session, user, characters } = data);

  const handleUpdateUser: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    }
  }

  const handleLogout: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    }
  }

  const {
    elements: { trigger, overlay, content, title, description, close, portalled },
    states: { open },
  } = createDialog({
    role: 'alertdialog',
  });

  const {
    elements: { root, input },
  } = createSwitch();
</script>

<section>
  <h1>Welcome {session.user.user_metadata.username}!</h1>

  <p>{user?.email}</p>
  <p>{user?.created_at}</p>

  {#if editUser}
    <form action="?/update" method="post" use:enhance={handleUpdateUser}>
      <input type="text" name="username" id="username" value={form?.username ?? ''} />
      <button type="submit" disabled={loading}>Update</button>
    </form>
  {:else}
    <button on:click={() => editUser = !editUser}>Edit info</button>
  {/if}

  <h2>Characters</h2>
  <section>
    {JSON.stringify(characters)}
    <a href="/chara/new">Add new character?</a>
  </section>

  <form>
    <label for="enable-code" id="enable-code-label">Enable code editor?</label>
    <p>If this is enabled, this will change the editor from WYSIWYG to source code!</p>
    <button 
      use:melt={$root}
      name="enable-code" 
      id="enable-code" 
      aria-labelledby="enable-code-label"
    >
      <span />
    </button>
    <input use:melt={$input} />
    <button use:melt={$trigger}>Confirm change</button>

    <div use:melt={$portalled}>
      {#if $open}
        <div use:melt={$overlay} />
        <div use:melt={$content}>
          <h2 use:melt={$title}>Are you sure you want to switch editor modes?</h2>
          <p use:melt={$description}>You will lose data upon switching editor modes.</p>
          <button use:melt={$close}>Cancel</button>
          <button 
            type="submit"
            use:melt={$close}
            on:m-click={() => $enableCode = $input.checked}
          >
            Confirm
          </button>
        </div>

        <button 
          use:melt={$close}
          aria-label="close"
        >
          <X />
        </button>
      {/if}
    </div>
  </form>

  <form action="?/logout" method="post" use:enhance={handleLogout}>
    <button type="submit" disabled={loading}>Log out</button>
  </form>
</section>

