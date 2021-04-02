import tw from 'twin.macro';
import Head from 'next/head';
import NavBar from '../../components/NavBar';

const Container = tw.div`grid grid-cols-3 gap-3 max-w-4xl items-center mx-auto`;

const getImage = id => {
  const number = ('00' + id).slice(-3);
  return `/images/${number}.png`;
};

const getPokemon = url => fetch(url).then(response => response.json());

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

export async function getServerSideProps(context) {
  const data = await getPokemon(
    `http://localhost:3000/api/pokemon/name?name=${escape(context.params.name)}`
  );

  return {
    props: {
      data: {
        ...data,
        image: getImage(data.id)
      }
    } // will be passed to the page component as props
  };
}
