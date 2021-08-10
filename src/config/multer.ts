import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'


const imageStorage = multer.diskStorage({
	destination: 'public/images/products',
	filename: ( req, file, next ) => {

		next( null, uuidv4() + path.extname( file.originalname ) )
	}
})

export const productImageMulter = multer({ storage: imageStorage }) 