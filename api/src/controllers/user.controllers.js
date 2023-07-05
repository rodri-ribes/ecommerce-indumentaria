const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')


const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        if (email && password) {

            let user = await User.findOne({
                email: email
            })

            if (user) {

                const pass = await bcrypt.compare(password, user.password)

                if (pass) {

                    const token = jwt.sign({ _id: user.id }, 'secretKey')

                    res.json({
                        _id: user._id,
                        token: token
                    })

                } else {
                    res.status(401).send(`Email o contraseña incorrectos`)
                }
            } else {
                res.status(401).send(`Email o contraseña incorrectos`)
            }
        }
    } catch (error) {
        console.log(error)
    }

}


const createUser = async (req, res) => {

    const { firstname, lastname, image, email, password, whatsapp } = req.body;

    try {
        let existEmail = await User.findOne({
            email,
        })

        if (existEmail) {

            return res.status(401).json({
                email: existEmail ? "El Email ya se encuentra registrado" : null,
            });

        } else {
            let passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstname,
                lastname,
                email,
                whatsapp,
                image,
                password: passwordHash,
            })
            await newUser.save()
            const token = jwt.sign({ _id: newUser.id }, 'secretKey')

            res.status(200).json({
                _id: newUser._id,
                token: token
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getUser = async (req, res) => {

    const user = await User.findOne({ _id: req.userId }).select({
        password: 0
    }).populate("cart").populate("favorites")

    if (user) {

        res.status(201).json(user)

    } else {
        res.status(401).send('Unauthorized Access.')
    }
}




const updateUser = async (req, res) => {

    const user = await User.findOne({ _id: req.userId })

    const { firstname, lastname, image, imageName, email, whatsapp, favorite, ban, domicilio } = req.body

    if (user) {
        if (favorite) {
            let remove = false;

            if (user.favorites.includes(favorite)) {
                remove = true;
                let arr = user.favorites.filter(f => f.toString() !== favorite.toString())
                user.favorites = [...arr];
            } else {
                user.favorites.push(favorite)
            }

            await user.save();

            let userFav = await User.findOne({ _id: req.userId }).populate("favorites").populate("cart")


            res.status(201).json({ message: remove ? 'Eliminado de Favoritos' : "Agregado a Favoritos", userFav })
        } else {
            try {
                let userUpdate = await User.findOneAndUpdate({ _id: req.userId }, {
                    firstname,
                    lastname,
                    whatsapp,
                    email,
                    domicilio,
                    ban,
                    image,
                    imageName
                }).populate("favorites").populate("cart")

                //se hace esto para mandar como respuesta el obj user modificado
                userUpdate.firstname = firstname ? firstname : userUpdate.firstname
                userUpdate.lastname = lastname ? lastname : userUpdate.lastname
                userUpdate.whatsapp = whatsapp ? whatsapp : userUpdate.whatsapp
                userUpdate.email = email ? email : userUpdate.email
                userUpdate.domicilio = domicilio ? domicilio : userUpdate.domicilio
                userUpdate.image = image ? image : userUpdate.image
                userUpdate.imageName = imageName ? imageName : userUpdate.imageName

                res.status(201).json({ message: 'Perfil Actualizado', userUpdate })

            } catch (error) {
                res.status(404).send('Hubo un error, intente mas tarde...')
            }
        }
    } else {
        res.status(401).send('Unauthorized Access.')
    }
}


const updatePassword = async (req, res) => {

    const user = await User.findOne({ _id: req.userId })

    let { oldPassword, newPassword } = req.body;

    if (user) {
        let okey = await bcrypt.compare(oldPassword, user.password)

        if (okey) {

            let passwordHash = await bcrypt.hash(newPassword, 10);

            try {
                user.password = passwordHash;
                await user.save();

                res.status(202).send('Contraseña Actualizada')

            } catch (error) {
                res.status(404).send('Hubo un error, intente mas tarde...')
            }
        } else {
            res.status(404).send('Contraseña Incorrecta')
        }
    } else {
        res.status(401).send('Unauthorized Access.')
    }
}

const updateCart = async (req, res) => {

    const user = await User.findOne({ _id: req.userId })

    const { product } = req.body;

    if (user) {

        if (user.cart.includes(product)) {
            let aux = user.cart.filter(p => p.toString() !== product)
            user.cart = [...aux]
        } else {
            user.cart.push(product)
        }

        await user.save()

        let updateUser = await User.findOne({ _id: req.userId }).populate("favorites").populate("cart")

        res.status(201).json(updateUser)

    } else {
        res.status(401).send('Unauthorized Access.')
    }
}


module.exports = {
    loginUser,
    createUser,
    getUser,
    updateUser,
    updateCart,
    // deleteCart,
    updatePassword
}