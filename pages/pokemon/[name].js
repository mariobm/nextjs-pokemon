import tw from 'twin.macro';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '../../components/NavBar';
import useSWR from 'swr';

const Container = tw.div`grid grid-cols-3 gap-3 max-w-4xl items-center mx-auto`;

const getPokemon = url => fetch(url).then(response => response.json());

const getImage = id => {
  const number = ('00' + id).slice(-3);
  return `/images/${number}.png`;
};

export default function Pokemon() {
  const router = useRouter();
  const { data } = useSWR(
    `/api/pokemon/name?name=${escape(router.query.name)}`,
    getPokemon
  );

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
