import { navigationData } from '$lib/index.js';

export async function load() {
    return {
        navigationData: navigationData
    };
}
