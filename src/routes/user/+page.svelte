<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';

  export let data;
  export let form;

  let { session, user, characters } = data;
  let editUser = false;
  let loading = false;
  $: ({ session, user, characters } = data);

  const handleUpdateUser: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    }
  }

  const handleLogout: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    }
  }
</script>

<section>
  <h1>Welcome {session.user.user_metadata.username}!</h1>

  <p>{user?.email}</p>
  <p>{user?.created_at}</p>

  {#if editUser}
    <form action="?/update" method="post" use:enhance={handleUpdateUser}>
      <input type="text" name="username" id="username" value={form?.username ?? ''} />
      <button type="submit" disabled={loading}>Update</button>
    </form>
  {:else}
    <button on:click={() => editUser = !editUser}>Edit info</button>
  {/if}

  <h2>Characters</h2>
  <section>
    {JSON.stringify(characters)}
    <a href="/chara/new">Add new character?</a>
  </section>

  <form action="?/logout" method="post" use:enhance={handleLogout}>
    <button type="submit" disabled={loading}>Log out</button>
  </form>
</section>

