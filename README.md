# Cryptocoin App

The Cryptocoin App is a web application built with React and Vite that displays up-to-date information about various cryptocurrencies. Users can view a list of coins, their current prices, market capitalization, trading volume and more.

## Features

- **Cryptocurrency Listings:** View a list of authorized cryptocurrencies with key metrics.
- **Real-time Data:** Displays current price, 24-hour price change percentage, total trading volume, and market capitalization.
- **Detailed Coin View:** Click on a coin to navigate to a dedicated page with more comprehensive information.
- **Responsive Design:** Adapts for optimal viewing on both desktop and mobile devices.
- **User-Friendly Navigation:** Easy-to-use navigation bar to switch between pages.

## Tech Stack

- **Frontend:** React, Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** CSS
- **Language:** JavaScript (JSX)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (which includes npm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Cryptocoin-App.git
    cd Cryptocoin-App
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory of the project and add your API URL. The application expects the API endpoint to be available via `VITE_API_URL`.
    ```env
    VITE_API_URL=your_cryptocurrency_api_endpoint_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173`. Open this URL in your browser to see the application.

---

This project was bootstrapped with Vite. The original Vite README content regarding plugins is below for reference if needed:

Currently, two official React plugins are available:

-   @vitejs/plugin-react uses Babel for Fast Refresh
-   @vitejs/plugin-react-swc uses SWC for Fast Refresh
