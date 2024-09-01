<script>
    import ProductCard from '$lib/components/products/ProductCard.svelte';

    export let group;
    export let products;
</script>

<h3 class="my-4">{group}</h3>
<div class="row row-cols-2 row-cols-sm-4">
    {#each products as product }
        <div class="col">
            <a href={`products/${product.id}`}>
                <ProductCard product={product}/>
            </a>
        </div>
    {/each}
</div>

<style>
     a {
        text-decoration: none;
        color: black;
    }
</style>
