<script lang="ts">
  import { onMount } from "svelte";
  import type { Readable } from "svelte/store";
  import { createEditor, Editor, EditorContent, BubbleMenu } from "svelte-tiptap";
  import StarterKit from "@tiptap/starter-kit";
  import RichTextToolbar from "./RichTextToolbar.svelte";
  import { setParagraph, toggleBold, toggleItalic, toggleStrike } from "./Editor";
  import Pilcrow from "lucide-svelte/icons/pilcrow";
  import Bold from "lucide-svelte/icons/bold";
  import Italic from "lucide-svelte/icons/italic";
  import Strikethrough from "lucide-svelte/icons/strikethrough";
  import Heading1 from "lucide-svelte/icons/heading-1";
  import Heading2 from "lucide-svelte/icons/heading-2";
  import Heading3 from "lucide-svelte/icons/heading-3";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  
  interface Props {
    label: string;
    value: string;
  }

  let { label, value = $bindable() }: Props = $props();
  let editor = $state() as Readable<Editor>;

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
        if (value !== undefined) {
          editor.commands.setContent(value);
        }
      },
      onUpdate: () => {
        value = $editor.getHTML();
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
      <div class="dropdown">
        <div role="button" tabindex="0" class="btn m-1">Set heading <ChevronDown /></div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 bordered rounded-box w-52">
          <li><button onclick={() => setParagraph($editor)} class:active={$editor.isActive('paragraph')}><Pilcrow /> Paragraph</button></li>
          <li><button onclick={() => $editor.chain().focus().setHeading({ level: 1 }).run()} class:active={$editor.isActive('heading', { level: 1 })}><Heading1 /> Heading 1</button></li>
          <li><button onclick={() => $editor.chain().focus().setHeading({ level: 2 }).run()} class:active={$editor.isActive('heading', { level: 2 })}><Heading2 /> Heading 2</button></li>
          <li><button onclick={() => $editor.chain().focus().setHeading({ level: 3 }).run()} class:active={$editor.isActive('heading', { level: 3 })}><Heading3 /> Heading 3</button></li>
        </ul>
      </div>
      <button class="btn btn-square" onclick={() => toggleBold($editor)}><Bold /></button>
      <button class="btn btn-square" onclick={() => toggleItalic($editor)}><Italic /></button>
      <button class="btn btn-square" onclick={() => toggleStrike($editor)}><Strikethrough /></button>
    </div>
  </BubbleMenu>
{/if}

<style lang="postcss">
  #bubble {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .active {
      @apply font-bold text-base-content bg-base-200;
    }
  }
</style>