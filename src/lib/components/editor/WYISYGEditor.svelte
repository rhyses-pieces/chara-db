<script lang="ts">
  import { onMount } from 'svelte';
  import { Editor, createEditor, EditorContent } from 'svelte-tiptap';
  import StarterKit from '@tiptap/starter-kit';
  import Toolbar from './Toolbar.svelte';
  import type { Readable } from 'svelte/store';
  import './WYSIWYGEditor.css';
  
  let editor: Readable<Editor>;
  export let label: string;
  export let html: string;

  onMount(() => {
    editor = createEditor({
      editorProps: {
        attributes: {
          tabindex: "0",
          role: "textbox",
          "aria-multiline": "true",
          "aria-labelledby": label,
        }
      },
      autofocus: 'start',
      extensions: [
        StarterKit,
      ],
      onCreate: ({ editor }) => {
        if (html !== undefined) {
          editor.commands.setContent(html);
        }
      },
      onUpdate: () => {
        html = $editor.getHTML();
      }
    });
  });
</script>

<div id="editor">
  {#if editor}
    <Toolbar editor={$editor} />
  {/if}

  <EditorContent editor={$editor} />
</div>