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
    lClick: Object;
    lClick: EJCBAPI;
    wait: Object;
}

interface GlobalTIAObjects {
    e: EJAPI;
}

declare var e: EJAPI;
declare var gT: GlobalTIAObjects;
