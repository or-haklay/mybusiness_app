import AllFavCardGrid from "../components/grids/allFavCardsGrid";
import PageHeader from "../components/common/pageHeader";

function FavCards() {
  return (
    <div className="container my-5">
      <PageHeader
        title="My Favorite Cards"
        description={"Your favorite cards"}
      />
      <AllFavCardGrid />
    </div>
  );
}

export default FavCards;
