<script>
    import Header from '$lib/components/Header.svelte';
	import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Products from '$lib/components/Products.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    let innerWidth;
</script>

<svelte:window bind:innerWidth />

<AnnouncementSlide />
<Header 
    userInfo={data.userInfo}
    navData={data.navigationData} />
{#if innerWidth > 768}
    <Navigation navigationData={data.navigationData} />
{/if}
<Carousel />
<Products />
<Footer />
