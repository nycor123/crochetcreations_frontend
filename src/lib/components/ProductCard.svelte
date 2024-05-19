<script>
    export let product;

    $: _imgUrls = product.images == null || product.images.length == 0 ? ["https://placehold.co/600"] : getImgUrls();

    function getImgUrls() {
        let imgUrls = [];
        for (const image of product.images) {
            imgUrls.push(image.url);
        }
        return imgUrls;
    }
</script>

<div class="card">
    <img src={_imgUrls[0]} class="card-img-top" alt="...">
    <div class="card-body text-center">
        <p class="name card-text">{product.name}</p>
        <p class="price card-text"><strong>₱{product.effectivePrice.amount.toLocaleString()}.00</strong></p>
    </div>
</div>

<style>
    img {
        width: 100%;
        height: 100%;
        border-radius: 0%;
    }

    .card {
        border: none;
    }

    .card p {
        margin-bottom: .5em;
        margin-left: 0;
        margin-right: 0;
    }

    .name {
        font-size: smaller;
    }

    .price {
        font-size: small;
    }
</style>
