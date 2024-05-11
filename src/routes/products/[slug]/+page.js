import { userInfo, navigationData } from '$lib/index.js';

export async function load({ fetch, params }) {
    let response = await fetch(`http://localhost:8080/api/v1/products/${params.slug}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });
    let product = await response.json();
    return { 
        userInfo: userInfo,
        navigationData: navigationData,
        product: product 
    };
}
