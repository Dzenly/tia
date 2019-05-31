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
 * Alias which writes to log for the given element along with TEQ string.
 *
 * TODO: Don't print TEQ to logs if idForLog is passed.
 *
 * TODO: Add cmd line option '--force-print-teq', to print TEQ strings even if idForLogs are passed,
 * just for debug.
 */
export type ElementIdForLog = string;

/**
 * Whether the action is to be written to log.
 *
 * If true - the action is written.
 *
 * If false - the action is not written.
 *
 * Say, you create a high level function: 'login'.
 * Say, your login consists of sendKeys to 'name', sendKeys to 'password', and press 'submit' button.
 * You can use 'false' for these inner calls, and print some your string like 'login ... OK'.
 * See also gT.e.q.wrap and gIn.wrap functions.
 *
 * If this parameter is omitted - default 'enableLog' will be used.
 * Note: Default enableLog is 'true' (gT.engineConsts.defLLLogAction).
 *
 * Some API functions can use its own default enableLog, it this case such function description contains
 * an explanation.
 *
 * Note: the '--force-log-actions' cmd line option works as if all enableLog are true,
 * so use it to debug your high level functions.
 */
export type EnableLog = boolean;

/**
 * Tuple for "Field Name" / "Field Value" or for TableCellByColumns "Column Text (or Tooltip)" / "Field Value".
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
   * Index inside found rows. Note 'FOUND' and not 'ALL'.
   * 0 by default.
   * Negative index is subtracted from length. I.e. -1 means last. -2 means before last, etc.
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
   * Column header text or tooltip, specifying column to click.
   */
  column: string;

  /**
   * Index inside found rows. Note 'FOUND' and not 'ALL'.
   * 0 by default.
   * Negative index is subtracted from length. I.e. -1 means last. -2 means before last, etc.
   */
  index?: number;

  /**
   * If true and there more then one row, exception is generated.
   * true by default.
   */
  one?: boolean;
}
