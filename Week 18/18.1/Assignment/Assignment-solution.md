# Assignment: Get Queries Executed by Prisma During CRUD Operations

## Problem Statement

Determine what queries are being executed by Prisma when performing CRUD operations.

## Solution

### Logging Queries

To log queries executed by Prisma, initialize the Prisma client with logging enabled:

```javascript
const client = new PrismaClient({
  log: ["query"],
});
```

### Logging Queries with Parameters

To capture queries along with the parameters passed, use an event-based approach:

```javascript
const client = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

// Set up event listener for query events
client.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});
```

## Sample Code

Below is an example demonstrating how to use Prisma to log queries while creating and retrieving users.

```javascript
import { PrismaClient } from "@prisma/client";
import express, { json } from "express";

// Initialize Prisma Client with query logging
const client = new PrismaClient({
  log: ["query"],
});

const app = express();

// Function to create a user
async function createUser() {
  await client.user.create({
    data: {
      username: "Lalith Sharma",
      password: "12341234",
      age: 22,
      city: "Chennai",
    },
  });
}

// Function to find a user
async function findUser() {
  const user = await client.user.findFirst({
    where: {
      id: 1,
    },
  });
  console.log(user);
}
```

This implementation allows us to monitor Prisma queries and their parameters, aiding in debugging and optimization.

For detailed documentation, refer to: [Prisma Logging Documentation](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)
