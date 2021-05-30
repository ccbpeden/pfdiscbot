module.exports = {
	defaultQueryError: 'Sorry, I can\'t match your query.',
	pageArgs: {
		'!skill': { segment: 'Skills', selector: '#ctl00_MainContent_DataListTalentsAll' },
		'!feat': { segment: 'FeatDisplay', selector: '#ctl00_MainContent_DataListTypes_ctl00_LabelName' },
		'!spell': { segment: 'SpellDisplay', selector: '#ctl00_MainContent_DataListTypes_ctl00_LabelName' },
	},
	wordsNotToCapitalize: [
		'of',
		'the',
	],
};