
const bcrypt = require('bcrypt')

const getAUser = require('../utils/getAUser')
const { tokenGenerator } = require("../utils/tokens");
const { newUserValidator } = require('../validators/newUserValidator');


module.exports = {
    postUser: async (req, res) => {
        let user = req.body;
        // let salt = await bcrypt.genSalt(8);
        // let hashed_pwd = await bcrypt.hash(user.Password, salt)
        const { pool } = req;
        try {

            let {value} = req;

            let hashed_pwd = await bcrypt.hash(user.Password, 8);


            if (pool.connected) {
                let results = await pool.request()
                    .input("FullName", value.FullName)
                    .input("Address", value.Address)
                    .input("ContactNumber", value.ContactNumber)
                    .input("password", hashed_pwd)
                    .execute("dbo.create_new_member")

                console.log(results);

                results.rowsAffected.length? res.status(201).send({success:true, message: 'saved user'}) 
                                            : res.status(500).send({success:false, message: 'An error ocurred. Try again'})
            }
        } catch (error) {
            res.send(error.message);
        }



        // user.Password;
    },

    loginUser: async (req, res) => {
        let { MemberID, Password } = req.body;
        const { pool } = req;

        try {
            let user = await getAUser(MemberID, pool);
            if (user) {
                let passwords_match = await bcrypt.compare(Password, user.password);

                if (passwords_match) {
                    let token = await tokenGenerator({
                        MemberID: user.MemberID,
                        roles: "admin"
                    })


                    res.json({ success: true, message: "logged in successfully", token })
                } else {
                    res.status(401).json({ success: false, message: "wrong credentials" })
                }

            } else {
                res.status(404).json({ success: false, message: "No user found" })
            }


        } catch (error) {
            console.log(error)
        }

    }
}

