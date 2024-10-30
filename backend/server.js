const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/products')
const userRoute = require("./routes/user")
const orderRoutes = require("./routes/order")
const Product = require('./models/Product')

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/user',userRoute);
app.use("/api/admin", orderRoutes);

const server = http.createServer(app);

app.get("/api/products/sku/:sku", async (req, res) => {
  try {
    const productSku = req.params.sku;

    // Find product by SKU
    const product = await Product.findOne({ SKU: productSku });
  
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
    res.json(product);
    
  } catch (error) {
    console.error("Error fetching product by SKU:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


mongoose.connect(process.env.MONGO_URI).then(() =>{
    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    }); 
})

.catch(err =>{
    console.log('Connection Failed');
    console.log(err);
})
