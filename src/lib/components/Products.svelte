<script>
    import ProductCard from '$lib/components/ProductCard.svelte';

    export let group;
    export let products;
</script>

<div class="container">
    <h3 class="mt-3">{group}</h3>
    <div class="row row-cols-2 row-cols-md-4 mt-3">
        {#each products as product }
            <div class="col mb-3">
                <a href={`products/${product.id}`}>
                    <ProductCard product={product}/>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
     a {
        text-decoration: none;
        color: black;
    }
</style>