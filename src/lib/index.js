export const featuredProducts = await getFeaturedProducts();
export const userInfo = await getUserInfo();
export const navigationData = [
    {
        displayText: "Home",
        link: "#"
    }, 
    {
        displayText: "Best Sellers",
        link: "#"
    }, 
    {
        displayText: "New Arrivals",
        link: "#"
    }, 
    {
        displayText: "All Products",
        link: "#"
    }, 
    {
        displayText: "Socials",
        links: [
            {
                displayText: "Facebook",
                link: "#"
            }, 
            {
                displayText: "Instagram",
                link: "#"
            }, 
            {
                displayText: "X",
                link: "#"
            }
        ]
    }
];

async function getUserInfo() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/user/info", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept" : "application/json"
            }
        });
        if (response.status !== 200) {
            return null;
        }
        return await response.json();
    } catch(err) {
        return null;
    }
}

async function getFeaturedProducts() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/products", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept" : "application/json"
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}