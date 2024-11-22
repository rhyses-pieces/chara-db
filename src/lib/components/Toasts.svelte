<script lang="ts">
  import Alert from "./Alert.svelte";
  import { dismissToast, toasts } from "$lib/utils/stores";
</script>

{#if $toasts}
  <div class="toast toast-top toast-center">
    {#each $toasts as toast (toast.id)}
      <Alert 
        type={toast.type}
        dismissable={toast.dismissable}
        dismiss={() => dismissToast(toast.id)}
      >
        {toast.message}
      </Alert>
    {/each}
  </div>
{/if}