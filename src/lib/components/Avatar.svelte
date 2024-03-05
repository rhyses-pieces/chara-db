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
  <figure class="avatar placeholder">
    <div class={`w-${size} bg-blue-500 border border-black rounded-full p-3 shadow hover:shadow-none`}>
      <span class={width === "small" ? "text-md" : "text-3xl"}>Hi</span>
    </div>
  </figure>
{/if}