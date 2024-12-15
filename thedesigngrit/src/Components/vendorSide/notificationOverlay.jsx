import React, { useState } from "react";
import { FaTimes, FaBell } from "react-icons/fa"; // React Icons

const NotificationOverlayVendor = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Lorem Ipsum",
      price: "₹140",
      date: "Nov 15, 2023",
      status: "Sold",
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      price: "₹140",
      date: "Nov 15, 2023",
      status: "Sold",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      price: "₹140",
      date: "Nov 15, 2023",
      status: "Sold",
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      price: "₹140",
      date: "Nov 15, 2023",
      status: "Sold",
    },
  ];

  const toggleOverlay = () => setIsOpen(!isOpen);

  return (
    <div className="notification-overlay-vendor">
      <button className="notification-icon-vendor" onClick={toggleOverlay}>
        <FaBell />
      </button>
      {isOpen && (
        <div className="overlay-container-vendor">
          <div className="overlay-header-vendor">
            <h3>Notifications</h3>
            <button className="close-button-vendor" onClick={toggleOverlay}>
              <FaTimes />
            </button>
          </div>
          <div className="overlay-body-vendor">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item-vendor">
                <div className="notification-image-vendor"></div>
                <div className="notification-details-vendor">
                  <h4>{notification.title}</h4>
                  <p>{notification.price}</p>
                  <span>{notification.date}</span>
                </div>
                <div className="notification-status-vendor">
                  {notification.status}
                </div>
              </div>
            ))}
          </div>
          <div className="overlay-footer-vendor">
            <button className="mark-read-vendor">MARK ALL AS READ</button>
            <button className="view-all-vendor">VIEW ALL NOTIFICATIONS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationOverlayVendor;