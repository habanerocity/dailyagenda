# Daily Agenda - Front End

This is the front-end part of Daily Agenda, a full-stack todo list and weather app built with React JS.

## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Backend Repository](#backend-repository)
- [Contact](#contact)

## Introduction

Welcome to Daily Agenda, your all-in-one productivity and weather companion! This application is designed to assist users in planning their day by combining a todo list with real-time weather information. You can set plus track todos and stay informed about the current weather conditions.

## Live Demo

You can view a live demo of the application [here](https://daily-agenda-289d3.web.app/).

## Features

- **User Authentication:** Users can register and log in to access personalized features. This feature uses JSON Web Tokens (JWT) for secure authentication.
- **Todo List:** Create and track your daily tasks intuitively.
- **Weather Updates:** Stay informed with real-time weather information for your location.
- **Time and Date Display:** Always be aware of the current time and date.
- **Login as Guest:** Users can explore the application's features without creating an account. This feature uses the Local Storage API to persist data.

## Getting Started

### Prerequisites

- Node.js (version 14.0.0 or later recommended, minimum version 10.16.0) and npm (version 6.14.0 or later recommended, minimum version 5.6.0) installed on your machine.
- A modern web browser.

### Installation

1. Fork and clone the repository.
2. Install the dependencies with `npm install`.
3. Create a `.env` file in the root of your project and add your own Weather API key. You can get a Weather API key by signing up for it from [WeatherAPI](https://www.weatherapi.com/signup.aspx):

```bash
REACT_APP_WEATHER_API_KEY=your-weather-api-key
REACT_APP_WEATHER_API_BASE=https://api.weatherapi.com/v1
REACT_APP_WEATHER_API_DAYS=3
```

4. Start the development server with npm start.

Please note that the backend API is not included in this repository.  The front-end application will make registered user's requests to http://localhost:8888/todo_backend/ by default.  You can change this URL in the useApiUrl.js file if you have a different backend API.

## Usage

Enhance your daily planning with Daily Agenda. Organize tasks, check the current weather, and keep track of time and date effortlessly.

## Technologies Used

The front end of Daily Agenda leverages modern web technologies to provide a smooth and responsive user experience. The main technologies used in the front end are:

- React JS: A JavaScript library for building user interfaces.
- React Router DOM: A collection of navigational components that compose declaratively with your application.
- JSON Web Tokens (JWT): A compact, URL-safe means of representing claims to be transferred between two parties. Used for handling user authentication and maintaining sessions.
- Local Storage API: The application uses the Local Storage API to store guest user data persistently in the user's web browser. This allows guest users to return to the application and find their data intact, even if they close the browser or turn off their device. This feature is primarily used for the "Login as Guest" functionality, where users can explore the application's features without creating an account.

## Backend Repository

The backend for Daily Agenda is hosted in a separate repository. You can find it [here](https://github.com/habanerocity/daily_agenda_backend).

The backend is built with PHP and MySQL, and uses JSON Web Tokens (JWT) for user authentication. It handles all the server-side logic of the application, including user registration and authentication, data persistence, and interaction with the MySQL database.

For more details about the backend technologies and setup, please refer to the backend repository.

## Contact

For inquiries or questions, feel free to contact me at lindyo87@gmail.com. Explore my portfolio [here](https://www.lindyramirez.com).