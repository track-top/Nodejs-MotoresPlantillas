const { sessionMidleware, isAuthMiddleware } = require('./is-auth.middleware');

module.exports = {
	sessionMidleware,
	isAuthMiddleware,
	csrfTokenMiddleware: require('./csrfToken.middleware'),
	errorMiddleware: require('./error.middleware'),
	fileMiddleware: require('./file.middleware'),
};
