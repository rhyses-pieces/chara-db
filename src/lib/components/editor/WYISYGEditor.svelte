<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Readable } from 'svelte/store';
  import { Editor, createEditor, EditorContent } from 'svelte-tiptap';
  import type { Content, JSONContent } from '@tiptap/core';
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
<nav use:melt={$root}>
  <div use:melt={$textStyleGroup}>
    <div use:melt={$textStyle('heading')}>
      <button 
        type="button" 
        use:melt={$trigger} 
        aria-label="Heading"
        class="btn"
      >
        {activeHeading($editor) || 'Select heading'}
        <ChevronDown />
      </button>
      {#if $open}
        <div class="menu" use:melt={$menu}>
          {#each headingItems as heading (heading.name)}
            <div 
              use:melt={$option({ value: heading, label: heading.label })}
              class={heading.active($editor) ? 'is-active' : ''}
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
        class={item.active($editor) ? 'is-active' : ''}
        aria-label={item.label}
        on:click={() => item.command($editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div use:melt={$separator} />
  
  <div use:melt={$listGroup}>
    {#each listItems as item (item.name)}
      <button
        use:melt={$list(item.name)}
        class="{item.active($editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:click={() => item.command($editor)}
        disabled={item.disabled($editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div use:melt={$separator} />

  <div use:melt={$blockGroup}>
    {#each blockItems as item (item.name)}
      <button
        use:melt={$block(item.name)}
        class="{item.active($editor) ? 'is-active' : ''}"
        aria-label={item.label}
        on:click={() => item.command($editor)}
      >
        <svelte:component this={item.icon} />
      </button>
    {/each}
  </div>

  <div use:melt={$separator} />

  <div use:melt={$controlGroup}>
    {#each controlItems as item (item.name)}
      <button
        use:melt={$control(item.name)}
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
    aria-label="Preview"
  >
    Preview
  </button>
  <div use:melt={$portalled}>
    {#if $dialogOpen}
      <div use:melt={$overlay} />
      <div use:melt={$content}>
        <h2 use:melt={$title}>Preview content</h2>
        <p use:melt={$description}>This is how your content will look like when rendered.</p>
        {@html $editor.getHTML()}
        <button use:melt={$close}>Close</button>
      </div>
      <button use:melt={$close} aria-label="close">
        <X />
      </button>
    {/if}
  </div>
</nav>
{/if}

<EditorContent editor={$editor} />
</div>

<style>
  .menu {
    background-color: white;
  }

  .is-active {
    background-color: black;
    color: wheat;
  }

  button:disabled {
    /* background-color: red; */
    cursor: not-allowed;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }
</style>