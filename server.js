const express = require("express")
const app = express()
const port = 3000

app.use(express.static("public"))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")


app.use('images/favicon.jpg', express.static('images/favicon.jpg'));

app.get("/", (req, res) => {
  res.render("home")
})

const carsRouter = require("./routes/cars")
app.use("/cars", carsRouter)





app.listen(process.env.PORT || port, () => console.log(`Program listening at http://localhost:${port}`))

// app.listen(3000)
