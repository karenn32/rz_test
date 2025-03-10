# Project Overview

This project contains automated tests for verifying the functionality of the consultation form and API request validation on the `https://dev.rentzila.com.ua` platform. The tests are built using [Playwright](https://playwright.dev/), a modern testing framework that supports end-to-end testing for web applications.

## Features

- Automated interaction with the consultation form, including field validation and error handling.
- API request validation to ensure that form submissions are correctly saved in the database.
- Utilizes environment variables for storing sensitive data such as authentication tokens.

## Prerequisites

- Node.js v22.9.0 installed
- Playwright installed (`npm install @playwright/test`)
- .env file set up with required tokens and configurations.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   ```
2. Navigate to the project directory:
   ```bash
   cd yourproject
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up a `.env` file with your token:
   ```env
   API_TOKEN=your_token_here
   ```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run a specific spec file in headed mode:
```bash
npx playwright test tests/poslugy.spec.ts --headed
```

## Project Structure

- **tests/**: Contains test specifications.
- **pages/**: Page Object Models for structuring test interactions.
- **utils/**: Utility functions, e.g., random data generation.

