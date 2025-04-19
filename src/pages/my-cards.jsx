import AllMyCardGrid from "../components/grids/allMyCardsGrid";
import { Link } from "react-router";

function MyCards() {
  return (
    <div className="container flex-fill d-flex flex-column justify-content-center align-items-center my-5">
      <h1>My Cards</h1>
      <Link to="/create-card" className="btn btn-primary mb-3 ">
        <i className="bi bi-plus-circle me-2"></i>
        Add New Card
      </Link>
      <AllMyCardGrid />
    </div>
  );
}

export default MyCards;
