<script lang="ts">
  import { params } from "elegua";
  export let id = "";
</script>

<h1>Character {id}</h1>
<p>{JSON.stringify($params)}</p>