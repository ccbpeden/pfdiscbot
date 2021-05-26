const { Client, Intents } = require( 'discord.js' );
const dotenv = require( 'dotenv' );
const client = new Client();

console.log( 'prawcess: ', process.env );

client.login( process.env.discordToken );

client.on( 'ready', () => {
	console.log( 'We are prepared to meet our maker.' );
} );