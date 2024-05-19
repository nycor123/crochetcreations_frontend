<script>
    import Header from '$lib/components/Header.svelte';
	import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Products from '$lib/components/Products.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    let innerWidth;
    let featuredProducts = data.featuredProducts.filter(p => p.listedForSale);
</script>

<svelte:window bind:innerWidth />

<AnnouncementSlide />

<Header 
    userInfo={data.userInfo}
    navData={data.navigationData} />

{#if innerWidth > 768}
    <Navigation navigationData={data.navigationData} />
{/if}

<div class="container mt-4">
    <Carousel /> <!-- min/max: 1200x600 -->

    <Products 
        group="Featured" 
        products={featuredProducts} /> <!-- min: 600x600 | max: 1024x1024 -->
</div>

<Footer />

<style>
    .container {
        max-width: 1140px;
    }
</style>