import { backendUrls, navigationData } from '$lib/index.js';

export async function load({fetch}) {
    let data = {
        navigationData: null,
        jumbotronContents: null
    };

    try {
        let getJumbotronContentsResponse = await fetch(backendUrls.baseUrl + 'jumbotron/contents', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json'
            }
        });
        let jumbotronContents = await getJumbotronContentsResponse.json();
        data.jumbotronContents = jumbotronContents;
    } catch (err) {
        console.log(err);
    }

    data.navigationData = navigationData;
    return data;
}
