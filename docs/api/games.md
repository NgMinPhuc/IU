# Games API

Base path: `/api/Games`

---

## GET /api/Games

Get all games.

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "name": "Halo Infinite",
      "genre": "FPS",
      "publisher": "343 Industries",
      "releaseDate": "2021-12-08T00:00:00",
      "price": 59.99,
      "characters": []
    }
  ],
  "errors": null
}
```

---

## GET /api/Games/{id}

Get a single game by ID.

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | Guid | The game's ID |

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "name": "Halo Infinite",
    "genre": "FPS",
    "publisher": "343 Industries",
    "releaseDate": "2021-12-08T00:00:00",
    "price": 59.99,
    "characters": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Master Chief",
        "role": "Spartan",
        "power": 95,
        "blood": 1000,
        "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        "gameName": "Halo Infinite"
      }
    ]
  },
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Game with the given Id was not found.",
  "data": null,
  "errors": null
}
```

---

## POST /api/Games

Create a new game.

**Request Body (`application/json`):**
```json
{
  "name": "Halo Infinite",
  "genre": "FPS",
  "publisher": "343 Industries",
  "releaseDate": "2021-12-08T00:00:00",
  "price": 59.99
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Game title |
| `genre` | string | Yes | Game genre |
| `publisher` | string | Yes | Publisher name |
| `releaseDate` | DateTime | Yes | Release date (ISO 8601) |
| `price` | decimal | Yes | Retail price |

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Game created successfully.",
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "name": "Halo Infinite",
    "genre": "FPS",
    "publisher": "343 Industries",
    "releaseDate": "2021-12-08T00:00:00",
    "price": 59.99,
    "characters": []
  },
  "errors": null
}
```

---

## PUT /api/Games/{id}

Update an existing game.

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | Guid | The game's ID |

**Request Body (`application/json`):**
```json
{
  "name": "Halo Infinite",
  "genre": "FPS",
  "publisher": "343 Industries",
  "releaseDate": "2021-12-08T00:00:00",
  "price": 49.99
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Game title |
| `genre` | string | Yes | Game genre |
| `publisher` | string | Yes | Publisher name |
| `releaseDate` | DateTime | Yes | Release date (ISO 8601) |
| `price` | decimal | Yes | Retail price |

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Game updated successfully.",
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "name": "Halo Infinite",
    "genre": "FPS",
    "publisher": "343 Industries",
    "releaseDate": "2021-12-08T00:00:00",
    "price": 49.99,
    "characters": []
  },
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Game with the given Id was not found.",
  "data": null,
  "errors": null
}
```

---

## DELETE /api/Games/{id}

Delete a game by ID. Fails if the game still has characters assigned.

**Path Parameter:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | Guid | The game's ID |

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Game deleted successfully.",
  "data": null,
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Game with the given Id was not found.",
  "data": null,
  "errors": null
}
```

**Response `409 Conflict`:**
```json
{
  "success": false,
  "message": "Cannot delete a game that still has characters assigned.",
  "data": null,
  "errors": null
}
```

---

## POST /api/Games/{gameId}/characters/{characterId}

Add an existing character to a game.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `gameId` | Guid | The game's ID |
| `characterId` | Guid | The character's ID |

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Character added to game successfully.",
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "name": "Halo Infinite",
    "genre": "FPS",
    "publisher": "343 Industries",
    "releaseDate": "2021-12-08T00:00:00",
    "price": 59.99,
    "characters": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Master Chief",
        "role": "Spartan",
        "power": 95,
        "blood": 1000,
        "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        "gameName": "Halo Infinite"
      }
    ]
  },
  "errors": null
}
```

**Response `404 Not Found`:** Game or Character not found.

**Response `409 Conflict`:** Character is already assigned to a game.

---

## DELETE /api/Games/{gameId}/characters/{characterId}

Remove a character from a game.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `gameId` | Guid | The game's ID |
| `characterId` | Guid | The character's ID |

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Character removed from game successfully.",
  "data": null,
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Game or Character with the given Id was not found.",
  "data": null,
  "errors": null
}
```
