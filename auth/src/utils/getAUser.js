
async function getAUser(user_id, pool){
    // const pool = app.locals.pool;
            if (pool.connected) {
                let results = await pool.request()
                    .input("MemberID", user_id)
                    .execute("dbo.get_member_byID");
                let user = results.recordset[0]

                return user
            }
}

module.exports = getAUser;