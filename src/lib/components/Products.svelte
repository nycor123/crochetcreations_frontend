<script>
    import ProductCard from '$lib/components/ProductCard.svelte';

    export let group;
    export let products;
</script>

<div class="container">
    <h3 class="mt-3">{group}</h3>
    <div class="row">
        {#each products as product }
            <div class="col-6 col-md-3">
                <ProductCard product={product}/>
            </div>
        {/each}
    </div>
</div>
