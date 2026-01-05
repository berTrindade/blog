---
title: RESTful API Design Principles
date: 2025-03-10
category: Engineering
excerpt: Principles for designing clean, scalable APIs.
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop
---

Designing a good API is crucial for building maintainable applications. Let's explore the key principles that make APIs great.

## Resource-Based URLs

Your API should be organized around resources:

```
GET    /api/users          # List users
GET    /api/users/:id      # Get user
POST   /api/users          # Create user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

## HTTP Methods Matter

Use the right HTTP method for the right action:

- **GET**: Retrieve resources (safe and idempotent)
- **POST**: Create new resources
- **PUT**: Update entire resources (idempotent)
- **PATCH**: Partial updates
- **DELETE**: Remove resources (idempotent)

## Status Codes

Return meaningful HTTP status codes:

```typescript
200 OK              // Successful GET, PUT, PATCH
201 Created         // Successful POST
204 No Content      // Successful DELETE
400 Bad Request     // Invalid request
401 Unauthorized    // Authentication required
404 Not Found       // Resource doesn't exist
500 Server Error    // Server-side error
```

## Versioning

Always version your API:

```
/api/v1/users
/api/v2/users
```

## Pagination and Filtering

Support pagination for list endpoints:

```
GET /api/users?page=2&limit=20&sort=createdAt&order=desc
```

Following these principles will help you build APIs that developers love to use.