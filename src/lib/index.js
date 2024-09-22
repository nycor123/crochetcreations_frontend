// Frontend Urls
const baseSiteUrl = 'http://localhost:5173';
export const siteUrls = {
    home: baseSiteUrl,
    admin: baseSiteUrl + '/admin',
    create: baseSiteUrl + '/admin/create',
    update: baseSiteUrl + '/admin/update',
    jumbotronContents: baseSiteUrl + '/admin/jumbotron-contents',
    products: baseSiteUrl + '/products'
};

// Navigation Urls
export const navigationData = [
    {
        displayText: 'Home',
        link: '/'
    },
    {
        displayText: 'Featured',
        link: '#'
    },
    {
        displayText: 'Collections',
        link: '#'
    },
    {
        displayText: 'All Products',
        link: '#'
    },
    {
        displayText: 'Socials',
        links: [
            {
                displayText: 'Facebook',
                link: 'https://www.facebook.com/profile.php?id=61557071875746&mibextid=LQQJ4d'
            }, 
            {
                displayText: 'Instagram',
                link: 'https://www.instagram.com/juleycrochetph?igsh=cXptMWFzZHZndmo='
            }
        ]
    }
];

// Backend Urls
const backendUrl = 'http://localhost:8080';
const backendBaseUrl = backendUrl + '/api/v1';
export const backendUrls = {
    baseUrl: backendBaseUrl,
    authUrl: backendBaseUrl + '/auth',
    signInUrl: backendBaseUrl + '/auth/signin',
    signOutUrl: backendBaseUrl + '/auth/signout',
    productsUrl: backendBaseUrl + '/products',
    imageUploadUrl: backendBaseUrl + '/images/upload',
    jumbotronContentsUrl: backendBaseUrl + '/jumbotron/contents',
    signInGoogleUrl: backendBaseUrl + '/auth/signin-google'
}

// Google APIs
const googleOAuthClientID = '646663393985-pjj9o835s60cdtgbu0ganjd6b02k9rnn.apps.googleusercontent.com'
export const signinWithGoogleUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${baseSiteUrl}&response_type=code&client_id=${googleOAuthClientID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline`

// Fetch Methods
export async function getUserInfo() {
    try {
        let response = await fetch('http://localhost:8080/api/v1/user/info', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json'
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

export async function getAllProducts() {
    try {
        let response = await fetch('http://localhost:8080/api/v1/products', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json'
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
}
