<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { writable, type Readable } from 'svelte/store';
  import { Editor, createEditor, EditorContent } from 'svelte-tiptap';
  import type { JSONContent } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
  import {
    headingItems,
    textStyleItems,
    listItems,
    controlItems,
    blockItems,
  } from './constants';
  import { Check, ChevronDown } from 'lucide-svelte';
  import type { ListboxOption } from '@melt-ui/svelte/dist/builders/listbox/types';

  let editor: Readable<Editor>;
  export let json: JSONContent;

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
      ],
    });
    json = $editor.getJSON();
  });

  const dispatch = createEventDispatcher();
  const selectedHeading = writable<ListboxOption<any>>();

  const {
    elements: { trigger, menu, option, hiddenInput, },
    states: { selectedLabel, selected, open },
  } = createSelect({
    selected: selectedHeading,
  });

</script>

{#if editor}
<nav>
  <div>
    <button 
      use:melt={$trigger} 
      
      aria-label="Heading"
    >
      {$selectedLabel || 'Select heading'}
      <ChevronDown />
    </button>
    {#if $open}
      <div class="menu" use:melt={$menu}>
        {#each headingItems as heading (heading.name)}
          <div 
            use:melt={$option({ value: heading, label: heading.label})}
            class={heading.active($editor) ? 'is-active' : ''}
            on:m-click={() => {
              heading.command($editor);
              $selected = { value: heading, label: heading.label };
              dispatch('activeHeading', heading.label);
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
  {#each textStyleItems as textStyle (textStyle.name)}
    <button
      class={textStyle.active($editor) ? 'is-active' : ''}
      aria-label={textStyle.label}
      on:click={() => textStyle.command($editor)}
    >
      <svelte:component this={textStyle.icon} />
    </button>
  {/each}
</nav>
{/if}

<input use:melt={$hiddenInput} bind:value={json} />
<EditorContent editor={$editor} />

<style>
  .menu {
    background-color: white;
  }

  .is-active {
    background-color: black;
    color: wheat;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }
</style>