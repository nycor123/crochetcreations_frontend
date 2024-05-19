<script>
    import { onMount } from "svelte";

    export let navigationData;

    onMount(() => {
        let links = document.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            let linkUrl = link.getAttribute("href");
            if (linkUrl.includes("facebook") || linkUrl.includes("instagram")) {
                links[i].setAttribute("target", "_blank");
                links[i].setAttribute("rel", "noopener noreferrer");
            }
        }
    });
</script>

<nav class="navbar justify-content-center">
    {#each navigationData as navData}
        {#if navData.link}
                <a class="nav-link" href={navData.link}>{navData.displayText}</a>
        {:else if navData.links}
            <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {navData.displayText}
                </a>
                <ul class="dropdown-menu">
                    {#each navData.links as childLink}
                    <li class="nav-item">
                        <a class="nav-link" href={childLink.link}>{childLink.displayText}</a>
                    </li>
                {/each}
                </ul>
            </div>
        {/if}
    {/each}
</nav>

<style>
    .nav-link {
        margin-right: 2em;
    }
</style>