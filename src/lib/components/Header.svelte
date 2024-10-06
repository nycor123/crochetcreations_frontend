<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getUserInfo, backendUrls, siteUrls, colors, navigationData } from '$lib/index.js';
    import logo from '$lib/assets/logo.png';
    import Navigation from '$lib/components/Navigation.svelte';

    export let navData;

    let userData = {
        email: null,
        firstName: null,
        lastName: null,
        role: null,
        pictureUrl: null
    };

    onMount(async () => {
        let fetchedUserData = await getUserInfo();
        if (fetchedUserData != null) {
            userData.email = fetchedUserData.email;
            userData.firstName = fetchedUserData.firstName;
            userData.lastName = fetchedUserData.lastName;
            userData.role = fetchedUserData.role;
            userData.pictureUrl = fetchedUserData.pictureUrl;
        }
    });

    let innerWidth;

    $: isLoggedIn = userData.email != null;
    $: svgSize = getSvgSize(innerWidth);

    function getSvgSize() {
        if (innerWidth <= 600) {
            return '1.5em';
        } else if (innerWidth <= 992) {
            return '1.8em';
        } else {
            return '2em';
        }
    }

    function logout() {
        fetch(backendUrls.signOutUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json'
            }
        }).then((response) => {
            Object.keys(userData).forEach(k => userData[k] = null);
            goto('/');
        });
    }
</script>

<svelte:window bind:innerWidth />

<nav class='navbar my-2'>
    {#if innerWidth < 992}
        <div class='offCanvasToggle'>
            <svg 
                xmlns='http://www.w3.org/2000/svg' 
                width={svgSize} 
                height={svgSize}
                fill={colors.font} 
                class='bi bi-list' 
                viewBox='0 0 16 16'
                type='button' 
                data-bs-toggle='offcanvas' 
                data-bs-target='#offcanvasNav'>
                <path fill-rule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'/>
            </svg>
            <div class='offcanvas offcanvas-start' tabindex='-1' id='offcanvasNav' style='background-color: {colors.body}; color: {colors.font};'>
                <div class='offcanvas-header' style='background-color: {colors.primary}'>
                    <h5 class='offcanvas-title' id='offcanvasExampleLabel'>Menu</h5>
                    <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
                </div>  
                <ul class='nav flex-column'>
                    {#each navData as navData}
                        {#if navData.link}
                            <li class='nav-item'>
                                <a class='nav-link' style='color: {colors.font};' href={navData.link}>{navData.displayText}</a>
                            </li>
                        {:else if navData.links}
                            {#each navData.links as childLink}
                                <li class='nav-item'>
                                    <a class='nav-link' style='color: {colors.font};' href={childLink.link}>{childLink.displayText}</a>
                                </li>
                            {/each}
                        {/if}
                    {/each}
                </ul>
            </div>
        </div>
        <h1 style='margin-bottom: 0;'>
            <a style='margin-bottom: 0; color: {colors.font};' href='/'>JULEY CROCHET</a>
        </h1>
    {:else}
        <a class='navbar-brand' href='/'>
            <img src={logo} alt='site-logo' style="width: 10em; height: 10em;"/>
        </a>
        <Navigation navigationData={navigationData} />
    {/if}
    
    <div class='nav justify-content-end userCart'>
        {#if isLoggedIn}
        <div  class='btn-group dropstart me-2'>
            <a class='nav-link' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false' style='padding: 0'>
                {#if userData.pictureUrl != null}
                    <img src={userData.pictureUrl} style="width: {svgSize}; height: {svgSize}; border-radius: 50%;"/>
                {:else}
                    <svg 
                        xmlns='http://www.w3.org/2000/svg' 
                        width='{svgSize}' 
                        height='{svgSize}' 
                        fill={colors.font} 
                        class='bi bi-person-check' 
                        viewBox='0 0 16 16'>
                        <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4'/>
                        <path d='M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z'/>
                    </svg>
                {/if}
            </a>
            <ul class='dropdown-menu'>
                {#if userData.role != null && userData.role.toLowerCase() === 'admin'}
                    <li class='nav-item'>
                        <a class='nav-link ms-2' href={siteUrls.admin} role='button'>Admin</a>
                    </li>
                {/if}
                <li class='nav-item'>
                    <a class='nav-link ms-2' href='#' role='button'>My Account</a>
                </li>
                <li class='nav-item'>
                    <a class='nav-link ms-2' href='#' role='button'>My Purchases</a>
                </li>
                <li class='nav-item'>
                    <a class='nav-link ms-2' href='#' role='button' on:click={logout}>Logout</a>
                </li>
            </ul>
        </div>
        {:else}
        <a href='/login'>
            <svg 
                xmlns='http://www.w3.org/2000/svg' 
                width='{svgSize}' 
                height='{svgSize}' 
                fill={colors.font} 
                class='bi bi-person' 
                viewBox='0 0 16 16'>
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/>
            </svg>
        </a>
        {/if}
        <a href=#>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width='{svgSize}' 
                height='{svgSize}' 
                fill={colors.font} 
                class="bi bi-bag"
                viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
        </a>
    </div>
</nav>

<style>
    .offCanvasToggle, .userCart {
        width: 15%;
    }
    a {
        text-decoration: none;
    }
</style>