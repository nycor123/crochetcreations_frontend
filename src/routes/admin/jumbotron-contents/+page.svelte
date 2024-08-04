<script>
    import { onMount } from 'svelte';
    import { siteUrls, backendUrls } from '$lib/index.js';

    let _jumbotronContents = [];

    onMount(async () => {
        _jumbotronContents = await getAllJumbotronContents();
        _jumbotronContents = _jumbotronContents.sort((jcA, jcB) => jcA.priority - jcB.priority);
    });

    async function getAllJumbotronContents() {
        try {
            let response = await fetch(backendUrls.baseUrl + 'jumbotron/contents', {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept" : "application/json"
                }
            });
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }
</script>

<h1>Jumbotron Contents</h1>

<p><a href='{siteUrls.admin}?entity=jumbotronContent'>Back</a></p>

{#each _jumbotronContents as jContent}
    <a href='{siteUrls.update}?entity=jumbotronContent&id={jContent.id}'>
        <img src={jContent.image.url} alt='' />
    </a>
{/each}

<p><a href='{siteUrls.create}?entity=jumbotronContent'>New Jumbotron Content</a></p>