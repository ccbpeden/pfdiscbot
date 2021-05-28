require( 'dotenv' ).config();
const { Client } = require( 'discord.js' );
const client = new Client();
const http = require( 'http' );
const fetch = require( 'isomorphic-fetch' );
const { JSDOM } = require('jsdom');

try {
	http.createServer( async ( request, response ) => {
		response.writeHead(
			200,
			{ 'Content-type': 'text/plain' }
		);
		response.write( 'Hello World...' );
		response.end();
	} ).listen( process.env.port );
	
	client.login( process.env.discordToken );
	
	client.on( 'ready', async () => {
		console.log( 'We are prepared to meet our maker.' );
		await getSkill();
	} );


} catch ( error ) {
	console.log( 'error: ', error );
}

const getSkill = async () => {
	const response = await fetch( 'https://aonprd.com/Skills.aspx?ItemName=Acrobatics' );
	const text = await response.text();
	const dom = new JSDOM( text );
	console.log( dom.window.document.querySelector( '#ctl00_MainContent_DataListTalentsAll' ).textContent );
	return dom.window.document.querySelector( '#ctl00_MainContent_DataListTalentsAll' ).textContent;
	
}