import express from "express"
import { router as productosRouter } from "./router/product.router.js"
import { router as cartsRouter } from "./router/cart.router.js"

const PORT=8080
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/productos", productosRouter)
app.use("/api/carts", cartsRouter)




app.listen(PORT, ()=>console.log(`Server online en puerto ${PORT}`))