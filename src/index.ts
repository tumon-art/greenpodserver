import express from "express";
import router from "./routers";

const app = express();
app.use(router);

app.listen(process.env.PORT || 8080, () => console.log("listening 8080"));
