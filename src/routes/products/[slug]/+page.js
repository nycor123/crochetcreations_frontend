export async function load({params}) {
    return {
        productId: params.slug
    };
}
