<script>

    //TODO: Add loading animation while waiting for the product to save.
    //TODO: Add error handling.

    let _product = {
        name: "",
        description: "",
        price: "",
        listedForSale: "",
        imageIds: []
    }

    let _files;

    async function saveProduct() {
        let products = [];
        if (isValidProduct(_product)) {
            if (_files != null && _files.length > 0 && areValidFiles(_files)) {
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
            console.log(resJson);
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

    function isValidProduct(product) {
        //TODO
        return true;
    }

    function areValidFiles(files) {
        //TODO
        return true;
    }

</script>

<div class="row mx-3 my-3">
    <div class="col-sm-12 col-md-6 col-lg-4 mx-auto">
        <form on:submit={saveProduct}>
            <h1 class="mb-3">New Product</h1>
        
            <div class="form-floating mb-3">
                <input type="text" id="nameInput" class="form-control" placeholder="" bind:value={ _product.name }>
                <label for="nameInput" class="form-label">Product name</label>
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
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="submit" class="btn btn-danger">Cancel</button>
            </div>
        </form>
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