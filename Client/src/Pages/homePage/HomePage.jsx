import React, { useEffect, useState, useContext } from "react";
import { getCards, getBanks } from "../../Services/apiService";
import { DataContext } from "../../Contexts/DataContext";
import Loading from "../../Components/Loading";
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";
import CardList from "../../Components/CardList";

const HomePage = () => {
  const { cards, banks, setBanks, setCards,setAllCards } = useContext(DataContext);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [errorCards, setErrorCards] = useState(null);
  const [errorBanks, setErrorBanks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorCards(null);
        let fetchedCards =await getCards()
        setCards(fetchedCards);
        setAllCards(fetchedCards);
      } catch (error) {
        setErrorCards(error.message);
      } finally {
        setIsLoadingCards(false);
      }

      try {
        setErrorBanks(null);
        setBanks(await getBanks());
      } catch (error) {
        setErrorBanks(error.message);
      } finally {
        setIsLoadingBanks(false);
      }
    };

    fetchData();
  }, []);

  

  const isLoading = isLoadingCards || isLoadingBanks;
  const hasError = errorCards || errorBanks;
 
  return (
    <div className="w-screen h-screen" >
      <h2>Home Page</h2>
      {isLoading && <Loading />}
      {hasError && (
        <div>
          {errorCards && <div>{errorCards}</div>}
          {errorBanks && <div>{errorBanks}</div>}
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          <h3>Cards</h3>
          
          <CardList  />
        </>
      )}
    </div>
  );
};

export default HomePage;
