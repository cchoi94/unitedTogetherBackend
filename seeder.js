const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Community = require('./models/Community');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read Json files
const Communities = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/communities.json`, 'utf-8')
);
// const Courses = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Community.create(Communities);
    // await Course.create(Courses);
    console.log('Data Imported...'.green.inverse);
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Community.deleteMany();
    // await Course.deleteMany();
    console.log('Data Destoryed...'.red.inverse);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
