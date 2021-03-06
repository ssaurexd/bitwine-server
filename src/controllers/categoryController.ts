import { RequestHandler } from 'express'
import Category from '../models/Categories'
import { ICategory } from '../models/Categories/interfaces'


export const createCategory: RequestHandler = async ( req, res ) => {
	
	const data: ICategory = req.body

	try {

		const newCategory = await Category.create( data )

		return res.status( 201 ).json({
			ok: true,
			msg: 'Categoria creada correctamente',
			category: newCategory
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: categoryController.ts ~ line 11 ~ createCategory ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const listCategories: RequestHandler = async ( req, res ) => {
	
	try {
		
		const categories = await Category.find({})

		return res.status( 200 ).json({
			ok: true,
			categories
		})
	} catch ( error ) {

        console.log("🚀 ~ file: categoryController.ts ~ line 41 ~ constlistCategories:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}