import AllCardGrid from "../components/grids/allCardsGrid";
import PageHeader from "../components/common/pageHeader";
import { useAuth } from "../context/auth.context";
import cardService from "../services/cardService";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/common/loadingSpinners";

function Home() {
  const { user } = useAuth();

  const [allCards, setAllCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInitialCards = async () => {
      try {
        const response = await cardService.getAllCards();
        const fetchedCards = response.data;
        if (Array.isArray(fetchedCards)) {
          setAllCards(fetchedCards);
          setDisplayedCards(fetchedCards);
        } else {
          setAllCards([]);
          setDisplayedCards([]);
        }
      } catch (error) {
        console.error("Error fetching initial cards:", error);
        toast.error("Failed to fetch cards. Please try again later.");
        setAllCards([]);
        setDisplayedCards([]);
      }
    };
    fetchInitialCards();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setDisplayedCards(allCards);
    } else {
      const filtered = allCards.filter((card) =>
        card.title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedCards(filtered);
    }
  };

  const handleSearchClick = () => {
    if (!searchTerm.trim()) {
      setDisplayedCards(allCards);
      return;
    }

    const filtered = allCards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCards(filtered);
  };

  if (!displayedCards) {
    return (
      <div className="container mt-5">
        <PageHeader title="Cards" description={"Loading Cards Data..."} />
        <LoadingSpinner text={"Loading Cards Data..."} />
        <PageHeader
          title={"Business Cards WebSite"}
          description={
            "this website help you to create business cards and to share your cards to others business"
          }
        />
      </div>
    );
  }

  return (
    <div className="flex-fill container my-5">
      <PageHeader
        title={"Business Cards WebSite"}
        description={
          "this website help you to create business cards and to share your cards to others business"
        }
      />
      <form className="d-flex m-5" role="search">
        <input
          className="form-control me-2"
          name="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-success "
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>

      <div className="row gap-3 justify-content-center">
        <AllCardGrid cards={displayedCards} />
      </div>
    </div>
  );
}

export default Home;
