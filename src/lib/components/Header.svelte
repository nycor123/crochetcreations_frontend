<script>
    import logo_lg from '$lib/assets/JC_Logo.png';
    import logo_md from '$lib/assets/JC_Logo_Medium.png';
    import logo_sm from '$lib/assets/JC_Logo_Small.png';

    export let navData;

    let innerWidth;

    $: logo = getLogo(innerWidth);
    $: svgSize = getSvgSize(innerWidth);

    function getLogo(innerWidth) {
        if (innerWidth <= 576) {
            return logo_sm;
        } else if (innerWidth > 576 && innerWidth <= 992) {
            return logo_md;
        } else {
            return logo_lg;
        }
    }

    function getSvgSize() {
        if (innerWidth <= 576) {
            return 20;
        } else if (innerWidth > 576 && innerWidth <= 992) {
            return 22;
        } else {
            return 25;
        }
    }
</script>

<svelte:window bind:innerWidth />

<div class="navbar mx-2 align-self-center gap-2">
    {#if innerWidth < 768}
    <div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            fill="currentColor" 
            class="bi bi-list" 
            viewBox="0 0 16 16"
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNav">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav">
            <ul class="nav flex-column">
                {#each navData as navData}
                    {#if navData.link}
                        <li class="nav-item">
                            <a class="nav-link" href={navData.link}>{navData.displayText}</a>
                        </li>
                    {:else if navData.links}
                        {#each navData.links as childLink}
                            <li class="nav-item">
                                <a class="nav-link" href={childLink.link}>{childLink.displayText}</a>
                            </li>
                        {/each}
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
    {/if}
    <a class="navbar-brand me-auto ms-auto" href="#">
        <img src={logo} alt="site-logo" />
    </a>
    <a href="/login">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="{svgSize}" 
            height="{svgSize}" 
            fill="currentColor" 
            class="bi bi-person" 
            viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
    </a>
    <a href=#>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="{svgSize}" 
            height="{svgSize}" 
            fill="currentColor" 
            class="bi bi-cart3" 
            viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
    </a>
</div>
