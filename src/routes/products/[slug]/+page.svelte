<script>
    import Header from '$lib/components/Header.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';

    export let data;

    let innerWidth;
    let images = data.product.images == null || data.product.images.length === 0 ? 
        [{url: "https://placehold.co/600"}, {url: "https://placehold.co/600"}, {url: "https://placehold.co/600"}]
        : data.product.images;
    let description = data.product.description == null ? "" : data.product.description.split('\n');
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
    <div class="row row-cols-1 row-cols-md-2 mx-2">
        <div id="productImagesCarousel" class="col carousel slide p-0">
            <div class="carousel-indicators">
                {#each images as image, i}
                    {#if i === 0}
                        <button type="button" data-bs-target="#productImagesCarousel" data-bs-slide-to="{i}" class="active" aria-current="true" aria-label="Slide {i}"></button>
                    {:else}
                        <button type="button" data-bs-target="#productImagesCarousel" data-bs-slide-to="{i}" aria-label="Slide {i}"></button>
                    {/if}
                {/each}
            </div>
            <div class="carousel-inner">
                {#each images as image, i}
                    {#if i === 0}
                        <div class="carousel-item active">
                            <img src="{image.url}" class="d-block w-100" alt="...">
                        </div>
                    {:else}
                        <div class="carousel-item">
                            <img src="{image.url}" class="d-block w-100" alt="...">
                        </div>
                    {/if}
                {/each}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="col p-4">
            <h3>{data.product.name}</h3>
            <p>₱{data.product.effectivePrice.amount.toLocaleString()}.00</p>
            <p>Shipping calculated at checkout.</p>
            <hr>
            <label for="qtyInput">Quantity</label>
            <div>
                <button type="button">-</button>
                <input type="number" id="qtyInput" style="width: 3em">
                <button type="button">+</button>
                <span>0 pieces available</span>
            </div>
            <hr>
            <div>
                <button class="mx-auto" type="button" style="width: 80%; display:block">ADD TO CART</button>
                <button class="mx-auto" type="button" style="width: 80%; display:block">BUY NOW</button>
            </div>
        </div>
        <div class="col mt-4" style="font-size: .9em;">
            {#each description as paragraph}
                {#if paragraph !== ''}
                    <p>{paragraph}</p>
                {/if}
            {/each}
        </div>
    </div>
</div>

<Footer />

<style>
    .container {
        max-width: 1140px;
    }

    img {
        width: 100%;
        height: 100%;
    }
</style>