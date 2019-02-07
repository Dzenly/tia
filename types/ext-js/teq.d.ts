interface TeqParamsForCmpInfo {
  /**
   * The TEQ search string.
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
  tEQ: string;

  /**
   * Extra element name for log. E.g. if there is no id.
   */
  elNameForLog ?: string;

  /**
   * Should action be logged? By default - default settings will be used,
   * e.g. don't log actions inside high level action and log other actions.
   */
  logAction?: boolean;
}

interface TeqParams extends TeqParamsForCmpInfo {
  /**
   * Action to perform.
   * This is arbitrary javascript code.
   * The scope contains variables cmp and cmpInfo, and your script can use them,
   * and return whatever you want.
   */
  action: string;
}

type CmpInfo = any;

export interface TeqApi {
  queryAndAction(args: TeqParams): any;
  queryCmpInfo(args: TeqParamsForCmpInfo): CmpInfo;
}
