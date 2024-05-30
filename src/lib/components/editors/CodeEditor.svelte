<script lang="ts">
  import * as ace from "brace";
  import "brace/ext/language_tools";
  import "brace/ext/emmet";
  import "brace/snippets/html";
  import "brace/mode/html";
  import "brace/theme/chrome";
  import Dialog from "../Dialog.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let editor: ace.Editor;
  let value: string = "";
  let contentBackup: string = "";
  let element: HTMLElement;

  onDestroy(() => {
    if (editor) {
      editor.destroy();
      editor.container.remove();
    }
  });

  $: watchValue(value);
  function watchValue(val: string) {
    if (contentBackup !== val && editor && typeof val === "string") {
      editor.session.setValue(val);
      contentBackup = val;
    }
  }

  onMount(() => {
    editor = ace.edit("editor");
    editor.getSession().setMode("ace/mode/html");
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
    editor.setOption("enableEmmet", true);
    editor.$blockScrolling = Infinity;
    editor.setValue(value, 1);
    contentBackup = value;
    handleChange();
  });

  function handleChange() {
    editor.on("change", () => {
      const content = editor.getValue();
      value = content;
      dispatch("input", content);
      contentBackup = content;
    });
  }
</script>

<div style="height: 300px;">
  <div id="editor" class="textarea bordered shadow" style="height: 300px;" bind:this={element}></div>
</div>