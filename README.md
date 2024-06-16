# Internship
## Inventory and Manufacturing Management System
This project is a simplified version of an inventory and manufacturing unit management system focusing on an order system. It includes features for managing orders, inventory, and displaying detailed information about orders and items.

### Setup Instructions
To set up and run this project locally, follow these steps:

**Prerequisites**
Node.js (v18.x or later)
npm (Node Package Manager) or yarn

**Installation**
1. Clone the repository:
      git clone <repository-url>
      cd <repository-name>
2. Run the development server:
      npm run dev
3. Open your browser:
      Visit http://localhost:3000 to see the application running.

### Project Structure
**pages**: Contains Next.js pages ( orders.js, inventory.js, [id].js for dynamic order details).
**components**: Reusable React components used across different pages.
**lib**: Utility functions and data fetching logic (data.js for mock data fetching).

### Features Implemented
**Orders Page:**

- Display a list of orders with filtering by status (Pending, Completed) and sorting by customer name or item count.
- Detailed order view showing items, quantities, and ability to mark an order as completed.

**Inventory Page:**

- Display a list of items with filtering by stock availability (In Stock, Out of Stock).
- CRUD operations for managing inventory items including add, edit, and delete.

### Design Choices and Implementations
**React and Next.js:** Chosen for their efficiency in building single-page applications with server-side rendering capabilities.

**Tailwind CSS:** Used for styling due to its utility-first approach, allowing for rapid UI development and customization.

**Data Management:** Array and object manipulations were implemented using JavaScript's array methods (map, filter, sort) to manage and manipulate orders and inventory items dynamically based on user interactions.


