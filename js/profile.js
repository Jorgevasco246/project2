// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Selectores para tu HTML de perfil
    const userNameDisplay = document.getElementById('profileUsername');
    const fullNameDisplay = document.getElementById('profileFullName');
    const ageDisplay = document.getElementById('profileAge');
    const emailDisplay = document.getElementById('profileEmail');

    const editProfileButton = document.getElementById('editProfileButton');
    const logoutButton = document.getElementById('logoutButton'); // Esto sigue buscando el ID

    const usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));

    if (usuarioLogueado) {
        if (userNameDisplay && usuarioLogueado.username) {
            userNameDisplay.textContent = usuarioLogueado.username;
        }
        if (fullNameDisplay && usuarioLogueado.nombreCompleto) {
            fullNameDisplay.textContent = usuarioLogueado.nombreCompleto;
        }
        if (emailDisplay && usuarioLogueado.email) {
            emailDisplay.textContent = usuarioLogueado.email;
        }
        // ... (resto de tu lógica para mostrar datos)
    } else {
        window.location.href = 'login.html';
    }

    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            window.location.href = 'edit_profile.html';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('logueado');
            localStorage.removeItem('userName');
            window.location.href = 'login.html';
        });
    }
});
