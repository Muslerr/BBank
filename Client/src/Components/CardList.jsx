import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../Contexts/DataContext";
import CardItem from "./CardItem";
import { Skeleton } from "@nextui-org/react";
import { getFilteredCards } from "../Services/apiService";
import IsblockedFilter from "./Filters/IsblockedFilter";
import CardNumberFilter from "./Filters/CardNumberFilter";
import BankCodeFilter from "./Filters/BankCodeFilter";
import ErrorMessage from "./Messages/ErrorMessage";
import { useQuery } from "@tanstack/react-query";

const CardList = ({banks ,cards}) => {
  
  
  const [filter, setFilter] = useState({
    IsBlocked: null,
    BankCode: "",
    CardNumber: "",
  });
  const {data:filteredCards,isLoading:isLoadingFilteredCards,error:errorFilteredCards}=useQuery({
    queryFn:()=>getFilteredCards(filter),
    queryKey:["cards",{filter}],
    enabled: Object.values(filter).some(value => value !== null && value !== ''), 
  })
 


  

  const handleCardNumberFilterChange = (cardNumber) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      CardNumber: cardNumber,
    }));
    
  };

  const handleIsblockedFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      IsBlocked: value,
    }));
    
  };

  const handleBankCodeFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      BankCode: value,
    }));
    
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
        {errorFilteredCards && <ErrorMessage message={"error filtering cards"}></ErrorMessage>}
        {!errorFilteredCards &&
          (filteredCards ? filteredCards : cards).map((card, index) => ( 
            <Skeleton key={index} isLoaded={!isLoadingFilteredCards} className="rounded-lg">
              <CardItem card={card} bankName={getBankName(card.bankCode)} />
            </Skeleton>
          ))}
      </div>
    </div>
  );
};

export default CardList;
