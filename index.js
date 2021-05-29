require( 'dotenv' ).config();
const { Client } = require( 'discord.js' );
const client = new Client();
const http = require( 'http' );
const fetch = require( 'isomorphic-fetch' );
const { JSDOM } = require( 'jsdom' );

// utilities
const { defaultQueryError, pageArgs } = require( './constants' );

try {
	http.createServer( async ( request, response ) => {
		response.writeHead(
			200,
			{ 'Content-type': 'text/plain' }
		);
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

			let skill = await retrievePage( message, !skill );
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
	// see if the message contains the query
	if ( message.indexOf( queryType === -1 ) ) {
		return false;
	}
	// if it does, get everything after the query
	let arg = message.content.slice( message.indexOf( queryType ) + 1 ).trim();
	// and convert the first char to upper case
	arg = arg.charAt( 0 ).toUpperCase() + arg.slice( 1 );
	return arg;
};