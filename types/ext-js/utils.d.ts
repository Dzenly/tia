import {EnableLog} from './common';

export interface ExtJsUtils {

  /**
   * Sets locale object. Locale object is key-value object for localization.
   * Key is english text, and value is any utf8 text.
   *
   * See more details on TEQ description.
   *
   * @param objExpression - expression how to get locale object on browser side, say 'R.lang'.
   */
  setLocaleObject(objExpression: string, enableLog: EnableLog): Promise<undefined>;


  /**
   * Sets extra locale object. Locale object is key-value object for localization.
   * Key is english text, and value is any utf8 text.
   *
   * See more details on TEQ description.
   *
   * @param localeObj - key - value pairs.
   */
  setExtraLocaleObject(localeObj: any, enableLog: EnableLog): Promise<undefined>;

  /**
   * If newMode is false - only locale key values are printed to the test log.
   * If true - locale values are added too.
   * If there is no locale key for some string, it is printed as is.
   */
  setDebugLocaleMode(newMode: boolean, enableLog: EnableLog): Promise<undefined>;
}
