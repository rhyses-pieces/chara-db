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

  export let editor: Editor;
</script>

<div role="toolbar">
  <button on:click={() => toggleBullet(editor)}><List aria-label="Set bulleted list" /></button>
  <button on:click={() => toggleOrder(editor)}><ListOrdered aria-label="Set ordered list" /></button>
  <button on:click={() => indentList(editor)}><IndentIncrease aria-label="Increase indent" /></button>
  <button on:click={() => outdentList(editor)}><IndentDecrease aria-label="Decrease indent" /></button>
  <button on:click={() => toggleBlockquote(editor)}><TextQuote aria-label="Set blockquote" /></button>
  <button on:click={() => toggleCode(editor)}><Code aria-label="Set code snippet" /></button>
  <button on:click={() => toggleCodeBlock(editor)}><SquareCode aria-label="Set codeblock" /></button>
  <button on:click={() => setHr(editor)}><Minus aria-label="Set horizontal line" /></button>
  <button on:click={() => undo(editor)}><Undo2 aria-label="Undo" /></button>
  <button on:click={() => redo(editor)}><Redo2 aria-label="Redo" /></button>
  <button on:click={() => removeFormat(editor)}><RemoveFormatting aria-label="Remove formatting" /></button>
</div>

<style lang="postcss">
  [role="toolbar"] {
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }

  button {
    @apply btn btn-square;
  }
</style>