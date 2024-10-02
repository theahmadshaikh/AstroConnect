# Astrology Application

## Description

This astrology application implements a distributed algorithm that allocates users to astrologers fairly, ensuring an even distribution of users to each astrologer. This algorithm takes into account various factors such as ratings and session counts to prioritize astrologers effectively.

## Features

- **Astrologer Management:** Admins can create, update, and manage astrologers.
- **User-Astrologer Allocation:** A distributed algorithm allocates users to astrologers based on their ratings and session counts.
- **Adjustable Parameters:** Admins can adjust the thresholds and percentages for top astrologers.
- **API Endpoints:** RESTful API for managing users and astrologers.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repo-url>
   cd <repo-name>

   ```

2. **Install Dependencies:**
   npm install

3. **Set Up Environment Variables: Create a .env file in the root directory and add the following:**

- ADMIN_API_KEY=<your_admin_api_key>
- MONGODB_URI=<your_mongodb_uri>

4. **To start the server, run:**

- npm start

5. **To run the tests, use the following command:**

- npm test

## API Endpoints

1. **Create Astrolger**

- **URL:** /api/astrologers
- **Method:** Post
- **Headers**:
  - **x-api-key**: <admin_api_key>
- **Body:**
  {
  "name": "Astrologer Name",
  "expertise": ["Expertise 1", "Expertise 2"]
  }

2. **Get All Astrologers**

- **URL:** /api/astrologers
- **Method**: GET
- **Headers**:
- **x-api-key**: <admin_api_key>

3. **Allocate User to Astrologer**

- **URL**: /api/users/connect
- **Method**: POST
- **Headers**:
- - **x-api-key**: <admin_api_key>
    **Body:**
    {
    "userId": "<user_id>"
    }
