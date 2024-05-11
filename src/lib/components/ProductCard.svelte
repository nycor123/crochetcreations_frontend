<script>
    export let product;

    $: _imgUrls = product.images == null || product.images.length == 0 ? ["https://placehold.co/400"] : getImgUrls();

    function getImgUrls() {
        let imgUrls = [];
        for (const image of product.images) {
            imgUrls.push(image.url);
        }
        return imgUrls;
    }
</script>

<div class="card h-100">
    <img src={_imgUrls[0]} class="card-img-top" alt="...">
    <div class="card-body">
        <p class="name card-text">{product.name}</p>
        <p class="price card-text"><strong>₱{product.effectivePrice.amount.toLocaleString()}.00</strong></p>
    </div>
</div>

<style>
    img {
        width: 100%;
        height: 100%;
    }

    .name {
        font-size: smaller;
    }

    .price {
        font-size: small;
    }
</style>
