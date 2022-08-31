const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo =  archivo
    }
    async save(articulo){
         try{
            const data = await fs.promises.readFile(this.archivo,'UTF-8')
            const articuloDB = JSON.parse(data);
            const idArticulo = articuloDB.length + 1
            articulo.id = idArticulo
            articuloDB.push(articulo)
            const articulosString = JSON.stringify(articuloDB)  
            await fs.promises.writeFile(this.archivo,articulosString)
            return `El id asignado es ${idArticulo}`
         }
         catch(error){
            return error    
         }
          
    }
    async getById(id){
        try{
            const data = await fs.promises.readFile(this.archivo,'UTF-8')
            const articuloDB = JSON.parse(data);
            const articuloFind = articuloDB.find((art)=>art.id == id)
            if (articuloFind){
                return articuloFind
            }else{
                return 'No se encontro el articulo'
            }
         }
         catch{
            return 'Se encontro un error al intentar leer el archivo'
         }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo,'UTF-8')
            const articuloDB = JSON.parse(data);
            return articuloDB
        }
        catch{
            console.log('Se encontro un error al intentar leer el archivo')
        }
    }
    async deleteById(id){
        try{
            const data = await fs.promises.readFile(this.archivo,'UTF-8')
            const articuloDB = JSON.parse(data);
            //const articulo = articuloDB.find((art) => art.id = id)
            const artFiltrado= articuloDB.filter((item) => item.id !== id)
            const artString = JSON.stringify(artFiltrado)
            await fs.promises.writeFile(this.archivo,artString)
        }
        catch{
            return 'Ocurrio un error al buscar el archivo'
        }
    }
    async deleteAll(){
        const articuloDB = []
        const articuloString = JSON.stringify(articuloDB)    
        await fs.promises.writeFile(this.archivo,articuloString)
    }
}
module.exports.Contenedor = Contenedor;
