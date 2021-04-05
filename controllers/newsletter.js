exports.store = (req, res) => {
    const email  = req.body.email;

    let query = 'INSERT INTO newsletter SET ?'
    let data = {email:email};
    db.query(query, data, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            return res.render('index', {
                message: 'You have successfully subscribed to our newsletter'
            });
        }
    });
}