import { Elysia, t } from "elysia";

// Mock database for our items
const db = {
  items: [
    { id: 1, name: "Item 1", description: "Description for item 1" },
    { id: 2, name: "Item 2", description: "Description for item 2" },
    { id: 3, name: "Item 3", description: "Description for item 3" },
  ]
};

const app = new Elysia()
  // Middleware to log all requests
  .use(app => app.onRequest(({ request }) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    return;
  }))
  
  // Root endpoint
  .get("/", () => ({
    message: "Welcome to the Elysia API",
    version: "1.0.0",
    endpoints: [
      { path: "/", method: "GET", description: "API information" },
      { path: "/items", method: "GET", description: "Get all items" },
      { path: "/items/:id", method: "GET", description: "Get item by ID" },
      { path: "/items", method: "POST", description: "Create a new item" },
      { path: "/items/:id", method: "PUT", description: "Update an item" },
      { path: "/items/:id", method: "DELETE", description: "Delete an item" },
    ]
  }))
  
  // Get all items
  .get("/items", () => ({
    count: db.items.length,
    items: db.items
  }))
  
  // Get item by ID
  .get("/items/:id", ({ params }) => {
    const itemId = parseInt(params.id);
    const item = db.items.find(item => item.id === itemId);
    
    if (!item) {
      return new Response(JSON.stringify({
        error: "Item not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    return item;
  })
  
  // Create a new item
  .post("/items", ({ body }) => {
    const newId = Math.max(0, ...db.items.map(item => item.id)) + 1;
    const newItem = { id: newId, ...body as { name: string, description: string } };
    db.items.push(newItem);
    
    return {
      message: "Item created successfully",
      item: newItem
    };
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String()
    })
  })
  
  // Update an item
  .put("/items/:id", ({ params, body }) => {
    const itemId = parseInt(params.id);
    const itemIndex = db.items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return new Response(JSON.stringify({
        error: "Item not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const updatedItem = {
      ...db.items[itemIndex],
      ...(body as { name: string, description: string })
    };
    
    db.items[itemIndex] = updatedItem;
    
    return {
      message: "Item updated successfully",
      item: updatedItem
    };
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String()
    })
  })
  
  // Delete an item
  .delete("/items/:id", ({ params }) => {
    const itemId = parseInt(params.id);
    const itemIndex = db.items.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      return new Response(JSON.stringify({
        error: "Item not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const deletedItem = db.items.splice(itemIndex, 1)[0];
    
    return {
      message: "Item deleted successfully",
      item: deletedItem
    };
  })
  
  .listen(3000);

console.log(
  `🦊 Elysia API is running at ${app.server?.hostname}:${app.server?.port}`
);
