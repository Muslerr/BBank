import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../Contexts/DataContext";
import CardItem from "./CardItem";
import { Skeleton } from "@nextui-org/react";
import { getFilteredCards } from "../Services/apiService";
import IsblockedFilter from "./Filters/IsblockedFilter";
import CardNumberFilter from "./Filters/CardNumberFilter";
import BankCodeFilter from "./Filters/BankCodeFilter";
import ErrorMessage from "./Messages/ErrorMessage";

const CardList = () => {
  const { cards, banks, setCards, allCards } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {}, [cards]);

  const [filter, setFilter] = useState({
    IsBlocked: null,
    BankCode: "",
    CardNumber: "",
  });

  const handleCardNumberFilterChange = (cardNumber) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      CardNumber: cardNumber,
    }));
    applyFilter({ ...filter, CardNumber: cardNumber });
  };

  const handleIsblockedFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      IsBlocked: value,
    }));
    applyFilter({ ...filter, IsBlocked: value });
  };

  const handleBankCodeFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      BankCode: value,
    }));
    applyFilter({ ...filter, BankCode: value });
  };

  const applyFilter = async (updatedFilter) => {
    try {
      setError(null);
      setIsLoading(true);
      
      setCards(await getFilteredCards(updatedFilter));
    } catch (error) {
      setError(error.message);
      
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getBankName = (bankCode) => {
    const bank = banks.find((b) => b.bankCode === bankCode);
    return bank ? bank.name : "Unknown Bank";
  };

  return (
    <div>
      <div>
        <IsblockedFilter onChange={handleIsblockedFilterChange} />
        <BankCodeFilter banks={banks} onChange={handleBankCodeFilterChange} />
        <CardNumberFilter
          allCards={cards}
          onChange={handleCardNumberFilterChange}
        />
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {error && <ErrorMessage message={error}></ErrorMessage>}
        {!error &&
          cards.map((card, index) => (
            <Skeleton key={index} isLoaded={!isLoading} className="rounded-lg">
              <CardItem card={card} bankName={getBankName(card.bankCode)} />
            </Skeleton>
          ))}
      </div>
    </div>
  );
};

export default CardList;
