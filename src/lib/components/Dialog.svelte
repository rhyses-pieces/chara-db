<script lang="ts">
  export let triggerDialog: boolean;
  let dialog: HTMLDialogElement;
  $: if (dialog && triggerDialog) dialog.show();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog 
  bind:this={dialog} 
  class="modal modal-bottom sm:modal-middle"
  on:close={() => (triggerDialog = false)} 
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="modal-box bordered shadow">
    <slot name="title" />
    <slot />
    <slot name="button">
    <div class="modal-action">
      <form method="dialog">
        <button class="btn" on:click={() => dialog.close()}>x</button>
      </form>
    </div>
    </slot>
  </div>
</dialog>