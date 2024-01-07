const router = require("express").Router();
const mainCon = require("../controller/mainController");
const authController = require("../controller/authController");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/foods'); // Set your destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
//Login and Register Route
router.get('/showLogin', authController.showLogin);
router.post('/login', authController.login);
router.get('/showRegister', authController.showRegister);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
// landing page
router.get('/home', mainCon.isAuthenticated, mainCon.getHome);
router.get('/admin/dashboard', mainCon.isAuthenticated, mainCon.getDash);
//Admin Side

// Profile Route
router.get('/admin/profile', mainCon.isAuthenticated, mainCon.getProfile);
// Profile Route
router.get('/customer/profile', mainCon.isAuthenticated, mainCon.custProfile);


//Menu
router.get('/admin/menu',mainCon.isAuthenticated,mainCon.getMenu);
router.get('/admin/addMenu',mainCon.isAuthenticated,mainCon.getAddMenu);
router.post('/admin/addMenu/add',upload.single('menu_image'),mainCon.isAuthenticated,mainCon.addMenu);
router.get('/admin/edit/:id', mainCon.isAuthenticated, mainCon.getEditMenu);
router.post('/admin/updateMenu/:id', upload.single('menu_image'), mainCon.isAuthenticated, mainCon.updateMenu);
router.post('/admin/menu/delete/:id',mainCon.isAuthenticated,mainCon.deleteMenu);
//Category
router.get('/admin/category',mainCon.isAuthenticated,mainCon.getCategory);
router.get('/admin/addCategory',mainCon.isAuthenticated,mainCon.getAddCategory);
router.post('/admin/addCategory/add',mainCon.isAuthenticated,mainCon.addCategory);
router.get('/admin/editCategory/:id',mainCon.isAuthenticated,mainCon.editCategory);
router.post('/admin/updateCategory/:id',mainCon.isAuthenticated,mainCon.updateCategory);
router.post('/admin/category/delete/:id',mainCon.isAuthenticated,mainCon.deleteCategory);
// Admin - customers
router.get('/admin/customer',mainCon.isAuthenticated,mainCon.getCustomerTable);

// Orders
router.get('/admin/order',mainCon.isAuthenticated,mainCon.getAdminOrders);
router.post('/admin/updateStatus/:id',mainCon.isAuthenticated,mainCon.statusUpdate);
// Report Generation




//Customer Side
// Update the route to call the getCart function
router.get('/customer/cart', mainCon.isAuthenticated, mainCon.getCart);
router.get('/customer/order_history',mainCon.isAuthenticated,mainCon.getOrderHistory);
router.get('/customer/dashboard', mainCon.isAuthenticated, mainCon.getMenuForCustomer);
// Add the following route to handle adding items to the cart
router.post('/addToCart', mainCon.isAuthenticated, mainCon.addToCart);
// Add the following route to handle checkout
router.post('/customer/checkout', mainCon.isAuthenticated, mainCon.checkout);

<<<<<<< HEAD
=======
//Delete Cart
router.post('/deleteCartItem/:id', mainCon.isAuthenticated, mainCon.deleteCartItem);
>>>>>>> 80b3c8c5cd2ca994fb477ce6dcfd6e5133e73ee8

// Welcome Route
router.get('/',mainCon.getIndex);
router.get('/logout',mainCon.logout);
module.exports = router;