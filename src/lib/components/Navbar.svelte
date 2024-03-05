<script lang="ts">
  import { user, logout } from "$lib/utils/pocketbase";
  import Avatar from "./Avatar.svelte";
</script>

<nav class="navbar">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Chara Db</a>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <Avatar width="small" />
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul tabindex="0" class="dropdown-content">
        {#if $user === null}
        <li><a href="/login">Login</a></li>
        {:else}
        <li><a href="/user">Profile</a></li>
        {/if}
        <li><a href="/settings">Settings</a></li>
        {#if $user !== null}
          <li><button class="btn btn-error" on:click={logout}>Logout</button></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>