import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/conn.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes)

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});


