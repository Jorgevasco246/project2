// js/sign up.js

const formulario = document.querySelector('form');
formulario.setAttribute('id', 'registroForm'); // Esto no es estrictamente necesario si ya tienes el id en el HTML

const registroForm = document.getElementById('registroForm');

function registrarUsuario(e) {
    e.preventDefault();

    const nombreValor = document.getElementById('name').value.trim();
    const apellidoValor = document.getElementById('lastname').value.trim();
    const emailValor = document.getElementById('Email').value.trim();
    const usernameValor = document.getElementById('Username').value.trim();
    const passwordValor = document.getElementById('password').value;

    // Validación básica de campos vacíos
    if (!nombreValor || !apellidoValor || !emailValor || !usernameValor || !passwordValor) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si el email o username ya existen
    const existeUsuarioPorEmail = usuarios.find((usuario) => usuario.email === emailValor);
    const existeUsuarioPorUsername = usuarios.find((usuario) => usuario.username === usernameValor);

    if (existeUsuarioPorEmail) {
        alert("El email ya está registrado. Por favor, usa otro email.");
        return;
    }
    if (existeUsuarioPorUsername) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return;
    }

    const nuevoUsuario = {
        nombre: nombreValor,
        apellido: apellidoValor,
        email: emailValor,
        username: usernameValor,
        password: passwordValor,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // GUARDAMOS EL USUARIO RECIÉN REGISTRADO COMO "LOGUEADO"
    localStorage.setItem('logueado', JSON.stringify({
        nombreCompleto: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
        username: nuevoUsuario.username,
        email: nuevoUsuario.email
    }));

    alert('¡Usuario creado con éxito! Ahora inicia sesión.');
    window.location.href = 'login.html'; // Redirige al login para que el usuario inicie sesión
}

registroForm.addEventListener('submit', registrarUsuario);
