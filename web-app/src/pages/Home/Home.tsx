import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Wilder from '../../components/Wilder/Wilder';
import { SectionTitle } from '../../styles/base-styles';
import { WilderType } from '../../types';
import { CREATE_WILDER_PATH } from '../paths';
import { CardRow } from './Home.styled';

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstName
      lastName
      school {
        schoolName
      }
      skills {
        skillName
      }
    }
  }
`;

const Home = () => {
  // const [wilders, setWilders] = useState<null | WilderType[]>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");

  // const _fetchWilders =
  //   async () => {
  //     try {
  //       const fetchedWilders = await fetchWilders();
  //       setWilders(fetchedWilders);
  //     } catch (error) {
  //       setErrorMessage(getErrorMessage(error));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  // useEffect(() => {
  //   _fetchWilders();
  // }, []);

  const { data, loading, error, refetch } = useQuery(GET_WILDERS);

  const renderMainContent = () => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return error.message;
    }
    if (!data?.wilders.length) {
      return "Aucun wilder à afficher.";
    }
    return (
      <CardRow>
        {data.wilders.map((wilder: WilderType) => (
          <Wilder
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.firstName}
            lastName={wilder.lastName}
            skills={wilder.skills}
            onDelete={refetch}
          />
        ))}
      </CardRow>
    );
  };

  return (
    <>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={CREATE_WILDER_PATH}>Ajouter un nouveau Wilder</Link>
      <br />
      <br />
      {renderMainContent()}
    </>
  );
};

export default Home;
