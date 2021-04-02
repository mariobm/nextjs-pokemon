import { getSession, useSession } from 'next-auth/client';
import tw from 'twin.macro';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import prisma from '../lib/prisma';
import { Input, Button, SearchContainer, Grid, Card } from './index';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const Container = tw.div`max-w-7xl mx-auto p-5 mt-5`;

export default function MyPokemons({ pokemons }) {
  const [session, loading] = useSession();
  const [search, setSearch] = useState();

  if (!session) {
    return (
      <>
        <Head>
          <title>Not logged in</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <Container>
          <div className="font-bold text-5xl text-center">
            Not logged in :rocketEmoji:
          </div>
        </Container>
      </>
    );
  }

  const pokemonsFiltered = search
    ? pokemons.filter(p => p.name.match(new RegExp(search, 'i')))
    : pokemons;

  return (
    <>
      <Head>
        <title>{session.user.email} pokemons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container>
        <main>
          <div className="p-6">
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
              {pokemonsFiltered.map(({ id, image, name, type }) => (
                <Card key={id} image={image} name={name} type={type} />
              ))}
            </Grid>
          </div>
        </main>

        <footer>Powered by FRI</footer>
      </Container>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return {
      props: {
        pokemons: []
      }
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });
  const pokemons = await prisma.pokemon.findMany({
    where: {
      userId: user.id
    }
  });

  return {
    props: {
      pokemons
    }
  };
};
