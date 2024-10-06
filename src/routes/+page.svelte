<script>
    import { onMount } from 'svelte';
    import { getAllProducts, getUserInfo, siteUrls, backendUrls } from '$lib/index.js';
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
	import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Products from '$lib/components/products/Products.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    let _allProducts = [];

    onMount(async () => {
        _allProducts = await getAllProducts();
        //Start of Google OAuth flow.
        let userData = await getUserInfo();
        if ($page.url.searchParams.get('code') != null && userData == null) {
            let payload = {
                grantCode: $page.url.searchParams.get('code'),
                redirectUri: siteUrls.home
            };
            let response = await fetch(backendUrls.signInGoogleUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            let responseObj = await response.json();
            location.reload();
            // TODO: Show welcome message upon signing in.
        }
        //End of Google OAuth flow.
    });

    let innerWidth;
</script>

<svelte:window bind:innerWidth />

<AnnouncementSlide />

<div class='container mt-4'>
    <Header navData={data.navigationData} />
    <Carousel jumbotronContents={data.jumbotronContents} /> <!-- min/max: 1200x600 -->
    <Products 
        group='All Products' 
        products={_allProducts} /> <!-- min: 600x600 | max: 1024x1024 -->
</div>

<Footer />

<style>
    .container {
        max-width: 1140px;
    }
</style>
