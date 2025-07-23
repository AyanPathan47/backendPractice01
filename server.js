import express from "express";
import './utils/db.js'; // Import database connection
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use('/' , userRouter);

app.listen(port, () => {
    console.log(`Server is Listening at ${port}`);
})