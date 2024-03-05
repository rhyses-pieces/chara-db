<script lang="ts">
  import { params } from "elegua";
  export let id = "";

  // user info should be available to public, but not all personal info
  // grab user characters and display them
</script>

<h1>User {id}</h1>
<p>hi {$params}</p>