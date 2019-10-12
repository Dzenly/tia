export declare const errPrefix = "TIAERR: ";
export declare class CommonConstantsContent {
    static colSep: string;
    static rowSep: string;
    static rowSep1: string;
    static contentStart: string;
    static contentFinish: string;
    static indent: string;
    static title: string;
    static header: string;
    static visible: string;
    static notVisible: string;
    static rowBody: string;
    static defEmptyCellText: string;
    static qTipAttr: string;
    static getVisibility: (cond: string) => string;
    static wrap: (str: string) => string;
    static wrapEx: (indent: string, str: string) => string;
}
export declare const content: typeof CommonConstantsContent;
