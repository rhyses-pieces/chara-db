<script lang="ts">
  import { browser } from "$app/environment";
  import { invalidate } from "$app/navigation";
  import { enableCodeKey } from "$lib/store-keys";
  import { localStorageStore, setInitialClassState, modeUserPrefers, modeCurrent } from '@skeletonlabs/skeleton';
  import { createSwitch, melt } from "@melt-ui/svelte";
  import { onMount, setContext } from "svelte";
  import { Moon, Sun } from "lucide-svelte";
  import type { Writable } from "svelte/store";
  import type { LayoutData } from "./$types";
  import '../app.css';
  
  export let data: LayoutData;
  $: ({ supabase, session } = data);

  const enableCode: Writable<string> = localStorageStore('set-enable-code', 'false');
  setContext(enableCodeKey, enableCode);

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session?.expires_at !== session?.expires_at) invalidate("supabase:auth");
    });

    return () => subscription.unsubscribe();
  });
  
  const {
    elements: { root, input },
    states: { checked },
  } = createSwitch({
    checked: modeCurrent,
  });

  $: $modeUserPrefers = $checked;
  $: {
    if (browser) {
      ($modeUserPrefers) ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
    }
  }
</script>

<svelte:head>
  <title>Chara DB</title>
  {@html `<script>(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<nav class="fixed flex gap-5 justify-center items-center top-0 left-0 w-[100vw] z-10 bg-surface-100-800-token py-5">
  <ul class="flex gap-4">
    <li><a href="/">Index</a></li>
    <li><a href="/chara">Characters</a></li>
    {#if data.session?.user !== undefined}
      <li><a href="/user">Profile</a></li>
    {:else}
      <li><a href="/login">Login</a></li>
    {/if}
  </ul>

  {#if data.session !== null}
    <div class="ml-5 mr-10">
      <form action="/user?/logout" method="post">
        <button class="btn-sm rounded-sm variant-ghost-warning" type="submit">Logout</button>
      </form>
    </div>
  {/if}

  <div class="relative top-[2px] left-[2px] box-border self-end">
    <button
      use:melt={$root}
      class="relative h-6 rounded-full bg-surface-50-900-token border-token border-surface-50-900-token transition-colors ring-2 ring-surface-900-50-token"
      id="light-switch"
      aria-label="Toggle light mode and dark mode"
    >
      <div class="thumb bg-surface-900-50-token rounded-full transition">
        {#if $modeCurrent}
          <Sun class="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 fill-white stroke-white" size={16} />
        {:else}
          <Moon class="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 fill-surface-900 stroke-surface-900" size={16} />
        {/if}
      </div>
    </button>
    <input use:melt={$input} />
  </div>
</nav>

<main class="container mx-auto mt-[6.5rem]">
  <slot />
</main>

<style>
  button#light-switch {
    --w: 2.75rem;
    --padding: 0.015rem;
    width: var(--w);
  }
 
  .thumb {
    --size: 1.25rem;
    position: relative;
    width: var(--size);
    height: var(--size);
    transform: translateX(var(--padding));
  }
 
  :global([data-state='checked']) .thumb {
    transform: translateX(calc(var(--size) - var(--padding)));
  }
</style>