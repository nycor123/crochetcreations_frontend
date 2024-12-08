<script>
    import Header from '$lib/components/Header.svelte';
    import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
    import Products from '$lib/components/products/Products.svelte';
    import ProductSearchBar from '$lib/components/products/ProductSearchBar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { navigationData } from '$lib/index.js';

    export let data;
</script>

<AnnouncementSlide />

<div class='container-xl mt-4'>
    <Header navData={navigationData} />
    <ProductSearchBar />
    <Products 
        group='Results for {`"${data.searchCriteria.name}"`}:'
        searchCriteria={data.searchCriteria} />
</div>

<Footer />