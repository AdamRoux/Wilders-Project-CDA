import { SectionTitle, CardRow } from "./Home.styled";
import Wilder from "../../components/Wilder/Wilder";
import { useEffect, useState } from "react";
import PlaceholderLoader from "../../components/PlaceholderLoader/PlaceholderLoader";
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
      {isLoading ? (
        <PlaceholderLoader />
      ) : (
        <CardRow>
          {wilders.length > 0 ? (
            wilders?.map((wilder) => (
              <Wilder
                key={wilder.id}
                firstName={wilder.firstName}
                lastName={wilder.lastName}
                skills={wilder.skills}
              />
            ))
          ) : (
            <p>No Wilders Found</p>
          )}
        </CardRow>
      )}
    </>
  );
};

export default Home;
