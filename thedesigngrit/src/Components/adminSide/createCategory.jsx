import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    description: "",
    image: null,
    imagePreview: null,
  });
  const [newType, setNewType] = useState("");
  const [currentSubCategoryIndex, setCurrentSubCategoryIndex] = useState(null);

  // Handle main category image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle subcategory image upload
  const handleSubCategoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSubCategory((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Add subcategory
  const handleAddSubCategory = () => {
    if (newSubCategory.name.trim()) {
      setSubCategories([...subCategories, { ...newSubCategory, types: [] }]);
      setNewSubCategory({
        name: "",
        description: "",
        image: null,
        imagePreview: null,
      });
    }
  };

  // Add type to a specific subcategory
  const handleAddType = () => {
    if (newType.trim() && currentSubCategoryIndex !== null) {
      const updatedSubCategories = [...subCategories];
      updatedSubCategories[currentSubCategoryIndex].types.push(newType);
      setSubCategories(updatedSubCategories);
      setNewType("");
    }
  };

  // Remove subcategory
  const handleRemoveSubCategory = (index) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  // Remove type from a subcategory
  const handleRemoveType = (subCategoryIndex, typeIndex) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[subCategoryIndex].types = updatedSubCategories[
      subCategoryIndex
    ].types.filter((_, i) => i !== typeIndex);
    setSubCategories(updatedSubCategories);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryDescription || !categoryImage) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("image", categoryImage);

    const formattedSubCategories = subCategories.map((subCategory, index) => {
      formData.append(`subCategoryImages`, subCategory.image || ""); // Match multer field name
      return {
        name: subCategory.name,
        description: subCategory.description || "",
        types: subCategory.types,
      };
    });

    formData.append("subCategories", JSON.stringify(formattedSubCategories));

    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/categories",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Response Text:", text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          alert("Category created successfully!");
          setCategoryName("");
          setCategoryDescription("");
          setCategoryImage(null);
          setImagePreview(null);
          setSubCategories([]);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Error parsing response: " + error.message);
      }
    } catch (error) {
      alert("Error submitting category: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Montserrat" }}>
      <header className="dashboard-header-vendor">
        <h2>Create Category</h2>
        <p>
          <Link to="/adminpanel">Home</Link> &gt; Create Category
        </p>
      </header>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="form-group">
          <label>Category Description</label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
          {imagePreview && <img src={imagePreview} alt="Preview" width="200" />}
        </div>

        {/* Subcategories Section */}
        <div className="form-group">
          <label>Subcategories</label>
          {subCategories.map((subCategory, subIndex) => (
            <div key={subIndex} style={{ marginBottom: "10px" }}>
              <strong>{subCategory.name}</strong>
              <button
                type="button"
                onClick={() => handleRemoveSubCategory(subIndex)}
              >
                ×
              </button>
              <p>{subCategory.description}</p>
              {subCategory.imagePreview && (
                <img
                  src={subCategory.imagePreview}
                  alt="Subcategory Preview"
                  width="100"
                />
              )}
              <ul>
                {subCategory.types.map((type, typeIndex) => (
                  <li key={typeIndex}>
                    {type}
                    <button
                      type="button"
                      onClick={() => handleRemoveType(subIndex, typeIndex)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add type"
                value={currentSubCategoryIndex === subIndex ? newType : ""}
                onChange={(e) => {
                  setCurrentSubCategoryIndex(subIndex);
                  setNewType(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={handleAddType}
                disabled={currentSubCategoryIndex !== subIndex}
              >
                Add Type
              </button>
            </div>
          ))}

          <input
            type="text"
            placeholder="Subcategory Name"
            value={newSubCategory.name}
            onChange={(e) =>
              setNewSubCategory({ ...newSubCategory, name: e.target.value })
            }
          />
          <textarea
            placeholder="Subcategory Description"
            value={newSubCategory.description}
            onChange={(e) =>
              setNewSubCategory({
                ...newSubCategory,
                description: e.target.value,
              })
            }
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleSubCategoryImageUpload}
          />
          {newSubCategory.imagePreview && (
            <img src={newSubCategory.imagePreview} alt="Preview" width="100" />
          )}
          <button type="button" onClick={handleAddSubCategory}>
            Add Subcategory
          </button>
        </div>

        <button type="submit" className="btn update">
          Submit Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
