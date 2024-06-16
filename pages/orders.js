import { useEffect, useState } from 'react';
import { fetchData } from '../lib/data.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      setOrders(data.orders);
      setFilteredOrders(data.orders);
    }
    getData();
  }, []);

  useEffect(() => {
    filterOrders(statusFilter);
  }, [statusFilter]);

  const filterOrders = (status) => {
    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const sortOrders = (option) => {
    let sortedOrders = [...filteredOrders];
    if (option === 'customer') {
      sortedOrders.sort((a, b) => a.customer.localeCompare(b.customer));
    } else if (option === 'itemCount') {
      sortedOrders.sort((a, b) => a.items.length - b.items.length);
    }
    setFilteredOrders(sortedOrders);
    setSortOption(option);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Order List</h1>
      <div className="flex justify-between mb-6 items-center">
        <div>
          <label className="mr-2 font-semibold text-gray-700">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold text-gray-700">Sort by:</label>
          <button
            onClick={() => sortOrders('customer')}
            className={`px-4 py-2 rounded-md transition duration-200 ${sortOption === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'}`}
          >
            Customer Name
          </button>
          <button
            onClick={() => sortOrders('itemCount')}
            className={`ml-2 px-4 py-2 rounded-md transition duration-200 ${sortOption === 'itemCount' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'}`}
          >
            Item Count
          </button>
        </div>
      </div>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id} className="bg-white border border-gray-200 p-4 rounded-md mb-4 shadow-md transition duration-200 hover:shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-800">Order ID: {order.id}</div>
              <div className={`px-2 py-1 rounded-md ${order.status === 'Pending' ? 'bg-yellow-200' : 'bg-green-200'} text-gray-800`}>
                {order.status}
              </div>
            </div>
            <div className="mt-2">
              <div className="text-gray-600">Customer: {order.customer}</div>
              <div className="text-gray-600">Item Count: {order.items.length}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
