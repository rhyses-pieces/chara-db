<script lang="ts">
  import { user } from "$lib/utils/pocketbase";
  import { enableCode } from "$lib/utils/stores";
  import Dialog from "$lib/components/Dialog.svelte";

  let triggerDialog = false;
</script>

<h1>Settings</h1>
{#if $user !== null}
<h2>Change editor modes</h2>
<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Enable</span>
    <input type="checkbox" class="toggle" bind:checked={$enableCode} on:click={() => (triggerDialog = true)} />
    {$enableCode}
  </label>
</div>

<Dialog bind:triggerDialog>
  <h2 slot="title">Are you sure?</h2>
  <p>If you switch now, there might be data loss.</p>
  <div slot="button">
    <form method="dialog" class="modal-action">
      <button class="btn btn-error">Yes</button>
      <!-- this is to reset the bind:checked value to the previous value -->
      <button class="btn bg-gray-500" on:click={() => $enableCode = !$enableCode}>No</button>
    </form>
  </div>
</Dialog>
{/if}

<h2>Select Theme</h2>
<p>hi</p>