import shortid from 'shortid'


export const toSlug = ( text: string ): string => {

	let textToSlug = text.concat( '-' + shortid.generate() )
	
	return textToSlug
				.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'')
}