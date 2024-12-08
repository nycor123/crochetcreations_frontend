<script>
    import ProductCard from "$lib/components/products/ProductCard.svelte";
    import { onMount } from "svelte";
    import { siteUrls, backendUrls, colors } from "$lib/index.js";

    export let group;
    export let searchCriteria;

    let _products = [];
    let _latestSearchResults = {};

    onMount(async () => {
        try {
            _latestSearchResults = await fetchProducts();
            _products = _latestSearchResults.pageData
        } catch(err) {
            console.log(err);
        }
    });

    function buildQueryParams() {
        let queryParams = "";
        let count = 0;
        for (const key in searchCriteria) {
            let param = "";
            if (count > 0) {
                param = "&" + key + "=" + searchCriteria[key];
            } else {
                param = key + "=" + searchCriteria[key];
            }
            queryParams += param;
            count++;
        }
        return queryParams;
    }

    async function fetchProducts() {
        let response = await fetch(`${backendUrls.productsSearchUrl}?${buildQueryParams()}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept" : "application/json"
                }
            });
        return await response.json();
    }

    async function loadMoreProducts() {
        try {
            if (searchCriteria.page < _latestSearchResults.maxPageIndex) {
                searchCriteria.page++;
            }
            _latestSearchResults = await fetchProducts();
            _products.push(..._latestSearchResults.pageData);
            _products = _products;
        } catch(err) {
            console.log(err);
        }
    }
</script>

<h3 class="mt-5" style="color: {colors.font}">{group}</h3>
<div class="row row-cols-2 row-cols-sm-4">
    {#each _products as product }
        <div class="col mt-3">
            <a href={`${siteUrls.products + "/" + product.id}`}>
                <ProductCard product={product}/>
            </a>
        </div>
    {/each}
</div>

{#if searchCriteria.page < _latestSearchResults.maxPageIndex}
    <div class="row mt-4">
        <button 
            class="mx-auto" 
            style="background-color: {colors.secondary}; color: {colors.font};"
            on:click={loadMoreProducts}>
            VIEW MORE
        </button>
    </div>
{/if}

<style>
     a {
        text-decoration: none;
        color: black;
    }
    button {
        border: none;
        border-radius: .3em;
        width: 8em;
    }
</style>
