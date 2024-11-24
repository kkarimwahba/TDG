import React, { useState } from "react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    linkedIn: "",
    notes: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="job-form-container">
      <div className="job-form-card">
        <h1 className="job-form-title">FILL THE FORM</h1>

        <form onSubmit={handleSubmit}>
          <div className="job-form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Karim Ahmad"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="job-form-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="karim@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="job-form-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="01022161614"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="job-form-field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="New Cairo, Cairo, Egypt"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="job-form-row">
            <div className="job-form-field">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="Egypt"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="job-form-field">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Cairo"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="job-form-field">
            <label>Upload Your Resume</label>
            <button
              type="button"
              className="job-upload-button"
              onClick={() =>
                document.getElementById("job-resume-upload").click()
              }
            >
              Upload
            </button>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <div className="job-form-field">
            <label>LinkedIn Profile</label>
            <input
              type="url"
              name="linkedIn"
              placeholder="https://linkedin.com"
              value={formData.linkedIn}
              onChange={handleInputChange}
            />
          </div>

          <div className="job-form-field">
            <label>Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Add a Note..."
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <button type="submit" className="job-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
