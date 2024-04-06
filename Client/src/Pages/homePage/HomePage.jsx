import React, { useEffect, useState } from 'react';
import { getCards, getBanks } from '../../Services/apiService';

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCards = await getCards();
        const fetchedBanks = await getBanks();
        setCards(fetchedCards);
        setBanks(fetchedBanks);
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <h3>Cards</h3>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.cardImage}</li>
        ))}
      </ul>
      <h3>Banks</h3>
      <ul>
        {banks.map((bank) => (
          <li key={bank.bankCode}>{bank.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;