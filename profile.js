// Constants
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userToken = document.getElementById("userToken");
const userPassword = document.getElementById("userPassword");
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'signup';
})

const userData = fetchUserData();

// Get the current page's URL
const currentURL = window.location.href;

// Define the URLs for the Profile and Signup pages
const profilePageURL = '/profile';
const signupPageURL = '/signup';
const indexPage = '/index';

// Check if the user is on the Profile page without a token
if (window.location.pathname.includes(profilePageURL) && !userData) {
    window.location.href = signupPageURL;
}

// Check if the user is on the Signup page with a token
if (window.location.pathname.includes(signupPageURL) && userData) {
    window.location.href = profilePageURL;
}


if (currentURL.includes(indexPage)) {
    window.location.href = signupPageURL;
}

// Function to fetch data from localStorage
function fetchUserData() {
    const userDataJSON = localStorage.getItem('token');
    if (userDataJSON) {
        return JSON.parse(userDataJSON);
    } else {
        return false;
    }
}

//function on page load
window.addEventListener('load', function () {
    if (userData) {
        console.log('User Data:', userData);
        userName.innerHTML = userData.name;
        userEmail.innerHTML = userData.email;
        userPassword.innerHTML = userData.password;
        userToken.innerHTML = userData.accessToken;
    } else {
        console.log('No User Data Found in localStorage');
    }
})
