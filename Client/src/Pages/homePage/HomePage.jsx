import React, { useEffect, useState, useContext } from "react";
import { getCards, getBanks, getOccupations } from "../../Services/apiService";
import { DataContext } from "../../Contexts/DataContext";
import Loading from "../../Components/Loading";
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";
import CardList from "../../Components/CardList";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";


const HomePage = ({toggleDarkMode}) => {
  const { cards, banks, setBanks, setCards,setAllCards,setOccupations } = useContext(DataContext);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [isLoadingOccupations, setIsLoadingOccupations] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        let fetchedCards =await getCards()
        setCards(fetchedCards);
        setAllCards(fetchedCards);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingCards(false);
      }

      try {
        setError(null);
        setBanks(await getBanks());
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingBanks(false);
      }
      
      try {
        setError(null);
        setOccupations(await getOccupations());
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingOccupations(false);
      }
    };

    fetchData();
  }, []);

  

  const isLoading = isLoadingCards || isLoadingBanks || isLoadingOccupations;
  
 
  return (
    <div className="w-full h-screen flex flex-col overflow-scroll" >
      <h2>Home Page</h2>
      <ThemeSwitcher toggleDarkMode={toggleDarkMode}/>
      {isLoading && <Loading />}
      {error && (
        <div>
          {error && <div>{error}</div>}          
        </div>
      )}
      {!isLoading && !error && (
        <>
          <h3>Cards</h3>
          
          <CardList  />
        </>
      )}
    </div>
  );
};

export default HomePage;
