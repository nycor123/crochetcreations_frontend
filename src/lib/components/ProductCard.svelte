<script>
    export let product;

    $: _imgUrls = product.images == null || product.images.length == 0 ? ["https://placehold.co/200x200"] : getImgUrls();

    function getImgUrls() {
        let imgUrls = [];
        for (const image of product.images) {
            imgUrls.push(image.url);
        }
        return imgUrls;
    }
</script>

<div class="card">
    <a href="#">
        <img src={_imgUrls[0]} class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text fs-6">{product.name}</p>
        <p class="price card-text"><strong>₱{product.effectivePrice.amount.toLocaleString()}.00</strong></p>
        </div>
    </a>
</div>

<style>
    .card {
        margin-top: 1em;
        font-size: 12px;
    }
    
    a {
        text-decoration: none;
        color: black;
    }

    .price {
        font-size: small;
    }
</style>
