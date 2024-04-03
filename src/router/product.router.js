import { Router } from 'express';
import path from "path";
import __dirname from '../utils.js';
import ProductManager from '../dao/ProductManager.js';
import ProductJson from "../data/products.json" assert { type: 'json' };



export const router=Router()

const productJson = ProductJson
const productManager = new ProductManager(path.join(__dirname,  "data", "products.json"))

router.get("/", (req, res)=>{
    let productos = productManager.getProducts()
    let limit = req.query.limit

    if (limit && limit > 0) {
        return res.json(productJson.slice(0, limit))
    } else {
        res.json(productos)
    }
    res.json(productos)
})

router.get("/:pid", (req, res) => {
    let id = req.params.pid
    id = Number(id)
    console.log(id, typeof id)
    if (isNaN(id)) {
        return res.json("Su valor no es un numero")
    } 
    
    try {
        let productId = productManager.getProductById(id);
        return res.json(productId);
    } catch (error) {
        return res.json({ error: error.message });
    }
});

router.post("/", (req, res) => {
    try {
        
        const { title, description, price, thumbnail, code, stock } = req.body;

    
        if (productManager.products.some(product => product.code === code)) {
            throw new Error("El código del producto ya existe");
        }

    
        const newProduct = productManager.addProduct(title, description, price, thumbnail, code, stock);

        res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});


router.put("/:pid", (req, res) => {
    let id = req.params.pid
    let updatedFields = req.body;   
    id = Number(id)
    console.log(id, typeof id)
    if (isNaN(id)) {
        return res.json("Su valor no es un numero")
    } 
    
    try {
        let productId = productManager.getProductById(id);
        let updatedProduct = productManager.updateProduct(productId, updatedFields);

        res.json({ message: "Producto actualizado correctamente", product: updatedProduct });
    } catch (error) {
        return res.json({ error: error.message });
    }
});
