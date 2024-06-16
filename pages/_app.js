import "@/styles/globals.css";
import { useRouter } from 'next/router';
import Orders from "./orders";
import Inventory from "./inventory";

function Home() {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">Inventory and Manufacturing Unit Management System</h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Inventory and Manufacturing Unit Management System. Use the navigation above to view orders, manage inventory, and more.
      </p>
      <div className="flex space-x-4">
        <a href="./orders" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">View Orders</a>
        <a href="./inventory" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Manage Inventory</a>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  let PageComponent;
  if (router.pathname === "/orders") {
    PageComponent = Orders;
  } else if (router.pathname === "/inventory") {
    PageComponent = Inventory;
  } else {
    PageComponent = Home;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-xl font-bold">Home</a>
          </div>
          <div>
            <a href="./orders" className="mx-2 hover:underline">Orders</a>
            <a href="./inventory" className="mx-2 hover:underline">Inventory</a>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <PageComponent {...pageProps} />
      </div>
    </div>
  );
}
