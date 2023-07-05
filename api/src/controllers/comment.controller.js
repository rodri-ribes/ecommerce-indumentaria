const Comment = require('../models/Comment.js')

const User = require('../models/User.js')

const Product = require('../models/Product.js')


const createComment = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { user, id_product, comment, date } = req.body;

    if (userIsRegistered) {

        try {
            let addComment = await Comment.create({
                user,
                comment,
                date,
                id_product
            })

            let product = await Product.findOne({ id_edit: id_product })

            product.comments.push(addComment._id)
            await product.save()

            let newComment = await addComment.populate("user", {
                image: 1,
                firstname: 1,
                lastname: 1,
                rol: 1
            })

            res.status(201).json({ message: 'Comentario Publicado.', newComment })

        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const deleteComment = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id, id_product } = req.params;

    if (userIsRegistered) {
        try {
            await Comment.findOneAndDelete({ _id: id })

            let product = await Product.findOne({ id_edit: id_product });

            let aux = product.comments.filter(e => e.toString() !== id);

            product.comments = [...aux];

            await product.save()

            res.status(201).json({ message: 'Comentario Eliminado.' })
        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const updateComment = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id, comment, date } = req.body;

    console.log("info", id, comment, date)

    if (userIsRegistered) {
        try {
            let aux = await Comment.findOne({ _id: id });

            aux.date = date
            aux.comment = comment

            await aux.save()

            res.status(201).json({ message: 'Comentario Actualizado.', aux })
        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const responseComment = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id, firstname, comment, date } = req.body;

    if (userIsRegistered) {
        try {
            let updateComment = await Comment.findOneAndUpdate({ _id: id }, {
                response: {
                    firstname,
                    comment,
                    date
                }
            }).populate("user", {
                image: 1,
                firstname: 1,
                lastname: 1,
                rol: 1
            })

            updateComment.response = { firstname, comment, date }

            res.status(201).json({ message: 'Respuesta publicada.', updateComment })
        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const deleteResponse = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id } = req.params;

    if (userIsRegistered) {
        try {
            await Comment.findByIdAndUpdate({ _id: id }, {
                response: false
            })
            res.status(201).send('Respuesta Eliminada.')
        } catch (error) {
            console.log(error)
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}




module.exports = {
    createComment,
    deleteComment,
    updateComment,
    responseComment,
    deleteResponse
}