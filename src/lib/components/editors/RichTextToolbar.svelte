<script lang="ts">
  import type { Editor } from "svelte-tiptap";
  import {
    toggleBlockquote,
    toggleBullet,
    toggleCode,
    toggleCodeBlock,
    toggleOrder,
    setHr,
    setParagraph,
    indentList,
    outdentList,
    undo,
    redo,
    removeFormat,
  } from "./Editor";
  import Pilcrow from "lucide-svelte/icons/pilcrow";
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
  <button on:click={() => setParagraph(editor)}><Pilcrow /></button>
  <button on:click={() => toggleBullet(editor)}><List /></button>
  <button on:click={() => toggleOrder(editor)}><ListOrdered /></button>
  <button on:click={() => indentList(editor)}><IndentIncrease /></button>
  <button on:click={() => outdentList(editor)}><IndentDecrease /></button>
  <button on:click={() => toggleBlockquote(editor)}><TextQuote /></button>
  <button on:click={() => toggleCode(editor)}><Code /></button>
  <button on:click={() => toggleCodeBlock(editor)}><SquareCode /></button>
  <button on:click={() => setHr(editor)}><Minus /></button>
  <button on:click={() => undo(editor)}><Undo2 /></button>
  <button on:click={() => redo(editor)}><Redo2 /></button>
  <button on:click={() => removeFormat(editor)}><RemoveFormatting /></button>
</div>