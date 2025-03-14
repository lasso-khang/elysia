# Elysia API Server

A simple RESTful API built with [Elysia.js](https://elysiajs.com/) running on [Bun](https://bun.sh/).

## Features

- CRUD operations for managing items
- Request validation
- Error handling
- Request logging

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Running the Server

```bash
bun run src/index.ts
```

The API will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint    | Description           |
|--------|-------------|-----------------------|
| GET    | /           | API info              |
| GET    | /items      | Get all items         |
| GET    | /items/:id  | Get item by ID        |
| POST   | /items      | Create a new item     |
| PUT    | /items/:id  | Update an item        |
| DELETE | /items/:id  | Delete an item        |

## Example Requests

### Get all items

```bash
curl http://localhost:3000/items
```

### Get item by ID

```bash
curl http://localhost:3000/items/1
```

### Create a new item

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "Description for the new item"}'
```

### Update an item

```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "Updated description"}'
```

### Delete an item

```bash
curl -X DELETE http://localhost:3000/items/1
```

## License

MIT