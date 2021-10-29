import shortid from 'shortid'


export const toSlug = ( text: string ): string => {

	const textToSlug = text.concat( '-' + shortid.generate() )
	
	return textToSlug
				.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'')
}