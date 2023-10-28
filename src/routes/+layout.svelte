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

<nav class="fixed flex justify-center top-0 left-0 w-[100vw] z-10 bg-surface-50-900-token">
  <ul class="flex gap-2">
    <li><a href="/">Index</a></li>
    <li><a href="/chara">Characters</a></li>
    {#if data.session?.user !== undefined}
      <li><a href="/user">Profile</a></li>
    {:else}
      <li><a href="/login">Login</a></li>
    {/if}
  </ul>

  <div class="inline-block self-end">
    <button
      use:melt={$root}
      class="relative h-6 rounded-full bg-surface-100-800-token transition-colors data-[state-checked]:bg-surface-900"
      id="light-switch"
      aria-label="Toggle light mode and dark mode"
    >
      <div class="thumb transition">
        {#if $modeCurrent}
          <Sun />
        {:else}
          <Moon />
        {/if}
      </div>
    </button>
    <input use:melt={$input} />
  </div>
</nav>

<main class="container mx-auto mt-10">
  <slot />
</main>

<style>
  button#light-switch {
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