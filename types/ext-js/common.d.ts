/**
 * The TEQ (Tia ExtJs Query) search string.
 * The TEQ is a mix of following two abilities:
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.ComponentQuery.html#method-query
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.Component.html#cfg-reference
 *
 * Note: There is a difference in default flag for xtype search.
 * Do not use the xtype(true) syntax in TEQ, because (true)
 * is added by default. I.e. ExtJs query has (false) by default, but TEQ has (true) by default.
 * And you have not ability to pass (false) in TEQ. So you always search by exact xtype and not
 * by the inheritance chain.
 *
 * Locale: Front end locale, which is set by gT.e.utils.setLocaleObject().
 * In the component queries, substrings like 'l"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=l"settings"]' will be changed to '[text="Настройки"] for russian locale.
 *
 * Extra locale: Back end locale, which is set by gT.e.utils.setExtraLocaleObject()
 * In the component queries, substrings like 'el"locale_key"' will be replaced by '"value_for_key"',
 * i.e. '[text=el"settings"]' will be changed to '[text="Настройки"] for russian extra locale.
 *
 * Also fake ids id like '##idKey' will be replaced by '#realId' from tiaEJ.idMap.
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
export type ElementIdForLog = string | undefined;

/**
 * Whether the action is to be written to log.
 * true - write action.
 * false - don't write action (unless --force-log-actions is specified).
 * undefined - use default enableLog.
 * Note: Default enableLog is 'true; (gT.engineConsts.defLLLogAction).
 * Some function can use its own default enableLog, it this case such function description contains
 * an explanation.
 */
export type EnableLog = boolean | undefined;

/**
 * Tuple for Field Name / Field Value or for Column Text (or Tooltip) / Field Value.
 */
type RowSearchParams = [string, string];

/**
 * Used to find row in some table using Model Field Names.
 * Only visible columns are allowed.
 */
export interface TableCellByModelFields {
  /**
   * Data specifying row to click. It is such tuples:
   * [ <Model field name>, <Model values> ]
   */
  row: RowSearchParams;

  /**
   * Field name, specifying column to click.
   */
  field: string;

  /**
   * Index inside found rows.
   * 0 by default.
   */
  index?: number;

  /**
   * If true and there more then one row, exception is generated.
   * true by default.
   */
  one?: boolean;
}

/**
 * Used to find row in some table using Column texts or tooltips.
 * Only visible columns are allowed.
 */
export interface TableCellByColumns {
  /**
   * Data specifying row to click. It is such tuples:
   * [ <Column text or tooltip>, <Model values> ]
   */
  row: RowSearchParams;

  /**
   * Column text or tooltip, specifying column to click.
   */
  column: string;

  /**
   * Index inside found rows.
   * 0 by default.
   */
  index?: number;

  /**
   * If true and there more then one row, exception is generated.
   * true by default.
   */
  one?: boolean;
}
