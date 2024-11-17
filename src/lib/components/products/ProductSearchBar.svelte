<script>
    import { goto } from '$app/navigation';
    import { colors } from '$lib/index.js';

    let _searchCriteria = {
        name: "",
        page: 0,
        pageSize: 8,
        sortBy: "name",
        sortDirection: "asc"
    }

    function performSearch() {
        if (window.location.pathname === "/search/products") {
            goto('/search/products?' + buildQueryParams()).then(() => location.reload());
        } else {
            goto('/search/products?' + buildQueryParams())
        }
    }

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

<div class="row justify-content-center mt-5">
    <div class="col col-sm-12 col-md-8">
        <form id="searchForm" on:submit|preventDefault={performSearch}>
            <div class="input-group">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search" 
                    aria-label="Search" 
                    aria-describedby="search-button"
                    bind:value={_searchCriteria.name}>
                <button 
                    class="btn" 
                    type="submit"
                    form="searchForm" 
                    id="search-button" 
                    style="background-color: {colors.secondary};">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="1.5em" 
                        height="1.5em" 
                        fill={colors.font} 
                        class="bi bi-search" 
                        viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
        </form>
    </div>
</div>

<style>
    #search-button {
        width: 20%;
    }

    input:focus {
        border-color: #806657;
        box-shadow: 0 0 0 0.2rem rgba(34, 142, 59, 0.25);
    }
</style>