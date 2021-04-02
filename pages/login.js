import { getCsrfToken, getSession, signIn } from 'next-auth/client';
import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NavBar from '../Components/Navbar';

const Container = tw.div`relative bg-white max-w-7xl mx-auto px-6 my-6`;
const Box = tw.div`bg-gray-50 rounded-xl relative overflow-hidden h-96 max-w-3xl w-full mx-auto shadow-lg`;
const SignUp = styled.div(({ isSignUp }) => [
  tw`h-full absolute top-0 left-0 transition-transform duration-600 ease-in-out opacity-0 w-1/2 z-1`,
  isSignUp && tw`animate-show-form opacity-100 transform translate-x-full z-5`
]);

const SignIn = styled.div(({ isSignUp }) => [
  tw`h-full absolute top-0 left-0 transition-transform duration-600 ease-in-out w-1/2 z-2`,
  isSignUp && tw`transform translate-x-full`
]);

const Form = tw.form`bg-gray-50 flex items-center justify-center flex-col inset-x-12 h-full text-center`;

const ContainerOverlay = styled.div(({ isSignUp }) => [
  tw`h-full left-1/2 overflow-hidden absolute top-0 transition-transform ease-in-out duration-600 w-1/2 z-50`,
  isSignUp && tw`transform -translate-x-full`
]);

const Overlay = styled.div(({ isSignUp }) => [
  tw`bg-blue-300 h-full -left-full relative transform translate-x-0 transition-transform duration-600 ease-in-out w-2/1`,
  isSignUp && tw`transform translate-x-1/2`
]);

const OverlayPanel = tw.div`items-center flex flex-col h-full justify-center absolute text-center top-0 transition-transform duration-600 ease-in-out w-1/2`;

const PanelLeft = styled(OverlayPanel)(({ isSignUp }) => [
  tw`transform translate-x-205`,
  isSignUp && tw`transform translate-x-0`
]);

const PanelRight = styled(OverlayPanel)(({ isSignUp }) => [
  tw`right-0 transform translate-x-0`,
  isSignUp && tw`transform translate-x-1/5`
]);

const Button = tw.button`bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl border
bg-blue-500 text-white cursor-pointer text-sm font-bold tracking-wide py-3.5 px-16`;

const GoogleButton = tw.button`py-3 pr-1 pl-2 bg-white shadow-md border-0 font-medium mt-2 flex space-x-2`;

const handleGoogleLogin = event => {
  event.preventDefault();
  signIn('google');
};

export default function Login({ csrfToken }) {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <>
      <NavBar />
      <Container>
        <Box>
          {/* Sign Up */}
          <SignUp isSignUp={isSignUp}>
            <Form method="post" action="/api/auth/callback/signUp">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <h2 className="font-light text-3xl m-0 mb-5">Sign Up</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-white border-none p-4 my-2 w-full"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-white border-none p-4 my-2 w-full"
                required
              />
              <Button type="submit">Sign Up</Button>
              <GoogleButton onClick={handleGoogleLogin}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google logo"
                  width={21}
                  height={21}
                />
                <p className="text-center text-sm text-gray-500">
                  Sign in with Google
                </p>
              </GoogleButton>
            </Form>
          </SignUp>
          {/* Sign In */}
          <SignIn isSignUp={isSignUp}>
            <Form method="post" action="/api/auth/callback/signIn">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <h2 className="font-light text-3xl m-0 mb-5">Sign In</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-white border-none p-4 my-2 w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="bg-white border-none p-4 my-2 w-full"
                required
              />
              <a href="/" className="link">
                Forgot?
              </a>
              <Button type="submit">Sign In</Button>
            </Form>
          </SignIn>
          {/* Overlay */}
          <ContainerOverlay isSignUp={isSignUp}>
            <Overlay isSignUp={isSignUp}>
              <PanelLeft isSignUp={isSignUp}>
                <Button onClick={() => setIsSignUp(false)}>Sign In</Button>
              </PanelLeft>
              <PanelRight isSignUp={isSignUp}>
                <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
              </PanelRight>
            </Overlay>
          </ContainerOverlay>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const request = context.req;
  const session = await getSession({ req: request });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
