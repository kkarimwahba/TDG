import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import countryList from "react-select-country-list";

const ShippingInfoPopup = ({ onClose }) => {
  const [userData, setUserData] = useState({
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [countries] = useState(countryList().getData());
  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getUser", {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error.response || error);
        alert("Failed to fetch user data.");
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setUserData((prev) => ({
      ...prev,
      country: selectedOption.label,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/updateUser",
        userData,
        { withCredentials: true }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error.response || error);
      alert("Failed to update user data.");
    }
  };
  return (
    <div className="shipping-info-content">
      <form className="shipping-form">
        <div className="form-field">
          <label>Address 1</label>
          <input
            type="text"
            name="address1"
            value={userData.address1}
            onChange={handleInputChange}
            placeholder="Enter your primary address"
            required
          />
        </div>
        <div className="form-field">
          <label>Address 2 (Optional)</label>
          <input
            type="text"
            name="address2"
            value={userData.address2}
            onChange={handleInputChange}
            placeholder="Enter additional address"
          />
        </div>
        <div className="shipping-form-field-row">
          <div className="Shipping-city">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              placeholder="city"
              required
            />
          </div>

          <div className="Shipping-form-field-postal">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={userData.postalCode}
              onChange={handleInputChange}
              placeholder="Postal code"
              required
            />
          </div>
        </div>
        <div className="form-field">
          <label>Country</label>
          <Select
            options={countries}
            onChange={handleCountryChange}
            placeholder="Select your country"
            isSearchable
            menuPlacement="top"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "white",
                borderRadius: "8px",
                border: state.isFocused
                  ? "2px solid #6b7b58"
                  : "1px solid #ccc",
                boxShadow: state.isFocused
                  ? "0 0 5px rgba(107, 123, 88, 0.5)"
                  : "none",
                padding: "5px",
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                width: "340px",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#aaa",
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "white",
                borderRadius: "15px",
                border: "1px solid #ccc",
                zIndex: 100,
              }),
              menuList: (base) => ({
                ...base,
                padding: 0,
                maxHeight: "150px", // Limit height of dropdown menu
                overflowY: "auto", // Add scroll if options overflow
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#6b7b58" : "white",
                color: state.isFocused ? "white" : "#2d2d2d",
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                cursor: "pointer",
                padding: "10px 15px",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#2d2d2d",
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
              }),
            }}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingInfoPopup;
