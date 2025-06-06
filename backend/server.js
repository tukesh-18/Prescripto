import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectDB from "./Config/mongoDB.js";
import ConnectCloudinary from "./Config/Cloudinary.js";
import adminRouter from "./Routes/adminRoutes.js";
import doctorRouter from "./Routes/doctorRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";

console.log("ENV PORT:", process.env.PORT);

//app config
const app = express();
dotenv.config();
ConnectDB();
// console.log(process.env.CLOUDINARY_API_KEY);
ConnectCloudinary();
const port = process.env.PORT || 4000

//Middlewares
app.use(express.json());


const allowedOrigins = [
   'https://prescripto-g65o.onrender.com',       // main user frontend
   'https://prescripto-admin-2s75.onrender.com'  // admin dashboard
];

app.use(cors({
   origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true
}));

app.use(cors())

//api endpoint
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", UserRouter)

app.get("/", (req, res) => {
   res.send("Your server is live and api working ")
})

//listening on port 

app.listen(port, () => {
   console.log(`server is stated on port no. ${port}`)
})