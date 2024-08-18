<script>
    import { siteUrls } from '$lib/index.js';
</script>

<div class='container'>
    <div class='row mt-3'>
        <div class='col-12 col-md-8 col-lg-6 mx-auto'>
            <h1>Admin Menu</h1>
            <ul>
                <li><a href='{siteUrls.create}?entity=product'>Create New Product</a></li>
                <li><a href='{siteUrls.jumbotronContents}'>Edit Jumbotron</a></li>
                <li><a href='{siteUrls.home}'>Back to Site</a></li>
            </ul>
        </div>
    </div>
</div>

