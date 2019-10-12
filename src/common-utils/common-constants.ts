export const errPrefix = 'TIAERR: ';

export class CommonConstantsContent {
  static colSep = ' | '; // column texts separator
  static rowSep = '= = = = = = =';
  static rowSep1 = '-------------------';
  static contentStart = '    /~~~~~~~~\\\n';
  static contentFinish = '\n    \\________/\n';
  static indent = ' | ';
  static title = 'Title: ';
  static header = 'Header: ';
  static visible = '(Visible)';
  static notVisible = '(Not visible)';
  static rowBody = '  Row body: ';
  static defEmptyCellText = '&#160;';
  static qTipAttr = 'data-qtip';
  static getVisibility = function getVisibility(cond: string) {
    return cond ? CommonConstantsContent.visible : CommonConstantsContent.notVisible;
  };
  static wrap = function wrap(str: string) {
    return CommonConstantsContent.contentStart + str + CommonConstantsContent.contentFinish;
  };
  static wrapEx = function wrapEx(indent: string, str: string) {
    return (
      indent +
      CommonConstantsContent.contentStart +
      str +
      indent +
      CommonConstantsContent.contentFinish
    );
  };
}

export const content = CommonConstantsContent;
