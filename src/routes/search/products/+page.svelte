<script>
    import Header from '$lib/components/Header.svelte';
    import AnnouncementSlide from '$lib/components/AnnouncementSlide.svelte';
    import Products from '$lib/components/products/Products.svelte';
    import ProductSearchBar from '$lib/components/products/ProductSearchBar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount } from 'svelte';
    import { navigationData } from '$lib/index.js';
    import { backendUrls } from '$lib/index.js';

    let _searchCriteria = {
        name: "",
        page: 0,
        pageSize: 8,
        sortBy: "name",
        sortDirection: "asc"
    }

    let _results = [];

    onMount(async() => {
        // Initialize _searchCriteria.
        let params = new URLSearchParams(window.location.search);
        for (const key in _searchCriteria) {
            _searchCriteria[key] = params.get(key);
        }
        // Fetch products.
        try {
            let response = await fetch(`${backendUrls.productsSearchUrl}?${buildQueryParams()}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept' : 'application/json'
                }
            });
            let results = await response.json();
            _results = results.pageData
        } catch(err) {
            console.log(err);
        }
    });

    function buildQueryParams() {
        let queryParams = '';
        let count = 0;
        for (const key in _searchCriteria) {
            let param = '';
            if (count > 0) {
                param = '&' + key + '=' + _searchCriteria[key];
            } else {
                param = key + '=' + _searchCriteria[key];
            }
            queryParams += param;
            count++;
        }
        return queryParams;
    }
</script>

<AnnouncementSlide />

<div class='container-xl mt-4'>
    <Header navData={navigationData} />
    <ProductSearchBar />
    <Products 
        group='Results for {`"${_searchCriteria.name}"`}:'
        products={_results} />
</div>

<Footer />