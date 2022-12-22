import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Wilder from '../../components/Wilder/Wilder';
import { GetWildersQuery } from '../../gql/graphql';
import { SectionTitle } from '../../styles/base-styles';
import { CREATE_WILDER_PATH } from '../paths';
import { CardRow, CardRowElement } from './Home.styled';

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstName
      lastName
      skills {
        id
        skillName
      }
    }
    myProfile {
      firstName
    }
  }
`;

const Home = () => {
  const { data, loading, error, refetch } = useQuery<GetWildersQuery>(
    GET_WILDERS,
    { fetchPolicy: "cache-and-network" }
  );

  const renderMainContent = () => {
    if (loading) {
      return <Loader role={"status"} />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.wilders?.length) {
      return "Aucun wilder à afficher.";
    }
    return (
      <CardRow data-testid="wilder-list">
        {data.wilders.map((wilder) => (
          <CardRowElement key={wilder.id} data-testid="wilder-list-element">
            <Wilder
              id={wilder.id}
              firstName={wilder.firstName}
              lastName={wilder.lastName}
              skills={wilder.skills}
              onDelete={refetch}
            />
          </CardRowElement>
        ))}
      </CardRow>
    );
  };

  return (
    <>
      <i>Bonjour {data?.myProfile?.firstName}</i>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={CREATE_WILDER_PATH}>Ajouter un nouveau Wilder</Link>
      <br />
      <br />
      {renderMainContent()}
    </>
  );
};

export default Home;
