<script lang="ts">
  import Codemirror, { basicSetup } from 'codemirror-svelte';
  import { EditorView } from '@codemirror/view';
  import { html } from '@codemirror/lang-html';
  
  import './CodeEditor.css';

  export let value = '';
  export let label: string;

  const extensions = [
    basicSetup,
    html(),
    EditorView.editorAttributes.of({ "aria-labelledby": label }),
    EditorView.theme({}),
  ];
</script>

<Codemirror doc={value} {extensions} />