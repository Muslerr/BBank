Here's an updated version of your README.md file that incorporates the additional information you provided:

<h1 align="center">Welcome to BBank 👋</h1>

> A credit card management system built with .NET 8 Web API and React with Vite, Tailwind CSS, and NextUI.

## Features

- View, filter, and update credit card limits
- Secure HTTP requests with authorization
- Data persistence using repositories loaded from JSON
- Error handling with Axios
- Sleek and responsive UI using Tailwind CSS and NextUI

## Technologies Used

- .NET 8 Web API
- React with Vite
- Tailwind CSS
- NextUI
- Axios for API communication
- JSON for data storage

## Prerequisites

- Node.js latest version
- .NET 8 SDK

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Musler/BBank.git
   ```

2. Navigate to the project directory or right click it and select open integrated terminal:

   ```sh
   cd BBank
   ```

3. Install the dependencies for the React client:

   ```sh
   cd Client
   npm install
   ```

4. Install the dependencies for the .NET Web API:

   ```sh
   cd ../Webapi
   dotnet restore
   ```

## Usage

1. Start the .NET Web API:

   ```sh
   cd Webapi/
   dotnet watch run
   ```

2. In another terminal, start the React client:

   ```sh
   cd Client/
   npm run dev
   ```

3. Open your browser and visit `http://localhost:5173/` to access the application. Or press ctrl + the link given to you in the terminal

## API Documentation

The .NET Web API provides the following endpoints:

- `GET /api/creditcards` - Retrieve a list of credit cards
- `GET /api/creditcards/{id}` - Retrieve a specific credit card by ID
- `POST /api/creditcards` - Create a new credit card
- `PUT /api/creditcards/{id}` - Update an existing credit card
- `DELETE /api/creditcards/{id}` - Delete a credit card

For detailed information about request and response formats, please refer to the API documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License



## Author

👤 **Bar Musler**

* Github: [@Musler](https://github.com/Musler)
* LinkedIn: [@Bar Musler](https://linkedin.com/in/BarMusler)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

