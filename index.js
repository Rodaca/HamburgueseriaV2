import express from 'express';
import { MongoClient } from 'mongodb';
import { Router } from 'express';

const app = express();
const port = 3000;

const client = new MongoClient('mongodb+srv://cristian:12345@hamburgueseriacluster0.sj6qm3w.mongodb.net/');
const db = client.db('hamburgueseria');


const path = {
    generalPath:'/api'
}

async function connectdb() {
    try {
        await client.connect();
        console.log('db online');
    } catch (error) {
        console.log(error);
    }
}

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

connectdb();

const router = Router();

app.use(express.json());

// 1 Encontrar todos los ingredientes con stock menor a 400.
app.use(path.generalPath, router.get('/q1', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find({stock: {$lt:400}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 2 Encontrar todas las hamburguesas de la categoría “Vegetariana”
app.use(path.generalPath, router.get('/q2', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({categoria: "Vegetariana"}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 3 Encontrar todos los chefs que se especializan en “Carnes”
app.use(path.generalPath, router.get('/q3', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.find({especialidad: "Carnes"}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 4 Aumentar en 1.5 el precio de todos los ingredientes
app.use(path.generalPath, router.get('/q4', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        await collection.updateMany({},{$mul:{precio: 1.5}});
        res.send('Precio Actualizado');
    } catch (error) {
        console.log(error);
    }
}));

// 5 Encontrar todas las hamburguesas preparadas por “ChefB”
app.use(path.generalPath, router.get('/q5', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({chef: "ChefB"}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 6 Encontrar el nombre y la descripción de todas las categorías
app.use(path.generalPath, router.get('/q6', async (req, res)=>{
    try {
        const collection = db.collection('categorias');
        const result = await collection.find().toArray({});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 7 Eliminar todos los ingredientes que tengan un stock de 0
app.use(path.generalPath, router.get('/q7', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.deleteMany({stock: 0});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 8 Agregar un nuevo ingrediente a la hamburguesa “Clásica” {stock: {$lt:400}}
app.use(path.generalPath, router.get('/q8', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.updateOne({nombre:"Clásica"},{$push:{ingredientes:"pollo"}})
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));
// 9 Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente
app.use(path.generalPath, router.get('/q9', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ingredientes:"Pan integral"}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 10 Cambiar la especialidad del “ChefC” a “Cocina Internacional”
app.use(path.generalPath, router.get('/q10', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.updateOne({nombre:"ChefC"},{$set:{especialidad: "Cocina Internacional"}})
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 11 Encontrar el ingrediente más caro
app.use(path.generalPath, router.get('/q11', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find().sort({precio:-1}).limit(1).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 12 Encontrar las hamburguesas que no contienen “Queso cheddar” como ingrediente
app.use(path.generalPath, router.get('/q12', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ingredientes:{$ne:"Queso cheddar"}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 13 Incrementar el stock de “Pan” en 100 unidades
app.use(path.generalPath, router.get('/q13', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        await collection.updateMany({nombre:"Pan"},{$inc:{stock: 100}});
        res.send('el pan Actualizado');
    } catch (error) {
        console.log(error);
    }
}));

// 14 Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico”
app.use(path.generalPath, router.get('/q14', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find({descripcion:{ $regex:'clásico'}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 15 Listar las hamburguesas cuyo precio es menor o igual a $9
app.use(path.generalPath, router.get('/q15', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({precio: {$lt:10}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 16 Contar cuántos chefs hay en la base de datos
app.use(path.generalPath, router.get('/q16', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.countDocuments();
        res.json("La cantidad de chefs es "+result);
    } catch (error) {
        console.log(error);
    }
}));

// 17 Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción
app.use(path.generalPath, router.get('/q17', async (req, res)=>{
    try {
        const collection = db.collection('categorias');
        const result = await collection.find({descripcion:{ $regex:'gourmet'}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 18 Eliminar las hamburguesas que contienen menos de 5 ingredientes
app.use(path.generalPath, router.get('/q18', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.deleteMany({$expr :{$lt:[{$size:"$ingredientes"},5]}});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 19 Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática”
app.use(path.generalPath, router.get('/q19', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.insertOne({
            nombre: "ChefD",
            especialidad: "Cocina Asiática"
        })
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));
// 20 Listar las hamburguesas en orden ascendente según su precio
app.use(path.generalPath, router.get('/q20', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({precio:-1}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 21 Encontrar todos los ingredientes cuyo precio sea entre $2 y $5
app.use(path.generalPath, router.get('/q21', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find({precio: {$lt:6,$gte:1}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 22 Actualizar la descripción del “Pan” a “Pan fresco y crujiente”
app.use(path.generalPath, router.get('/q22', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.updateOne({nombre:"Pan"},{$set:{descripcion: "Pan fresco y crujiente"}})
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 23 Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes
app.use(path.generalPath, router.get('/q23', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({$or : [{ingredientes: 'Tomate'}, {ingredientes: 'Lechuga'}]}).toArray();        
        res.send(result);

    } catch (error) {
        console.log(error);
    }
}));

// 24 Listar todos los chefs excepto “ChefA”
app.use(path.generalPath, router.get('/q24', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.find({nombre: {$ne: 'ChefA'}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 25 Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet”
app.use(path.generalPath, router.get('/q25', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.updateMany({categoria: 'Gourmet'}, {$inc: {precio: 2}});
        res.send(result);

    } catch (error) {
        console.log(error);
    }
}));

// 26 Listar todos los ingredientes en orden alfabético
app.use(path.generalPath, router.get('/q26', async (req, res)=>{
    try {
        const collection = db.collection('ingredientes');
        const result = await collection.find().sort({nombre: 1}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 27 Encontrar la hamburguesa más cara
app.use(path.generalPath, router.get('/q27', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find().sort({precio: -1}).limit(1).toArray();
        res.send(result);

    } catch (error) {
        console.log(error);
    }
}));

// 28 Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”
app.use(path.generalPath, router.get('/q28', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.updateMany({categoria: 'Clásica'}, {$push: {ingredientes: 'Pepinillos'}});
        res.send(result);

    } catch (error) {
        console.log(error);
    }
}));

// 29 Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana”
app.use(path.generalPath, router.get('/q29', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.deleteMany({especialidad: 'Cocina Vegetariana'});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 30 Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes
app.use(path.generalPath, router.get('/q30', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.find({ingredientes: {$size: 7}}).toArray();
        res.send(result);

    } catch (error) {
        console.log(error);
    }
}));

// 31 Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”
app.use(path.generalPath, router.get('/q31', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $match: { chef: 'ChefC', categoria: 'Gourmet' } },
            { $sort: { precio: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.send(result[0]);

    } catch (error) {
        console.log(error);
    }
}));

// 32 Listar todos los ingredientes junto con el número de hamburguesas que los contienen
app.use(path.generalPath, router.get('/q32', async (req, res)=>{
    try {
        const collection = db.collection('hamburguesas');
        const result = await collection.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$ingredientes', count: { $sum: 1 } } }
        ]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

// 33 Listar los chefs junto con el número de hamburguesas que han preparado
app.use(path.generalPath, router.get('/q33', async (req, res)=>{
    try {
        const collection = db.collection('chefs');
        const result = await collection.aggregate([{$group: {_id: "$chef", cantidad: {$sum: 1}}}]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));
// 34 Encuentra la categoría con la mayor cantidad de hamburguesas
// 35 Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado
// 36 Encontrar todos los ingredientes que no están en ninguna hamburguesa
// 37 Listar todas las hamburguesas con su descripción de categoría
// 38 Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total
// 39 Encontrar el precio promedio de las hamburguesas en cada categoría
// 40Listar los chefs y la hamburguesa más cara que han preparado