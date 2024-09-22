<script>
    import { onMount } from 'svelte';
    import { siteUrls, backendUrls } from '$lib/index.js';
    import { goto } from '$app/navigation';

    let _jumbotronContents = [];
    let _editMode = false;
    let _payload = [];

    onMount(async () => {
        _jumbotronContents = await getAllJumbotronContents();
        _jumbotronContents = _jumbotronContents.sort((jcA, jcB) => jcA.priority - jcB.priority);
    });

    async function getAllJumbotronContents() {
        try {
            let response = await fetch(backendUrls.jumbotronContentsUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept' : 'application/json'
                }
            });
            return await response.json();
        } catch(err) {
            console.log(err);
        }
    }

    function toggleEditMode() {
        _payload = [];
        if (_jumbotronContents != null && _jumbotronContents.length > 0) {
            for (let jContent of _jumbotronContents) {
                let jContentCopy = {
                    id: jContent.id,
                    image: jContent.image,
                    priority: jContent.priority,
                    url: jContent.url
                };
                _payload.push(jContentCopy);
            }
        }
        _editMode = true;
    }

    function deleteJumbotronContent(jContent) {
        let indexToDelete = _payload.findIndex(e => e.id === jContent.id);
        _payload.splice(indexToDelete, 1);
        _payload = _payload;
    }

    async function saveJumbotronContents(event) {
        try {
            let response = await fetch(backendUrls.jumbotronContentsUrl, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify(_payload)
            });
            let updatedJumbotronContents = await response.json();
            _jumbotronContents = updatedJumbotronContents.sort((jcA, jcB) => jcA.priority - jcB.priority);
        } catch(err) {
            console.log(err);
            //TODO: Show error message on failed save.
        }
        _editMode = false;
        //TODO: Show success message on successful save.
    }

    function drag(event) {
        let data = {
            divId: event.target.parentElement.parentElement.id
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(data));
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let data = JSON.parse(event.dataTransfer.getData("text"));
        let sourceDiv = document.getElementById(data.divId);
        let targetDiv = event.target.parentElement.parentElement;
        let sourceJContent = _payload.find((jc) => jc.priority === Number(sourceDiv.id.replace('jContent-', '')));
        let targetJContent = _payload.find((jc) => jc.priority === Number(targetDiv.id.replace('jContent-', '')));
        let originalSourceJCPriority = sourceJContent.priority;
        sourceJContent.priority = targetJContent.priority;
        targetJContent.priority = originalSourceJCPriority;
        _payload = _payload.sort((jcA, jcB) => jcA.priority - jcB.priority);
    }

    function reset(event) {
        _editMode = false;
    }

    function redirectToJumbotronEditor() {
        goto(`/admin/create?entity=jumbotronContent`);
    }
</script>

<div class='container'>
    <div class='row mb-3 pt-3'>
        <div class='col-6 d-flex'>
            <p><a href='{siteUrls.admin}' style='color: gray;'>Back</a></p>
        </div>
        <div class='col-6 d-flex justify-content-end'>
            {#if (_jumbotronContents == null || _jumbotronContents.length !== 0) && !_editMode}
                <button style='background-color: #9e806d; color: #E2DFD2; width: 40%; height: 80%; border: none;' on:click={toggleEditMode}>
                    Edit
                </button>
            {/if}
            {#if _editMode}
                <button class='mx-1' style='background-color: #9e806d; color: #E2DFD2; width: 40%; height: 80%; border: none;' on:click={saveJumbotronContents}>
                    Save
                </button>
                <button style='background-color: #9e806d; color: #E2DFD2; width: 40%; height: 80%; border: none;' on:click={reset}>
                    Cancel
                </button>
            {/if}
        </div>
    </div>
    <hr style='color: #9e806d;'/>
    <h1 class='mt-3 mb-3' style='color: #9e806d'>Jumbotron Contents</h1>
    {#if _editMode}
        {#each _payload as jContent}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div 
                id={'jContent-' + jContent.priority} 
                class='row mb-3' 
                on:dragstart={drag}
                on:dragover={allowDrop} 
                on:drop={drop}>
                <div class='col-12' style='position: relative;'>
                    <!-- svelte-ignore a11y-interactive-supports-focus -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg xmlns='http://www.w3.org/2000/svg' 
                            width='10%' 
                            height='15%' 
                            fill='red' 
                            style='position: absolute;' 
                            class='bi bi-x-circle-fill mt-2'
                            viewBox='0 0 16 16' 
                            role='button'
                            on:click={() => deleteJumbotronContent(jContent)}>
                            <path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5'
                                class='mx-0'/>
                    </svg>
                    <img src={jContent.image.url} alt='' width='100%'/>
                </div>
            </div>
        {/each}
    {:else}
        {#each _jumbotronContents as jContent}
            <div class='row mb-3'>
                <div class='col-12'>
                    <a href='{siteUrls.update}?entity=jumbotronContent&id={jContent.id}'>
                        <img src={jContent.image.url} alt='' width='100%'/>
                    </a>
                </div>
            </div>
        {/each}
    {/if}
    
    <div class='row mb-3'>
        <div class='col-12'>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <h1 class='text-center' style='background-color: #9e806d; color: #E2DFD2; height: 100%' on:click={redirectToJumbotronEditor}>+<h1>
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 720px;
    }
</style>
