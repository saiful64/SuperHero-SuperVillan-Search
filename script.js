// https://superheroapi.com/api/access-token/character-id

const statToEmoji = {
	intelligence: "🧠",
	strength: "💪",
	speed: "⚡",
	durability: "🏋️‍♂️",
	power: "📊",
	combat: "⚔️",
};

const SUPERHERO_TOKEN = "10223569763528853";
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const newHeroButton = document.getElementById("newHeroButton");

const heroImageDiv = document.getElementById("heroImage");

const searchButton = document.getElementById("searchButton");

const searchInput = document.getElementById("searchInput");

const showHeroInfo = (character) => {
	const name = `<h2>${character.name}</h2>`;

	const img = `<img src="${character.image.url}" height=200 width=200/>`;

	const stats = Object.keys(character.powerstats)
		.map((stat) => {
			return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
				character.powerstats[stat]
			}</p>`;
		})
		.join("");

	heroImageDiv.innerHTML = `${name} <div style="display: flex;"> 
  <div>${img}</div>
   <div style="padding-left:50px;">${stats}</div>
    </div>`;
};

const getSuperHero = (id) => {
	fetch(`${BASE_URL}/${id}`)
		.then((response) => response.json())
		.then((json) => showHeroInfo(json));
};

const getSearchSuperHero = (name) => {
	fetch(`${BASE_URL}/search/${name}`)
		.then((response) => response.json())
		.then((json) => showHeroInfo(json.results[0]));
};

const randomHero = () => {
	const numberOfHeroes = 731;
	return Math.floor(Math.random() * numberOfHeroes) + 1;
};

newHeroButton.onclick = () => getSuperHero(randomHero());

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
