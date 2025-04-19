import { useAuth } from "../../context/auth.context";
import cardService from "../../services/cardService";
import { Card } from "../common/cards";
import { useEffect, useState } from "react";
import LoadingSpinner from "../common/loadingSpinners";

function AllFavCardGrid() {
  const { user } = useAuth();
  const [cardsDate, setCardsDate] = useState([]);

  useEffect(() => {
    const fetchAndFilterCards = async () => {
      try {
        const response = await cardService.getAllCards();
        const allCards = response.data;
        const filteredCards = allCards.filter((card) =>
          card.likes.includes(user._id)
        );
        setCardsDate(filteredCards);
      } catch (error) {
        console.error("Error fetching or filtering cards:", error);
        setFavoriteCards([]);
      }
    };

    fetchAndFilterCards();
  }, []);
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
        <Card
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
        />
      ))}
    </div>
  );
}

export default AllFavCardGrid;
