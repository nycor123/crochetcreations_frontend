<script>
    import ProductEditor from '$lib/components/products/ProductEditor.svelte';
    import JumbotronContentEditor from '$lib/components/jumbotron-content/JumbotronContentEditor.svelte';

    export let data;

    let entityType = data.urlSearchParams.get('entity');
</script>

{#if entityType === 'product'}
    <ProductEditor productId={null} />
{:else if entityType === 'jumbotronContent'}
    <JumbotronContentEditor jumbotronContentId={null} />
{/if}
