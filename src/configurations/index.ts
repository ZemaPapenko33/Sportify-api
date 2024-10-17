export default () => ({
  port: process.env.PORT,
  DB_type: process.env.DB_TYPE,
  DB_host: process.env.DB_HOST,
  DB_port: process.env.DB_PORT,
  DB_username: process.env.DB_USERNAME,
  DB_password: process.env.DB_PASSWORD,
  DB_database: process.env.DB_DATABASE,
});
