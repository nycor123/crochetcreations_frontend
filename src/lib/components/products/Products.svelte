<script>
    import ProductCard from '$lib/components/products/ProductCard.svelte';
    import { colors } from '$lib/index.js';

    export let group;
    export let products;
</script>

<h3 class="mt-5" style="color: {colors.font}">{group}</h3>
<div class="row row-cols-2 row-cols-sm-4">
    {#each products as product }
        <div class="col mt-3">
            <a href={`products/${product.id}`}>
                <ProductCard product={product}/>
            </a>
        </div>
    {/each}
</div>
<div class='row mt-4'>
    <button class="mx-auto" style='background-color: {colors.secondary}; color: {colors.font};'>VIEW MORE</button>
</div>

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
