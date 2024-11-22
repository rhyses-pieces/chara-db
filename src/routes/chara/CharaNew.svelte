<script lang="ts">
  import { enableCode, triggerToast } from "$lib/utils/stores";
  import CodeEditor from "$lib/components/editors/CodeEditor.svelte";
  import RichTextEditor from "$lib/components/editors/RichTextEditor.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import { goto, preventChange, preventUnload, url } from "elegua";
  import { onDestroy, onMount } from "svelte";

  let content = $state("");
  let isDirty_ = $state(false);
  let triggerDialog = $state(false);

  $effect(() => {
    isDirty_ = content !== "";
  });

  onMount(() => {
    // window.onbeforeunload = event => {
    //   if (event) suite.reset();
    //   suite.reset();
    // }
  });

  onDestroy(() => {
    preventChange();
  });
</script>

<svelte:window use:preventUnload={() => isDirty_} />
<h1>Add new character</h1>

<form>
  <label class="form-control">
    <span class="label-text">Name</span>
    <input type="text" name="name" id="name" required />
  </label>

  <label id="editor-label" class="label pb-0">
    <span class="label-text">Editor</span>
    <input type="hidden" name="content" id="content" bind:value={content} />
  </label>

  {#if $enableCode}
    <CodeEditor label="editor-label" bind:value={content} input={(init: string) => (content = init)} />
  {:else}
    <RichTextEditor label="editor-label" bind:value={content} />  
  {/if}

  <button class="btn btn-primary">Submit</button>
</form>

<Dialog bind:triggerDialog id="confirm-leave">
  {#snippet title()}
    <h2 >Are you sure?</h2>
  {/snippet}
  <p>You may lose data if you navigate away without saving.</p>
  {#snippet button()}
    <div>
      <form method="dialog" class="modal-action">
        <button class="btn btn-error" onclick={() => preventChange()}>Confirm</button>
        <button class="btn bg-gray-500">Cancel</button>
      </form>
    </div>
  {/snippet}
</Dialog>

<style lang="postcss">
  :global(.editor) {
    grid-column: 2;
  }
</style>