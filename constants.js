module.exports = {
	defaultQueryError: 'Sorry, I can\'t match your query.',
	pageArgs: {
		'!skill': { segment: 'Skills', selector: '#ctl00_MainContent_DataListTalentsAll' },
		'!feat': { segment: 'FeatDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!spell': { segment: 'SpellDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
	},
	wordsNotToCapitalize: [
		'of',
		'the',
	],
};