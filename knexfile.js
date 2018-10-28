module.exports = {
	development: {
		client: `pg`,
		connection: `postgres://localhost/thriftstore`
	},
	test: {
		client: `pg`,
		connection: `postgres://localhost/thriftstore`
	},
	production: {
		client: `pg`,
		connection: process.env.DATABASE_URL
	}
}
