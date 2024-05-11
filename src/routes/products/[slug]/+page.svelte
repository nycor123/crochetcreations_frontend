<script>
    import Header from '$lib/components/Header.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';

    export let data;

    let innerWidth;
    let description = data.product.description.split('\n');
</script>

<svelte:window bind:innerWidth />

<Header 
    userInfo={data.userInfo}
    navData={data.navigationData} />

{#if innerWidth > 768}
    <Navigation navigationData={data.navigationData} />
{/if}

<div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-2 mx-2">
        <div class="col p-0">
            <!-- <img src={data.product.images[0].url} alt="..."> -->
            <img src="https://placehold.co/400" alt="...">
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