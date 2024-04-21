<script>
    import Header from '$lib/components/Header.svelte';
	import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Products from '$lib/components/Products.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    let innerWidth;

    async function getUserInfo() {
        let response = await fetch("http://localhost:8080/api/v1/user/info", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept" : "application/json"
            }
        });
        return await response.json();
    }

    getUserInfo().then(json => console.log("Hi, " + json.email));
</script>

<svelte:window bind:innerWidth />

<AnnouncementSlide />
<Header navData={data.navigationData} />
{#if innerWidth > 768}
    <Navigation navigationData={data.navigationData} />
{/if}
<Carousel />
<Products />
<Footer />
