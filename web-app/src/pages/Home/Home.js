import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import { useEffect, useState } from "react";
import PlaceholderLoader from "../../components/PlaceholderLoader/PlaceholderLoader";
import { Link } from "react-router-dom";
const Home = () => {
  const [wilders, setWilders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("/wilders");
      const fetchedWilders = await response.json();
      setWilders(fetchedWilders);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <SectionTitle>Wilders</SectionTitle>
      <Link to={"/create-wilder"}>Ajouter un nouveau Wilder</Link>
      {isLoading ? (
        <PlaceholderLoader />
      ) : wilders.length > 0 ? (
        <CardRow>
          {wilders?.map((wilder) => (
            <Wilder
              key={wilder.id}
              firstName={wilder.firstName}
              lastName={wilder.lastName}
              skills={wilder.skills}
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
