module.exports = {
	defaultQueryError: 'Sorry, I can\'t match your query.',
	pageArgs: {
		'!skill': { segment: 'Skills.aspx?ItemName=', selector: '#ctl00_MainContent_DataListTalentsAll' },
		'!feat': { segment: 'FeatDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!spell': { segment: 'SpellDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!armor': { segment: 'EquipmentArmorDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!ring': { segment: 'MagicRingsDisplay.aspx?FinalName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!monster': { segment: 'MonsterDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListFeats"]' },
		'!magicweapon': { segment: 'MagicWeaponsDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!condition': { segment: 'Conditions.aspx', selector: '#ctl00_MainContent_DetailedOutput' },
	},
	commandsWithSpecialProcessing: [ '!condition' ],
	wordsNotToCapitalize: [
		'of',
		'the',
	],
};