<script lang="ts">
  // show up to this many charas
  // data itself should be paged
</script>

<nav id="character-nav">
  <ul class="menu menu-vertical lg:menu-horizontal">
    <li><a href="/chara/new">create new chara</a></li>
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