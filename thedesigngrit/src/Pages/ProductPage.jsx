import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { FaFile } from "react-icons/fa";
import Header from "../Components/navBar";
import { AiOutlineFileSearch } from "react-icons/ai";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, useParams } from "react-router-dom";
import ReviewBox from "../Components/reviewBox";
import {
  fetchProductData,
  fetchProductReview,
} from "../utils/fetchProductData";
import Footer from "../Components/Footer";
import RelatedProducts from "../Components/relatedProduct";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedMaterialSections, setExpandedMaterialSections] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProductData = async () => {
      const data = await fetchProductData(id);
      setProduct(data);
    };
    getProductData();
  }, [id]);

  useEffect(() => {
    const getReviewData = async () => {
      const data = await fetchProductReview(id);
      setReviews(data);
    };
    getReviewData();
  }, [id]);

  const handleToggleSection = (index, type = "general") => {
    if (type === "general") {
      setExpandedSections((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else {
      setExpandedMaterialSections((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  const handleAddToCartClick = () => {
    navigate("/mycart");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <Header />

      <div className="product-container">
        <div className="grid-container">
          <div className="product-image-container">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-main-image"
            />
            <div className="thumbnail-container">
              {product.thumbnailUrls.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                />
              ))}
            </div>
          </div>

          <div className="product-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-brand">{product.brand}</p>
            <p className="product-rating">
              {"★".repeat(product.rating)} ({product.reviewsCount} reviews)
            </p>
            <p className="product-price">{product.price}</p>
            <hr />

            <div className="color-selector">
              <span className="color-selector-label">Color:</span>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-circle ${
                      selectedColor === color.name ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  ></div>
                ))}
              </div>
            </div>
            {selectedColor && <p>Selected Color: {selectedColor}</p>}

            <hr />

            <div className="size-selector">
              <span className="size-selector-label">Size:</span>
              <div className="size-options">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-button ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {selectedSize && <p>Selected Size: {selectedSize}</p>}

            <div className="action-buttons">
              <button
                className="action-button button-primary"
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </button>
              <button className="action-button button-secondary">
                Request Info
              </button>
            </div>
          </div>
        </div>

        <div className="page-container">
          <div className="collapsible-container">
            {["Overview", "Dimensions", "BIM/CAD", "Videos", "Tags"].map(
              (section, index) => (
                <div
                  key={index}
                  className={`collapsible-section ${
                    expandedSections[index] ? "open" : ""
                  }`}
                  onClick={() => handleToggleSection(index)}
                >
                  <div className="collapsible-header">
                    {section}
                    <KeyboardArrowDownIcon
                      className={`collapsible-icon ${
                        expandedSections[index] ? "rotated" : ""
                      }`}
                    />
                  </div>
                  {expandedSections[index] && (
                    <div className="collapsible-content">
                      Content for {section}
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div className="material-collapsible-container">
            {["Delivery & Returns", "Care Instructions"].map(
              (section, index) => (
                <div key={index} className="material-collapsible-section">
                  <div
                    className="material-collapsible-header"
                    onClick={() => handleToggleSection(index, "material")}
                  >
                    {section}
                    <span className="material-collapsible-icon">
                      {expandedMaterialSections[index] ? "-" : "+"}
                    </span>
                  </div>
                  {expandedMaterialSections[index] && (
                    <div className="material-collapsible-content">
                      Content for {section}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews</h2>
          <Box className="review-summary">
            <ReviewBox />
          </Box>
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <Box className="review-subtitle">
                <h3>{review.reviewerName}</h3>
                <p>{review.reviewDate}</p>
              </Box>
              <p>{"★".repeat(review.rating)}</p>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>

      <RelatedProducts />
      <Footer />
    </div>
  );
}

export default ProductPage;
