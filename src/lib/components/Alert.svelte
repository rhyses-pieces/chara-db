<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Info from "lucide-svelte/icons/info";
  import Skull from "lucide-svelte/icons/skull";
  import CircleAlert from "lucide-svelte/icons/circle-alert";
  import CircleCheck from "lucide-svelte/icons/circle-check";
  import X from "lucide-svelte/icons/x";

  const dispatch = createEventDispatcher();
  
  export let type = "info";
  export let dismissable = true;

  $: alert = type === "info" ? "alert-info" 
  : type === "error" ? "alert-error" 
  : type === "success" ? "alert-success" 
  : type === "warning" ? "alert-warning" : "";
</script>

<aside role="alert" class="{`alert ${alert} bordered shadow`}">
  {#if type === "info"}
    <Info aria-label="Info icon" aria-hidden="true" />
  {:else if type === "error"}
    <Skull aria-label="Error icon" aria-hidden="true" />
  {:else if type === "warning"}
    <CircleAlert aria-label="Warning icon" aria-hidden="true" />
  {:else if type === "success"}
    <CircleCheck aria-label="Success icon" aria-hidden="true" />
  {:else}
    {#if $$slots.icon}
      <slot name="icon" />
    {/if}
  {/if}
  
  <div>
    <span class="font-bold text-lg block">{type.at(0)?.toUpperCase() + type.slice(1)}</span>
    <slot />
  </div>

  {#if dismissable}
    <button class={`btn btn-circle btn-sm`} aria-label="Close" on:click={() => dispatch("dismiss")}>
      <X aria-label="Close icon" aria-hidden="true" size="0.8em" />
    </button>
  {/if}
</aside>

<style lang="postcss">
</style>