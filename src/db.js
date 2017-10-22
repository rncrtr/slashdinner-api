import mongoose from 'mongoose';

export default callback => {
  //let db = mongoose.connect('mongodb://localhost:27017/slashdinner-api',{useMongoClient: true});
  let db = mongoose.connect('mongodb://rncrtr:Zl8tT13veS5l@ds227555.mlab.com:27555/slashdinner',{useMongoClient: true});
  
  callback(db);
}
