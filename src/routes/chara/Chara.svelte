<script lang="ts">
  import { user, pb } from "$lib/utils/pocketbase";
  // show up to this many charas
  // data itself should be paged
</script>

<nav id="character-nav" class="-mt-7">
  <ul class="menu menu-vertical lg:menu-horizontal">
    {#if $user !== null}
    <li><a href="/chara/new">create new chara</a></li>
    {/if}
    <li><a href="/chara">Browse</a></li>
    <li><a href="/chara/random">random</a></li>
  </ul>
</nav>

<section>
  <h1>Characters</h1>
  cards here
</section>

<style lang="postcss">
  #character-nav {
    grid-column: 1 / -1;
  }
</style>