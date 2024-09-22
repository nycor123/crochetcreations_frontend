<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { backendUrls } from '$lib/index.js';

    export let jumbotronContentId;

    let _jumbotronContents= [];
    let _jumbotronContent = {
        id: null,
        imageId: null,
        imageFile: null,
        url: null,
        priority: null,
        tempImgUrl: null
    };
    let _isSaving = false;

    onMount(async () => {
        if (jumbotronContentId === null) {
            _jumbotronContents = await getAllJumbotronContents();
            if (_jumbotronContents === null || _jumbotronContents.length === 0) {
                _jumbotronContent.priority = 1;
            } else {
                let priorities = _jumbotronContents
                    .map((jc) => jc.priority)
                    .sort((priorityA, priorityB) => priorityA - priorityB);
                _jumbotronContent.priority = priorities[priorities.length - 1] + 1;
            }
        } else {
            let jContent = await getJumbotronContent(jumbotronContentId);
            _jumbotronContent.url = jContent.url;
            _jumbotronContent.priority = jContent.priority;
            _jumbotronContent.tempImgUrl = jContent.image.url;
        }
    });

    async function saveJumbotronContent(event) {
        let form = event.target;
        _isSaving = true;
        try {
            if (_jumbotronContent.imageFile !== null) {
                _jumbotronContent.imageId = await uploadImage(_jumbotronContent.imageFile);
            }
            let payload = {
                imageId: _jumbotronContent.imageId,
                url: _jumbotronContent.url,
                priority: _jumbotronContent.priority
            }
            let response = null;
            if (jumbotronContentId === null) {
                response = await fetch(backendUrls.jumbotronContentsUrl, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
            } else {
                response = await fetch(`${backendUrls.jumbotronContentsUrl}/${jumbotronContentId}`, {
                        method: "PATCH",
                        credentials: "include",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(payload)
                    });
            }
            let resJson = await response.json();
            if (!response.ok) {
                throw new Error(resJson.message);
            }
            // cleanup
            _isSaving = false;
            goto('jumbotron-contents');
            form.classList.remove("was-validated");
            triggerAlert("success", "Successfully saved Jumbotron Content.");
            _images = [];
            form.reset();
        } catch (err) {
            _isSaving = false;
            triggerAlert("danger", "Unable to save Jumbotron Content.", err);
        }
    }

    async function setTempImgUrl(event) {
        _jumbotronContent.imageFile = (event.target.files !== null && event.target.files.length > 0) ?
            event.target.files[0] : null;
        _jumbotronContent.tempImgUrl = await generateTempImgUrl(event);
        _jumbotronContent = _jumbotronContent;
    }

    async function generateTempImgUrl(event) {
        if (event.target.files[0] !== null && event.target.files.length > 0) {
            return new Promise((resolve) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(event.target.files[0]);
            });
        } else {
            return null;
        }
    }

    async function uploadImage(file) {
        let formData = new FormData();
        formData.append("file", file);
        let response = await fetch(backendUrls.imageUploadUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            },
            body: formData
        });
        let resJson = await response.json();
        return resJson.id;
    }

    async function getJumbotronContent(jContentId) {
        try {
            let response = await fetch(`${backendUrls.jumbotronContentsUrl}/${jumbotronContentId}`, {
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

    async function getAllJumbotronContents() {
        try {
            let response = await fetch(backendUrls.jumbotronContentsUrl, {
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

    function triggerAlert(type, message, errorMsg) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        const wrapper = document.createElement('div');

        if (type === "success") {
            wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
            ].join('');
        } else {
            wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message} - ${errorMsg}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
            ].join('');
        }
       
        alertPlaceholder.append(wrapper);
    }

    function cancel(event) {
        window.location.href = '/admin';
    }
</script>

<div class='row mx-3 py-3'>
    <div class='col-12 col-md-8 col-lg-6 mx-auto'>
        <div id="alertPlaceholder"></div>

        <form on:submit={saveJumbotronContent}>
            <h1 class='mb-3'>{jumbotronContentId !== null ? 'Update Jumbotron Content' : 'Create Jumbotron Content'}</h1>

            <div class='form-floating mb-3'>
                <input type='text' id='urlInput' class='form-control' placeholder='' bind:value={ _jumbotronContent.url } required>
                <label for='urlInput' class='form-label'>URL</label>
                <div class='invalid-feedback'>
                    URL is required.
                </div>
            </div>

            <div class='mb-3'>   
                <label for='add-image'>
                   Image:
                </label>
                <input id='image' type='file' accept='image/png, image/jpeg' on:change={setTempImgUrl}>
            </div>

            {#if _jumbotronContent.tempImgUrl !== null}
                <img 
                    src={_jumbotronContent.tempImgUrl}
                    class='mb-3'
                    alt='' 
                    width='100%' />
            {/if}

            <div class='mt-5'>
                <button type='submit' class='btn me-2' style='color: #66CC33; border-color: #66CC33'>Save</button>
                <button type='button' class='btn' style='color: #CC3333; border-color: #CC3333' on:click={cancel}>Cancel</button>
            </div>
        </form>

        {#if _isSaving}
            <div class="z-3 position-relative bottom-50 start-50">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        {/if}

    </div>
</div>
