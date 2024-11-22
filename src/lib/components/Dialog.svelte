<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    triggerDialog: boolean;
    width?: string;
    id?: string;
    title?: Snippet;
    children?: Snippet;
    button?: Snippet;
  }

  let {
    triggerDialog = $bindable(),
    width = "small",
    id = "",
    title,
    children,
    button
  }: Props = $props();
  let dialog = $state() as HTMLDialogElement;
  let size = $derived(width === "big" ? "w-11/12 max-w-5xl" : "")

  $effect(() => {
    if (dialog && triggerDialog) dialog.show();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog 
  bind:this={dialog} 
  id={id}
  class="modal"
  onclose={() => (triggerDialog = false)} 
  onclick={e => { if (e.target === dialog) dialog.close() }}
  onkeydown={e => { if (e.code === "Escape") dialog.close(); }}
>
  <div class={`modal-box ${size} bordered shadow`}>
    {@render title?.()}
    {@render children?.()}
    {#if button}{@render button()}{:else}
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" onclick={() => dialog.close()}>x</button>
        </form>
      </div>
    {/if}
  </div>
</dialog>