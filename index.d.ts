interface EJCBAPI {
}

interface EJAPI {
    utils : Object;
    api: Object;
    explore: Object;
    search: Object;
    sendKeys: Object;
    logCtById: Object;
    logCtByFormIdName: Object;
    logUtils: Object;
    getByFormIdName: Object;
    msgBox: Object;
    hL: Object;
    wait: Object;
}

interface CheckboxActions {

}

interface CheckboxChecks {

}

interface CheckboxLogs {

}

interface Checkbox {
    actions: CheckboxActions,
    checks: CheckboxChecks,
    logs: CheckboxLogs,
}

interface ExtJsComponents {
    checkbox(tEQ: string, elNameForLog?: string, logAction?: boolean): Promise<Checkbox>;
}

interface GlobalTIAObjects {
    e: EJAPI;
    eC: ExtJsComponents,
}

declare namespace NodeJS {
    interface Global {
        gT: GlobalTIAObjects
    }
}

declare const gT: GlobalTIAObjects;
