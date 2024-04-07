import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [occupations, setOccupations] = useState([]);

  const value = { cards, setCards, banks, setBanks ,allCards, setAllCards,occupations, setOccupations};

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};