<script>
    import ProductCard from '$lib/components/ProductCard.svelte';
</script>

<div class="container">
    <div class="row">
        {#each Array(9) as _, index (index) }
            <div class="col-6 col-md-3">
                <ProductCard />
            </div>
        {/each}
    </div>
</div>