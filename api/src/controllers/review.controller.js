const Review = require('../models/Review.js')

const User = require('../models/User.js')

const Product = require('../models/Product.js')


const createReview = async (req, res) => {

    const user = await User.findOne({ _id: req.userId })

    const { id_product, review, date, rating } = req.body;

    if (user) {

        try {
            let addReview = await Review.create({
                user: user._id,
                review,
                date,
                id_product,
                rating
            })

            let product = await Product.findOne({ id_edit: id_product })

            product.reviews.push(addReview._id)
            await product.save()

            let newReview = await addReview.populate("user", {
                image: 1,
                firstname: 1,
                lastname: 1,
                rol: 1
            })
            console.log("review", newReview)
            res.status(201).json({ message: 'Review Publicada.', newReview })

        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const deleteReview = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id, id_product } = req.params;

    if (userIsRegistered) {
        try {
            await Review.findOneAndDelete({ _id: id })

            let product = await Product.findOne({ id_edit: id_product });

            product.reviews = product.reviews.filter(e => e.toString() !== id);

            await product.save()

            res.status(201).json({ message: 'Review Eliminada.' })
        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}

const updateReview = async (req, res) => {

    const userIsRegistered = await User.findOne({ _id: req.userId })

    const { id, review, date } = req.body;


    if (userIsRegistered) {
        try {
            let aux = await Review.findOne({ _id: id });

            aux.date = date
            aux.review = review

            await aux.save()

            res.status(201).json({ message: 'Review Actualizada.', aux })
        } catch (error) {
            res.status(201).send('Hubo un error, intente mas tarde.')
        }
    } else {
        res.status(401).send('Hubo un error, intente mas tarde.')
    }
}



module.exports = {
    createReview,
    deleteReview,
    updateReview,
}