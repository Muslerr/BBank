import React, { useEffect, useState, useContext } from "react";
import { getCards, getBanks, getOccupations } from "../../Services/apiService";
import { DataContext } from "../../Contexts/DataContext";
import Loading from "../../Components/Loading";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
  Button,
} from "@nextui-org/react";
import CardList from "../../Components/CardList";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

const HomePage = ({ toggleDarkMode }) => {
  const { cards, banks, setBanks, setCards, setAllCards, setOccupations } =
    useContext(DataContext);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const navigate = useNavigate();
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [isLoadingOccupations, setIsLoadingOccupations] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        let fetchedCards = await getCards();
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

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };
  const isLoading = isLoadingCards || isLoadingBanks || isLoadingOccupations;

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={`../../../public/bankLogo.png`}
              alt="Logo"
              className="w-16 h-16 mr-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Credit Card Management
            </h1>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher toggleDarkMode={toggleDarkMode} />
            <Button className="ml-4" onPress={logout}>Logout</Button>
          </div>
        </div>
      </header>
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
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
          &copy; 2023 Credit Card Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
