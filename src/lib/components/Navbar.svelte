<script lang="ts">
  import { user, logout } from "$lib/utils/pocketbase";
  import Avatar from "./Avatar.svelte";
</script>

<nav class="navbar border-b-2 border-black mb-7">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Chara Db</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal">
      <li><a href="/about">About</a></li>
      <li><a href="/chara">Characters</a></li>
    </ul>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle" aria-label="Toggle submenu">
        <Avatar width="small" />
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul tabindex="0" class="dropdown-content bg-base-100">
        {#if $user !== null}
          <li><a href="/user">Profile</a></li>
        {:else}
          <li><a href="/login">Login</a></li>
        {/if}
          <li><a href="/settings">Settings</a></li>
        {#if $user !== null}
          <li><button class="btn btn-error" on:click={logout}>Logout</button></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>