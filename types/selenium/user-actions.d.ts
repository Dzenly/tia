import {EnableLog} from '../ext-js/common';
import {SeleniumIdOrObj} from './common';

/**
 * String or array of strings with keys.
 * You can input some string like 'asdf' into input element, or you can use gT.sOrig.input.Key:
 *
 * As for TEQ strings, l"key" is replaced by corresponding locale value,
 * and el"key" is replaced by corresponding extra locale value.
 *
 * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
 *
 * See also:
 * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#sendKeys
 *
 * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html#Key.chord
 */
type SeleniumKeys = string | string[];

export interface SeleniumUserActionsApi {

  /**
   * Let mouse button click to element specified by id.
   */
  clickById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Let mouse button double click to element specified by id.
   */
  dblClickById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#sendKeys
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html#Key.chord
   */
  sendKeysById(id: SeleniumIdOrObj, keys: SeleniumKeys, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends ESC key to element specified by id.
   */
  sendEscById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends DOWN key to element specified by id.
   */
  sendDownById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends UP key to element specified by id.
   */
  sendUpById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends ENTER key to element specified by id.
   */
  sendEnterById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends TAB key to element specified by id.
   */
  sendTabById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_DOWN key to element specified by id.
   */
  sendPgDownById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends PAGE_UP key to element specified by id.
   */
  sendPgUpById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, then sendKeysById().
   */
  sendCtrlAAndKeysById(id: SeleniumIdOrObj, keys: SeleniumKeys, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Ctrl + a, then keys, then Enter.
   */
  sendCtrlAKeysEnterById(id: SeleniumIdOrObj, keys: SeleniumKeys, enableLog?: EnableLog): Promise<undefined>;


  /**
   * Ctrl + a, then Delete.
   */
  sendCtrlAAndDeleteById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Clears the value of this element. This command has no effect if the underlying DOM element is neither
   * a text INPUT element nor a TEXTAREA element.
   *
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#clear
   */
  clearById(id: SeleniumIdOrObj, enableLog?: EnableLog): Promise<undefined>;

  /**
   * Sends keys to the <body/> element.
   */
  sendKeysToBody(keys: SeleniumKeys, enableLog?: EnableLog): Promise<undefined>;
}
