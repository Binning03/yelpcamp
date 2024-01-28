const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
			description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dol',
			price: Math.floor(Math.random()*20) + 10,
			author: '65ad1e8bfaeafb01e2a8a4e1',
			geometry: {
				type : "Point", 
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [ 
				{ url : "https://res.cloudinary.com/dpe9li7yc/image/upload/v1706011272/YelpCamp/fgpijohfex6eui0xmoud.png", 
				 filename : "YelpCamp/fgpijohfex6eui0xmoud"
 				}, 
				{ url : "https://res.cloudinary.com/dpe9li7yc/image/upload/v1706011272/YelpCamp/pmcfxovqmobw7iqc4vvp.png", 
				 filename : "YelpCamp/pmcfxovqmobw7iqc4vvp" } 
			]
        })
        await camp.save();
    }
}

seedDB().then(() => {
	mongoose.connection.close();
})