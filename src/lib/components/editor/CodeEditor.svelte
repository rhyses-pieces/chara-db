<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { html } from '@codemirror/lang-html';
  import './CodeEditor.css';

  export let value = '';
</script>

<CodeMirror bind:value lang={html()} styles={{
  "&": {
    maxWidth: "100%",
    height: "20rem",
  },
  ".cm-scroller": {
    fontFamily: `"Intel One Mono", ui-monospace, monospace`,
  },
  ".cm-selectBackground": {
    backgroundColor: "rgb(var(--color-primary-500) / 0.3)",
  },
  ".cm-activeLine": {
    backgroundColor: "rgb(var(--color-primary-500) / 0.3)",
  },
  ".cm-tooltip": {
    backgroundColor: "rgb(var(--color-surface-50))",
  },
}} />