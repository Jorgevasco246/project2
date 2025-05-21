const galeria = document.querySelector("#galeria");

function createCard(name, imageURL, tipos, index) {
  const div = document.createElement("div");
  div.classList.add("pokem");

  const nombre = document.createElement("h3");
  nombre.textContent = ` ${name.charAt(0).toUpperCase() + name.slice(1)}`;

  const imagen = document.createElement("img");
  imagen.src = imageURL;
  imagen.alt = name;

  const descripcion = document.createElement("p");
  descripcion.textContent = `${name} is a ${tipos.join('/')} type Pokémon.`;

  const botonInfo = document.createElement("button");
  botonInfo.textContent = "MORE INFORMATION";
  botonInfo.onclick = () => alert(`Aquí podrías mostrar más info de ${name}`);

  const botonRemove = document.createElement("button");
  botonRemove.textContent = "ADD TO FAVORITES";
  botonRemove.classList.add("favoritos");
 

  div.append(imagen, nombre, descripcion, botonInfo, botonRemove);
  return div;
}

for (let index = 1; index <= 151; index++) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(res => res.json())
    .then(pokemon => {
      const tipos = pokemon.types.map(t => t.type.name);
      const card = createCard(
        pokemon.name,
        pokemon.sprites.other['official-artwork'].front_default,
        tipos,
        index
      );
      galeria.appendChild(card);
    })
    .catch(error => console.error("Error al obtener Pokémon:", error));
}
