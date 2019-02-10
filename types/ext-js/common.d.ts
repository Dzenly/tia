/**
 * The TEQ (Tia ExtJs Query) search string.
 * The TEQ is a mix of following two abilities:
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.ComponentQuery.html#method-query
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#cfg-reference
 *
 * In the component queries, substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
 * Also id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
 *
 * References can be specified using '&' prefix. Say if your TEQ string is:
 * '#someId &someReference someXType', then the function will search the component with id 'someId',
 * then it will be equal to:
 * Ext.ComponentQuery('#someId).lookupReference('someReference').query(someXType)
 */
export type Teq = string;

/**
 * Alias which writes to log for the given element.
 */
export type ElementNameForLog = string | undefined;

/**
 * Whether the action is to be written to log.
 * true - write action.
 * false - don't write action (unless --force-log-actions is specified).
 * undefined - use default logAction.
 * Note: Default logAction is 'true; (gT.engineConsts.defLLLogAction).
 * Some function can use its own default logAction, it this case such function description contains
 * an explanation.
 */
export type LogAction = boolean | undefined;
