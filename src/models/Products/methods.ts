import { Types } from 'mongoose'
import { IProduct } from './interfaces'
import Product from './index'
import Category from '../Categories'


export const getProductsByCategory = async ( category: string, limit: number = 12 ) => {

	const categoryData = await Category.findOne({ name: category })
	const products: IProduct[] = await Product.find({ categories: { $in: [ categoryData._id ] } }, 
		{}, 
		{
			limit: limit,
			sort: { createdAt: 1 }
		}
	).populate({
		path: 'categories',
		select: 'name'
	})
	
	return products
}