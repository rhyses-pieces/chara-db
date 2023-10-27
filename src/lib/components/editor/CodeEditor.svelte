<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { html } from '@codemirror/lang-html';

  export let value = '';
</script>

<CodeMirror bind:value lang={html({
})} />