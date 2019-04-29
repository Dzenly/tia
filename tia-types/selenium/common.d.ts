interface SeleniumIdObj {
  /**
   * Element id.
   */
  id: string;

  /**
   * String to use in the test log instead of id
   * in case if the id is dynamically generated.
   */
  logStr: string;

}

/**
 * String id or SeleniumIdObj for usage in wrappers on selenium actions with elements.
 */
export type SeleniumIdOrObj = SeleniumIdObj | string;
