# crm_task
Customer Relationship Management (CRM) system.

Features
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


4. Product Management (CRUD)
Create: Users can add new products with name, description, and price.

Read: Users can view a list of all products.

Update: I have implemented the dummy update product api succesfully but as we can't change thier server so you wont see any changes  

Delete: I have implemented the dummy delete product api succesfully but as we can't change thier server so you wont see any changes  

Uses Redux Toolkit to manage product data state.

Tech Stack
Frontend:

React.js: Main library for building the user interface.

Redux: For state management across the app.

Redux Toolkit: For a more efficient Redux implementation.

React Router: For handling navigation and route management.

Chart.js: For implementing graphs and visualizations.

Styling:

Tailwind CSS: For utility-first CSS styling.

React-icons : for icons
