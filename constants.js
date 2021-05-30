module.exports = {
	defaultQueryError: 'Sorry, I can\'t match your query.',
	pageArgs: {
		'!skill': { segment: 'Skills', selector: '#ctl00_MainContent_DataListTalentsAll' },
		'!feat': { segment: 'FeatDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!spell': { segment: 'SpellDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!armor': { segment: 'EquipmentArmorDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!ring': { segment: 'MagicRingsDisplay', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!monster': { segment: 'MonsterDisplay', selector: '[id*="ctl00_MainContent_DataListFeats"]' },
	},
	wordsNotToCapitalize: [
		'of',
		'the',
	],
};