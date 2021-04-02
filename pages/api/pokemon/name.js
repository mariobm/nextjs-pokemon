import pokemons from '../../../pokedex.json';

export default (request, response) => {
  if (!request.query.name) {
    response.status(400).end('We need name');
  } else {
    const pokemon = pokemons.find(
      ({ name: { english } }) =>
        english.toLowerCase() === request.query.name.toLowerCase()
    );
    if (!pokemon) {
      response.status(404).end(`Pokemon ${request.query.name} not found`);
    } else {
      response.status(200).json(pokemon);
    }
  }
};
