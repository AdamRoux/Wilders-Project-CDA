import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CreateWilder from '../pages/CreateWilder/CreateWilder';
import Home from '../pages/Home/Home';
import { CREATE_WILDER_PATH, HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../pages/paths';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import { Container, Footer, Header, MainContainer, PageTitle, PageTitleLink } from './App.styled';

function App() {
  return (
    <>
      <Header>
        <Container>
          <PageTitle>
            <PageTitleLink to={HOME_PATH}>Wilders Book</PageTitleLink>
          </PageTitle>
          <nav>
            <Link to="/sign-up">S'inscrire</Link> |
            <Link to="/sign-in">Se connecter</Link>
          </nav>
        </Container>
      </Header>
      <MainContainer>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={CREATE_WILDER_PATH} element={<CreateWilder />} />
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
        </Routes>
      </MainContainer>
      <Footer>
        <Container>
          <p>&copy; 2022 Wild Code School</p>
        </Container>
      </Footer>
      <ToastContainer />
    </>
  );
}

export default App;
