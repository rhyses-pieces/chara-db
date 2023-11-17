<script lang="ts">
  import { browser } from "$app/environment";
  import { createSwitch, melt } from "@melt-ui/svelte";
  import { modeCurrent, modeUserPrefers } from "@skeletonlabs/skeleton";
  import { Moon, Sun } from "lucide-svelte";

  export let classes: string;

  const {
    elements: { root, input },
    states: { checked },
  } = createSwitch({
    checked: modeCurrent,
  });

  $: $modeUserPrefers = $checked;
  $: {
    if (browser) {
      ($modeUserPrefers) ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
    }
  }
</script>

<div class={classes}>
  <button
    use:melt={$root}
    class="relative h-6 rounded-full bg-surface-50-900-token border-token border-surface-50-900-token transition-colors ring-2 ring-surface-900-50-token"
    id="light-switch"
    aria-label="Toggle light mode and dark mode"
  >
    <div class="thumb bg-surface-900-50-token rounded-full transition">
      {#if $modeCurrent}
        <Sun class="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 fill-white stroke-white" size={16} />
      {:else}
        <Moon class="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 fill-surface-900 stroke-surface-900" size={16} />
      {/if}
    </div>
  </button>
  <input use:melt={$input} />
</div>

<style>
  button#light-switch {
    --w: 2.75rem;
    --padding: 0.015rem;
    width: var(--w);
  }
 
  .thumb {
    --size: 1.25rem;
    position: relative;
    width: var(--size);
    height: var(--size);
    transform: translateX(var(--padding));
  }
 
  :global([data-state='checked']) .thumb {
    transform: translateX(calc(var(--size) - var(--padding)));
  }
</style>