import tw from 'twin.macro';
import { signOut, useSession } from 'next-auth/client';

const Header = tw.header`relative bg-white max-w-7xl mx-auto px-4 sm:px-6`;
const Container = tw.div`flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10`;
const Left = tw.div`flex justify-start lg:w-0 lg:flex-1`;
const Menu = tw.nav`md:flex space-x-10`;
const Right = tw.div`md:flex items-center justify-end md:flex-1 lg:w-0`;
const Item = tw.a`text-base font-medium text-gray-500 hover:text-gray-900`;
const SignUp = tw.a`ml-8 px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700`;

export default function NavBar() {
  const [session, loading] = useSession();
  return (
    <Header>
      <Container>
        <Left>
          <Item href="/">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
              alt="workflow"
            />
          </Item>
        </Left>
        <Menu>
          <Item href="/">Pokemons</Item>
          {session && <Item href="/my-pokemons">My pokemons</Item>}
          {session && (
            <Item
              onClick={event => {
                event.preventDefault();
                signOut();
              }}
              href="/"
            >
              Log out
            </Item>
          )}
        </Menu>
        <Right>
          <SignUp href="/login">Sign In</SignUp>
        </Right>
      </Container>
    </Header>
  );
}
