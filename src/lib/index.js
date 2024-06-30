export const featuredProducts = await getFeaturedProducts();
export const userInfo = await getUserInfo();
export const siteUrls = {
    home: "http://localhost:5173/",
    products: "http://localhost:5173/products/"
};
export const backendUrls = {
    baseUrl: "http://localhost:8080/api/v1/"
}
export const navigationData = [
    {
        displayText: "Home",
        link: "/"
    },
    {
        displayText: "Featured",
        link: "#"
    },
    {
        displayText: "Collections",
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
                link: "https://www.facebook.com/profile.php?id=61557071875746&mibextid=LQQJ4d"
            }, 
            {
                displayText: "Instagram",
                link: "https://www.instagram.com/juleycrochetph?igsh=cXptMWFzZHZndmo="
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