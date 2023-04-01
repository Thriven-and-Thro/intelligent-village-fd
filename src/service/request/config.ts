let BASE_URL = "http://localhost:8000"
// let BASE_URL = "/api"
const TIME_OUT = 10000

if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://43.139.137.2:50001"
}

export { BASE_URL, TIME_OUT }
