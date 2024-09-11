<script lang="ts">
  export let triggerDialog: boolean;
  export let width = "small";
  export let id = "";
  let dialog: HTMLDialogElement;
  $: if (dialog && triggerDialog) dialog.show();
  $: size = width === "big" ? "w-11/12 max-w-5xl" : ""
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog 
  bind:this={dialog} 
  id={id}
  class="modal"
  on:close={() => (triggerDialog = false)} 
  on:click|self={() => dialog.close()}
  on:keydown={e => { if (e.code === "Escape") dialog.close(); }}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class={`modal-box ${size} bordered shadow`}>
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