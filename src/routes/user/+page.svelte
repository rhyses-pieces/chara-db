<script lang="ts">
  import { enhance } from '$app/forms';
  import { enableCodeKey } from '$lib/store-keys';
  import { getContext } from 'svelte';
  import { createSwitch, melt } from '@melt-ui/svelte';
  import Dialog from '$lib/components/ui/Dialog.svelte';
  import type { Writable } from 'svelte/store';
  import type { SubmitFunction } from '@sveltejs/kit';

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
  <h3>{JSON.parse($enableCode) ? "Disable" : "Enable"} code editor?</h3>
  <p>If this is checked <strong>{JSON.parse($enableCode) ? "off" : "on"}</strong>, this will change the editor from {JSON.parse($enableCode) ? "code editor to WYSISYG" : "WYSIWYG to code editor"}!</p>
  <label class="flex items-center gap-4 mt-2 mb-3 cursor-default">
    <button 
      use:melt={$root}
      class="relative h-6 rounded-full bg-primary-500 transition-colors data-[state=checked]:bg-surface-900-50-token"
      name="enable-code" 
      id="enable-code" 
    >
      <span class="thumb block rounded-full bg-surface-50-900-token transition" />
    </button>
    <div>Checked {$input.checked ? "on" : "off"}</div>
  </label>
  <input use:melt={$input} />
  <Dialog confirm={true}>
    <button slot="trigger" let:trigger use:trigger.action {...trigger} class="btn variant-filled-primary">
      Confirm
    </button>
    
    <header slot="title" let:title use:title.action {...title} class="font-mono font-bold text-2xl">
      Are you sure you want to switch editor modes?
    </header>
    <p slot="description" let:description use:description.action {...description}>
      You could potentially lose data upon switching editor modes. Do you want to confirm this choice?
    </p>

    <button 
      slot="confirm" 
      let:close 
      use:close.action 
      {...close} 
      class="btn variant-filled-surface"
      on:m-click={() => $enableCode = String($input.checked)}
    >
      Confirm
    </button>
  </Dialog>

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