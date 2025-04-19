import React from "react";
import cardService from "../../services/cardService";
import { useState } from "react";
import UpdateCard from "../updateCard";
import DeleteCard from "../deleteCard";
import { toast } from "react-hot-toast";

export function Card({
  title,
  subtitle,
  description,
  phone,
  email,
  image,
  web,
  address,
  user,
  likes,
  id,
}) {
  const [currentLikes, setCurrentLikes] = useState(likes || []);
  const likeCard = async () => {
    try {
      const response = await cardService.likeCard(id);
      toast.success("Updated Favorites");
      setCurrentLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking card:", error);
      toast.error("Failed to update favorites");
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={image.url}
        className="card-img-top"
        alt={image.alt ? image.url : "default image"}
        style={{ height: "12rem", objectFit: "contain" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://png.pngtree.com/thumb_back/fw800/background/20250320/pngtree-virtual-portal-for-workers-to-file-complaints-image_17124979.jpg";
          e.target.alt = "default image";
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fw-bold text-secondary">{subtitle}</p>
        <p className="card-text">{description}</p>
        <hr style={{ margin: "auto", margin: "1rem 0" }} />
        <p className="card-text">Phone: {phone}</p>
        <p className="card-text">Address: {address}</p>
        <p className="card-text">Email: {email}</p>

        <div className="d-flex flex-row gap-2">
          <a
            href={web}
            className="btn btn-success"
            target="_blank"
            rel="noreferrer noopener"
          >
            Go To Website
          </a>
          <button
            className="btn btn-success"
            style={{ display: user ? "block" : "none" }}
            onClick={likeCard}
          >
            {Array.isArray(currentLikes) ? currentLikes.length : 0}
            {Array.isArray(currentLikes) && currentLikes.includes(user?._id)
              ? "♥"
              : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyCard({
  title,
  subtitle,
  description,
  phone,
  email,
  image,
  web,
  address,
  id: _id,
  user,
  likes,
}) {
  const [editCardStatus, setEditCardStatus] = useState(false);
  const [deleteCardStatus, setDeleteCardStatus] = useState(false);

  const cardData = {
    title,
    subtitle,
    description,
    phone,
    email,
    image,
    web,
    address,
    _id,
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={image.url}
        className="card-img-top"
        alt={image.alt ? image.url : "default image"}
        style={{ height: "12rem", objectFit: "contain" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://png.pngtree.com/thumb_back/fw800/background/20250320/pngtree-virtual-portal-for-workers-to-file-complaints-image_17124979.jpg";
          e.target.alt = "default image";
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{title}</h5>
        <p className="card-text fw-bold text-secondary">{subtitle}</p>
        <p className="card-text">{description}</p>
        <hr style={{ margin: "auto", margin: "1rem 0" }} />
        <p className="card-text">Phone: {phone}</p>
        <p className="card-text">Address: {address}</p>
        <p className="card-text">Email: {email}</p>
        <p>{Array.isArray(likes) ? likes.length : 0} ♥ Likes</p>
        <div className="d-flex flex-row gap-2">
          <a
            href={web}
            className="btn btn-success my-2 flex-fill"
            target="_blank"
            rel="noreferrer noopener"
          >
            Website
          </a>
          <button
            className="btn btn-primary my-2"
            onClick={() => setEditCardStatus(true)}
            title="Edit Card"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-danger my-2">
            <i
              className="bi bi-trash3"
              title="Delete Card"
              onClick={() => setDeleteCardStatus(true)}
            ></i>
          </button>
        </div>
      </div>
      <UpdateCard
        isOn={editCardStatus}
        onClose={() => setEditCardStatus(false)}
        card={cardData}
      />
      <DeleteCard
        isOn={deleteCardStatus}
        onClose={() => setDeleteCardStatus(false)}
        card={cardData}
      />
    </div>
  );
}
