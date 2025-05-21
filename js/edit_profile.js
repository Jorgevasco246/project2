// js/edit_profile.js

document.addEventListener('DOMContentLoaded', () => {
    const editProfileForm = document.getElementById('editProfileForm');
    const editNameInput = document.getElementById('editName');
    const editLastnameInput = document.getElementById('editLastname');
    const editEmailInput = document.getElementById('editEmail');
    const editUsernameInput = document.getElementById('editUsername');
    const editPasswordInput = document.getElementById('editPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const cancelEditButton = document.getElementById('cancelEditButton');

    // 1. Cargar los datos actuales del usuario
    const usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (!usuarioLogueado) {
        // Si no hay usuario logueado, redirigir al login
        window.location.href = 'login.html';
        return;
    }

    // Buscar el usuario completo en el array de 'usuarios' para tener todos sus datos (incluida la contraseña original)
    // Usamos el email o username del usuarioLogueado para encontrarlo en el array de todos los usuarios
    const currentUserIndex = usuarios.findIndex(user => 
        user.email === usuarioLogueado.email || user.username === usuarioLogueado.username
    );

    if (currentUserIndex === -1) {
        alert('No se pudo encontrar la información completa del usuario. Por favor, inicia sesión de nuevo.');
        localStorage.removeItem('logueado');
        window.location.href = 'login.html';
        return;
    }

    const currentUserData = usuarios[currentUserIndex];

    // Prellenar el formulario con la información actual del usuario
    editNameInput.value = currentUserData.nombre || '';
    editLastnameInput.value = currentUserData.apellido || '';
    editEmailInput.value = currentUserData.email || '';
    editUsernameInput.value = currentUserData.username || '';
    // La contraseña no se prellena por seguridad.

    // 2. Manejar el envío del formulario para guardar cambios
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newName = editNameInput.value.trim();
        const newLastname = editLastnameInput.value.trim();
        const newEmail = editEmailInput.value.trim();
        const newUsername = editUsernameInput.value.trim();
        const newPassword = editPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validaciones básicas
        if (!newName || !newLastname || !newEmail || !newUsername) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Validar si el nuevo email o username ya existen (excluyendo al usuario actual)
        const emailExists = usuarios.some((user, index) => 
            index !== currentUserIndex && user.email === newEmail
        );
        if (emailExists) {
            alert('El nuevo email ya está en uso por otra cuenta.');
            return;
        }

        const usernameExists = usuarios.some((user, index) => 
            index !== currentUserIndex && user.username === newUsername
        );
        if (usernameExists) {
            alert('El nuevo nombre de usuario ya está en uso por otra cuenta.');
            return;
        }

        // Validar cambio de contraseña
        if (newPassword) { // Si el campo de nueva contraseña no está vacío
            if (newPassword !== confirmPassword) {
                alert('La nueva contraseña y la confirmación no coinciden.');
                return;
            }
            if (newPassword.length < 6) { // Ejemplo de validación de longitud
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            currentUserData.password = newPassword; // Actualiza la contraseña
        }

        // Actualizar los datos del usuario en el objeto currentUserData
        currentUserData.nombre = newName;
        currentUserData.apellido = newLastname;
        currentUserData.email = newEmail;
        currentUserData.username = newUsername;
        // La contraseña ya se actualizó si se ingresó una nueva

        // Actualizar el array de usuarios en localStorage
        usuarios[currentUserIndex] = currentUserData;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Actualizar el objeto 'logueado' en localStorage para reflejar los cambios
        localStorage.setItem('logueado', JSON.stringify({
            nombreCompleto: `${newName} ${newLastname}`,
            username: newUsername,
            email: newEmail
        }));

        alert('¡Perfil actualizado con éxito!');
        window.location.href = 'profile.html'; // Redirigir de vuelta al perfil
    });

    // Manejar el botón de cancelar
    cancelEditButton.addEventListener('click', () => {
        window.location.href = 'profile.html'; // Simplemente redirige de vuelta al perfil
    });
});
