# Joke-Reviews Application

Joke-Reviews is a full-stack web application that allows users to browse, save, and interact with memes from various subreddits. It also includes a global chat feature for users to communicate with each other.

## Features

### Client-Side

- **React + Vite**: The client is built using React and Vite for fast development and hot module replacement.
- **Routing**: React Router is used for navigation between pages (`Login`, `Home`, `Saved Memes`, and `Global Chat`).
- **State Management**: Context API is used to manage user login state and saved memes.
- **Dynamic Meme Fetching**: Memes are fetched from various subreddits using the Meme API.
- **Global Chat**: Users can send and receive messages in real-time.
- **User Accounts**: Users can log in, create accounts, and save memes to their profile.
- **Styling**: Custom CSS is used for styling components, with separate stylesheets for each major component.

### Server-Side

- **Express.js**: The server is built using Express.js and handles API requests for user accounts and global chat history.
- **GitHub API Integration**: User data and global chat history are stored in a GitHub repository using the GitHub API.

## Project Structure

### Client

The client-side code is located in the `client/` directory:

- **Components**: Contains React components such as `Home`, `Login`, `UserSaved`, `ChatWindow`, and `Navbar`.
- **Context**: Includes `LoggedInContext` and `SavedContext` for managing global state.
- **Styles**: Contains CSS files for styling individual components.
- **Vite Configuration**: The `vite.config.js` file configures Vite for the project.

### Server

The server-side code is located in the `server/` directory:

- **API Endpoints**:
  - `/JokeAccounts`: Handles user account creation and updates.
  - `/GlobalChatHistory`: Handles global chat history updates.
- **Dependencies**: Uses `express` and `cors` for server functionality.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Joke-Reviews.git
   cd Joke-Reviews
   ```
2. Install dependencies for the client:
   cd client
   npm install

3. Install dependencies for the server:
   cd ../server
   npm install

4. Start the server:
   npm start

5. Start the client:
   cd ../client
   npm run dev

6. Open the application in your browser:
   at http://localhost:5173.

## Usage

### 1. Login

- Navigate to the **Login** page.
- Enter your GitHub username and personal access token to log in or create an account.
- Once logged in, you will be redirected to the **Home** page.

### 2. Home

- Browse random memes fetched from various subreddits.
- Interact with memes by:
  - **Upvoting**: Click the upvote button to like a meme.
  - **Saving**: Save memes to your profile for later viewing.

### 3. Saved Memes

- Access the **Saved Memes** page to view all memes you have saved.
- Manage your saved memes:
  - Add personal notes to saved memes.
  - Remove memes from your saved list.

### 4. Global Chat

- Open the **Global Chat** page to chat with other users in real-time.
- Send and receive messages instantly.
- All messages are stored in a shared GitHub repository for persistence.

### 5. Navigation

- Use the **Navbar** to switch between pages:
  - **Home**: Browse and interact with memes.
  - **Saved Memes**: View and manage your saved memes.
  - **Global Chat**: Chat with other users.
  - **Logout**: Log out of your account.

## Technologies Used

### Frontend

- **React**
- **React Router**
- **Context API**
- **Vite**
- **CSS**

### Backend

- **Express.js**
- **GitHub API**
- **CORS**

## File Overview

### Client

#### Components:

- **App.jsx**: Main application component.
- **Login.jsx**: Handles user login and account creation.
- **Home.jsx**: Displays random memes and allows interaction.
- **UserSaved.jsx**: Displays saved memes and allows management.
- **ChatWindow.jsx**: Displays the global chat interface.
- **Navbar.jsx**: Navigation bar for the application.
- **RatingBar.jsx**: Component for upvoting, saving, and navigating memes.

#### Context:

- **LoggedInContext.jsx**: Manages user login state.
- **SavedContext.jsx**: Manages saved memes state.

#### Styles:

- **App.css**, **Home.css**, **Login.css**, **NavBar.css**, **UserSaved.css**, **ChatWindow.css**, **RatingBar.css**: CSS files for styling components.

### Server

- **index.js**: Main server file with API endpoints for user accounts and global chat history.

## Future Enhancements

- Add user authentication with OAuth.
- Improve error handling and validation.
- Enhance UI/UX with animations and better design.
- Add support for more meme sources.

## License

This project is licensed under the MIT License.
