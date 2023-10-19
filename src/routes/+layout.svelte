<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  
  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>Chara DB</title>
</svelte:head>

<main class="container">
  <slot />
</main>

<nav>
  <a href="/">Index</a>
  {#if data.session?.user !== undefined}
    <a href="/user">Profile</a>
  {:else}
    <a href="/login">Login</a>
  {/if}
</nav>
