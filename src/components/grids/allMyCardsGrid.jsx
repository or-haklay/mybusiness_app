import { useAuth } from "../../context/auth.context";
import cardService from "../../services/cardService";
import { MyCard } from "../common/cards";
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/loadingSpinners";

function AllMyCardGrid() {
  const { user } = useAuth();
  const [cardsDate, setCardsDate] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardService.getAllMyCards();
        setCardsDate(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleCardDeleted = (cardId) => {
    try {
      setMyCards(cardsDate.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  if (cardsDate.length === 0) {
    return (
      <div className="container mt-5">
        <LoadingSpinner text={"Loading Cards Data..."} />
      </div>
    );
  }

  return (
    <div className="row gap-3 justify-content-center">
      {cardsDate.map((card) => (
        <MyCard
          key={card?.bizNumber}
          title={card?.title}
          subtitle={card?.subtitle}
          description={card?.description}
          phone={card?.phone}
          email={card?.email}
          address={` ${card?.address?.city} , ${card?.address?.country}, ${card?.address?.street} ${card?.address?.houseNumber}`}
          image={{
            url: card.image?.url,
            alt: card?.image?.alt ? card.image.alt : "default image",
          }}
          web={card?.web}
          user={user}
          likes={card?.likes}
          id={card?._id}
          createdAt={card?.createdAt}
          bizNumber={card?.bizNumber}
          onDelete={handleCardDeleted}
        />
      ))}
    </div>
  );
}

export default AllMyCardGrid;
