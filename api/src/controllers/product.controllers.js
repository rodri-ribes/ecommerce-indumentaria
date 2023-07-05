const Comment = require('../models/Comment.js')
const Product = require('../models/Product.js')
const Review = require('../models/Review.js')

const User = require('../models/User.js')


const createProduct = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id_edit, title, content, image, imageName, price, category, brand, talleAndStock } = req.body

    if (userIsRegistered) {
        try {
            const product = new Product({
                id_edit,
                title,
                content,
                image,
                imageName,
                price,
                category,
                brand,
                talleAndStock
            })

            await product.save();

            res.status(201).json({ message: 'Producto Publicado.', data: product })
        } catch (error) {
            res.status(201).json({ message: 'Hubo un error, intente mas tarde.' })
        }
    } else {
        res.status(401).send('Hubo un error ,intente mas tarde')
    }
}

const removeProduct = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id_edit } = req.params

    if (userIsRegistered) {

        try {
            await Product.deleteOne({ id_edit })
            res.status(201).send('Producto Eliminado...')
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde...')
    }
}

const updateProduct = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id_edit, title, show, content, image, imageName, price, category, talleAndStock } = req.body

    if (userIsRegistered) {

        try {
            await Product.findOneAndUpdate({ id_edit }, {
                title,
                content,
                image,
                show,
                imageName,
                price,
                category,
                talleAndStock,
            })

            let product = await Product.findOne({ id_edit }).populate("comments").populate("reviews");

            res.status(201).json({ message: 'Producto Actualizado', product })

        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde...')
    }
}

const discountProduct = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id_edit, discount, oferta } = req.body

    if (userIsRegistered) {

        try {
            let product = await Product.findOneAndUpdate({ id_edit }, {
                discount, oferta
            })
            res.status(201).send('Producto Actualizado...')

        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde...')
    }
}

const updateAll = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const number = req.body.number

    if (userIsRegistered) {
        try {
            let productos = await Product.find({})
            if (number <= 100) {
                productos.forEach(async p => {
                    let aux = 0
                    aux = p.price * number + p.price
                    await Product.findByIdAndUpdate({ _id: p._id }, {
                        price: aux,
                    })
                })
            } else {
                productos.forEach(async p => {
                    let aux = 0
                    aux = p.price + number
                    await Product.findByIdAndUpdate({ _id: p._id }, {
                        price: aux,
                    })
                })
            }

            res.status(201).send('Producto Actualizado...')
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde...')
    }
}

const getProduct = async (req, res) => {

    const { id_edit } = req.params

    let product = await Product.findOne({ id_edit }).populate("comments").populate("reviews")

    let comments = await Comment.find({ id_product: id_edit }).populate("user", {
        image: 1,
        firstname: 1,
        lastname: 1,
        rol: 1
    });

    let reviews = await Review.find({ id_product: id_edit }).populate("user", {
        image: 1,
        firstname: 1,
        lastname: 1,
        rol: 1
    });

    product.comments = comments;
    product.reviews = reviews;

    res.status(201).json(product)

}


const getProducts = async (req, res) => {

    let products = await Product.find({}).populate("comments").populate("reviews")
    res.status(201).json(products)

}


module.exports = {
    createProduct,
    removeProduct,
    updateProduct,
    updateAll,
    discountProduct,
    getProduct,
    getProducts,
}