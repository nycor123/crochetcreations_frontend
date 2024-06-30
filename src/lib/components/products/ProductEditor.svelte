<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { siteUrls, backendUrls } from '$lib/index.js';

    export let productId;

    let _product = {
        name: "",
        description: "",
        price: "",
        listedForSale: "",
        images: []
    };

    let _images = [];
    let _isSaving = false;

    onMount(() => {
        if (productId !== null) {
            loadProduct();
        }
    });

    async function loadProduct() {
        let fetchedProduct = await getProduct(productId);
        _product.id = productId;
        _product.name = fetchedProduct.name;
        _product.description = fetchedProduct.description;
        _product.price = fetchedProduct.effectivePrice.amount;
        _product.listedForSale = fetchedProduct.listedForSale;
        if (fetchedProduct.images !== null && fetchedProduct.images.length > 0) {
            let fetchedImages = [];
            for (let img of fetchedProduct.images) {
                let fetchedImg = {
                    file: null,
                    id: img.id,
                    url: img.url,
                    priority: img.priority
                };
                fetchedImages.push(fetchedImg);
            }
            _images = fetchedImages.sort((img1, img2) => img1.priority - img2.priority);
        }
    }

    async function getProduct(productId) {
        try {
            let response = await fetch(backendUrls.baseUrl + `products/${productId}`, {
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

    async function saveProduct(event) {
        let form = event.target;
        _isSaving = true;
        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            _isSaving = false;
            return;
        }
        try {
            let products = [];
            // update images
            if (_images != null && _images.length > 0) {
                let productImages = [];
                for (let image of _images) {
                    let productImage = {
                        id: image.id !== null ? image.id : await uploadImage(image.file),
                        priority: image.priority
                    };
                    productImages.push(productImage);
                }
                _product.images = productImages;
            }
            // save product
            products.push(_product);
            let response = null;
            let resJson = null;
            if (productId === null) {
                response = await fetch(backendUrls.baseUrl + "products", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(products)
                });
            } else {
                response = await fetch(backendUrls.baseUrl + `products/${productId}`, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(products[0])
                });
            }
            resJson = await response.json();
            if (!response.ok) {
                throw new Error(resJson.message);
            }
            // cleanup
            _isSaving = false;
            if (productId !== null) {
                goto(`/products/${productId}`);
            }
            form.classList.remove("was-validated");
            triggerAlert("success", "Successfully saved product - ", siteUrls.products + resJson[0].id);
            _images = [];
            form.reset();
        } catch(err) {
            _isSaving = false;
            triggerAlert("danger", "Unable to save product", null, err);
        }
    }

    async function uploadImage(file) {
        let formData = new FormData();
        formData.append("file", file);
        let response = await fetch(backendUrls.baseUrl + "images/upload", {
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

    function triggerAlert(type, message, productUrl = "#", errorMsg) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        const wrapper = document.createElement('div');

        if (type === "success") {
            wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}<a href=${productUrl}>view</a></div>`,
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

    async function addNewImage(event) {
        let image = {
            id: null,
            file: event.target.files[0],
            url: await generateUrl(event.target.files[0]),
            priority: _images.length + 1
        };
        _images = [..._images, image];
        event.target.value = '';
    }

    function removeImage(image) {
        let index = _images.findIndex(img => img.url === image.url);
        _images.splice(index, 1);
        for (let img of _images) {
            img.priority = _images.indexOf(img) + 1;
        }
        _images = _images;
    }
    
    async function generateUrl(file) {
        if (file !== null) {
            return new Promise((resolve) => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
        return null;
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let data = JSON.parse(event.dataTransfer.getData("text"));
        let destinationDiv = event.target.parentElement;
        let img1 = document.getElementById(data.imgId);
        let img2 = event.target;
        for (let image of _images) {
            if (image.url === img1.src) {
                image.priority = Number(destinationDiv.id.replace('img-', ''));
            }
            if (image.url === img2.src) {
                image.priority = Number(data.divId.replace('img-', ''));
            }
        }
        _images.sort((img1, img2) => img1.priority - img2.priority);
        _images = _images;
    }

    function drag(event) {
        let data = {
            divId: event.target.parentElement.id,
            imgId: event.target.id
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(data));
    }

    function cancel(event) {
        window.location.href = "/admin";
    }

</script>

<div class="row mx-3 my-3">
    <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <div id="alertPlaceholder"></div>

        <form on:submit={saveProduct} novalidate>
            <h1 class="mb-3">{productId !== null ? "Update Product" : "Create Product"}</h1>
        
            <div class="form-floating mb-3">
                <input type="text" id="nameInput" class="form-control" placeholder="" bind:value={ _product.name } required>
                <label for="nameInput" class="form-label">Product name</label>
                <div class="invalid-feedback">
                    Product name is required.
                </div>
            </div>
        
            <div class="form-floating mb-3">
                <textarea id="descriptionInput" class="form-control" rows="15" placeholder="" bind:value={ _product.description } />
                <label for="descriptionInput" class="form-label">Description</label>
            </div>
        
            <div class="input-group mb-3">
                <span class="input-group-text">₱</span>
                <div class="form-floating">
                    <input id="priceInput" type="number" class="form-control" placeholder="" bind:value={ _product.price }>
                    <label for="priceInput" class="form-label">Price</label>
                </div>
            </div>

            <div class="row mb-3">
                <p class="form-label">Images</p>
                {#if _images.length > 0}
                    {#each _images as image}
                        <div 
                            id={"img-" + image.priority} 
                            class="col-4 col-xl-3 my-2" 
                            on:dragover={allowDrop} 
                            on:drop={drop}
                            role="none">
                            {#await generateUrl(image.file)}
                                <span>...</span>
                            {:then generatedUrl}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-interactive-supports-focus -->
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="3%" 
                                    height="3%" 
                                    fill="#D0D0D0" 
                                    style="position: absolute;" 
                                    class="bi bi-x-circle-fill mx-1 my-1" 
                                    viewBox="0 0 16 16" 
                                    role="button"
                                    on:click={() => removeImage(image)}>
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <img 
                                    id={image.file !== null ? image.file.name : image.id}
                                    src={generatedUrl !== null ? generatedUrl : image.url}
                                    alt="" 
                                    width="100%" 
                                    draggable="true"
                                    on:dragstart={drag} />
                            {/await}
                        </div>  
                    {/each}
                {/if}
                <div class="col-4 col-xl-3 my-2">   
                    <label for="add-image">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#D0D0D0" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                          </svg>
                    </label>
                    <input id="add-image" class="position-absolute" type="file" accept="image/png, image/jpeg" style="visibility: hidden;" on:change={addNewImage}>
                </div>
            </div>

            <div class="form-check mb-3">
                <input id="listForSaleInput" type="checkbox" class="form-check-input" bind:checked={_product.listedForSale}>
                <label for="listForSaleInput" class="form-check-label">List for sale?</label>
            </div>

            <div class="mt-5">
                <button type="submit" class="btn me-2" style="color: #66CC33; border-color: #66CC33">Save</button>
                <button type="button" class="btn" style="color: #CC3333; border-color: #CC3333" on:click={cancel}>Cancel</button>
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

<style>
    #descriptionInput {
        height: 10%;
    }

    div button {
        width: 5em;
    }

    input::file-selector-button {
        width: 100px;
        height: 100px;
        background: url(https://placehold.co/100);
        border: none;
    }
</style>