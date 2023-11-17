<script lang="ts">
  import { createDialog, melt } from "@melt-ui/svelte";
  import { X } from "lucide-svelte";

  export let confirm: boolean = false;
  export let open: boolean = false;
  export let size: string = "normal";
  let dialog: any;
  let className = "";

  const {
    elements: { 
      trigger: triggerBuilder, 
      portalled, 
      overlay, 
      content, 
      title: titleBuilder, 
      description: descriptionBuilder, 
      close: closeBuilder,
    },
    states: { open: opened },
  } = createDialog({
    role: (confirm) ? "alertdialog" : "dialog",
  });

  $: trigger = $triggerBuilder;
  $: title = $titleBuilder;
  $: description = $descriptionBuilder;
  $: close = $closeBuilder;

  $: if (dialog && open) opened.set(true);
  $: if (size === 'wide') {
    className = "max-h-[100vh] w-modal-wide";
  } else if (size === 'normal') {
    className = "max-h-[85vh] w-modal";
  } else if (size === 'slim') {
    className = "max-h-[85vh] w-modal-slim";
  }
</script>

{#if $$slots.trigger}
  <slot name="trigger" {trigger} />
{/if}

<div use:melt={$portalled}>
  {#if $opened}
    <div use:melt={$overlay} class="fixed inset-0 z-50 bg-surface-backdrop-token" />
    <div use:melt={$content} bind:this={dialog} class={`fixed left-1/2 top-1/2 z-50 translate-x-[-50%] translate-y-[-50%] rounded-container-token bg-surface-50-900-token p-6 shadow-lg ${className}`}>
      <slot name="title" {title} />
      <slot name="description" {description} />
      <slot />
      <div class="mt-6 justify-end gap-4">
        {#if confirm}
          <button use:melt={$closeBuilder} class="btn variant-ghost-surface">Cancel</button>
          <slot name="confirm" {close}>
            <button use:melt={$closeBuilder} class="btn variant-filled-primary">
              Confirm
            </button>
          </slot>
        {:else}
          <slot name="confirm" {close}>
            <button use:melt={$closeBuilder} class="btn variant-ghost-surface">OK</button>
          </slot>
        {/if}
      </div>
      <button 
        use:melt={$closeBuilder}
        aria-label="Close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-md p-1 text-on-error-token bg-error-400-500-token hover:bg-error-hover-token"
      >
        <X size={24} />
      </button>
    </div>
  {/if}
</div>
