# Campus Notification System Design

## Overview

The Campus Notification System is a React-based web application that fetches notifications from an external API, prioritizes them based on predefined rules, and displays the most important notifications to users.

The application consists of two main modules:

1. Notification Application
2. Logging Middleware

---

## Architecture

### Notification Application

The Notification Application is responsible for:

* Fetching notifications from the API.
* Calculating notification priority.
* Sorting notifications based on priority.
* Filtering notifications by type.
* Displaying the top notifications to the user.

### Logging Middleware

The Logging Middleware is responsible for:

* Sending logs to the evaluation service.
* Recording application events.
* Tracking errors and debugging information.

---

## Folder Structure

```text
2330846/
│
├── notification_app/
│   ├── src/
│   │   ├── api/
│   │   │   └── notifications.js
│   │   ├── components/
│   │   │   └── NotificationCard.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── priority.js
│   │   └── App.jsx
│   │
│   └── package.json
│
├── logging_middleware/
│   └── logger.js
│
└── notification_system_design.md
```

---

## Notification Fetch Flow

1. User opens the application.
2. Dashboard component loads.
3. Dashboard calls `getNotifications()`.
4. API request is sent to the notification service.
5. Notifications are received.
6. Priority is calculated for each notification.
7. Notifications are sorted.
8. Top notifications are displayed.

---

## Priority Calculation

Priority is determined using notification type and timestamp.

### Type Weights

| Type      | Weight |
| --------- | ------ |
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

### Formula

```javascript
priority =
(typeWeight * 10000000000000) + timestamp
```

This ensures:

* Placement notifications appear first.
* Result notifications appear second.
* Event notifications appear last.
* Newer notifications appear before older notifications within the same category.

---

## Filtering System

Users can filter notifications using:

### Notification Type

* All
* Placement
* Result
* Event

### Top Notifications

* Top 10
* Top 15
* Top 20

The filtering logic is implemented using React's `useMemo()` hook for performance optimization.

---

## API Design

### Fetch Notifications

```http
GET /notifications
```

Headers:

```http
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

Response:

```json
{
  "notifications": [
    {
      "ID": "123",
      "Type": "Placement",
      "Message": "Apple Inc. hiring",
      "Timestamp": "2026-06-03T00:47:38"
    }
  ]
}
```

---

## Logging Middleware Design

### Purpose

The middleware records system events and errors.

### Log Request

```http
POST /logs
```

Request Body:

```json
{
  "stack": "frontend",
  "level": "info",
  "package": "notification_app",
  "message": "Notifications loaded successfully"
}
```

### Logging Flow

1. Application event occurs.
2. `Log()` function is called.
3. Log request is sent to server.
4. Server stores the log entry.
5. Success response is returned.

---

## Technologies Used

### Frontend

* React
* Material UI
* JavaScript
* Vite

### Middleware

* JavaScript
* Fetch API

### External Services

* Campus Evaluation Notification API
* Campus Evaluation Logging API

---

## Assumptions

* API returns notifications in valid JSON format.
* Authorization token is valid.
* Notification timestamps are ISO date strings.
* Network connectivity is available.

---

## Future Improvements

* Search functionality.
* Pagination support.
* Real-time notifications using WebSockets.
* User authentication.
* Notification read/unread status.
* Dark/Light theme toggle.
* Advanced filtering and sorting options.

---

## Conclusion

The Campus Notification System efficiently retrieves, prioritizes, filters, and displays campus notifications. The design separates notification handling and logging concerns, making the application modular, maintainable, and scalable.
