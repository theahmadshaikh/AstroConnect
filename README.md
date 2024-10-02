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
  ```bash
  {
  "name": "Astrologer Name",
  "expertise": ["Expertise 1", "Expertise 2"]
  }
  ```

2. **Get All Astrologers**

- **URL:** /api/astrologers
- **Method**: GET
- **Headers**:
- **x-api-key**: <admin_api_key>

3. **Allocate User to Astrologer**

- **URL**: /api/users/connect
- **Method**: POST
- **Headers**:
 - **x-api-key**: <admin_api_key>
    **Body:**
    ```bash
    {
    "userId": "<user_id>"
    }
    ```
4. **Set Top Astrologer Threshold**
- **URL:** /api/flow/top-astrologers/threshold
- **Method**: PUT
**Headers:**
   - **x-api-key:** <admin_api_key>
   ```bash
   {
  "rating": 4.5,
  "sessions": 50,
  "percentage": 20
   }
   ```
5. **Adjust Flow Percentage for Top Astrologers**
- **UR:** /api/flow/top-astrologers/percentage
- **Method**: PUT
- **Headers:**
   - **x-api-key:** <admin_api_key>
   ```bash
   {
  "percentage": 20,
  "rating": 4.5,
  "sessions": 10
   }
   ```
## Usage Examples:

1. **Creating a New Astrologer:**
   ```bash
   curl -X POST http://localhost:3000/api/astrologers \
   -H "x-api-key: <your_api_key>" \
   -H "Content-Type: application/json" \
   -d '{"name": "John Doe", "expertise": ["Horoscope", "Palmistry"]}'
   ```
2. **Connecting a User to an Astrologer:**
   ```bash
   curl -X POST http://localhost:3000/api/users/connect \
   -H "x-api-key: <your_api_key>" \
   -H "Content-Type: application/json" \
   -d '{"userId": "<user_id>"}'
   ```
3. **Setting Top Astrologer Threshold:**
   ```bash
      curl -X PUT http://localhost:3000/api/flow/top-astrologers/threshold \
   -H "x-api-key: <your_api_key>" \
   -H "Content-Type: application/json" \
   -d '{"rating": 4.5, "sessions": 50, "percentage": 20}'
   ```
4. **Adjusting Flow Percentage for Top Astrologers:**
   ```bash
   curl -X PUT http://localhost:3000/api/flow/top-astrologers/percentage \
   -H "x-api-key: <your_api_key>" \
   -H "Content-Type: application/json" \
   -d '{"percentage": 20, "rating": 4.5, "sessions": 10}'

   ```
