<script lang="ts">
  import { createToolbar, melt } from '@melt-ui/svelte';
  import {
    textStyleItems,
    listItems,
    controlItems,
    blockItems,
  } from './constants';
  import ToolbarSelect from './ToolbarSelect.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import type { Editor } from 'svelte-tiptap';

  export let editor: Editor;

  const {
    elements: { root, separator, button },
    builders: { createToolbarGroup },
  } = createToolbar();

  const {
    elements: { group: textStyleGroup, item: textStyle },
  } = createToolbarGroup({
    type: 'multiple',
  });

  const {
    elements: { group: listGroup, item: list },
  } = createToolbarGroup({
    type: 'multiple',
  });

  const {
    elements: { group: blockGroup, item: block },
  } = createToolbarGroup({
    type: 'multiple',
  });

  const {
    elements: { group: controlGroup, item: control },
  } = createToolbarGroup();
  
  $: action = $textStyle('heading');
</script>

<nav use:melt={$root} class="flex min-w-max items-center gap-3 my-3">
  <div use:melt={$textStyleGroup} class="flex gap-3">
    <ToolbarSelect bind:action editor={editor} />

    {#each textStyleItems as item (item.name)}
      <button
        use:melt={$textStyle(item.name)}
        class="btn-icon {item.active(editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:m-click={() => item.command(editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div class="separator" use:melt={$separator} />
  
  <div use:melt={$listGroup} class="flex gap-3">
    {#each listItems as item (item.name)}
      <button
        use:melt={$list(item.name)}
        class="btn-icon {item.active(editor) ? 'is-active' : ''}"
        aria-label={item.label}
        aria-disabled={item.disabled(editor)}
        on:m-click={() => item.command(editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div class="separator" use:melt={$separator} />

  <div use:melt={$blockGroup} class="flex gap-3">
    {#each blockItems as item (item.name)}
      <button
        use:melt={$block(item.name)}
        class="btn-icon {item.active(editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:m-click={() => item.command(editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div class="separator hover:opacity-50" use:melt={$separator} />

  <div use:melt={$controlGroup} class="flex gap-3">
    {#each controlItems as item (item.name)}
      <button
        use:melt={$control(item.name)}
        class="btn-icon" 
        aria-label={item.label}
        aria-disabled={item.disabled(editor)}
        on:m-click={() => item.command(editor)}
      >
        <svelte:component this={item.icon} aria-label={item.label} />
      </button>
    {/each}
  </div>

  <Dialog size="wide">
    <button slot="trigger" let:trigger use:melt={$button} use:trigger.action {...trigger} id="preview" class="btn ml-auto">
      Preview
    </button>
    <header slot="title" let:title use:title.action {...title} class="font-mono font-bold text-2xl">
      Preview
    </header>
    <p slot="description" let:description use:description.action {...description}>
      This is a preview of your character profile's content.
    </p>
    <div class="mt-4 border-[1px] border-surface-200-700-token py-2 px-4 rounded-token">
      {@html editor.getHTML()}
    </div>
    <button slot="confirm" let:close use:close.action {...close} class="btn variant-filled-surface">
      Close
    </button>
  </Dialog>
</nav>

<style lang="postcss">
  button {
    @apply variant-filled-primary rounded-token;

    &#preview {
      @apply variant-filled-tertiary text-on-tertiary-token;
    }

    &[aria-disabled=true] {
      @apply variant-soft-primary cursor-not-allowed;
    }

    &[data-state='on'] {
      @apply variant-glass-surface ring-token;
    }
    &.is-active {
      @apply variant-filled-secondary outline outline-2 outline-offset-2 outline-surface-800 dark:outline-surface-100;
    }
  }

  .separator {
    @apply bg-surface-300-600-token w-[1px] h-8;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }
</style>