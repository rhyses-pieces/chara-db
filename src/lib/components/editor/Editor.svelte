<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Readable } from 'svelte/store';
  import { Editor, createEditor, EditorContent } from 'svelte-tiptap';
  import type { JSONContent } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import { createSelect, createToolbar, melt } from '@melt-ui/svelte';
  import {
    headingItems,
    textStyleItems,
    listItems,
    controlItems,
    blockItems,
  } from './constants';
  import { Check, ChevronDown } from 'lucide-svelte';

  let editor: Readable<Editor>;
  export let json: JSONContent;

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
      ],
      onCreate: ({ editor }) => {
        if (json !== undefined && json.type !== undefined) {
          editor.commands.setContent(json);
        }
      },
      onUpdate: () => {
        json = $editor.getJSON();
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
    elements: { root, separator },
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
      <button use:melt={$trigger} aria-label="Heading">
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
        disabled={item.active($editor) ? true : false}
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
    background-color: red;
    cursor: not-allowed;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }
</style>