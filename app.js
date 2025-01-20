import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import {faker} from "@faker-js/faker";
import {ProductSchema} from "./schema.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {dbName: "caching"})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

    const Product = mongoose.model("Product", ProductSchema);
app.use("/", (req, res) => {
    res.send("Hello World!");
});

async function createProduct(count=10) {
    const products =[];

    for(let i=0; i<count; i++) {
        const newProduct = new Product({
            name: faker.commerce.productName(),
            photo: faker.image.url(),
            price: faker.commerce.price({min: 1500, max: 8000, dec: 0}),
            stock: faker.commerce.price({min: 1, max: 100, dec: 0}),
            category: faker.commerce.department(),
            createAt: new Date(faker.date.past()),
            updatedAt: new Date(faker.date.recent()),
        });
        products.push(newProduct);
    }

    try {
        await Product.insertMany(products);
        console.log("Products created");
    } catch (error) {
        console.log(error);
    }
    console.log("check the database");
}

createProduct(50);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
