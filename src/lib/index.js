export const isLoggedIn = async () => {
    let response = await fetch("http://localhost:8080/api/v1/user/info", {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });
    let responseObj = await response.json();
    if (responseObj.email) {
        return true;
    } else {
        return false;
    }
}

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
