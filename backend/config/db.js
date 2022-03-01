const mongoose = require('mongoose');

module.exports = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
        console.log(`Database connected (${conn.connection.name}): ${conn.connection.host}`)
		return conn.connection.db;
	} catch (err) {
		console.log(`Error: ${err.message}`);
		throw new Error('Database not Connected');
	}
};
