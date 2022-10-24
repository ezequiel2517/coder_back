module.exports = class Contenedor {
        constructor(filename) {
            this.filename = filename;
        }
    
        static fs = require("fs");
    
        //Si el archivo no existe entonces muestra warning y lo crea. 
        async save(item) {
            const items = await this.getAll();
            let maxId = 1;
            if (items.length !== 0)
                maxId = await this.getMaxId() + 1;
            item.id = maxId;
            items.push(item);
            try {
                await Contenedor.fs.promises.writeFile(`./${this.filename}`, JSON.stringify(items, null, 2))
            }
            catch (error) {
                console.log("ERROR: No se pudo guardar el nuevo item.");
            }
            console.log("WARNING: Item guardado con exito.")
        }
    
        //Devuelve undefined si no existe el item con el id dado.
        async getById(id) {
            const items = await this.getAll();
            return items.find(e => e.id === id);
        }
    
        //Si el archivo no existe muestra warning y devuelve array vacio.
        async getAll() {
            let items = [];
            try {
                items = JSON.parse(await Contenedor.fs.promises.readFile(`./${this.filename}`, "utf-8"));
            }
            catch (error) {
                console.log("WARNING: El archivo no existe.");
            }
            return items;
        }
    
        //Setea el nuevo arreglo sin el item del id dado.
        async deleteById(id) {
            let items = await this.getAll();
            if (await this.getById(id))
                items = items.filter(e => e.id !== id);
            try {
                await Contenedor.fs.promises.writeFile(`./${this.filename}`, JSON.stringify(items, null, 2));
            } catch (error) {
                console.log("ERROR: No se pudo borrar el item.")
            }
            console.log(`Item con id ${id} eliminado.`)
        }
    
        //Setea el archivo vacío. Si no existe, lo crea. 
        async deleteAll() {
            try {
                await Contenedor.fs.promises.writeFile(`./${this.filename}`, JSON.stringify([], null, 2));
            } catch (error) {
                console.log("ERROR: No se pudieron borrar todos los items.")
            }
            console.log("WARNING: Items eliminados con exito.")
        }
    
        //Metodo auxiliar para buscar el maximo id.
        async getMaxId() {
            const items = await this.getAll();
            return Math.max(...items.map(e => e.id));
        }
    }