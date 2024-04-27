import { userInfo, navigationData } from '$lib/index.js';

export function load() {
    return { 
        userInfo: userInfo,
        navigationData: navigationData
    };
}