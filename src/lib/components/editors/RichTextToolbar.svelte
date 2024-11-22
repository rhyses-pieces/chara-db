<script lang="ts">
  import type { Editor } from "svelte-tiptap";
  import {
    toggleBlockquote,
    toggleBullet,
    toggleCode,
    toggleCodeBlock,
    toggleOrder,
    setHr,
    indentList,
    outdentList,
    undo,
    redo,
    removeFormat,
  } from "./Editor";
  import List from "lucide-svelte/icons/list";
  import ListOrdered from "lucide-svelte/icons/list-ordered";
  import IndentIncrease from "lucide-svelte/icons/indent-increase";
  import IndentDecrease from "lucide-svelte/icons/indent-decrease";
  import TextQuote from "lucide-svelte/icons/text-quote";
  import Code from "lucide-svelte/icons/code";
  import SquareCode from "lucide-svelte/icons/square-code";
  import Minus from "lucide-svelte/icons/minus";
  import Undo2 from "lucide-svelte/icons/undo-2";
  import Redo2 from "lucide-svelte/icons/redo-2";
  import RemoveFormatting from "lucide-svelte/icons/remove-formatting";

  interface Props {
    editor: Editor;
  }

  let { editor }: Props = $props();
</script>

<div role="toolbar" class="flex gap-2">
  <button onclick={() => toggleBullet(editor)}><List aria-label="Set bulleted list" /></button>
  <button onclick={() => toggleOrder(editor)}><ListOrdered aria-label="Set ordered list" /></button>
  <button onclick={() => indentList(editor)}><IndentIncrease aria-label="Increase indent" /></button>
  <button onclick={() => outdentList(editor)}><IndentDecrease aria-label="Decrease indent" /></button>
  <hr>
  <button onclick={() => toggleBlockquote(editor)}><TextQuote aria-label="Set blockquote" /></button>
  <button onclick={() => toggleCode(editor)}><Code aria-label="Set code snippet" /></button>
  <button onclick={() => toggleCodeBlock(editor)}><SquareCode aria-label="Set codeblock" /></button>
  <button onclick={() => setHr(editor)}><Minus aria-label="Set horizontal line" /></button>
  <hr>
  <button onclick={() => undo(editor)}><Undo2 aria-label="Undo" /></button>
  <button onclick={() => redo(editor)}><Redo2 aria-label="Redo" /></button>
  <button onclick={() => removeFormat(editor)}><RemoveFormatting aria-label="Remove formatting" /></button>
</div>

<style lang="postcss">
  [role="toolbar"] {
    @apply text-sm;

    hr {
      @apply h-1/2 mx-1 self-center justify-self-center;
    }
  }

  button {
    @apply btn btn-square;
  }
</style>