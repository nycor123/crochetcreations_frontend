import { featuredProducts, userInfo, navigationData } from '$lib/index.js';

export function load() {
    return {
        featuredProducts: featuredProducts,
        userInfo: userInfo,
        navigationData: navigationData
    };
}
