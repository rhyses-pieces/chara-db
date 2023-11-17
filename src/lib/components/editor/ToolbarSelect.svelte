<script lang="ts">
  import { createDropdownMenu, melt } from "@melt-ui/svelte";
  import { headingItems } from "./constants";
  import { Check, ChevronDown } from "lucide-svelte";
  import type { Editor } from "svelte-tiptap";

  export let editor: Editor;
  export let action: any;

  const {
    elements: { trigger, menu, item },
    states: { open },
  } = createDropdownMenu({
    positioning: {
      placement: 'bottom',
      sameWidth: true,
      fitViewport: true,
    },
  });

  $: activeHeading = (editor: Editor) => {
    let newHeading = headingItems.find(item => item.active(editor));
    return newHeading?.label;
  }
</script>

<button 
  type="button" 
  use:melt={$trigger} 
  bind:this={action}
  {...action} 
  use:action.action 
  tabindex="0"
  aria-label="Heading"
  class="btn variant-filled-primary rounded-token w-44 justify-between mr-3"
>
  {activeHeading(editor) || 'Select heading'}
  <ChevronDown size={16} />
</button>
{#if $open}
  <div use:melt={$menu} class="menu bg-surface-50-900-token">
    {#each headingItems as heading (heading.name)}
      <div 
        use:melt={$item}
        class="menuitem {heading.active(editor) ? 'is-active' : ''}"
        on:m-click={() => heading.command(editor)}
      >
        <svelte:component this={heading.icon} />
        {heading.label}
        {#if heading.active(editor)}
          <Check class="absolute right-2" />
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style lang="postcss">
  .menu {
    @apply z-10 flex flex-col max-h-[300px] overflow-y-auto rounded-bl-container-token rounded-br-container-token border-token p-1;
  }

  .menuitem {
    @apply inline-flex items-center justify-start gap-2 py-1 px-2 cursor-pointer rounded-token;

    &:hover, &:focus {
      @apply bg-surface-hover-token;
    }
  }
</style>