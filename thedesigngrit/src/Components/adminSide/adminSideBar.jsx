import React from "react";

const SidebarAdmin = ({ setActivePage }) => {
  return (
    <aside className="sidebar-vendor">
      <ul className="sidebar-menu-vendor">
        <li
          onClick={() => setActivePage("dashboard")}
          className="sidebar-item-vendor"
        >
          Dashboard
        </li>
        <li
          onClick={() => setActivePage("allProducts")}
          className="sidebar-item-vendor"
        >
          All Products
        </li>
        <li
          onClick={() => setActivePage("orderList")}
          className="sidebar-item-vendor"
        >
          Order List
        </li>
        <li
          onClick={() => setActivePage("Requests")}
          className="sidebar-item-vendor"
        >
          Requests
        </li>
        <li
          onClick={() => setActivePage("createCategory")}
          className="sidebar-item-vendor"
        >
          Categories
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
