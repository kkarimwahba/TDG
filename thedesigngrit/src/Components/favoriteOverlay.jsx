import React, { useState, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../../src/utils/userContext"; // Assuming UserContext is where user session is stored

const FavoritesOverlay = ({ open, onClose }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { userSession } = useContext(UserContext); // Access user session from context

  // Fetch favorite products when the component is mounted or when userSession changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userSession) return; // Make sure user session is available

      try {
        const response = await fetch(
          `http://localhost:5000/api/favorites/${userSession.id}`
        );
        if (response.ok) {
          const favoritesData = await response.json();
          setFavoriteProducts(favoritesData);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (userSession) {
      fetchFavorites();
    }
  }, [userSession]); // Runs when the userSession changes

  if (!open) return null; // Do not render if not open

  return (
    <div className="overlay-container-vendor" style={{ right: "50px" }}>
      {/* Header */}
      <div className="overlay-header-vendor">
        <h3>Favorites</h3>
        <button className="close-button-vendor" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Body */}
      <div className="overlay-body-vendor">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <div key={product._id} className="notification-item-vendor">
              <div className="notification-image-vendor">
                {/* Assuming `product.mainImage` is the image path */}
                <img
                  src={`http://localhost:5000/uploads/${product.mainImage}`}
                  alt={product.title}
                  className="notification-image-vendor-image"
                />
              </div>
              <div className="notification-details-vendor">
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <span>{product.description}</span>
              </div>
              <div
                className="notification-status-vendor"
                style={{
                  backgroundColor:
                    product.stock === 0
                      ? "#f44336"
                      : product.stock > 0 && product.stock < 5
                      ? "#ff9800"
                      : "#6c7c59",
                }}
              >
                {product.stock === 0
                  ? "Unavailable"
                  : product.stock > 0 && product.stock < 5
                  ? "Hurry! Only " + product.stock + " left"
                  : "Available"}
              </div>
            </div>
          ))
        ) : (
          <p style={{ padding: "16px", textAlign: "center", color: "#888" }}>
            No favorites added yet.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="overlay-footer-vendor">
        <button className="view-all-vendor">VIEW ALL FAVORITES</button>
      </div>
    </div>
  );
};

export default FavoritesOverlay;
