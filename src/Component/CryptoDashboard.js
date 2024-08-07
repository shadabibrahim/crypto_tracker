import { Alert, Button, Input, Table } from "antd";
import { FileSearchOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Search from "antd/es/transfer/search";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const CryptoDashboard = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false);
  // Fetch data using async/await
  const fetchDataAsync = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setData(data);
      setLoading(false)
      toast.success("Fetch Data From Api Successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
      toast.error(error);
    }
  };

  useEffect(() => {
    // You can switch between fetchDataThen and fetchDataAsync to test both methods
    fetchDataAsync();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sort data by market cap
  const sortByMarketCap = () => {
    const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
    setData(sortedData);
  };

  // Sort data by percentage change
  const sortByPercentageChange = () => {
    const sortedData = [...data].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    setData(sortedData);
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt="profile"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Current Price $",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Total Volume",
      dataIndex: "total_volume",
      key: "total_volume",
    },
  ];

  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px",
          gap: 10,
        }}
      >
        <Search
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={sortByMarketCap}>Sort by Market Cap</Button>
        <Button onClick={sortByPercentageChange}>
          Sort by Percentage Change
        </Button>
       
      </div>
      {loading?<p>Loading...</p> :<Table dataSource={filteredData} columns={columns} />}
    </div>
  );
};

export default CryptoDashboard;
