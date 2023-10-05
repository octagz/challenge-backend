# challenge-backend
Solution for backend challenge in nodeJS

# Assumptions

- The distance to USA is calculated to the capital, which is Washington D.C. (38.896360099565925, -77.04795855389095)
- There's only one official currency per country
- There's restrictions on the free API plan of fixer.io that forces to use EUR as the base coin. That implies an indirect convertion

# Usage
Hosted on render.com

## /traces
Sample Request
POST https://nodejs-backend-challenge.onrender.com/traces
```
{
	"ip": "8.8.8.8"
}
```
Sample Response:
```
{
    "name": "Australia",
    "code": "AU",
    "lat": -27.4766,
    "lon": 153.0166,
    "currencies": [
        {
            "iso": "AUD",
            "conversion_rate": 1.5738123571271867
        },
        {
            "iso": "USD",
            "conversion_rate": 1
        }
    ],
    "distance_to_usa": 15248.676088068776
}
```
## /statistics
GET https://nodejs-backend-challenge.onrender.com/statistics
Sample Response:
```
{
    "longest_distance": {
        "country": "Australia",
        "value": "15248.67608806878"
    },
    "most_traced": {
        "country": "South Korea",
        "value": 7
    }
}

```
