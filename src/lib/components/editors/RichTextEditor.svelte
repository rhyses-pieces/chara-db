<script lang="ts">
  import { onMount } from "svelte";
  import type { Readable } from "svelte/store";
  import { createEditor, Editor, EditorContent, BubbleMenu } from "svelte-tiptap";
  import StarterKit from "@tiptap/starter-kit";
  import RichTextToolbar from "./RichTextToolbar.svelte";
  import { toggleBold, toggleItalic, toggleStrike } from "./Editor";
  import Bold from "lucide-svelte/icons/bold";
  import Italic from "lucide-svelte/icons/italic";
  import Strikethrough from "lucide-svelte/icons/strikethrough";
  
  export let label: string;
  export let content: string;
  let editor: Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      editorProps: {
        attributes: {
          'aria-labelledby': label,
          'aria-multiline': 'true',
          role: 'textbox',
          class: 'bordered textarea prose textarea-lg focus:border-black',
        }
      },
      extensions: [StarterKit],
      onCreate: ({ editor }) => {
        if (content !== undefined) {
          editor.commands.setContent(content);
        }
      },
      onUpdate: () => {
        content = $editor.getHTML();
      },
    });
  });
</script>

{#if editor}
  <RichTextToolbar editor={$editor} />
{/if}

<EditorContent editor={$editor} />

{#if editor}
  <BubbleMenu editor={$editor}>
    <div id="bubble" class="bg-base-100 p-2 bordered rounded shadow">
      <button on:click={() => toggleBold($editor)}><Bold /></button>
      <button on:click={() => toggleItalic($editor)}><Italic /></button>
      <button on:click={() => toggleStrike($editor)}><Strikethrough /></button>
    </div>
  </BubbleMenu>
{/if}