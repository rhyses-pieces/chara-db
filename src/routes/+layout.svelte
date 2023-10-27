<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { enableCodeKey } from "$lib/store-keys";
  import { onMount, setContext } from "svelte";
  import type { Writable } from "svelte/store";
  import { localStorageStore } from '@skeletonlabs/skeleton';
  import type { LayoutData } from "./$types";
  import '../app.css';
  
  export let data: LayoutData;
  $: ({ supabase, session } = data);

  const enableCode: Writable<string> = localStorageStore('set-enable-code', 'false');
  setContext(enableCodeKey, enableCode);

  onMount(() => {
    const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>Chara DB</title>
</svelte:head>

<nav class="fixed w-[100vw] z-10 bg-surface-50">
  <ul class="flex gap-2">
    <li><a href="/">Index</a></li>
    <li><a href="/chara">Characters</a></li>
    {#if data.session?.user !== undefined}
      <li><a href="/user">Profile</a></li>
    {:else}
      <li><a href="/login">Login</a></li>
    {/if}
  </ul>
</nav>

<main class="container">
  <slot />
</main>
