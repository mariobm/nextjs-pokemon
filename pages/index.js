import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import tw from 'twin.macro';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useSWR from 'swr';

const Container = tw.div`max-w-7xl mx-auto p-5 mt-5`;

export const SearchContainer = tw.div`bg-white flex items-center rounded-full shadow-xl`;
export const Input = tw.input`rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none`;
export const Button = tw.button`bg-blue-600 text-white rounded-full hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center`;
export const Grid = tw.div`grid grid-cols-4 gap-3`;

const getPokemons = url => fetch(url).then(response => response.json());

export default function Home() {
  const [search, setSearch] = useState('');
  const { data } = useSWR(
    `api/pokemon/search?q=${escape(search)}`,
    getPokemons
  );

  const pokemons =
    data &&
    data.map(pokemon => {
      const number = ('00' + pokemon.id).slice(-3);
      const image = `/images/${number}.png`;
      pokemon.image = image;
      return pokemon;
    });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container>
        <main className="p-6">
          <SearchContainer>
            <Input
              id="search"
              type="text"
              placeholder="Search"
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
            <div className="p-4">
              <Button>
                <FaSearch />
              </Button>
            </div>
          </SearchContainer>
          <Grid>
            {!pokemons
              ? 'Loading ...'
              : pokemons.map(({ id, image, name: { english }, type }) => (
                  <Card key={id} image={image} name={english} type={type} />
                ))}
          </Grid>
        </main>
      </Container>
    </div>
  );
}

export function Card({ image, name, type }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-8">
      <img className="w-full" src={image} alt={name} />
      <Link href={`pokemon/${name.toLowerCase()}`}>
        <div className="px-6 py-4 cursor-pointer">
          <div className="font-semibold text-xl mb-2 text-gray-700">{name}</div>
          <p className="text-gray-600 text-base">
            {Array.isArray(type) ? type.join(', ') : type}
          </p>
        </div>
      </Link>
    </div>
  );
}
/*
 npm i -D eslint prettier eslint-plugin-prettier eslint-plugin-react eslint-config-airbnb eslint-config-prettier eslint-formatter-git-log
npm i -D eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-security eslint-plugin-sonarjs eslint-plugin-unicorn
 */
