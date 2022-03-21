const jwt = require("jsonwebtoken");


exports.validate = function (access_array) {
    return async (req, res, next) => {
        try {
            if (access_array.length > 0) {
                // console.log(req.headers.jwttoken)
                const access_user = jwt.verify(req.headers.jwttoken, framework.jwtkey);
                console.log(access_user.exp-(Math.round(new Date().getTime()/1000)))
                // console.log(Math.round(new Date().getTime()/1000))
                // console.log(date1.getTime()-date.getTime())
                if (access_array.includes(access_user.role)) {
                    console.log(framework.chalk.green("successfully validate login"));

                    if (
                        Math.round((access_user.exp) - (new Date().getTime() / 1000)) <= 300
                    ) {
                        console.log("------------------------");
                        console.log(framework.chalk.green("jwt token changed"));
                        let jwt_token = jwt.sign({
                                name: access_user.name,
                                role: access_user.role,
                            },
                            framework.jwtkey, {
                                expiresIn: "1h",
                            }
                        );
                        let refreshtoken = jwt.sign({
                                name: access_user.name,
                                role: access_user.role,
                            },
                            framework.jwtkey, {
                                expiresIn: "2h",
                            }
                        );
                        await db.user
                            .update({
                                token: jwt_token,
                                refreshtoken: refreshtoken,
                            }, {
                                where: {
                                    name: access_user.name,
                                    role: access_user.role,
                                },
                            })
                            .then((data) => {
                                console.log(data);
                            });
                    }

                    next();
                } else {
                    res.end("unauthorized user");
                }
            } else {
                console.log("this route don't have an validation");
                next();
            }
        } catch (error) {
            try {
                const refreshtoken_veryfine = jwt.verify(
                    req.headers.refreshtoken,
                    framework.jwtkey
                );
                if (
                    error.message == "jwt expired" &&
                    access_array.includes(refreshtoken_veryfine.role)
                ) {
                    let jwt_token = jwt.sign({
                            name: refreshtoken_veryfine.name,
                            role: refreshtoken_veryfine.role,
                        },
                        framework.jwtkey, {
                            expiresIn: "1h",
                        }
                    );
                    let refreshtoken = jwt.sign({
                            name: refreshtoken_veryfine.name,
                            role: refreshtoken_veryfine.role,
                        },
                        framework.jwtkey, {
                            expiresIn: "2h",
                        }
                    );
                    await db.user
                        .update({
                            token: jwt_token,
                            refreshtoken: refreshtoken,
                        }, {
                            where: {
                                name: refreshtoken_veryfine.name,
                                role: refreshtoken_veryfine.role,
                            },
                        })
                        .then((data) => {
                            console.log(data);
                        });
                    console.log(framework.chalk.green("------------------------"));
                    console.log(
                        framework.chalk.green("changed the token and refresh token")
                    );
                    res.end("token has been changed");
                } else {
                    res.send(message.error);
                }
            } catch (error) {
                console.error("$%%%$%E%%^%^%^%^%^%^%^%^%^%^%^%^%^%^")
                console.log(framework.chalk.red(error.message));
                res.send("login again")
            }
            
        }
    };
};









