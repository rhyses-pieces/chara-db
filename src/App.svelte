<script lang="ts">
  import { path, resolve, params } from "elegua";
  import Navbar from "$lib/components/Navbar.svelte";
  import Toasts from "$lib/components/Toasts.svelte";

  import Home from "@/Home.svelte";
  import About from "@/About.svelte";
  import Error from "@/Error.svelte";
  import Login from "@/Login.svelte";
  import Register from "@/Register.svelte";
  import Chara from "@/chara/Chara.svelte";
  import CharaNew from "@/chara/CharaNew.svelte";
  import CharaSingle from "@/chara/CharaSingle.svelte";
  import User from "@/user/User.svelte";
  import UserSingle from "@/user/UserSingle.svelte";
  import Settings from "@/user/Settings.svelte";
</script>

<Toasts />
<Navbar />

<main>
  {#if $path === "/"}
    <Home />
  {:else if $path === "/about"}
    <About />
  {:else if $path === "/login"}
    <Login />
  {:else if $path === "/register"}
    <Register />
  {:else if $path === "/chara"}
    <Chara />
  {:else if $path === "/chara/new"}
    <CharaNew />
  {:else if resolve($path, "/chara/:id")}
    <CharaSingle id={$params["id"]} />
  {:else if $path === "/user"}
    <User />
  {:else if resolve($path, "/user/:id")}
    <UserSingle id={$params["id"]} />
  {:else if $path === "/settings"}
    <Settings />
  {:else}
    <Error />
  {/if}
</main>

<footer class="footer">
  copyleft stuff
</footer>

<style lang="postcss">
  footer { margin-top: auto; }
</style>
