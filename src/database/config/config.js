module.exports = {
  development: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_dbName,
    host: process.env.db_host || 5432,
    dialect: process.env.db_dialect || "postgresql"
  }
}
