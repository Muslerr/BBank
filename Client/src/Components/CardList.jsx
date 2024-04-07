import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../Contexts/DataContext";
import CardItem from "./CardItem";
import { Skeleton } from "@nextui-org/react";
import { getFilteredCards } from "../Services/apiService";
import IsblockedFilter from "./IsblockedFilter";
import CardNumberFilter from "./CardNumberFilter";
import BankCodeFilter from "./BankCodeFilter";

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
    const isBlocked = value === "$.0" ? null : value === "$.1" ? true : false;
    setFilter((prevFilter) => ({
      ...prevFilter,
      IsBlocked: isBlocked,
    }));
    applyFilter({ ...filter, IsBlocked: isBlocked });
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
      console.log(updatedFilter);
      setCards(await getFilteredCards(updatedFilter));
    } catch (error) {
      setError(error.message);
      console.log(error.message);
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
        <CardNumberFilter allCards={cards} onChange={handleCardNumberFilterChange} />
      </div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {cards.map((card, index) => (
          <Skeleton key={index} isLoaded={!isLoading} className="rounded-lg">
            <CardItem card={card} bankName={getBankName(card.bankCode)} />
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default CardList;