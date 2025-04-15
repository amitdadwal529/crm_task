
# crm_task
Customer Relationship Management (CRM) system.

 # Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd crm_task

   Install dependencies
   npm install

   Start the development server 
   npm run dev

# Credentials 
username: emilys, 
password: emilyspass,

# Features
1. Login Page
Users can log in with a username and password.

Validation checks for correct credentials.

On successful login, users are redirected to the dashboard.

2. Authentication
Public and private routes implemented using React Router.

Authenticated users can access the dashboard and product management features.

Unauthenticated users are redirected to the login page.

3. Dashboard
Displays graphs with dummy data using Chart.js and React react-chartjs-2.

Graphs for tracking Sales Overview, Customer Impressions, and Traffic Sources.


### 4. Product Management (CRUD)

- **Create:** Users can add new products with name, description, and price.
- **Read:** Users can view a list of all products.
- **Update:** Dummy update product API implemented (Note: changes won’t persist due to API limitations).
- **Delete:** Dummy delete product API implemented (Note: changes won’t persist due to API limitations).
-We have performed full CRUD operations locally using **localStorage** and **Redux Toolkit** to ensure a seamless user experience even with limited API functionality.


# Tech Stack
Frontend:

React.js: Main library for building the user interface.

Redux: For state management across the app.

Redux Toolkit: For a more efficient Redux implementation.

React Router: For handling navigation and route management.

Chart.js: For implementing graphs and visualizations.

Styling:

Tailwind CSS: For utility-first CSS styling.

React-icons : for icons
