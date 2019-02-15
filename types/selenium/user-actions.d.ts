import {LogAction} from '../ext-js/common';
import {SeleniumIdOrObj} from './common';

/**
 * String or array of strings with keys.
 * You can input some string like 'asdf' into input element, or you can use gT.sOrig.input.Key:
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

  clickById(id: SeleniumIdOrObj, logAction: LogAction): Promise<undefined>;

  /**
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#sendKeys
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html#Key.chord
   */
  sendKeysById(id: SeleniumIdOrObj, keys: SeleniumKeys, logAction: LogAction): Promise<undefined>;

  /**
   * Ctrl + a, then sendKeysById().
   */
  selectAllAndSendKeysById(id: SeleniumIdOrObj, keys: SeleniumKeys, logAction: LogAction): Promise<undefined>;

  /**
   * Ctrl + a, then keys, then Enter.
   */
  selectAllSendKeysEnterById(id: SeleniumIdOrObj, keys: SeleniumKeys, logAction: LogAction): Promise<undefined>;


  /**
   * Ctrl + a, then Delete.
   */
  selectAllAndDeleteById(id: SeleniumIdOrObj, logAction: LogAction): Promise<undefined>;

  /**
   * Clears the value of this element. This command has no effect if the underlying DOM element is neither
   * a text INPUT element nor a TEXTAREA element.
   *
   * https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebElement.html#clear
   */
  clearById(id: SeleniumIdOrObj, logAction: LogAction): Promise<undefined>;

  /**
   * Sends keys to the <body/> element.
   */
  sendKeysToBody(keys: SeleniumKeys, logAction: LogAction): Promise<undefined>;
}
