# Ngalam - Online Tour Guide

This project implements an AI-powered online tour guide for Malang City.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Ngalam-CreativeWebCompetition.git
    cd Ngalam-CreativeWebCompetition
    ```
    (Replace `https://github.com/your-username/Ngalam-CreativeWebCompetition.git` with the actual repository URL)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Configuration

This project requires a Google Gemini API Key to function.

1.  **Create a `.env` file:**
    Copy the provided example environment file:
    ```bash
    cp .env.example .env
    ```

2.  **Obtain a Google Gemini API Key:**
    If you don't have one, you can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

3.  **Configure `VITE_API_KEY`:**
    Open the newly created `.env` file and replace `masukkan_api_key_anda_disini` with your actual Google Gemini API Key:
    ```
    VITE_API_KEY=AIzaSy...your-gemini-api-key-here...
    VITE_CHATBOT_NAME=Ngalam_Online_Tour_Guide
    ```
    **Note:** Do not share your API key publicly. The `.env` file is ignored by Git, ensuring your key is not committed to the repository.

### Running the Project

To start the development server:

```bash
npm run dev
```

This will open the application in your browser (usually at `http://localhost:5173`). The chatbot will be available as a floating button on the bottom-right of the screen.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory. These files can then be deployed to any static web hosting service.

## Project Structure

-   `src/components`: Reusable React components, including `NgalamChat.jsx` for the AI chatbot.
-   `src/pages`: Page-specific components for different routes.
-   `src/assets`: Static assets like images.
-   `public`: Public assets.
-   `vite.config.js`: Vite configuration for the project.
-   `.env`: Environment variables (local, ignored by Git).
-   `.env.example`: Template for environment variables.

---
