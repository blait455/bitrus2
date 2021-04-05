exports.store = (req, res) => {
    const {name, email, phone, reason}  = req.body;

    let query = 'INSERT INTO contacts SET ?'
    let data = {name: name, email:email, phone: phone, reason: reason};
    db.query(query, data, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            return res.render('contact', {
                message: 'Message sent successfully'
            });
        }
    });
}