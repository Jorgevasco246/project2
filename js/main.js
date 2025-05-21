window.onload = function() {
  const nombre = localStorage.getItem('userName');
  
  if (nombre) {
    document.getElementById('Welcome').textContent = `Welcome, `;
    document.getElementById('nombreuser').textContent = nombre;
  } else {
    document.getElementById('Welcome').textContent = 'Welcome, ';
    document.getElementById('nombreuser').textContent = 'Pokemons';
  }
};

// hay que revisar este codigo y porque no funciona
