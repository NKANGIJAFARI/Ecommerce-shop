import express from 'express';
import multer from 'multer';
import path from 'path';
import { types } from 'util';
const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
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

function checkFileType(file, cb) {
	const fileTypes = '/jpg|jpeg|png';
	const extensionName = fileTypes.test(
		path.extname(file.originalname).toLowerCase()
	);

	const mimetype = fileTypes.test(file.mimetype);

	if (extensionName && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only');
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
export default router;
