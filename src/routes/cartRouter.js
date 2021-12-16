import express from 'express';
import Cart from '../class/cart.js';
import bodyParser from 'body-parser';
import upload from '../services/upload.js';
const router =express.Router();

const carrito =new Cart();
/*Aqui profe trate de configurar todo para que me enviara datos sin necesidad de que fueran archivos
busque y me salia que la configuracion de body-parse era necesaria, pero no hizo efecto en mi correccion, body venia como null.
Entonces utilice mi upload, pero sin envio de nada, fue lo que puede configurar para que tomara los datos de body. */
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

/*GET---> trae carrito por su id*/
router.get('/:cid',(req,res)=>{
    let id= parseInt(req.params.cid);
    carrito.getId(id).then(result =>{
        if (result.statuss==='success') {
            res.status(200).send(result.playload);  
        }else{
            res.status(404).send(result.message);
        }
    })
});

/*POST---> creo carrito y devuelvo id*/
router.post('/',upload.none(),(req, res)=>{
    let product = req.body;
    carrito.postCart(product).then(result=>{
        res.send(result);
        if (result.status=== 'success') {
            console.log(result.message)
        }else{
            res.status(404).send(result.message);
        }
    })
});

/*POST---> agrego producto a carrito existente*/
router.post('/:cid',upload.none(),(req, res)=>{
    let productId=req.body.id;
    let id= parseInt(req.params.cid);
    carrito.postCartId(id,productId).then(result=>{
        if (result.status=== 'success') {
            res.send(result.message)
        }else{
            res.status(404).send(result.message);
        }
    })
});
/*DELETE*/
/*Cancelo toda la compra----> eliminando el carrito por completo*/
router.delete('/:cid',(req, res)=>{
    let id= parseInt(req.params.cid)
    carrito.deleteCartById(id).then(result=>{
        if (result.status==='success'){
            res.send(result.message)
        }else{
            res.status(404).send(result.message);
        }
    })
});
/*DELETE---->Elimino solo un producto del carrito */
router.delete('/:cid/products/:pid',(req, res)=>{
    let idP= parseInt(req.params.pid);
    let idC= parseInt(req.params.cid)
    carrito.deleteProductById(idC,idP).then(result=>{
        if (result.status== 'success'){
            res.send(result.message)
        }else{
            res.status(404).send(result.message);
        }
    })
})


export default router;