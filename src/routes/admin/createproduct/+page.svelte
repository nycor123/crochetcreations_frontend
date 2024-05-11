<script>
    let _product = {
        name: "",
        description: "",
        price: "",
        listedForSale: "",
        imageIds: []
    };

    let _files = [];
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
            if (_files != null && _files.length > 0) {
                _product.imageIds = await uploadImages(_files);
            }
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
            _isSaving = false;
            form.classList.remove("was-validated");
            triggerAlert("success", "Successfully saved product - "); //TODO: create product link
            form.reset();
        } catch(err) {
            _isSaving = false;
            triggerAlert("danger", "Unable to save product", null, err);
        }
    }

    async function uploadImages(files) {
        let imageIds = [];
        for (const file of files) {
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
            imageIds.push(resJson.id);
        }   
        return imageIds;
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

</script>

<div class="row mx-3 my-3">
    <div class="col-sm-12 col-md-6 col-lg-4 mx-auto">
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
            
            <div class="mb-3">
                <label for="imagesInput" class="form-label">Pictures</label>
                <input 
                    id="imagesInput" 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    class="form-control" 
                    multiple 
                    bind:files={ _files } >
            </div>

            <div class="form-check mb-3">
                <input id="listForSaleInput" type="checkbox" class="form-check-input" bind:checked={ _product.listedForSale }>
                <label for="listForSaleInput" class="form-check-label">List for sale?</label>
            </div>

            <div class="mt-5">
                <button type="submit" class="btn btn-outline-success me-2">Save</button>
                <button type="button" class="btn btn-outline-danger">Cancel</button>
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
</style>