/**
 *function for routing the middlewares on the route path
 *@param app
 *@param middlewares
 */

exports.route = function(app, middlewares) {
	app.get('/', middlewares.index);
	app.get('/users', middlewares.findAllUsers);
	app.post('/user', middlewares.addUser);
	app.post('/forgotpassword', middlewares.forgotPassword);
	app.post('/pic', middlewares.verifyToken, middlewares.uploadPic);
	app.post('/login', middlewares.login);
	app.delete('/user/:id', middlewares.removeUser);
	app.put('/user/:id', middlewares.updateUser);
	app.get('/pics', middlewares.verifyToken, middlewares.viewPics);
};
