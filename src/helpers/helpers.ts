

export const compareIds = ( id1: string, id2: string ) => {
	
	if( id1 !== id2 ) {

		throw new Error('IDs are not equal')
	}
}