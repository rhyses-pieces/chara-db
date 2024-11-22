<script lang="ts">
  import { path, resolve, params } from "elegua";
  import { onMount } from "svelte";
  import { pb, logout } from "$lib/utils/pocketbase";
  import { theme } from "$lib/utils/stores";
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
  
  onMount(async () => {
    let session = window.localStorage.getItem("pocketbase_auth");
    if (session) {
      if (pb.authStore.isValid) await pb.collection("users").authRefresh();
    } else {
      logout();
    }
  });
</script>

<svelte:document onload="{() => {document.documentElement.dataset.theme = $theme}}"></svelte:document>

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
  {:else if resolve($path, "/user/:name")}
    <UserSingle name={$params["name"]} />
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
