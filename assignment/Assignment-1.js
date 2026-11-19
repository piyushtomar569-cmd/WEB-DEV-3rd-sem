const express = require("express");
const app = express();
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 55000,
    quantity: 10
  },
  {
    id: 2,
    name: "Mobile",
    category: "Electronics",
    price: 25000,
    quantity: 20
  },
  {
    id: 3,
    name: "Shoes",
    category: "Fashion",
    price: 2000,
    quantity: 15
  }
];

let nextId = 4;
app.get("/",(req,res)=>{
    res.send("hello to you")
})
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newProduct = {
    id: nextId++,
    name,
    category,
    price,
    quantity
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const { name, category, price, quantity } = req.body;

  if (name !== undefined) product.name = name;
  if (category !== undefined) product.category = category;
  if (price !== undefined) product.price = price;
  if (quantity !== undefined) product.quantity = quantity;

  res.json({
    message: "Product updated successfully",
    product
  });
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.json({
    message: "Product deleted successfully",
    product: deletedProduct[0]
  });
});

app.get("/products/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category
  );

  if (filteredProducts.length === 0) {
    return res.status(404).json({
      message: "Category not found"
    });
  }

  res.json(filteredProducts);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});