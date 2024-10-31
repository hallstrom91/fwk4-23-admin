# Admin Server

A server handling GDPR request for users, etc..

## Table of Contents

- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [CSRF](#csrf)
    - [Generate Csrf Token](#generate-csrf-token)
  - [GDPR](#gdpr)
    - [Request User Data](#request-user-data)
    - [Delete User Data](#delete-user-data)
- [Testing with Insomnia or Postman](#testing-with-insomnia-or-postman)

## Setup

### To Get Started

1. Clone the repository:

```bash
git clone https://github.com/hallstrom91/fwk4-23-admin.git
```

2. Enter cloned repository directory:

```bash
cd fwk4-23-admin
```

3. Install required packages:

```
npm install
```

4. Create .env file in the root folder of the project:

```bash
DB_HOST=
DB_USER=
DB_DATABASE=
DB_PASSWORD=
PORT=
```

5. Start the domain server:

```bash
npm run dev
```

## API Endpoints

### CSRF

### Generate CSRF Token

**GET** `/csrf/token`

Generates a CSRF token and sets it in a cookie.
**THIS ENDPOINT MUST BE CALLED BEFORE ANY OTHER ENDPOINT**

- Requires JWT Authentication

**RESPONSE (200 - SUCCESS):**

```JSON
{
  "message": "CSRF token set in cookies"
}
```

**RESPONSE (500 - ERROR):**

```JSON
{
  "error": "Failed to set CSRF token"
}
```

### GDPR

### Request User Data

**GET** `/gdpr/request-data`

Retrieves user data including tasks, comments, and board memberships.

- Requires JWT authentication and a valid CSRF token.
- Request a CSRF token from `/csrf/token` endpoint before using this endpoint.

**RESPONSE (200 - SUCCESS):** \*_Returns a PDF file with this information_

```JSON
{
  "id": 1,
  "email": "user@example.com",
  "fullname": "User Full Name",
  "tasks": [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description"
    }
  ],
  "task_comments": [
    {
      "id": 1,
      "comment": "This is a comment"
    }
  ],
  "boards": [
    {
      "board_id": 1,
      "role": "admin"
    }
  ]
}
```

**RESPONSE (404 - ERROR):**

```JSON
{
  "error": "User not found"
}
```

**RESPONSE (500 - ERROR):**

```JSON
{
  "error": "Failed to fetch user data"
}
```

### Delete User Data

**DELETE** `/gdpr/request-delete`

Deletes the authenticated user's data, including tasks, comments, boards, and user profile.

- Requires JWT authentication and a valid CSRF token.
- Request a CSRF token from `/csrf/token` endpoint before using this endpoint.

**RESPONSE (200 - SUCCESS):**

```JSON
{
  "message": "User and related user data has been deleted."
}
```

**RESPONSE (401 - ERROR):**

```JSON
{
  "error": "Unauthorized"
}
```

**RESPONSE (404 - ERROR):**

```JSON
{
  "error": "User not found"
}
```

**RESPONSE (500 - ERROR):**

```JSON
{
  "error": "Failed to delete user data"
}
```

## Testing with Insomnia or Postman

You can use Insomnia or Postman to test the API endpoints by sending the appropriate requests as documented above.
