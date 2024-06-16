import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchData } from '../../lib/data';

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [itemsWithStock, setItemsWithStock] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      let foundOrder = null;
      for (let i = 0; i < data.orders.length; i++) {
        if (data.orders[i].id) {
          foundOrder = data.orders[i];
          break;
        }
      }

      if (foundOrder) {
        setOrder(foundOrder);
        const orderItemsWithStock = await Promise.all(
          foundOrder.items.map(async (orderItem) => {
            const item = data.items.find((item) => item.id === orderItem.id);
            return { ...orderItem, ...item };
          })
        );
        setItemsWithStock(orderItemsWithStock);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  const markOrderCompleted = async () => {
    try {
      const data = await fetchData();
      const updatedOrders = data.orders.map((o) =>
        o.id === parseInt(id) ? { ...o, status: 'Completed' } : o
      );
      setOrder(updatedOrders.find((o) => o.id === parseInt(id)));
    } catch (error) {
      console.error('Error marking order as completed:', error);
    }
  };

  // Conditional rendering to handle when order is null
  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {/* Conditional rendering for order details */}
      {order && (
        <>
          <div>ID: {order.id}</div>
          <div>Customer: {order.customer}</div>
          <div>Status: {order.status}</div>
          <h2 className="text-xl font-bold mt-4">Items</h2>
          <ul>
            {itemsWithStock.map((item) => (
              <li key={item.id} className="border p-2 mb-2">
                <div>Name: {item.name}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Stock Availability: {item.stock}</div>
              </li>
            ))}
          </ul>
          {order.status === 'Pending' && (
            <button onClick={markOrderCompleted} className="bg-green-500 text-white p-2 mt-4">
              Mark as Completed
            </button>
          )}
        </>
      )}
    </div>
  );
}
