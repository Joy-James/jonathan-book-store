const mssql = require('mssql');
const config = require("../config/config")


module.exports = {
    getAllBooks: async (req, res) => {


        try {
            let user = req.user;
            console.log(user);
            let sql = await mssql.connect(config);
            let results = await sql.request()
                .execute("get_all_available_books");
            // res.json({
            //     success: true,
            //     message: "returned all books",
            //     results: results.recordset
            // })
            res.send("You will find books here sometime")



        } catch (error) {
            console.log(error.message);

            if (error.message.includes('token') || error.message.includes('invalid')) {
                res.status(403).json({
                    success: false,
                    message: 'Log in again'
                })
            }

        }

    }
}