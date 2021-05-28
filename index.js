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
		console.log( 'test message. ', message.content );
		if ( message.content.includes( '!skill' ) ) {
			console.log( 'includes!' );
			return await getSkill();
		}
	} );

} catch ( error ) {
	console.log( 'error: ', error );
}

const getSkill = async () => {
	const response = await fetch( 'https://aonprd.com/Skills.aspx?ItemName=Acrobatics' );
	const text = await response.text();
	const dom = new JSDOM( text );
	return dom.window.document.querySelector( '#ctl00_MainContent_DataListTalentsAll' ).textContent;
};