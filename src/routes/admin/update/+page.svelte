<script>
    import ProductEditor from '$lib/components/products/ProductEditor.svelte';
	import JumbotronContentEditor from '$lib/components/jumbotron-content/JumbotronContentEditor.svelte';

    export let data;

    let entityType = data.urlSearchParams.get('entity');
    let entityId = data.urlSearchParams.get('id');
</script>

{#if entityType === 'product'}
    <ProductEditor productId={entityId} />
{:else if entityType === 'jumbotronContent'}
    <JumbotronContentEditor jumbotronContentId={entityId} />
{/if}
