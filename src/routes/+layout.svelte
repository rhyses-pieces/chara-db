<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Lightswitch from "$lib/components/ui/Lightswitch.svelte";
  import { enableCodeKey } from "$lib/store-keys";
  import { localStorageStore, initializeStores, setInitialClassState, Toast } from '@skeletonlabs/skeleton';
  import { onMount, setContext } from "svelte";

  import type { Writable } from "svelte/store";
  import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
  import type { LayoutData } from "./$types";
  import '../app.css';
  
  export let data: LayoutData;
  $: ({ supabase, session } = data);

  const enableCode: Writable<string> = localStorageStore('set-enable-code', 'false');
  setContext(enableCodeKey, enableCode);
  initializeStores();

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, _session: Session | null) => {
      if (_session?.expires_at !== session?.expires_at) invalidate("supabase:auth");
    });

    return () => subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>Chara DB</title>
  {@html `<script>(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<Toast />

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

  <Lightswitch classes="relative top-[2px] left-[2px] box-border self-end" />
</nav>

<main class="container mx-auto mt-[6.5rem]">
  <slot />
</main>
