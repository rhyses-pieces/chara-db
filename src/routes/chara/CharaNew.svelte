<script lang="ts">
  import { enableCode } from "$lib/utils/stores";
  import CodeEditor from "$lib/components/editors/CodeEditor.svelte";
  import RichTextEditor from "$lib/components/editors/RichTextEditor.svelte";

  let content = "";
</script>

<h1>Add new character</h1>

<label id="editor-label" class="label">
  <span class="label-text">Editor</span>
  <input type="hidden" bind:value={content} />
</label>
{#if $enableCode}
  <CodeEditor label="editor-label" bind:value={content} />
{:else}
  <RichTextEditor label="editor-label" bind:value={content} />  
{/if}


<style lang="postcss">
  :global(.editor) {
    grid-column: 2;
  }
</style>