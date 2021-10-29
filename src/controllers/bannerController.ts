import { RequestHandler } from 'express'
import Product from '../models/Products'
import Banner from '../models/Banner'


interface IListQuery {
	limitQuery: string,
	pageQuery: string
}

export const getBanners: RequestHandler<{},{}, {}, IListQuery> = async ( req, res ) => {
	
	const { limitQuery = '12', pageQuery = '0' } = req.query
	const limit = parseInt( limitQuery )
	const page = parseInt( pageQuery )
	const skip = page * limit
	const query = {}
	

	try {
		
		const banners = await Banner
			.find( query )
			.limit( limit )
			.skip( skip )
		const total = await Banner.find( query ).estimatedDocumentCount()
		const canNext: boolean = banners.length < limit || banners.length === 0 ? false : true
		const canPrevious: boolean = page <= 1 ? false : true
		const nextPage: number =  page + 1
		const previousPage: number =  page > 0 ? page - 1 : page 

		return res.status( 200 ).json({
			ok: true,
			page,
			next: canNext,
			nextPage,
			previous: canPrevious,
			previousPage,
			total,
			banners,
		})
	} catch ( error ) {

		console.log("🚀 ~ file: bannerController.ts ~ line 44 ~ constgetBanners:RequestHandler<{},{},{},IListQuery>= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const createBanner: RequestHandler = async ( req, res ) => {
	
	const { title, description, productSlug, isActive, productImg } = req.body
	const bannerData = {
		title,
		description,
		productSlug,
		productImg,
		isActive,
	}

	try {

		const newBanner = await Banner.create( bannerData )

		return res.status( 201 ).json({
			ok: true,
			msg: 'Banner creado correctamente',
			banner: newBanner
		})
		
	} catch ( error ) {
		
        console.log("🚀 ~ file: bannerController.ts ~ line 66 ~ constcreateBanner:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const getBannersForHome: RequestHandler = async ( req, res ) => {

	try {
		
		const banners = await Banner.find({ isActive: true }).limit( 4 ).sort({ createAt: -1 })
		
		return res.status( 200 ).json({
			ok: true,
			banners
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: bannerController.ts ~ line 104 ~ constgetBannersForHome:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}