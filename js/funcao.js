const nome = document.querySelector(".nome");
let pokemonImg = document.querySelector('.pokemon');

const formulario = document.querySelector(".formulario");
const busca = document.querySelector(".busca");
const proximo = document.querySelector(".proximo");
const anterior = document.querySelector(".anterior");
let id;

const buscarPokemon = async (pokemon) =>
{
  const apiResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(apiResposta.status == 200)
  {
    const dados = await apiResposta.json();
    return dados;
  }
}

const renderizar = async (pokemon)=>
{
  nome.innerHTML = "Carregando...";

  const dados = await buscarPokemon(pokemon);

  if(dados)
  {
    nome.innerHTML = dados.name;
    pokemonImg.style.display="block";
    pokemonImg.src = dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    id = dados.id;
  } else
    {
      pokemonImg.style.display="none";
      nome.innerHTML = "Pokémon não encontrado.";
    }
}

renderizar('1');

formulario.addEventListener("submit", (e)=>
{
  e.preventDefault();
  renderizar(busca.value.toLowerCase());
  busca.value = "";
})

anterior.addEventListener("click", ()=>
{
  if(id > 1)
  {
    id -= 1;
    renderizar(id)
  }
})

proximo.addEventListener("click", ()=>
{
  if(id <= 649)
  {
    id += 1;
    renderizar(id)
  }
})
