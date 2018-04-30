# ecommerceapp - Bazaar
------------------------
ECommerceApp using MEN Stack (MongoDB, Express and Node.js)
This project is done as part of Web Programming Languages coursework.

TEAM MEMBERS
-------------
Leejia James
Preeti Duraipandian
Priyankaben Popatbhai Patel
Himali Shelat

DESCRIPTION
------------
Bazaar is an E-commerce site developed for online clothes shopping. The site includes sections for men, women and kids. In each section there are categories for formals and casuals. For kids, sections include for girls and boys. The stack used in the development of this website is - MEN stack - MongoDB, Express and Node.js. The development work for this site is carried out through different routes namely admin, user, product, cart, reviews, purchases and categories. The major functionalities of the site include user signup; register a new user to the system, user login, listing available products in the system, search and filtering of products, paging functionality while listing products, add products to cart, checkout and display history of purchases. Apart from these, admin users are capable of the functionalities - list all products, add a new product, delete a product and update a product. As an additional feature, we have implemented review for products. For each product, reviews from different users are displayed. Only registered users can add a review for a product. Users can delete their own reviews.

DATABASE DESIGN
----------------
We used MongoDB for database component. The data model information is given below.
db - ecomm
collections - users, sections, categories, products, carts, reviews, purchases

LANGUAGES/FRAMEWORKS USED FOR IMPLEMENTATION
----------------------------------------------
We built the site using MEN stack (MongoDB, Express and Node.js)
Front-end
----------
● ejs
● CSS
● Javascript
● jQuery
● Bootstrap
Back-end
---------
● express
● node
● mongoDB
● mongoose
● crypto
● passport
● passport-local
● express-session
● method-override
● moment
● cloudinary
● connect-flash
Platforms
----------
● Cloudinary

How to run
-----------
1.	Download the project, unzip and keep it in a folder
2.	Install mongodb. Execute below:
	   a.	mongod.exe
	   b.	mongo.exe
3.  Port (3000) is mentioned in app.js file, change it if another port is to be used
	app.listen(3000,process.env.IP,function(){
	   console.log("Bazaar server has started!"); 
	});
4.	In command line, cd to the project root directory
	Execute below commands:
	a.	npm install 
		(Now change scripts part in package.json to include below line:
		  "scripts": {
		    "start": "node app.js",
		    ...
		  },
		)
	b.	npm start
5.	Now open browser and access the page - http://localhost:3000/
6.	In mongo.exe command line type following sample commands to see the dbs, collections and particular collection
	a.	show dbs // view all databases
	b.	use ecomm // switch to a particular db (here ecomm)
	c.	show collections // view all collections
	d.	db.products.find() // view all documents in a particular collection (here products)
  
  
