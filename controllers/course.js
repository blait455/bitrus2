exports.store = (req, res) => {
    const {title, description}  = req.body;

    let emailQuery = "SELECT title FROM `courses` WHERE title = '" + title + "'";

    db.query(emailQuery, async (error, results) => {
        if (error) {
            // return res.status(500).send(err);
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('courses/index', {
                message: 'Course already exists'
            });
        }

        let query = 'INSERT INTO courses SET ?';
        let data = {title: title, description: description};
        db.query(query, data, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('courses/index', {
                    message: 'Course saved successfully',
                });
            }
        });
    });
}

exports.update = (req, res) => {
    let courseId = req.params.id;
    let title = req.body.title;
    let description = req.body.description;

    let query = "UPDATE `courses` SET `title` = '" + title + "', `description` = '" + description + "' WHERE `courses`.`id` = '" + courseId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/courses');
    });
}

exports.delete = (req, res) => {
    let courseId = req.params.id;
    console.log(courseId);
    // let deleteUserQuery = 'DELETE FROM courses WHERE id = "' + courseId + '"';

    // db.query(deleteUserQuery, (err, result) => {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }
    //     res.redirect('/courses');
    // });
}