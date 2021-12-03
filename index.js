const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Pizza",
      level: "Easy Peasy",
      ingredients: ["flour", "tomatoes", "mozzarella", "ham"],
      cuisine: "Italy",
      dishType: "main_course",
      image: "https://www.google.com/search?q=pizza&rlz=1C1CHBF_esES902ES902&sxsrf=ALeKk03SvldBXz-kpUyRjlOGGLe1wQ8RzQ:1618492329901&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiNv5TjqYDwAhVC6uAKHc4hBjIQ_AUoAnoECAIQBA&biw=1536&bih=722#imgrc=OHCj3BQ07nlg4M",
      duration: 20,
      creator: "Tupac",
    })
  })
  .then(()=>{
    return Recipe.insertMany(data);
  })
  .then(()=>{
    return Recipe.findOneAndUpdate(
      {title:'Carrot Cake'},
      {duration: 90},
      {new:true, useFindAndModify: false},
      console.log('Duration modified.'))
  })
  .then(()=>{
    return Recipe.deleteOne(
      {title: 'Asian Glazed Chicken Thighs'},
      console.log(`Recipe deleted.`)
    )
  })
  .then(()=>{
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
