<script>
    import { colors } from '$lib/index.js';
</script>

<div class="container-flex sticky-bottom" style='background-color: {colors.primary};'>
    <div class="row align-middle justify-content-center">
        <div class="col-sm-12 col-md-4 contactus" style='color: {colors.font};'>
            <h5>Contact us</h5>
            <p>For product inquiries please email us at help@juleycrochet.com or message us on either of our 
                <a style='color: {colors.font};' href="https://www.facebook.com/profile.php?id=61557071875746&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook</a> or 
                <a style='color: {colors.font};' href="https://www.instagram.com/juleycrochetph?igsh=cXptMWFzZHZndmo=" target="_blank" rel="noopener noreferrer">Instagram</a> pages.</p>
        </div>
        <hr>
    </div>
    <div class="row align-middle" style='color: {colors.font};'>
        <div class="col copyright">
            <p>© 2024, Juley Crochet</p>
        </div>
    </div>
</div>

<style>
    .container-flex {
        padding: 1em;
    }

    .container-flex {
        top: 100%;
        margin-top: 2em;
    }

    .contactus {
        text-align: center;
        font-size: small;
    }

    .copyright p {
        text-align: center;
        margin: 0;
    }
</style>