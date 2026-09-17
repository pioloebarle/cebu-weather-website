# Lantaw Cebu 🌤️

A full-stack weather dashboard for **20 cities and municipalities in Cebu**, providing current weather conditions, hourly forecasts, and 7-day forecasts.

The project was built as a personal portfolio project to strengthen my experience with **full-stack development, database management, API integration, and scheduled data processing**.

## Features

* 🌡️ Current weather conditions
* 🕐 Hourly weather forecast
* 📅 7-day weather forecast
* 📍 Weather information for 20 Cebu cities and municipalities
* 🔄 Automated weather data refresh
* 💾 PostgreSQL database for storing weather data
* 🧩 Prisma ORM for database operations
* 🌐 OpenWeatherMap API integration
* 📱 Responsive user interface

## Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend / Server-Side

* **Next.js API Routes**
* **TypeScript**
* **Prisma ORM**

### Database

* **PostgreSQL**

### External API

* **OpenWeatherMap API**

### Deployment

* **Railway**

## Architecture

Instead of requesting weather data directly from OpenWeatherMap every time a user visits the website, Lantaw Cebu uses a scheduled data-refresh process.

```text
                    ┌─────────────────────┐
                    │   OpenWeatherMap    │
                    │        API          │
                    └──────────┬──────────┘
                               │
                               │ Fetch weather data
                               ▼
                    ┌─────────────────────┐
                    │ Scheduled Refresh   │
                    │     Process         │
                    └──────────┬──────────┘
                               │
                               │ Store / Update
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └──────────┬──────────┘
                               │
                               │ Prisma
                               ▼
                    ┌─────────────────────┐
                    │     Next.js        │
                    │   Server / API     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React / Next.js  │
                    │     Frontend        │
                    └─────────────────────┘
```

The scheduled process fetches the weather information for the configured Cebu locations and stores the results in PostgreSQL. The application can then retrieve the stored data through the database instead of making an external API request for every page visit.

## Why Scheduled Data Refresh?

The project uses the free tier of the OpenWeatherMap API, which has API usage limitations.

To reduce unnecessary API requests, weather information is periodically fetched and stored in the database. This allows the application to serve weather information from PostgreSQL while limiting the number of requests sent to the external API.

The refresh process retrieves:

* Current weather
* Hourly forecast
* Daily forecast

The retrieved information is then associated with each city in the database.

## Database

The application uses **PostgreSQL** as its database and **Prisma ORM** for database access.

Each city contains information such as:

* City name
* Coordinates
* Current weather data
* Hourly forecast data
* Daily forecast data
* Last weather-data refresh timestamp

Prisma provides the application with a structured way to query and update the database from the Next.js server-side code.

## API Integration

Lantaw Cebu uses the **OpenWeatherMap API** as its external weather data source.

The application retrieves weather information using the coordinates of each configured Cebu city or municipality.

The data is processed and stored in PostgreSQL during the scheduled refresh process.

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

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm
* PostgreSQL
* An OpenWeatherMap API key

### 1. Clone the repository

```bash
git clone https://github.com/pioloebarle/cebu-weather-website.git
cd cebu-weather-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and provide the environment variables required by the application.

```env
DATABASE_URL="your-postgresql-connection-string"
OPENWEATHER_API_KEY="your-openweathermap-api-key"
CRON_SECRET="your-cron-secret"
```

> Use the environment variable names expected by the current source code when configuring your deployment.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Set up the database

Make sure your PostgreSQL database is available and apply the Prisma schema/migrations used by the project.

### 6. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Scheduled Weather Refresh

The project includes a server-side API route for refreshing weather data:

```text
/api/cron/refresh-weather
```

The endpoint is protected using a bearer token based on the configured cron secret.

The refresh process:

1. Retrieves the configured cities from PostgreSQL.
2. Fetches current, hourly, and daily weather data from OpenWeatherMap.
3. Updates each city's weather information using Prisma.
4. Records the time when the data was last refreshed.
5. Reports successful and failed city updates.

This allows the application to periodically update its stored weather data without requiring every visitor to trigger an external API request.

## Project Goals

Lantaw Cebu was developed to explore and practice:

* Full-stack web development
* Next.js server-side development
* React and TypeScript
* REST API integration
* PostgreSQL database management
* Prisma ORM
* Scheduled background data processing
* API usage optimization
* Application deployment

## Author

**Piolo Pascual E. Besinga**

Computer Engineering Graduate
University of San Carlos

GitHub: [@pioloebarle](https://github.com/pioloebarle)

---

## License

This project is intended primarily as a personal portfolio and learning project.
