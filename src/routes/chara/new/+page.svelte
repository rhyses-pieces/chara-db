<script lang="ts">
  import Editor from '~/lib/Editor.svelte';
  let content = '';
</script>

<section>
  <form method="post">
    <input type="text" name="name" id="name" />
    <Editor />

    <button>Add Character</button>
  </form>
</section>