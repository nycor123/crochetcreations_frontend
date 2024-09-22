<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getUserInfo, backendUrls, siteUrls } from '$lib/index.js';
    import logo_lg from '$lib/assets/logo_no_bg.png';
    import logo_md from '$lib/assets/logo_no_bg.png';
    import logo_sm from '$lib/assets/logo_no_bg.png';

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

<nav class='navbar d-flex justify-content-between align-items-center mx-2'>
    {#if innerWidth < 768}
        <div class='offCanvasToggle'>
            <svg 
                xmlns='http://www.w3.org/2000/svg' 
                width='22' 
                height='22' 
                fill='currentColor' 
                class='bi bi-list' 
                viewBox='0 0 16 16'
                type='button' 
                data-bs-toggle='offcanvas' 
                data-bs-target='#offcanvasNav'>
                <path fill-rule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'/>
            </svg>
            <div class='offcanvas offcanvas-start' tabindex='-1' id='offcanvasNav'>
                <div class='offcanvas-header'>
                    <h5 class='offcanvas-title' id='offcanvasExampleLabel'>Menu</h5>
                    <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
                </div>
                <ul class='nav flex-column'>
                    {#each navData as navData}
                        {#if navData.link}
                            <li class='nav-item'>
                                <a class='nav-link' href={navData.link}>{navData.displayText}</a>
                            </li>
                        {:else if navData.links}
                            {#each navData.links as childLink}
                                <li class='nav-item'>
                                    <a class='nav-link' href={childLink.link}>{childLink.displayText}</a>
                                </li>
                            {/each}
                        {/if}
                    {/each}
                </ul>
            </div>
        </div>
    {:else}
        <div class='fillerDiv' />
    {/if}
    
    <div>
        <a class='navbar-brand mx-auto' href='/'>
            <img src={logo} alt='site-logo'  style="width: 200px; height: 200px;"/>
        </a>
    </div>
    
    <div class='userAndCart d-flex justify-content-end'>
        {#if isLoggedIn}
            <div class='btn-group dropstart me-2'>
                <a class='nav-link' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                    {#if userData.pictureUrl != null}
                        {#if innerWidth > 768}
                        <span style="font-size: .8rem;">Hi, {userData.firstName}!</span>
                        {/if}
                        <img src={userData.pictureUrl} style="width: 1.6rem; height: 1.6rem; border-radius: 50%;"/>
                    {:else}
                        <svg 
                            xmlns='http://www.w3.org/2000/svg' 
                            width='{svgSize}' 
                            height='{svgSize}' 
                            fill='currentColor' 
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
            <div class='me-2'>
                <a href='/login'>
                    <svg 
                        xmlns='http://www.w3.org/2000/svg' 
                        width='{svgSize}' 
                        height='{svgSize}' 
                        fill='currentColor' 
                        class='bi bi-person' 
                        viewBox='0 0 16 16'>
                        <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'/>
                    </svg>
                </a>
            </div>
        {/if}
        <div>
            <a href=#>
                <svg 
                    xmlns='http://www.w3.org/2000/svg' 
                    width='{svgSize}' 
                    height='{svgSize}' 
                    fill='currentColor' 
                    class='bi bi-cart3' 
                    viewBox='0 0 16 16'>
                    <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2'/>
                </svg>
            </a>
        </div>
    </div>
</nav>

<style>
    .offCanvasToggle, .fillerDiv, .userAndCart {
        width: 14%;
        margin: 0;
    }
    
    a {
        color: black;
    }
</style>
