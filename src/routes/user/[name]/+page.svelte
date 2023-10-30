<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  $: ({ user } = data);
  $: characters = async () => {
    const { data: chara, error: charaError } = await data.supabase
      .from('characters')
      .select()
      .eq('creator_id', user.id)
      .limit(20);
    
    if (charaError) throw charaError;

    return { chara };
  }
</script>

<h1>{user.username}</h1>
<p>{user.created_at}</p>

<h2>Characters</h2>
<section>
  {#await characters()}
    <span>loading...</span>
  {:then result} 
    <ul>
    {#each result.chara as chara}
      <li><a href="/chara/{chara.id}">{chara.name}</a></li>  
    {/each}
    </ul>
  {:catch error}
    <span>{error.message}</span>
  {/await}
</section>