import { Box, Select, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const RecentPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [dateRange, setDateRange] = useState([null, null]);
  const ordersPerPage = 8;
  const navigate = useNavigate();

  // Fetch order data from JSON
  const fetchOrders = async () => {
    try {
      const response = await fetch("/json/OrderData.json");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Status Change
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  // Handle Sort Option Change
  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);

    // Toggle sort direction for the same option
    if (newSortOption === sortOption) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  // Handle Date Range Change
  const handleDateRangeChange = (event, newValue) => {
    setDateRange(newValue);
    setCurrentPage(1);
  };

  // Filtered Orders Based on Status
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  // Filter Orders by Date Range
  const dateFilteredOrders =
    dateRange[0] && dateRange[1]
      ? filteredOrders.filter(
          (order) =>
            new Date(order.date) >= new Date(dateRange[0]) &&
            new Date(order.date) <= new Date(dateRange[1])
        )
      : filteredOrders;

  // Sort Orders
  const sortedOrders = [...dateFilteredOrders].sort((a, b) => {
    switch (sortOption) {
      case "Date":
        return sortDirection === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      case "Alphabetical":
        return sortDirection === "asc"
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product);
      case "Price Ascending":
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      case "Price Descending":
        return sortDirection === "asc"
          ? b.amount - a.amount
          : a.amount - b.amount;
      default:
        return 0;
    }
  });

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  return (
    <div className="dashboard-vendor">
      <header className="dashboard-header-vendor">
        <div className="dashboard-header-title">
          <h2>Order List</h2>
          <p>Home &gt; Order List</p>
        </div>
        <div className="dashboard-date-vendor">
          <SlCalender />
          <span>
            {dateRange[0] && dateRange[1]
              ? `${dateRange[0]} - ${dateRange[1]}`
              : "Select date range"}
          </span>
        </div>
      </header>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Select
          sx={{
            width: "200px",
            borderRadius: "5px",
            padding: "0px",
            color: "#2d2d2d",
          }}
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <MenuItem value="All">Sort By Status</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Canceled">Pending</MenuItem>
        </Select>
        <Select
          sx={{
            width: "200px",
            borderRadius: "5px",
            padding: "0px",
            color: "#2d2d2d",
            marginLeft: "20px",
          }}
          value={sortOption}
          onChange={handleSortChange}
        >
          <MenuItem value="Date">Sort By Date</MenuItem>
          <MenuItem value="Alphabetical">Alphabetical</MenuItem>
          <MenuItem value="Price Ascending">Price: Ascending</MenuItem>
          <MenuItem value="Price Descending">Price: Descending</MenuItem>
        </Select>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "20px",
          }}
        >
          <TextField
            type="date"
            value={dateRange[0]}
            onChange={(e) =>
              handleDateRangeChange(e, [e.target.value, dateRange[1]])
            }
            sx={{ width: "150px", marginLeft: "20px" }}
          />
          <span>to</span>
          <TextField
            type="date"
            value={dateRange[1]}
            onChange={(e) =>
              handleDateRangeChange(e, [dateRange[0], e.target.value])
            }
            sx={{ width: "150px", marginLeft: "5px" }}
          />
        </Box>
      </Box>
      <div className="recent-purchases">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h2>Recent Purchases</h2>
          <BsThreeDotsVertical style={{ fontSize: "1rem" }} />
        </Box>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                onClick={() => navigate(`/orderDetail/${order.id}`)}
                style={{ cursor: "pointer" }}
                key={order.id}
              >
                <td>{order.product}</td>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>{order.customerName}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "5px",
                      backgroundColor:
                        order.status === "Delivered" ? "#d4edda" : "#f8d7da",
                      color:
                        order.status === "Delivered" ? "#155724" : "#721c24",
                      fontWeight: "500",
                      textAlign: "center",
                      minWidth: "80px",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentPurchases;
