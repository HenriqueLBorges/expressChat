module.exports.chat = function (app, req, res) {
    var data = req.body;

    req.assert("name", "Name can't be empty").notEmpty();
    req.assert("name", "Name need to have 3-15 characters").len(3, 15);

    var errors = req.validationErrors();

    if (errors) {
        res.render("index.ejs", { errors: errors });
        return;
    }
    app.get("io").emit("newUser", { name: data.name, message: "has entered the chatroom." });

    res.render("chat.ejs", { data: data });
}