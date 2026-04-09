# WeatherForecast API

Base path: `/WeatherForecast`

> Note: This is a default ASP.NET scaffold controller returning randomly generated sample data. It is not part of the core business logic.

---

## GET /WeatherForecast

Get a 5-day weather forecast with randomly generated data.

![alt text](<1.png>)

**Request:** No body required.

**Response `200 OK`:**
```json
[
  {
    "date": "2026-04-10",
    "temperatureC": 25,
    "temperatureF": 76,
    "summary": "Warm"
  },
  {
    "date": "2026-04-11",
    "temperatureC": -5,
    "temperatureF": 24,
    "summary": "Freezing"
  },
  {
    "date": "2026-04-12",
    "temperatureC": 40,
    "temperatureF": 103,
    "summary": "Scorching"
  },
  {
    "date": "2026-04-13",
    "temperatureC": 12,
    "temperatureF": 53,
    "summary": "Cool"
  },
  {
    "date": "2026-04-14",
    "temperatureC": 30,
    "temperatureF": 85,
    "summary": "Hot"
  }
]
```

| Field | Type | Description |
|-------|------|-------------|
| `date` | string (date) | Forecast date |
| `temperatureC` | int | Temperature in Celsius (-20 to 55) |
| `temperatureF` | int | Temperature in Fahrenheit (derived) |
| `summary` | string | One of: Freezing, Bracing, Chilly, Cool, Mild, Warm, Balmy, Hot, Sweltering, Scorching |
