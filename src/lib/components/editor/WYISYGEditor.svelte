<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Readable } from 'svelte/store';
  import { Editor, createEditor, EditorContent } from 'svelte-tiptap';
  import StarterKit from '@tiptap/starter-kit';
  import { createDialog, createSelect, createToolbar, melt } from '@melt-ui/svelte';
  import {
    headingItems,
    textStyleItems,
    listItems,
    controlItems,
    blockItems,
  } from './constants';
  import { Check, ChevronDown, X } from 'lucide-svelte';

  let editor: Readable<Editor>;
  export let html: string;

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
      ],
      onCreate: ({ editor }) => {
        if (html !== undefined) {
          editor.commands.setContent(html);
        }
      },
      onUpdate: () => {
        html = $editor.getHTML();
      }
    });
  });
  
  const selectedHeading = writable({ value: null as any, label: '' });

  const {
    elements: { trigger, menu, option, },
    states: { selected, open },
  } = createSelect({
    selected: selectedHeading,
  });

  const {
    elements: { root, separator, button, },
    builders: { createToolbarGroup },
  } = createToolbar();

  const {
    elements: {
      trigger: dialogTrigger,
      portalled,
      overlay,
      content,
      title,
      description,
      close,
    },
    states: { open: dialogOpen },
  } = createDialog({});

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
  
  $: activeHeading = (editor: Editor) => {
    if ($selected?.value !== null) {
      let newHeading = headingItems.find(item => item.active(editor));
      return newHeading?.label;
    }
  }
</script>

<div id="editor">
{#if editor}
<nav use:melt={$root} class="flex min-w-max items-center gap-3">
  <div use:melt={$textStyleGroup} class="flex gap-3">
    <div use:melt={$textStyle('heading')}>
      <button 
        type="button" 
        use:melt={$trigger} 
        aria-label="Heading"
        class="btn w-44 justify-between mr-3"
      >
        {activeHeading($editor) || 'Select heading'}
        <ChevronDown size={16} />
      </button>
      {#if $open}
        <div use:melt={$menu} class="bg-surface-50-900-token z-10 flex flex-col overflow-y-auto">
          {#each headingItems as heading (heading.name)}
            <div 
              use:melt={$option({ value: heading, label: heading.label })}
              class="{heading.active($editor) ? 'is-active' : ''}"
              on:m-click={() => {
                heading.command($editor);
                $selected = { value: heading, label: heading.label };
              }}
            >
              {#if heading.active($editor)}
                <Check />
              {/if}
              <svelte:component this={heading.icon} />
              {heading.label}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    {#each textStyleItems as item (item.name)}
      <button
        use:melt={$textStyle(item.name)}
        class="btn-icon {item.active($editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:click={() => item.command($editor)}
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
        class="btn-icon {item.active($editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:click={() => item.command($editor)}
        disabled={item.disabled($editor)}
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
        class="btn-icon {item.active($editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:click={() => item.command($editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div class="separator" use:melt={$separator} />

  <div use:melt={$controlGroup} class="flex gap-3">
    {#each controlItems as item (item.name)}
      <button
        use:melt={$control(item.name)}
        class="btn-icon"
        aria-label={item.label}
        on:click={() => item.command($editor)}
        disabled={item.disabled($editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <button 
    use:melt={$button}
    use:melt={$dialogTrigger}
    class="btn ml-auto"
    id="preview"
    aria-label="Preview"
  >
    Preview
  </button>
  <div use:melt={$portalled} >
    {#if $dialogOpen}
      <div use:melt={$overlay} class="fixed inset-0 z-10 bg-black/50" />
      <div use:melt={$content} class="bg-surface-50-900-token z-50">
        <h2 use:melt={$title}>Preview content</h2>
        <p use:melt={$description}>This is how your content will look like when rendered.</p>
        {@html $editor.getHTML()}
        <button use:melt={$close}>Close</button>
      </div>
      <button 
        use:melt={$close}
        aria-label="close"
        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none
          items-center justify-center rounded-full p-1 text-gray-500
          hover:bg-blue-100 focus:shadow-blue-400"
      >
        <X />
      </button>
    {/if}
  </div>
</nav>
{/if}

<EditorContent editor={$editor} />
</div>

<style lang="postcss">
  button {
    @apply variant-filled-primary rounded-token;

    &:disabled {
      @apply variant-soft-primary;
    }

    &#preview {
      @apply variant-filled-tertiary;
    }

    &.is-active {
      @apply variant-ringed-primary;
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