# VideoGameCharacters API

Base path: `/api/VideoGameCharacters`

> **Note:** Assigning a character to a game is handled via the [Games API](./games.md) (`POST /api/Games/{gameId}/characters/{characterId}`). The `gameId` and `gameName` fields in responses are read-only from this endpoint.

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/VideoGameCharacters` | Get all characters |
| GET | `/api/VideoGameCharacters/{id}` | Get a character by ID |
| POST | `/api/VideoGameCharacters` | Create a new character |
| PUT | `/api/VideoGameCharacters/{id}` | Update an existing character |
| DELETE | `/api/VideoGameCharacters/{id}` | Delete a character |

---

## Response Schema

All responses follow the `ApiResponse<T>` wrapper:

```json
{
  "success": true,
  "message": "string",
  "data": "T | null",
  "errors": ["string"] | null
}
```

### CharacterResponse fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | guid | No | Unique identifier |
| `name` | string | No | Character name |
| `role` | string | No | Character role / class |
| `power` | int | No | Attack power stat |
| `blood` | int | No | HP / health stat |
| `gameId` | guid | Yes | ID of the assigned game (null if unassigned) |
| `gameName` | string | Yes | Name of the assigned game (null if unassigned) |

---

## GET /api/VideoGameCharacters

Get all characters.

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Master Chief",
      "role": "Spartan",
      "power": 95,
      "blood": 1000,
      "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "gameName": "Halo Infinite"
    },
    {
      "id": "1a2b3c4d-0000-0000-0000-000000000001",
      "name": "Lara Croft",
      "role": "Adventurer",
      "power": 78,
      "blood": 850,
      "gameId": null,
      "gameName": null
    }
  ],
  "errors": null
}
```

---

## GET /api/VideoGameCharacters/{id}

Get a single character by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | guid | The character's unique ID |

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Master Chief",
    "role": "Spartan",
    "power": 95,
    "blood": 1000,
    "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "gameName": "Halo Infinite"
  },
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Character with the given Id was not found.",
  "data": null,
  "errors": null
}
```

---

## POST /api/VideoGameCharacters

Create a new character. The character will be unassigned from any game by default.

**Request Body (`application/json`):**
```json
{
  "name": "Master Chief",
  "role": "Spartan",
  "power": 95,
  "blood": 1000
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Character name |
| `role` | string | Yes | Character role / class |
| `power` | int | Yes | Attack power stat |
| `blood` | int | Yes | HP / health stat |

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Character created successfully.",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Master Chief",
    "role": "Spartan",
    "power": 95,
    "blood": 1000,
    "gameId": null,
    "gameName": null
  },
  "errors": null
}
```

---

## PUT /api/VideoGameCharacters/{id}

Update an existing character's stats. Does not affect game assignment.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | guid | The character's unique ID |

**Request Body (`application/json`):**
```json
{
  "name": "Master Chief",
  "role": "Spartan",
  "power": 99,
  "blood": 1200
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Character name |
| `role` | string | Yes | Character role / class |
| `power` | int | Yes | Attack power stat |
| `blood` | int | Yes | HP / health stat |

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Character updated successfully.",
  "data": null,
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Character with the given Id was not found.",
  "data": null,
  "errors": null
}
```

---

## DELETE /api/VideoGameCharacters/{id}

Delete a character by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | guid | The character's unique ID |

**Request:** No body required.

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Character deleted successfully.",
  "data": null,
  "errors": null
}
```

**Response `404 Not Found`:**
```json
{
  "success": false,
  "message": "Character with the given Id was not found.",
  "data": null,
  "errors": null
}
```
