const productsUrl = 'http://localhost:8080/api/v1/products';

export const allProducts = await getAllProducts();

async function getAllProducts() {
    const response = await fetch(productsUrl, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}