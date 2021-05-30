require( 'dotenv' ).config();
// imported packages
const { Client } = require( 'discord.js' );
const client = new Client();
const http = require( 'http' );
const fetch = require( 'isomorphic-fetch' );
const { JSDOM } = require( 'jsdom' );

// utilities
const {
	defaultQueryError,
	pageArgs,
	wordsNotToCapitalize,
} = require( './constants' );

/**
 * this is the main handler function
 * currently it listens for a message,
 * and tries to match said message with a page from
 * the pathfinder srd online: https://aonprd.com/
 */
try {
	http.createServer( async ( request, response ) => {
		response.writeHead(
			200,
			{ 'Content-type': 'text/plain' }
		);
		/**
		 * @todo we should create a webpage for this bot, rather than a simple helloworld response
		 */
		response.write( 'Hello World...' );
		response.end();
	} ).listen( process.env.PORT || process.env.port );
	
	client.login( process.env.discordToken );
	
	client.on( 'ready', () => {
		console.log( 'We are prepared to meet our maker.' );
	} );

	client.on( 'message', async message => {
		for ( const [ key ] of Object.entries( pageArgs ) ) {
			// search for skill
			if ( message.content.includes( key ) ) {

				let entry = await retrievePage( message.content, key );
				if ( !entry ) {
					return message.reply( defaultQueryError );
				}
				/**
				 * @todo make the chopping up of long messages pretty
				 * maybe multiple responses?
				 */
				if ( entry.length > 4000 ) {
					entry = entry.slice( 0, 1750 ).trim();
				}

				return message.reply( entry );
			}
		}
	} );

} catch ( error ) {
	console.log( 'error: ', error );
}

/**
 * Attempts to retrieve a specific segment of a specific page on the pathfinder srd.
 *
 * @param { object } message https://discord.js.org/#/docs/main/stable/class/Message
 * @param { string } queryType - the category of rule we're looking for.
 * @returns { Promise<String|Boolean> }
 */
const retrievePage = async ( message, queryType ) => {
	const arg = getArg( message, queryType );
	console.log( 'arg: ', arg );
	if ( !arg ) {
		return false;
	}

	const urlSegment = pageArgs[ queryType ].segment;

	const url = encodeURIComponent( `https://aonprd.com/${ urlSegment }.aspx?ItemName=${ arg }` );
	console.log( 'url: ', url );
	const page = await fetch( url );
	if ( !page ) {
		return false;
	}
	const text = await page.text();
	if ( !text ) {
		return false;
	}
	const dom = new JSDOM( text );
	if ( !dom ) {
		return false;
	}
	if ( dom.window.document.querySelector( pageArgs[ queryType ].selector ) ) {
		return dom.window.document.querySelector( pageArgs[ queryType ].selector ).textContent;
	}
	return false;
};

/**
 * attempts to construct a query parameter for the page to be scraped
 *
 * @param { string } messageContent 
 * @param { string } queryType 
 * @returns { string }
 */
const getArg = ( messageContent, queryType ) => {
	if ( !messageContent || !queryType ) {
		return false;
	}

	// see if the message contains the query
	if ( messageContent.indexOf( queryType ) === -1 ) {
		return false;
	}
	// if it does, get everything after the query type
	const query = messageContent.slice( messageContent.indexOf( queryType ) + 1 + queryType.length ).trim();
	const queryWords = query.split( ' ' );
	// and convert the first char of each word to upper case
	for ( let index = 0; index < queryWords.length; index++ ) {
		const word = queryWords[ index ];
		if ( wordsNotToCapitalize.includes( word ) ) {
			continue;
		}
		const capitalizedWord = word[ 0 ].toUpperCase() + word.substr( 1 );
		queryWords[ index ] = capitalizedWord; 
	}
	return queryWords.join( ' ' );
};