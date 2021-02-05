import express from 'express';
import multer from 'multer';
import path from 'path';
import { types } from 'util';
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
			//null in cb rep error. {path.extname(file.originalname)} is to get the file extension
		);
	},
});

/* const upload = multer({storage}) ...
 This enough can upload the file but the bad thing is it
 will accept all the file types, so we need to cj=heck the file types as below. */

// function checkFileType(file, cb) {
// 	const fileTypes = /jpg|jpeg|png/;
// 	const extensionName = fileTypes.test(
// 		path.extname(file.originalname).toLowerCase()
// 	);

// 	const mimetype = fileTypes.test(file.mimetype);

// 	if (extensionName && mimetype) {
// 		return cb(null, true);
// 	} else {
// 		cb('Images only');
// 	}
// }

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error("I don't have a clue!"));
	}
}
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`);
});

// router.post('/', function (req, res) {
// 	upload(req, res, function (err) {
// 		if (err instanceof multer.MulterError) {
// 			res.status(401);
// 			throw new Error(`We found an error ${err}`);
// 			// A Multer error occurred when uploading.
// 		} else if (err) {
// 			res.status(401);
// 			throw new Error(`We found an error ${err}`);
// 			// An unknown error occurred when uploading.
// 		}

// 		res.send(`/${req.file.path}`);
// 		// Everything went fine.
// 	});
// });

export default router;
