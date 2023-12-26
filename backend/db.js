const mongoose = require('mongoose');

const mongo_uri = 'mongodb+srv://arthgupta902:0m0zqBNczpWiXbOU@cluster0.lrubjrl.mongodb.net/gofoodmern';

const mongodb = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log('Database Connected Successfully');

    // Access the "food_items" collection
    const food_items = mongoose.connection.db.collection('food_items');
    const data = await food_items.find({}).toArray();
    global.food_items = data;

    // Access food category
    const foodCategory = mongoose.connection.db.collection('foodCategory');
    const catData = await foodCategory.find({}).toArray();
    global.foodCategory = catData;

  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    // Close the database connection
    // await mongoose.connection.close();
  }
};

module.exports = mongodb;
