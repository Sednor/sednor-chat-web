module.exports = {
  mode: 'local',
  host: 'localhost',
  port: 3001,
  proxy: 'http://localhost',
  root: __dirname,
  entry: `${__dirname}/src`,
  dest: `${__dirname}/public`,
  publicPath: '/'
};
