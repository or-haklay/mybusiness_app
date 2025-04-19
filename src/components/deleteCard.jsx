import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import { toast } from "react-hot-toast";

function DeleteCard({ isOn, onClose, card }) {
  if (!isOn) return null;

  const handleDeleteCard = async () => {
    try {
      await cardService.deleteCard(card._id);
      onClose();
      toast.success("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-body border border-success p-4 rounded shadow-lg"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          width: "600px",
        }}
      >
        <div className="my-0 d-flex align-items-center justify-content-end ">
          <button
            type="button"
            aria-label="Close"
            className="btn btn-success d-block btn-close"
            onClick={onClose}
          ></button>
        </div>
        <PageHeader
          title={"Card Deletion"}
          description={"Do You Sure You Want To Delete This Card?"}
        />
        <div className="my-2 d-flex align-items-center justify-content-center">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-success col-5 col-md-4  mx-auto d-block"
          >
            cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteCard}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteCard;
