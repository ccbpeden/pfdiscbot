const { Client } = require( 'discord.js' );
const dotenv = require( 'dotenv' ).config();
const client = new Client();
const http = require( 'http' );

try {
	http.createServer( ( request, response ) => {
		response.writeHead(
			200,
			{ 'Content-type': 'text/plain' }
		);
		response.write( 'Hello World...' );
		response.end();
	} ).listen( process.env.port );
	
	console.log( 'prawcess: ', process.env );
	
	client.login( process.env.discordToken );
	
	client.on( 'ready', () => {
		console.log( 'We are prepared to meet our maker.' );
	} );
} catch ( error ) {
	console.log( 'error: ', error );
	return error;
}