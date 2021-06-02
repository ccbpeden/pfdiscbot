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
	commandsWithSpecialProcessing,
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

				const entry = await retrievePage( message.content, key );
				if ( !entry ) {
					return message.reply( defaultQueryError );
				}
				/**
				 * @todo make the chopping up of long messages pretty
				 * maybe multiple responses?
				 */

				const returnValue = entry.trim().substr( 0, 1800 );

				return message.reply( returnValue );
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
	const processedArg = getArg( message, queryType );
	const arg = encodeURIComponent( processedArg );
	console.log( 'arg: ', arg );
	if ( !arg ) {
		return false;
	}

	const baseUrl = pageArgs[ queryType ].baseUrl;
	const urlSegment = pageArgs[ queryType ].segment;

	let url = baseUrl + urlSegment;
	if ( /\?.*=$/.test( urlSegment ) ) { // matches "?***=" at the end of a string. Where * is any character
		// Only add the arg if the url is formatted to expect additional parameters
		url += arg;
	}
	console.log( 'url: ', url );
	const page = await fetch( url );
	console.log( 'page:', page );
	if ( !page ) {
		return false;
	}
	const text = await page.text();
	console.log( 'text: ', text );
	if ( !text ) {
		return false;
	}
	const dom = new JSDOM( text );
	console.log( 'dom: ', dom );
	if ( !dom ) {
		return false;
	}

	const domSlice = dom.window.document.querySelector( pageArgs[ queryType ].selector );
	const textContent = domSlice.textContent;

	if ( textContent ) {
		console.log(
			'query selector succeeds: ',
			textContent
		);
		if ( commandsWithSpecialProcessing.includes( queryType ) ) {
			return processSpecialCommands( queryType, domSlice, processedArg );
		}
		return textContent;
	}
	console.log( 'query selector returns nothing.' );
	return false;
};

/**
 * Performs command specific processing on special commands.
 *
 * @param { string } queryType 
 * @param { string } domSlice 
 * @param { string } processedArg 
 * @returns { string }
 */
const processSpecialCommands = ( queryType, domSlice, processedArg ) => {
	let text;
	switch ( queryType ) {
		case '!condition':
			const segments = domSlice.outerHTML.split( '<h2 class="title">' ); // split html by condition title tags
			let condition;

			for ( const segment of segments ) {
				const toSearch = `">${ processedArg }</a></h2><b>`;
				const match = segment.includes( toSearch );

				if ( match ) {
					condition = segment;
				}
			}

			if ( !condition ) {
				return false;
			}
			// strip out the html tags 
			text = condition.replace( /<(.|\n)*?>/g, '' );// https://stackoverflow.com/a/31516100/10312372
			break;
		default:
			console.log( 'Custom queryType selector has no handler.' );
			return false;
	}
	console.log( 'text' );
	console.log( text );
	return text;
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