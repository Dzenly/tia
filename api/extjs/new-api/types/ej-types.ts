// TODO: Move undependent types to another file.

/**
 * The TEQ (Tia ExtJs Query) search string.
 * The TEQ is a mix of following two abilities:
 * https://docs.sencha.com/extjs/6.5.3/classic/Ext.ComponentQuery.html
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
 * For TableCellByModelFields - tuple ["Field Name", "Field Value"].
 * For TableCellByColumns - tuple ["Column Text (or Tooltip)", "Field Value"].
 */
type RowSearchParams = [string, string];

/**
 * Used to find row in some table using Model Field Names.
 * Only visible columns are allowed.
 */
export interface TableCellByModelFields {
  /**
   * Data specifying row to click.
   */
  row: RowSearchParams[];

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

  /**
   * For some group tree nodes there is no corresponding fieldName in table header visible columns.
   * So there is no corresponding cell.
   * You can set useRowIfCellAbsent to true to use row instead of cell.
   */
  useRowIfCellAbsent?: boolean;
}

/**
 * Used to find row in some table using Column texts or tooltips.
 * Only visible columns are allowed.
 */
export interface TableCellByColumns {
  /**
   * Data specifying row to click.
   */
  row: RowSearchParams[];

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
