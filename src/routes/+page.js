import { backendUrls, navigationData } from "$lib/index.js";

export async function load({fetch}) {
    let data = {
        navigationData: null,
        jumbotronContents: null
    };

    try {
        let getJumbotronContentsResponse = await fetch(backendUrls.jumbotronContentsUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept" : "application/json"
            }
        });
        let jumbotronContents = await getJumbotronContentsResponse.json();
        data.jumbotronContents = jumbotronContents.sort((jcA, jcB) => jcA.priority - jcB.priority);
    } catch (err) {
        console.log(err);
    }

    data.navigationData = navigationData;
    return data;
}
