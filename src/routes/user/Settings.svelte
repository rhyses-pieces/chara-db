<script lang="ts">
  import { user } from "$lib/utils/pocketbase";
  import { enableCode, theme } from "$lib/utils/stores";
  import Dialog from "$lib/components/Dialog.svelte";

  let triggerDialog = false;
</script>

<h1>Settings</h1>
{#if $user !== null}
<h2>Change editor modes</h2>
<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Code editing mode: {$enableCode ? "Enabled" : "Disabled"}</span>
    <button class="btn swap" class:swap-active={$enableCode} on:click={() => (triggerDialog = true)}>
      <div class="swap-on">&#10003;</div>
      <div class="swap-off">&nbsp;</div>
    </button>
  </label>
</div>

<Dialog bind:triggerDialog id="enable-code-confirm">
  <h2 slot="title">Are you sure?</h2>
  <p>If you switch now, there might be data loss.</p>
  <div slot="button">
    <form method="dialog" class="modal-action">
      <button class="btn btn-error" on:click={() => $enableCode = !$enableCode}>Yes</button>
      <button class="btn bg-gray-500">No</button>
    </form>
  </div>
</Dialog>

<h2>Change email</h2>
<form id="changeEmail">
  <label class="form-control">
    <span class="label-text">Email</span>
    <input type="email" name="email" id="email" autocomplete="email" />
  </label>
  <label class="form-control">
    <span class="label-text">Confirm email</span>
    <input type="email" name="emailConfirm" id="emailConfirm" autocomplete="email" />
  </label>
  <button class="btn btn-primary">Verify email</button>
</form>

<h2>Change password</h2>
<form id="changePassword">
  <label class="form-control">
    <span class="label-text">Password</span>
    <input type="password" name="password" id="password" autocomplete="current-password" />
  </label>
  <label class="form-control">
    <span class="label-text">Confirm password</span>
    <input type="password" name="passwordConfirm" id="passwordConfirm" autocomplete="off" />
  </label>
  <button class="btn btn-primary">Confirm change</button>
</form>
{/if}

<h2>Select Theme</h2>
<div class="dropdown mb-72">
  <div tabindex="0" role="button" class="btn m-1">
    Theme
  </div>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
    <li><input type="radio" bind:group={$theme} name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
  </ul>
</div>