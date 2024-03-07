<script lang="ts">
  import { doesUserExist, pb } from "$lib/utils/pocketbase";
  import { params } from "elegua";
  export let name = "";

  let response = doesUserExist($params["name"]);
</script>

{#await response}
  <h1>Loading...</h1>
{:then user} 
  <h1>User: {name}</h1>
  <div class="float-left mr-5 mb-5">
    <div class="avatar" class:placeholder={user.avatar === ""}>
      <div class="w-48 bg-gray-500 bordered rounded-full transition-all shadow hover:shadow-none">
        {#if user.avatar}
          <img src={pb.files.getUrl(user, user.avatar, {thumb: '200x200'})} alt={`Icon for ${user.username}`} />
        {:else}
          <span class="text-3xl">{user.username}</span>
        {/if}
      </div>
    </div>
  </div>
  <p>Joined on: {new Date(user.created).toLocaleDateString()}</p>
  {#if user.emailVisibility}
    <p>Email: {user.email}</p>
  {/if}
{:catch err}
  <h1>Error</h1>
  <p>Couldn't retrieve user</p>
  <pre>{JSON.stringify(err, null, 2)}</pre>
{/await}
