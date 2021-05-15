var Userdb = require('../model/model');


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Context can not be blank" });
        return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({

                message: err.message || "Some thing went wrong try again"
            });
        });
}


exports.find = (req, res) => {
    Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error Occured while retriving user information" })


        })
}


exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to Update can not be blank" })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update user with ${id}.Maybe user not found`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Updating user information" })

        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Delete user with ${id}.Maybe user not found`
                })
            } else {
                res.send({ message: "User was deleted successfully" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete user with id=" + id });

        });

}