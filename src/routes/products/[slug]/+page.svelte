<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { siteUrls, navigationData } from '$lib/index.js';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';

    export let data;

    let userData;
    let productData;
    let images = [];
    let description = [];
    
    $: productDataLoaded = productData != null;

    onMount(() => {
        userData = data.userData;
        productData = data.productData;
        if (productData === null) {
            goto("/");
        } else {
            images = (productData.images === null || productData.images.length === 0) ? [{ url: 'https://placehold.co/600' }] : productData.images;
            if (productData.images.length > 1) {
                images = productData.images.sort((img1, img2) => img1.priority - img2.priority);
            }
            description = productData.description == null ? "" : productData.description.split('\n');
        }   
    });

    let innerWidth;
</script>

<svelte:window bind:innerWidth />

<AnnouncementSlide />

<div class='container'>
    <Header navData={navigationData} />
</div>

{#if productDataLoaded}
    <div class="container mt-4">
        {#if userData != null && userData.role.toLowerCase() === 'admin'}
            <div class="row row-cols-1 mb-2">
                <a href="{siteUrls.update + `?entity=product&id=${productData.id}`}" style="color: #806657;"><strong>Edit Product</strong></a>
            </div>
        {/if}
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
            <div class="col p-4 checkout-section">
                <h3>{productData.name}</h3>
                <p>₱{productData.effectivePrice.amount.toLocaleString()}.00</p>
                <p>Shipping calculated at checkout.</p>
                <hr>
                <label for="qtyInput">Quantity</label>
                <div>
                    <button type="button" style="width: 2em;">-</button>
                    <input type="number" id="qtyInput" style="width: 3em; background-color: #bd9982; border: none;">
                    <button type="button" style="width: 2em;">+</button>
                    <span>0 pieces available</span>
                </div>
                <hr>
                <div>
                    <button class="mt-1" type="button" style="width: 80%; display:block">ADD TO CART</button>
                    <button class="mt-1" type="button" style="width: 80%; display:block">BUY NOW</button>
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
{:else}
    <div class="position-fixed" style="top: 20%; left: 50%; color: #a78874;">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
{/if}

<Footer />

<style>
    .container {
        max-width: 1140px;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .checkout-section button {
        background-color: #9e806d;
        border: none;
    }
</style>
