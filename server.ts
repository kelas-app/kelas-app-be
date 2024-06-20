import express from "express"
import path from "path"
import config from "./config/config"
import app from "./app"

const PORT = config.port || 3000
const server = express()

server.use(express.static(path.join(__dirname, "public")))

server.get("/api-docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "swagger.html"))
})

server.get("/api-docs/apidocs.json", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "apidocs.json"))
})

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

server.use(app)

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
