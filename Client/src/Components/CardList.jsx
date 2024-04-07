import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../Contexts/DataContext";
import CardItem from "./CardItem";
import { Skeleton } from "@nextui-org/react";
import { getFilteredCards } from "../Services/apiService";
import { Select, SelectItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { color } from "framer-motion";


const CardList = () => {
  const { cards, banks, setCards,allCards } = useContext(DataContext);
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
    };

  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "IsBlocked") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        IsBlocked: value === "$.0" ? null : value === "$.1" ? true : false,
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
    }
  };

  const applyFilter = async () => {
    try {
      setError(null);
      setIsLoading(true);
      console.log(filter);
      setCards(await getFilteredCards(filter));
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
        <Select
          variant="bordered"
          label="Card availability"
          placeholder="Show all"
          className="max-w-xs"
          name="IsBlocked"
          onChange={handleFilterChange}
        >
          <SelectItem value="all">all cards</SelectItem>
          <SelectItem value="true">blocked cards</SelectItem>
          <SelectItem value="false">open cards</SelectItem>
        </Select>
        <Autocomplete
          defaultItems={allCards}
          label="Card Number"
          variant="bordered"
          name="CardNumber"
          placeholder="Search by card number"
          className="max-w-xs"
          onSelectionChange={handleCardNumberFilterChange}
          onInputChange={handleCardNumberFilterChange}
          
        >
          {(card) => (
            <AutocompleteItem key={card.cardNumber}>
              {card.cardNumber}
            </AutocompleteItem>
          )}
        </Autocomplete>

        <label>
          Bank Code:
          <input
            type="text"
            name="BankCode"
            value={filter.BankCode}
            onChange={handleFilterChange}
          />
        </label>
        <button onClick={applyFilter}>Apply Filter</button>
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
// className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
