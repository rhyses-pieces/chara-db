<script lang="ts">
  import { enhance } from '$app/forms';
  import { enableCodeKey } from '$lib/store-keys';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { createDialog, createSwitch, melt } from '@melt-ui/svelte';
  import { X } from 'lucide-svelte';

  export let data;
  export let form;

  let editUser = false;
  let editPassword = false;
  let loading = false;

  const enableCode = getContext<Writable<string>>(enableCodeKey);

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
  } = createSwitch({
    defaultChecked: JSON.parse($enableCode),
  });
</script>

<section>
  <h1>Welcome {session.user.user_metadata.username}!</h1>

  <p>{user?.email}</p>
  <p>{user?.created_at}</p>

  {#if editUser}
    <form action="?/update" method="post" use:enhance={handleUpdateUser}>
      <input type="text" name="username" id="username" value={form?.user?.user_metadata.username ?? ''} />
      <input type="email" name="email" id="email" value={form?.user?.email ?? ''} />
      <button type="submit" disabled={loading}>Update</button>
    </form>
    <button on:click={() => editUser = false}>Cancel</button>
  {:else}
    <button on:click={() => editUser = true}>Edit info</button>
  {/if}

  {#if editPassword}
    <form action="?/password" method="post">
      <input type="password" name="password" id="password" />
      <input type="password" name="confirm" id="confirm" />
      <button type="submit">Confirm update password</button>
    </form>
    <button on:click={() => editPassword = false}>Cancel</button>
  {:else}
    <button on:click={() => editPassword = true}>Update password</button>
  {/if}

  <h2>Characters</h2>
  <section>
    <ul>
      {#if characters !== null}
        {#each characters as chara (chara.id)}
          <li><a href={`/chara/${chara.id}`}>{chara.name}</a></li>
        {/each}
      {/if}
    </ul>
    <a href="/chara/new">Add new character?</a>
  </section>

  <h2>Settings</h2>
  <label for="enable-code" id="enable-code-label">Enable code editor?</label>
  <p>If this is enabled, this will change the editor from WYSIWYG to source code!</p>
  <button 
    use:melt={$root}
    class="relative h-6 cursor-default rounded-full bg-blue-800 transition-colors data-[state=checked]:bg-blue-950"
    name="enable-code" 
    id="enable-code" 
    aria-labelledby="enable-code-label"
  >
    <span class="thumb block rounded-full bg-white transition" />
  </button>
  <input use:melt={$input} />
  <button use:melt={$trigger}>Confirm change</button>

  <div use:melt={$portalled}>
    {#if $open}
      <div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
      <div 
        use:melt={$content}
        class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl p-6 shadow-lg bg-surface-50"
      >
        <h2 use:melt={$title}>Are you sure you want to switch editor modes?</h2>
        <p use:melt={$description}>You will lose data upon switching editor modes.</p>

        <div class="mt-6 flex justify-end gap-4">
          <button use:melt={$close}>Cancel</button>
          <button 
            type="submit"
            use:melt={$close}
            on:m-click={() => $enableCode = String($input.checked)}
          >
            Confirm
          </button>
        </div>

        <button 
          use:melt={$close}
          aria-label="close"
          class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
          items-center justify-center rounded-full p-1 text-gray-500
          hover:bg-blue-100 focus:shadow-blue-400"
        >
          <X size={20} />
        </button>
      </div>
    {/if}
  </div>

  <form action="?/logout" method="post" use:enhance={handleLogout}>
    <button type="submit" disabled={loading}>Log out</button>
  </form>
</section>

<style lang="postcss">
  #enable-code {
    --w: 2.75rem;
    --padding: 0.125rem;
    width: var(--w);
  }

  .thumb {
    --size: 1.25rem;
    width: var(--size);
    height: var(--size);
    transform: translateX(var(--padding));
  }
 
  :global([data-state='checked']) .thumb {
    transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
  }
</style>