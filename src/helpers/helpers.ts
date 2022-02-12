import { IProductFromFrontEnd } from '../models/Products/interfaces'
import { IShipment } from '../models/Sales/interfaces'


export const compareIds = ( id1: string, id2: string ): boolean => {
	
	if( id1 !== id2 ) {

		return false
	}

	return true
}

export const getTotal = ( items: IProductFromFrontEnd[], shipment: IShipment ): { total: number, totalItems: number } => {
	
	let total = 0

	items.forEach( item => {
		total = total + item.priceWithDiscount
	})

	return {
		total: total + shipment.price,
		totalItems: total 
	}
}
