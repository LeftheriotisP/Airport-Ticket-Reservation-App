
// Function to handle the sign-out process
function signOut() {
    var confirmLogout = confirm("Are you sure you want to sign out?");

    if (confirmLogout) {
        fetch('http://localhost:3000/users/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                sessionStorage.removeItem('current_user');
                sessionStorage.removeItem('current_trait');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('selectedOutboundFlightId');
                sessionStorage.removeItem('selectedInboundFlightId');
                sessionStorage.removeItem('selectedCountry');
                window.location.href = "homepage.html"; 
            } else {
                console.log('Error destroying session');
            }
        })
        .catch(error => {
            console.error('Error signing out:', error);
        });
    }
}