import { EnableLog } from '../common-types';
export declare function expandAllGroupsById(id: string, tableName: string, enableLog?: EnableLog): Promise<any>;
export declare function collapseAllGroupsById(id: string, tableName: string, enableLog?: EnableLog): Promise<any>;
export declare function expandAllTreeById(id: string, treeName: string, enableLog?: EnableLog): Promise<any>;
export declare function collapseAllTreeById(id: string, treeName: string, enableLog?: EnableLog): Promise<any>;
