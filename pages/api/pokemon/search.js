import pokemon from '../../../pokedex.json';

export default (request, response) => {
  const filter = request.query.q ? new RegExp(request.query.q, 'i') : /.*/; // ?q=bulbausar
  response
    .status(200)
    .json(
      pokemon
        .filter(({ name: { english } }) => english.match(filter))
        .slice(0, 12)
    );
};
