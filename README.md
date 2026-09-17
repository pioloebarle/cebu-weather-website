# Lantaw Cebu

Lantaw Cebu is a full-stack weather dashboard that displays weather information for 20 cities and municipalities in Cebu.

This project was created as a personal project to practice full-stack web development and to learn more about working with APIs, databases, and scheduled data processing.

## Features

* Current weather information
* Hourly weather forecast
* 7-day weather forecast
* Weather information for 20 Cebu cities and municipalities
* Automated weather data updates
* PostgreSQL database for storing weather data
* OpenWeatherMap API integration
* Responsive interface

## Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma ORM
* OpenWeatherMap API
* Railway

## How It Works

The application uses the OpenWeatherMap API to get weather information.

Instead of requesting the weather API every time a user visits the website, the project uses a scheduled refresh process. The weather data is fetched periodically and saved to the PostgreSQL database.

When users access the website, the application can retrieve the stored weather information from the database.

The general flow is:

```text
OpenWeatherMap API
        |
        v
Scheduled Weather Refresh
        |
        v
PostgreSQL Database
        |
        v
Prisma
        |
        v
Next.js
        |
        v
Frontend
```

The refresh process gets the current weather, hourly forecast, and daily forecast for the configured locations.

## Why I Used a Scheduled Refresh

The OpenWeatherMap API has limitations on its free tier. To avoid making unnecessary API requests, I decided to periodically fetch the weather data and store it in the database.

This allows the website to use the stored data instead of making an external API request every time someone visits the page.

## Database

The project uses PostgreSQL as the database and Prisma ORM for database operations.

Each city stores information including:

* City name
* Coordinates
* Current weather data
* Hourly forecast data
* Daily forecast data
* Last fetched time

## API

The project uses OpenWeatherMap as the external weather API.

The weather data is retrieved using the latitude and longitude of each city or municipality and is then stored in PostgreSQL.

The project also has a server-side API route that handles the weather refresh process.

## Project Structure

```text
cebu-weather-website/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── refresh-weather/
│   │   │       └── route.ts
│   │   ├── test-weather/
│   │   └── ...
│   ├── city/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── lib/
│   ├── refresh-weather.ts
│   ├── openweather.ts
│   ├── prisma.ts
│   └── ...
│
├── prisma/
│   └── schema.prisma
│
├── public/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

You will need:

* Node.js
* npm
* PostgreSQL
* OpenWeatherMap API key

### Clone the Repository

```bash
git clone https://github.com/pioloebarle/cebu-weather-website.git
cd cebu-weather-website
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the required environment variables.

```env
DATABASE_URL="your-postgresql-connection-string"
OPENWEATHER_API_KEY="your-openweathermap-api-key"
CRON_SECRET="your-cron-secret"
```

Make sure to use the environment variable names required by the project.

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Production

To create a production build:

```bash
npm run build
```

To run the production server:

```bash
npm start
```

## Weather Refresh

The project includes a server-side route for refreshing the weather data:

```text
/api/cron/refresh-weather
```

The refresh process:

1. Gets the list of cities from the database.
2. Fetches the current, hourly, and daily weather data.
3. Updates the weather information in PostgreSQL using Prisma.
4. Saves the latest fetch time.
5. Records any cities where the refresh failed.

The endpoint is also protected using a cron secret.

## What I Learned

Through this project, I was able to practice:

* Building a full-stack application with Next.js
* Working with React and TypeScript
* Using Prisma with PostgreSQL
* Integrating an external API
* Creating server-side API routes
* Working with scheduled data updates
* Managing data between an external API and a database
* Deploying a web application using Railway

## Author

Piolo Pascual E. Besinga

Computer Engineering Graduate
University of San Carlos

GitHub: https://github.com/pioloebarle
