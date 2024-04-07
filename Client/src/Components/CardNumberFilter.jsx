import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const CardNumberFilter = ({ allCards, onChange }) => {
  return (
    <Autocomplete defaultItems={allCards} label="Card Number" variant="bordered" name="CardNumber" placeholder="Search by card number" className="max-w-xs dark m-1" onSelectionChange={onChange} onInputChange={onChange}>
      {(card) => (
        <AutocompleteItem key={card.cardNumber} classNames="dark">
          {card.cardNumber}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default CardNumberFilter;