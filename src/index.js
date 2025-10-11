const express = require("express")

const dotenv = require("dotenv")

const connection = require("./config/connection")

const arearouter = require("./routes/Admin/area.routes")

const packagerouter = require("./routes/Admin/package.routes")

const userrouter = require("./routes/User/register.routes")

const bookingrouter = require("./routes/User/booking.routes")

const confirmBookingsrouter = require("./routes/User/confirmBookings.routes")

// const cors = require("cors")

const path = require('path');

const app = express()

const port = 7000



app.use(express.json())

dotenv.config()

// app.use("*" , cors())
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use('/static', express.static(path.join(__dirname, 'public/Images')));


connection()

app.use(arearouter)

app.use(packagerouter)

app.use(userrouter)

app.use(bookingrouter)

app.use(confirmBookingsrouter)

app.listen(port, () => {
    console.log("Port Connected Successfully", port);
    
    
})
