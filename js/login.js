// js/login.js

const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', ingresarUsuario);

function ingresarUsuario(e) {
    e.preventDefault();

    const userInput = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validación básica de campos vacíos
    if (!userInput || !password) {
        alert("Por favor, ingresa tu usuario/email y contraseña.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find((usuario) =>
        usuario.username === userInput || usuario.email === userInput
    );

    if (!usuarioEncontrado) {
        alert('Usuario o email no registrado. Por favor, regístrate.');
        loginForm.reset();
        return;
    }

    if (usuarioEncontrado.password !== password) {
        alert("Contraseña incorrecta.");
        loginForm.reset();
        return;
    }

    // Si el usuario y la contraseña son correctos, guardamos la información para el perfil
    const usuarioLogueado = {
        nombreCompleto: `${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}`,
        username: usuarioEncontrado.username,
        email: usuarioEncontrado.email,
    };

    localStorage.setItem('logueado', JSON.stringify(usuarioLogueado));

    alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`);
    window.location.href = "profile.html"; // REDIRIGE AL PERFIL
}
