import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import ProductCard from "../Products/productcard"; // Assuming ProductCard is already created
import { UserContext } from "../../utils/userContext"; // User session context

const WishlistPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { userSession } = useContext(UserContext); // Get user session from context

  // Fetch favorite products on component mount or when userSession changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userSession) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/favorites/${userSession.id}`
        );
        if (response.ok) {
          const favoritesData = await response.json();
          setFavoriteProducts(favoritesData); // Store fetched products in state
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
  }, [userSession]);

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          marginBottom: "5  0px",
          fontFamily: "Horizon",
        }}
      >
        Your Wishlist
      </Typography>

      {/* If there are no favorite products, show a message */}
      {favoriteProducts.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="textSecondary">
            You have no favorite products in your wishlist.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Render the favorite products as ProductCard */}
          {favoriteProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishlistPage;
