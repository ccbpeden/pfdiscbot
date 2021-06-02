const firstEditionBaseUrl = 'https://aonprd.com/'
const secondEditionBaseUrl = 'https://2e.aonprd.com/'

module.exports = {
	defaultQueryError: 'Sorry, I can\'t match your query.',
	pageArgs: {
		'!skill': { baseUrl: firstEditionBaseUrl, segment: 'Skills.aspx?ItemName=', selector: '#ctl00_MainContent_DataListTalentsAll' },
		'!feat': { baseUrl: firstEditionBaseUrl, segment: 'FeatDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!spell': { baseUrl: firstEditionBaseUrl, segment: 'SpellDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!armor': { baseUrl: firstEditionBaseUrl, segment: 'EquipmentArmorDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!ring': { baseUrl: firstEditionBaseUrl, segment: 'MagicRingsDisplay.aspx?FinalName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
		'!monster': { baseUrl: firstEditionBaseUrl, segment: 'MonsterDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListFeats"]' },
		'!magicweapon': { baseUrl: firstEditionBaseUrl, segment: 'MagicWeaponsDisplay.aspx?ItemName=', selector: '[id*="ctl00_MainContent_DataListTypes"]' },
	},
	wordsNotToCapitalize: [
		'of',
		'the',
	],
};