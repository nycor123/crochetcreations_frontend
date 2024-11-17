<script>
    import { onMount } from "svelte";
    import { colors } from "$lib/index.js";

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

<div class="nav" style="color: {colors.font};">
    {#each navigationData as navData}
        {#if navData.link}
                <a class="nav-link" href={navData.link}>{navData.displayText}</a>
        {:else if navData.links}
            <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {navData.displayText}
                </a>
                <ul class="dropdown-menu" style='background-color: {colors.secondary};'>
                    {#each navData.links as childLink}
                    <li class="nav-item">
                        <a class="nav-link" href={childLink.link}>{childLink.displayText}</a>
                    </li>
                {/each}
                </ul>
            </div>
        {/if}
    {/each}
</div>
 
<style>
    a {
        color: #5C4033;
        font-size: larger;
    }

    .dropdown > ul > li > a {
        font-size: medium;
    }
</style>