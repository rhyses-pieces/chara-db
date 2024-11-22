<script lang="ts">
  import { params } from "elegua";
  interface Props {
    id?: string;
  }

  let { id = "" }: Props = $props();
</script>

<h1>Character {id}</h1>
<p>{JSON.stringify($params)}</p>