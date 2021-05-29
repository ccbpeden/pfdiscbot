require( 'dotenv' ).config();
// imported packages
const { Client } = require( 'discord.js' );
const client = new Client();
const http = require( 'http' );
const fetch = require( 'isomorphic-fetch' );
const { JSDOM } = require( 'jsdom' );

// utilities
const { defaultQueryError, pageArgs } = require( './constants' );

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

		// search for skill
		if ( message.content.includes( '!skill' ) ) {

			let skill = await retrievePage( message.content, '!skill' );
			if ( !skill ) {
				message.reply( defaultQueryError );
			}
			/**
			 * @todo make the chopping up of long messages pretty
			 * maybe multiple responses?
			 */
			if ( skill.length > 4000 ) {
				skill = skill.slice( 0, 1750 );
			}
			message.reply( skill );
		}

		// search for feat
		if ( message.content.includes( '!feat' ) ) {
			const arg = getArg( message, '!feat' );
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
	if ( !arg ) {
		return false;
	}

	const urlSegment = pageArgs[ queryType ];
	console.log( 'urlSegment: ', urlSegment );

	const page = await fetch( `https://aonprd.com/Skills.aspx?ItemName=${ arg }` );
	if ( !page ) {
		return false;
	}
	const text = await page.text();
	const dom = new JSDOM( text );
	return dom.window.document.querySelector( '#ctl00_MainContent_DataListTalentsAll' ).textContent;
};

const getArg = ( message, queryType ) => {
	if ( !message || !queryType ) {
		return false;
	}
	console.log( 'message: ', message );
	// see if the message contains the query
	if ( message.indexOf( queryType ) === -1 ) {
		return false;
	}
	// if it does, get everything after the query
	let arg = message.content.slice( message.indexOf( queryType ) + 1 ).trim();
	// and convert the first char to upper case
	arg = arg.charAt( 0 ).toUpperCase() + arg.slice( 1 );
	return arg;
};