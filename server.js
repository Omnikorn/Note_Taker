const express = require("express")
const path = require("path")

const fs = require("fs")

const app = express()
const PORT = 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

app.listen(PORT, () =>
	console.log(`app ;istening on ${PORT}`)
)
