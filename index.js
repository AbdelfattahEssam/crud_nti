const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.json());

const filePath = path.join(__dirname, "products.json");

app.post("/products", (req, res) => {
  try {
    const product = req.body;

    let products = [];

    const fileData = fs.readFileSync(filePath, "utf8");
    products = fileData ? JSON.parse(fileData) : [];

    products.push(product);

    fs.writeFileSync(filePath, JSON.stringify(products, 2), "utf8");

    res.status(201).json({
      message: "product added",
      data: product,
    });
  } catch (err) {
    res.status(404).json({ error: "product cant added", details: err.message });
  }
});
app.get("/products", (req, res) => {
  const content = fs.readFileSync(filePath, "utf8");
  const products = JSON.parse(content);

  res.status(200).json({
    message: "content of file",
    data: products,
  });
});
app.delete('/file', (req, res) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            res.status(200).json({ message: "file deleted" });
        } else {
            res.status(404).json({ message: "cant delete this file" });
        }
    } catch (err) {
        res.status(404).json({ error: "something went wrong", details: err.message });
    }
});
app.listen(port, () => {
  console.log(`app run on port ${port}`);
});
