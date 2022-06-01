const express = require("express");

const port = process.env.PORT || 3000;
const app = express();
const path = require("path");

let pokemon = undefined;

const pokedex = [
  {
    id: 1,
    nome: "Caterpie",
    tipo: "Bug",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png",
    descricao:
      "For protection, it releases a horrible stench from the antenna on its head to drive away enemies.",
    altura: "0.3 m",
    peso: "2.9 kg",
    categoria: "Worm",
    habilidade: "Shield Dust",
  },
  {
    id: 2,
    nome: "Charmander",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    altura: "0.6 m",
    peso: "8.5 kg",
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    altura: "0.5 m",
    peso: "9.0 kg",
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },
];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let mensagem = "";

app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon, mensagem});
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  mensagem = `Pokémon adicionado a Pokédex!`;
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id); 
  res.redirect("/#cadastro");
});

app.post("/update/:id",(req, res) => {
  mensagem = "";
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  const novoPokemon = req.body;
  novoPokemon.id = id;
  pokedex[id - 1] = novoPokemon;

  pokemon = undefined;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  mensagem = "";
  const id = +req.params.id - 1;
  delete pokedex[id];
  res.redirect("/#cards");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
