<script lang="ts">
  import { user } from "$lib/utils/pocketbase";
  export let width = "big";
  $: size = width === "small" ? "10" : "24";
</script>

{#if $user !== null}
  <figure class="avatar">
    <div class={`w-${size}`}>
      <img src={$user.avatar} alt={`Icon for ${$user.username}`} />
    </div>
  </figure>
{:else}
  <div class="avatar placeholder" aria-label="Placeholder avatar">
    <div class={`w-${size} bg-blue-500 bordered rounded-full p-3 shadow hover:shadow-none`}>
      <span class={width === "small" ? "text-md" : "text-3xl"} aria-hidden="true">Hi</span>
    </div>
  </div>
{/if}