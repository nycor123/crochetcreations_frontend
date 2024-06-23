<script>
    let _product = {
        name: "",
        description: "",
        price: "",
        listedForSale: "",
        images: []
    };

    let _images = [];
    let _isSaving = false;

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
            // upload images
            if (_images != null && _images.length > 0) {
                let productImages = [];
                for (let image of _images) {
                    let productImage = {
                        id: await uploadImage(image.file),
                        priority: image.priority
                    };
                    productImages.push(productImage);
                }
                _product.images = productImages;
            }
            // save product
            products.push(_product);
            let response = await fetch("http://localhost:8080/api/v1/products", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                },
                body: JSON.stringify(products)
            });
            let resJson = await response.json();
            if (!response.ok) {
                throw new Error(resJson.message);
            }
            // cleanup
            _isSaving = false;
            form.classList.remove("was-validated");
            triggerAlert("success", "Successfully saved product - "); //TODO: create product link
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
        let response = await fetch("http://localhost:8080/api/v1/images/upload", {
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

    function triggerAlert(type, message, productLink = "#", errorMsg) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        const wrapper = document.createElement('div');

        if (type === "success") {
            wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}<a href=${productLink}>view</a></div>`,
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
            file: event.target.files[0],
            url: await generateUrl(event.target.files[0]),
            priority: _images.length + 1
        };
        _images = [..._images, image];
    }
    
    async function generateUrl(file) {
        return new Promise((resolve) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
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
            <h1 class="mb-3">New Product</h1>
        
            <div class="form-floating mb-3">
                <input type="text" id="nameInput" class="form-control" placeholder="" bind:value={ _product.name } required>
                <label for="nameInput" class="form-label">Product name</label>
                <div class="invalid-feedback">
                    Product name is required.
                </div>
            </div>
        
            <div class="form-floating mb-3">
                <textarea id="descriptionInput" class="form-control" rows="5" placeholder="" bind:value={ _product.description } />
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
                                <img 
                                    id={image.file.name}
                                    src={generatedUrl}
                                    alt="{image.file.name}" 
                                    width="100%" 
                                    draggable="true"
                                    on:dragstart={drag} />
                            {/await}
                        </div>  
                    {/each}
                {/if}
                <div class="col-4 col-xl-3 my-2">   
                    <label for="add-image">
                        <div style="width: 100%; background-color: lightgray; padding: 1.5em;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="gray" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                        </div>
                    </label>
                    <input id="add-image" class="position-absolute" type="file" accept="image/png, image/jpeg" style="visibility: hidden;" on:change={addNewImage}>
                </div>
            </div>

            <div class="form-check mb-3">
                <input id="listForSaleInput" type="checkbox" class="form-check-input" bind:checked={_product.listedForSale}>
                <label for="listForSaleInput" class="form-check-label">List for sale?</label>
            </div>

            <div class="mt-5">
                <button type="submit" class="btn btn-outline-success me-2">Save</button>
                <button type="button" class="btn btn-outline-danger" on:click={cancel}>Cancel</button>
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