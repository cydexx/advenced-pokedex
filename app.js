const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".search-btn");
const pokeContainer = document.querySelector(".poke-container");

const pokeCount = 905; //905 tane pokemon var
const pokeTypeColors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff ",
  ghost: "#636363",
  dark: "#2d2c2c",
};
const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(apiUrl);
  let data = await res.json();
  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //basic ilk basamağı uppercase yaptık
  const id = pokemon.id.toString().padStart(3, "0"); //pokemon idsini 3 basamaklı yaptık
  const type = pokemon.types[0].type.name;
  const color = pokeTypeColors[type];
  const sprite =
    pokemon.sprites.versions["generation-viii"].icons.front_default;

  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("poke-box");
  pokemonElement.style.backgroundColor = `${color}`;
  pokemonElement.innerHTML = `
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image"loading="lazy" />
        <h2 class="pokemon-name">${name}</h2>
        <p class="pokemon-id">#${id}</p>
        <p class="pokemon-type">Type: ${type}</p> 
        <img class="sprite"src="${sprite}" alt="${name} image"loading="lazy" />
        
    `;
  pokeContainer.appendChild(pokemonElement);
};
initPokemon();

searchInput.addEventListener("input", function (e) {
  const pokemonNames = document.querySelectorAll(".pokemon-name");
  const search = searchInput.value.toLowerCase();
  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.style.display = "block";
    if (!pokemonName.innerHTML.toLocaleLowerCase().includes(search)) {
      pokemonName.parentElement.style.display = "none";
    }
  });
  const pokemonIds = document.querySelectorAll(".pokemon-id");
  pokemonIds.forEach((pokemonId) => {
    pokemonId.parentElement.style.display = "block";
    if (!pokemonId.innerHTML.includes(search)) {
      pokemonId.parentElement.style.display = "none";
    }
  });
  const pokemonTypes = document.querySelectorAll(".pokemon-type");
  pokemonTypes.forEach((pokemonType) => {
    pokemonType.parentElement.style.display = "block";
    if (!pokemonType.innerHTML.includes(search)) {
      pokemonType.parentElement.style.display = "none";
    }
  });
});
