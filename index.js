require( 'dotenv' ).config();
const { Client } = require( 'discord.js' );
const client = new Client();
const http = require( 'http' );
const fetch = require( 'isomorphic-fetch' );
const { JSDOM } = require( 'jsdom' );

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
			const arg = getArg( message, '!skill' );
			console.log( 'arg: ', arg );
			if ( !arg ) {
				message.reply( queryError );
			}
			let  skill = await retrievePage( arg, !skill );
			if ( !skill ) {
				message.reply( queryError );
			}
			if ( skill.length > 4000 ) {
				skill = skill.slice( 0, 1750 );
			}
			message.reply( skill );
		}

		if ( message.content.includes( '!feat' ) ) {
			const arg = getArg( message, '!feat' ) {
				
			}
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

	const urlSegment = pargArgs[ queryType ];
	console.log( 'urlSegment: ', urlSegment );

	const page = await fetch( `https://aonprd.com/Skills.aspx?ItemName=${ arg }` );
	if ( !page ) {
		return false;
	}
	const text = await page.text();
	const dom = new JSDOM( text );
	return dom.window.document.querySelector( '#ctl00_MainContent_DataListTalentsAll' ).textContent;
};

const queryError = 'Sorry, I can\'t match your query.';

const getArg = ( message, queryType ) => {
	if ( message.indexOf( queryType === -1 ) ) {
		return false;
	}
	let arg = message.content.slice( message.indexOf( queryType ) + 1 ).trim();
	arg = arg.charAt( 0 ).toUpperCase() + arg.slice( 1 );
	return arg;
};