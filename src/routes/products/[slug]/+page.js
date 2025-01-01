import { backendUrls, getUserInfo } from '$lib/index.js';

export async function load({params, fetch}) {
    return {
        userData: await getUserInfo(fetch),
        productData: await getProductData(params.slug, fetch)
    };
}

async function getProductData(productId, fetch) {
    let response = await fetch(`${backendUrls.productsUrl}/${productId}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.status !== 200) {
        return null;
    } else {
        let productData = await response.json();
        return productData;
    }
}
