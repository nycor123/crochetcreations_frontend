<script>
    import ProductEditor from '$lib/components/products/ProductEditor.svelte';

    export let data;
</script>

<ProductEditor productId={data.productId} />
