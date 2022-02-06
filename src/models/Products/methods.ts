import { IProduct } from './interfaces'
import Product from './index'
import Category from '../Categories'


export const getProductsByCategory = async ( query: any, category: string, limit: number = 12, page: number = 0 ) => {

	const skip : number =  page * limit
	const categoryData = await Category.findOne({ value: category })
	const products: IProduct[] = await Product
		.find({ 
			...query, 
			categories: { $in: [ categoryData._id ] }
		})
		.limit( limit )
		.skip( skip )
		.populate({
			path: 'categories',
			select: 'name value'
		})
		.sort({
			createdAt: -1
		})
	const total = await Product
		.find({ 
			...query, 
			categories: { $in: [ categoryData._id ] }
		}).countDocuments()
	
	return {
		products,
		total
	} 
}