// Constants
const form = document.getElementById('form');
const inputFieldAlert = document.getElementById('inputFieldAlert');
const accessToken = JSON.parse(localStorage.getItem('token'));

// Function to fetch data from localStorage
function fetchUserData() {
    const userDataJSON = localStorage.getItem('token');
    if (userDataJSON) {
        return JSON.parse(userDataJSON);
    } else {
        return null;
    }
}

const userData = fetchUserData();


// Define the URLs for the Profile and Signup pages
const profilePageURL = '/profile.html';
const signupPageURL = '/signup.html';
const indexPage = '/index.html';

// Check if the user is on the Profile page without a token
if (window.location.pathname.includes(profilePageURL) && !userData) {
    window.location.href = signupPageURL;
}

// Check if the user is on the Signup page with a token
if (window.location.pathname.includes(signupPageURL) && userData) {
    window.location.href = profilePageURL;
}

// Check if the user is on the Index page
if (currentURL.includes(indexPage)) {
    window.location.href = signupPageURL;
}

// Form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate form data
    const { name, email, password, cpassword } = e.target.elements;
    if (
        name.value.trim() === '' ||
        email.value.trim() === '' ||
        password.value.trim() === '' ||
        password.value.trim() !== cpassword.value.trim()
    ) {
        inputFieldAlert.style.display = 'block';
        return;
    }

    // Try to submit data to localStorage
    try {
        const userToken = {
            accessToken: generateRandomAlphaNumericString(16),
            name: name.value,
            email: email.value,
            password: password.value,
        };
        localStorage.setItem('token', JSON.stringify(userToken));
        window.location.href = 'profile.html';
    } catch (err) {
        alert('Something Went Wrong');
        window.location.reload();
    }
});

// Function to generate an alphanumeric string
function generateRandomAlphaNumericString(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
    }
    return result;
}
