import mongoose from 'mongoose';
import { MONGO_URI, ENV } from '../config';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});
mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

if (ENV === 'dev') {
  mongoose.set('debug', true);
}

/**
 * Mongoose connection function
 * @returns {Object}
 */
export const mongooseConnect = () => {
  mongoose.connect(MONGO_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

export default mongooseConnect;
