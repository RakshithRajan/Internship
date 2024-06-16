import { useEffect, useState } from 'react';
import { fetchData } from '../lib/data';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [stockFilter, setStockFilter] = useState('All');
  const [newItemName, setNewItemName] = useState('');
  const [newItemStock, setNewItemStock] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemStock, setEditItemStock] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      setItems(data.items);
      setFilteredItems(data.items);
    }
    getData();
  }, []);

  useEffect(() => {
    filterItems(stockFilter);
  }, [stockFilter, items]);

  const filterItems = (filter) => {
    if (filter === 'All') {
      setFilteredItems(items);
    } else if (filter === 'InStock') {
      const filtered = items.filter(item => item.stock > 0);
      setFilteredItems(filtered);
    } else if (filter === 'OutOfStock') {
      const filtered = items.filter(item => item.stock === 0);
      setFilteredItems(filtered);
    }
  };

  const addItem = () => {
    if (newItemName && newItemStock) {
      const newItem = { id: items.length + 1, name: newItemName, stock: parseInt(newItemStock) };
      setItems([...items, newItem]);
      setFilteredItems([...items, newItem]);
      setNewItemName('');
      setNewItemStock('');
    }
  };

  const editItem = (id) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditItemId(itemToEdit.id);
      setEditItemName(itemToEdit.name);
      setEditItemStock(itemToEdit.stock.toString());
    }
  };

  const saveEditedItem = () => {
    const updatedItems = items.map(item => {
      if (item.id === editItemId) {
        return { ...item, name: editItemName, stock: parseInt(editItemStock) };
      }
      return item;
    });
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    setEditItemId(null);
    setEditItemName('');
    setEditItemStock('');
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditItemName('');
    setEditItemStock('');
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">Inventory Management</h1>
      <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Item</h2>
        <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-1/2"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newItemStock}
            onChange={(e) => setNewItemStock(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-1/2"
          />
          <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded-lg w-full sm:w-auto hover:bg-blue-600 transition duration-300">
            Add
          </button>
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
        <label className="mr-2 font-semibold text-gray-700">Filter by Stock:</label>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="InStock">In Stock</option>
          <option value="OutOfStock">Out of Stock</option>
        </select>
      </div>
      <h2 className="text-2xl font-bold mt-4 mb-4 text-gray-700">Items</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <li key={item.id} className="border p-6 mb-4 rounded-lg shadow-lg flex flex-col bg-gray-50">
            {editItemId === item.id ? (
              <div className="flex-grow">
                <input
                  type="text"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                  className="border p-2 rounded-lg mb-2 w-full"
                />
                <input
                  type="number"
                  value={editItemStock}
                  onChange={(e) => setEditItemStock(e.target.value)}
                  className="border p-2 rounded-lg mb-2 w-full"
                />
                <div className="flex space-x-2">
                  <button onClick={saveEditedItem} className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600 transition duration-300">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-500 text-white p-2 rounded-lg w-full hover:bg-gray-600 transition duration-300">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex-grow">
                <div className="text-lg font-semibold mb-2">Name: {item.name}</div>
                <div className="text-gray-600 mb-4">Stock: {item.stock}</div>
              </div>
            )}
            <div className="flex space-x-2">
              <button onClick={() => editItem(item.id)} className="bg-yellow-500 text-white p-2 rounded-lg w-full hover:bg-yellow-600 transition duration-300">Edit</button>
              <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600 transition duration-300">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
