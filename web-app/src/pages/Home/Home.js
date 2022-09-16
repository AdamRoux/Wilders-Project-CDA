import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import { useEffect, useState } from "react";
import PlaceholderLoader from "../../components/PlaceholderLoader/PlaceholderLoader";
import { Link } from "react-router-dom";
import { fetchWilders } from "./fetchWilders";

const Home = () => {
  const [wilders, setWilders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedWilders = await fetchWilders();
        console.log(fetchedWilders);
        console.log(process.env.PATH);
        setWilders(fetchedWilders);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={"/create-wilder"}>Ajouter un nouveau Wilder</Link>
      {isLoading ? (
        <PlaceholderLoader />
      ) : errorMessage !== null ? (
        errorMessage
      ) : wilders?.length > 0 ? (
        <CardRow>
          {wilders?.map((wilder) => (
            <Wilder
              key={wilder.id}
              firstName={wilder.firstName}
              lastName={wilder.lastName}
              skills={wilder.skills}
              school={wilder.school.schoolName}
            />
          ))}
        </CardRow>
      ) : (
        <p>No Wilders Found</p>
      )}
    </>
  );
};

export default Home;
