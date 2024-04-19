import React, { useEffect, useState, useContext } from "react";
import { getCards, getBanks, getOccupations } from "../../Services/apiService";
import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import Loading from "../../Components/Messages/Loading";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
  Button,
} from "@nextui-org/react";
import CardList from "../../Components/CardList";
import { ThemeSwitcher } from "../../Components/Icons/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/Messages/ErrorMessage";

const HomePage = ({ toggleDarkMode }) => {
  const { cards, banks, setBanks, setCards, setAllCards, setOccupations } =
    useContext(DataContext);
  const { logout } = useContext(AuthContext);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const navigate = useNavigate();
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [isLoadingOccupations, setIsLoadingOccupations] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoadingCards(true);
        setIsLoadingBanks(true);
        setIsLoadingOccupations(true);
    
        const [fetchedCards, fetchedBanks, fetchedOccupations] = await Promise.all([
          getCards(),
          getBanks(),
          getOccupations(),
        ]);
    
        setCards(fetchedCards);
        setAllCards(fetchedCards);
        setBanks(fetchedBanks);
        setOccupations(fetchedOccupations);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingCards(false);
        setIsLoadingBanks(false);
        setIsLoadingOccupations(false);
      }
    };
    
    

    fetchData();
  }, []);

  const Logout = () => {
    logout();
    navigate("/login");
  };
  const isLoading = isLoadingCards || isLoadingBanks || isLoadingOccupations;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header toggleDarkMode={toggleDarkMode} />
      {error && <ErrorMessage message={error}></ErrorMessage>}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {isLoading && <Loading />}
        {error && (
          <div className="text-red-500 mb-4">{error && <div>{error}</div>}</div>
        )}
        {!isLoading && !error && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Cards
            </h2>
            <CardList />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
