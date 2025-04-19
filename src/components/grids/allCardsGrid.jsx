import { useAuth } from "../../context/auth.context";
import { Card } from "../common/cards";
import LoadingSpinner from "../common/loadingSpinners";

function AllCardGrid({ cards }) {
  const { user } = useAuth();

  if (!Array.isArray(cards) || cards.length === 0) {
    return (
      <div className="container mt-5">
        <LoadingSpinner text={"Loading Cards Data..."} />
      </div>
    );
  }

  return (
    <div className="row gap-3 justify-content-center">
      {cards.map((card, index) => (
        <Card
          key={card?.bizNumber || index}
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

export default AllCardGrid;
