export async function load({url}) {
    let searchCriteria = {
        name: "",
        page: 0,
        pageSize: 8,
        sortBy: "name",
        sortDirection: "asc"
    }

    let data = {};

    for (const key in searchCriteria) {
        searchCriteria[key] = url.searchParams.get(key);
    }

    data.searchCriteria = searchCriteria;

    return data;
}