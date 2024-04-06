import React, { useEffect, useState, useContext } from "react";
import { getCards, getBanks } from "../../Services/apiService";
import { DataContext } from "../../Contexts/DataContext";
import Loading from "../../Components/Loading";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const HomePage = () => {
  const { cards, banks, setBanks, setCards } = useContext(DataContext);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [errorCards, setErrorCards] = useState(null);
  const [errorBanks, setErrorBanks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorCards(null);
        setCards(await getCards());
      } catch (error) {
        setErrorCards(error.message);
      } finally {
        setIsLoadingCards(false);
      }

      try {
        setErrorBanks(null);
        setBanks(await getBanks());
      } catch (error) {
        setErrorBanks(error.message);
      } finally {
        setIsLoadingBanks(false);
      }
    };

    fetchData();
  }, []);
  const isLoading = isLoadingCards || isLoadingBanks;
  const hasError = errorCards || errorBanks;
 console.log(cards)
  return (
    <div>
      <h2>Home Page</h2>
      {isLoading && <Loading />}
      {hasError && (
        <div>
          {errorCards && <div>{errorCards}</div>}
          {errorBanks && <div>{errorBanks}</div>}
        </div>
      )}
      {!isLoading && !hasError && (
        <>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {cards.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100px"
                    
                    className="w-full object-cover h-[140px]"
                    src={`../../../${item.cardImage}`}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.cardNumber}</b>
                  <p className="text-default-500">bank:{item.bankCode}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
