const Customer = require('../models/Customer.js')
const User = require('../models/User.js')
const Product = require('../models/Product.js')

const addCustomer = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { user, total, shippingWay, paymentMethod, products, status, date, chat } = req.body;

    if (userIsRegistered) {

        //funcion para mandar mensajes al usuario (falta de productos para la compra)
        const sendMessage = async (msj, id) => {
            try {
                let customer = await Customer.findOne({ _id: id })
                customer.chat.push(msj)
                customer.save()
            } catch (error) {
                console.log(error)
            }
        }

        try {
            //se guarda la compra
            let newCustomer = await Customer.create({
                user,
                products,
                paymentMethod,
                date,
                shippingWay,
                total,
                chat,
                status
            })

            //se borra el carrito
            userIsRegistered.cart = []

            //se añade la compra de los productos al arr de shopping
            products.forEach(e => {
                userIsRegistered.shopping.push(e.id)
            });

            //se edita el producto (incrementar los vendidos, descontar el stock)
            products.map(async e => {
                let product = await Product.findById({ _id: e.id });

                //sumamos dependiendo la cantidad vendida a sold
                product.sold += parseInt(e.cant * 1)

                // descontamos la cantidad vendida y el color

                product?.talleAndStock?.forEach(f => {
                    if (f.talle == e.talle) {
                        f?.listado?.forEach(l => {
                            if (e.color == l.color) {

                                if (parseInt(l.stock) == 0) {

                                    sendMessage(
                                        {
                                            usuario: "Admin",
                                            text: `El producto ${e.title}, talle ${e.talle} en color ${l.color} no se encuentra disponible, se te devolvera el dinero de ese producto.`
                                        }, newCustomer._id)
                                }

                                if (parseInt(l.stock) < parseInt(e.cant)) {

                                    sendMessage(
                                        {
                                            usuario: "Admin",
                                            text: `El producto ${e.title}, talle ${e.talle} en color ${l.color} solo nos quedo ${l.stock} disponible, avisanos lo ante posible si desea ${l.stock} o le devolvemos el dinero.`
                                        }, newCustomer._id)

                                } else {
                                    l.stock = l.stock - e.cant
                                }
                            }
                        })

                        //si nos quedamos sin stock, quitamos el obj
                        let aux = f.listado.filter(x => x.stock !== 0)
                        f.listado = aux
                    }
                })

                //si el listado de un talle determinado se vacia, quitamos el talle

                let arr = product.talleAndStock.filter(a => a?.listado?.length !== 0)
                product.talleAndStock = arr

                //si se vacia todo el stock, ocultamos el producto.

                if (product.talleAndStock.length < 1) {
                    product.show = false;
                }

                //guardamos el producto modificado.
                await product.save()
            })

            await userIsRegistered.save();

            res.status(201).send('¡ Gracias por tu Compra !')
        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const getCustomers = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    // const { id } = req.params;

    if (userIsRegistered) {
        try {
            let customers = await Customer.find({}).populate("user").populate("products")
            res.status(201).json(customers)
        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const getCustomer = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id } = req.params;

    if (userIsRegistered) {
        try {
            let customer = await Customer.find({ user: id }).populate("user").populate("products")
            res.status(201).json(customer)
        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}


const addMessage = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { msj, id } = req.body;

    if (userIsRegistered) {
        try {

            let customer = await Customer.findOne({ _id: id });

            customer.chat.push(msj)
            await customer.save()

            let customerAux = await customer.populate("user")

            res.status(201).json(customerAux)

        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}


const addStatus = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { status, id } = req.body;

    if (userIsRegistered) {
        try {
            let customer = await Customer.findOne({ _id: id });

            customer.status = status;

            await customer.save()

            let customerAux = await customer.populate("user")

            res.status(201).json({ message: "Estado Actualizado", data: customerAux })

        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}


const deleteCustomer = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id } = req.params;

    if (userIsRegistered) {
        try {
            let customer = await Customer.findOne({ _id: id });


            //quitamos los productos comprados del arr del user
            customer?.products?.forEach(e => {
                userIsRegistered.shopping = userIsRegistered.shopping.filter(f => f.toString() !== e._id.toString())
            });

            //se edita el producto (agregamos la cantidad q restamos, y si no existe le obj del talle se crea.)

            customer?.products?.forEach(async e => {

                let product = await Product.findById({ _id: e.id });

                //restamos dependiendo la cantidad vendida a sold
                product.sold -= parseInt(e.cant)

                // devolvemos la cantidad restada

                let existeElTalle = true;

                product?.talleAndStock?.forEach(f => {
                    if (f.talle == e.talle) {
                        existeElTalle = false
                        f?.listado?.forEach(l => {
                            if (e.color == l.color) {
                                l.stock += e.cant
                            } else {
                                f?.listado?.push({
                                    color: e.color,
                                    stock: e.cant
                                })
                            }
                        })
                        //si nos quedamos sin stock, quitamos el obj
                        let aux = f.listado.filter(x => x.stock !== 0)
                        f.listado = aux
                    }
                })

                //si existeElTalle es false, significa que encontro el talle y se sumo el stock, 
                //si es true significa que fue el ultimo vendido y se borro el talle

                if (existeElTalle) {
                    let obj = {
                        talle: e.talle,
                        listado: [
                            {
                                color: e.color,
                                stock: e.cant
                            }
                        ]
                    }

                    product.talleAndStock.push(obj)
                }

                //guardamos el producto modificado.
                await product.save()
            })

            await userIsRegistered.save();
            await Customer.findOneAndDelete({ _id: id });

            res.status(201).json({ message: "Venta Eliminada" })

        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}



module.exports = {
    addCustomer,
    addMessage,
    getCustomer,
    getCustomers,
    addStatus,
    deleteCustomer
}