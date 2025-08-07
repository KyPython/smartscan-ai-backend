# **⚡ SmartScan AI Backend: A Decoupled API Gateway**

This repository contains the Node.js Express API that serves as the middleware for the **[SmartScan AI](https://smartscan-ai-frontend.vercel.app/onboarding)** project. It showcases expertise in designing and building a critical service that orchestrates communication between the frontend and a Python-based AI microservice, all within a scalable architecture.

## **🛠️ Tech Stack & Rationale**

The technology stack was chosen to create a lightweight, high-performance API gateway that is easy to maintain and scale.

  - **Express.js** - A minimalist, unopinionated web framework, chosen for its speed and efficiency in handling API requests.
  - **Node.js** - The server runtime, ideal for handling the I/O-heavy task of routing requests between services.
  - **CORS** - Properly configured middleware to securely handle cross-origin requests from the frontend.
  - **ES Modules** - Modern JavaScript syntax for better module management and code readability.

## **🔑 Key Skills Demonstrated**

This backend service provides a clear demonstration of professional backend development skills:

  * **API Design:** Creating clean, predictable RESTful API endpoints for client-to-server communication.
  * **Service Orchestration:** Building a middleware layer to manage requests and responses between different services (frontend and AI server).
  * **Robust Error Handling:** Implementing a centralized system to gracefully handle and communicate errors from dependent services.
  * **Environment Management:** Utilizing environment variables for secure and flexible configuration across different deployment environments.

## **🚀 API Endpoints**

### `GET /`

**Purpose:** A health check endpoint to verify that the service is running and responsive.

```json
{
  "message": "SmartScan AI Backend is running!"
}
```

### `POST /api/classify`

**Purpose:** The primary endpoint for processing image captioning requests. It accepts an image URL from the frontend and forwards it to the Python AI server for processing.

**Request Body:**

```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

**Successful Response:**

```json
{
  "output": "AI-generated caption text"
}
```

## **🔄 Service Communication Flow**

This service acts as a crucial intermediary, demonstrating a clear understanding of microservices communication:

1.  **Receive Request:** Accepts an `imageUrl` from the frontend.
2.  **Validate & Forward:** Validates the input and forwards the request to the Python AI server.
3.  **Handle Response:** Processes the AI's response, handling any potential errors.
4.  **Return Result:** Sends the AI-generated caption back to the frontend.


## **📊 Robust Error Handling**

This API includes a structured approach to error handling, ensuring predictable and informative responses for the frontend.

  - **400 Bad Request:** Returned when the incoming request is malformed (e.g., a missing `imageUrl`).
  - **500 Internal Server Error:** A general catch-all for unexpected issues within the Node.js service.
  - **502 Bad Gateway:** Returned specifically when the Python AI server is unresponsive or returns an error, demonstrating an understanding of how to handle failures in dependent services.
