import tw from 'twin.macro';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import pokemons from '../.././pokedex.json';

const Container = tw.div`grid grid-cols-3 gap-3 max-w-4xl items-center mx-auto`;

const getImage = id => {
  const number = ('00' + id).slice(-3);
  return `/images/${number}.png`;
};

export async function getStaticPaths() {
  return {
    paths: pokemons.map(({ name: { english } }) => ({
      params: {
        name: english.toLowerCase()
      }
    })),
    fallback: false
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      data: pokemons.find(
        ({ name: { english } }) => context.params.name === english.toLowerCase()
      )
    }
  };
}

export default function Pokemon({ data }) {
  return (
    <>
      <Head>
        <title>{data?.name.english || 'No pokemon'}</title>
      </Head>
      <NavBar />
      <Container>
        <div className="col-span-2">
          <img src={data && getImage(data.id)} alt="" />
        </div>
        <div>
          {data
            ? Object.entries(data?.base).map(([key, value]) => (
                <div key={key} className="flex flex-row space-x-2">
                  <div className="font-semibold text-gray-800">{key}</div>
                  <div>{value}</div>
                </div>
              ))
            : 'Nothing'}
        </div>
      </Container>
    </>
  );
}
