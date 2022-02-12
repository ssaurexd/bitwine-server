import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'


const imageStorage = multer.diskStorage({
	destination: 'public/images/products',
	filename: ( req, file, next ) => {

		const { mimetype } = file

		next( null, uuidv4() + `.${ mimetype.split('/')[1] }` )
	}
})

const avatarStorage = multer.diskStorage({
	destination: 'public/images/avatars',
	filename: ( req, file, next ) => {

		const { mimetype } = file

		next( null, uuidv4() + `.${ mimetype.split('/')[1] }`)
	}
})

export const productImageMulter = multer({ storage: imageStorage }) 
export const avatarImageMulter = multer({ storage: avatarStorage }) 