<script lang="ts">
  import { user, pb } from "$lib/utils/pocketbase";
  interface Props {
    width?: string;
  }

  let { width = "big" }: Props = $props();
  let size = $derived(width === "small" ? "w-10" : "w-48");
</script>

<div class="avatar" class:placeholder={$user === null || $user.avatar === ""} role="presentation">
  <div class={`${size} bg-blue-500 bordered rounded-full transition-all shadow hover:shadow-none`} class:shadow-sm={width === "small"}>
    {#if $user !== null && $user.avatar !== ""}
      <img src={pb.files.getUrl($user, $user.avatar, { thumb: '200x200' })} alt={`Icon for ${$user.username}`} />
    {:else if $user !== null}
      <span class={width === "small" ? "text-base" : "text-3xl"} aria-hidden="true">
        {#if width === "small"}
          {$user.username.at(0).toUpperCase() + $user.username.at(1).toUpperCase()}
        {:else}
          {$user.username}
        {/if}
      </span>
    {:else}
      <span class={width === "small" ? "text-base" : "text-3xl"} aria-hidden="true">
        ??
      </span>
    {/if}
  </div>
</div>