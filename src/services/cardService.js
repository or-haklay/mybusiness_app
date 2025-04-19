import httpServices from "./httpServices";

async function getAllCards() {
  const response = await httpServices.get("/cards");
  return response;
}

async function getCardById(id) {
  const response = await httpServices.get(`/cards/${id}`);
  return response;
}

async function getAllMyCards() {
  const response = await httpServices.get(`/cards/my-cards`);
  return response;
}

function createNewCard(card) {
  const response = {
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
      url:
        card.image ||
        "https://png.pngtree.com/thumb_back/fw800/background/20250320/pngtree-virtual-portal-for-workers-to-file-complaints-image_17124979.jpg",
      alt: card.image ? `${card.title} image` : "default image",
    },
    address: {
      country: card.country,
      city: card.city,
      street: card.street,
      houseNumber: card.houseNumber,
      zip: card.zip,
    },
  };

  return httpServices.post("/cards", response);
}

function updateCard(card, cardID) {
  const response = {
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
      url:
        card.image ||
        "https://png.pngtree.com/thumb_back/fw800/background/20250320/pngtree-virtual-portal-for-workers-to-file-complaints-image_17124979.jpg",
      alt: card.image ? `${card.title} image` : "default image",
    },
    address: {
      country: card.country,
      city: card.city,
      street: card.street,
      houseNumber: card.houseNumber,
      zip: card.zip,
    },
  };

  return httpServices.put(`/cards/${cardID}`, response);
}

function likeCard(cardId) {
  //this also disLikes the card if it was already liked
  return httpServices.patch(`/cards/${cardId}`);
}

function deleteCard(cardId) {
  const response = httpServices.delete(`/cards/${cardId}`);
  return response;
}

const cardService = {
  getAllCards,
  getCardById,
  getAllMyCards,
  createNewCard,
  updateCard,
  likeCard,
  deleteCard,
};

export default cardService;
