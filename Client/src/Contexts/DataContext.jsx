import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);

  const value = { cards, setCards, banks, setBanks };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};