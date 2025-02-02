import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useVendor } from "../../utils/vendorContext"; // Adjust the import path
import NotificationOverlayVendor from "./notificationOverlay";

const NavbarVendor = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [brandData, setBrandData] = useState(null); // State for brand data
  const { vendor, logout } = useVendor(); // Access vendor and logout from context
  const navigate = useNavigate();

  // Fetch brand data based on vendor.brandId
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/brand/${vendor.brandId}`, // Replace with your backend endpoint
          {
            method: "GET",
            credentials: "include", // Include credentials for session handling
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBrandData(data); // Store the fetched brand data
        } else {
          console.error("Failed to fetch brand data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };

    if (vendor?.brandId) {
      fetchBrandData(); // Call the fetch function if brandId exists
    }
  }, [vendor]);

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vendors/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful");
        logout();
        navigate("/signin-vendor");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar-vendor">
      <div className="navbar-logo-vendor">
        <img
          src={`http://localhost:5000/uploads/${brandData?.brandlogo}`}
          alt="Vendor Logo"
        />
      </div>
      <div className="navbar-actions-vendor">
        <FaBell className="icon-vendor-bar" onClick={toggleOverlay} />
        <select onChange={(e) => e.target.value === "Logout" && handleLogout()}>
          <option>Manager</option>
          <option>Settings</option>
          <option>Logout</option>
        </select>
        {isOverlayOpen && <NotificationOverlayVendor onClose={toggleOverlay} />}
      </div>
    </nav>
  );
};

export default NavbarVendor;
