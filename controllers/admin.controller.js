const { ProductModel } = require('../models/index.model');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	let body = req.body;
	const product = new ProductModel({
		title: body.title,
		price: body.price,
		description: body.description,
		imageUrl: body.imageUrl,
		userId: req.user,
	});
	product
		.save()
		.then((result) => {
			// console.log(result);
			console.log('Created Product');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	ProductModel.findById(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}

			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;

	ProductModel.findById(prodId)
		.then((product) => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.imageUrl = updatedImageUrl;
			product.description = updatedDesc;
			return product.save();
		})
		.then((result) => {
			console.log('UPDATE PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
	ProductModel.find()
		// .select('title price -_id')
		// .populate('userId', 'name')
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	ProductModel.findByIdAndRemove(prodId)
		.then(() => {
			console.log('DESTROYED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};
