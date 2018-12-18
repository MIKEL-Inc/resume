import person from './person';
// const users = require('./user')
// const photos = require('./photos')

export default (app: any) => {
  app.use('/person', person);
  // app.use('/users', users)
  // app.use('/photos', photos)
  // etc..
};
