const express = require("express")
const app = express()
const contenedor = require("./Contenedor").Contenedor
const conten = new contenedor("articulos.json")


app.get('/',(req,res) => {
    res.send('<h1 style="color:blue;" >Bienvenidos al servidor express</h1>')
})

app.get('/productos',async (req,res) => {
    const data = await conten.getAll();
    res.send(data)
})

app.get('/productosRandom',async (req,res) => {
    const data = await conten.getAll();
    id = parseInt(Math.random()*data.length)+1
    const random = await conten.getById(id)
    res.send(random)
})




const server = app.listen(8080,()=>{
    console.log(`Servidor express iniciado en el puerto ${server.address().port} `)
})
