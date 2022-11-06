import express from "express";
import router from "./routers";
const cors = require("cors");

const app = express();
app.use(router);

// CORS CONFIG
const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(express.json());

// CORS
app.use(cors(corsConfig));

app.listen(process.env.PORT || 8080, () => console.log("listening 8080"));
