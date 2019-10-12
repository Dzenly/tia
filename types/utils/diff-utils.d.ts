import * as diffJs from 'diff';
export declare function getStructuredPatch({ dir, oldFile, newFile, highlight, }: {
    dir: string;
    oldFile: string;
    newFile: string;
    highlight?: string;
}): diffJs.ParsedDiff;
/**
 * Returns result of running external dif utility, i.e. stdout + stderr.
 * NOTE: this function requires external dif utility.
 * Both files must be ended by newline, otherwise there will be 'No newline at end of file' messages
 * in resulting dif.
 *
 * @param dir - working dir
 * @param oldFile - basename for file 1
 * @param newFile - basename for file 2
 */
export declare function getDiff({ dir, oldFile, newFile, highlight, htmlWrap, }: {
    dir: string;
    oldFile: string;
    newFile: string;
    highlight?: string;
    htmlWrap?: boolean;
}): string;
/**
 * Diffs current log (*.log) and etalon log (*.et) files.
 * Takes into account presence of .edif file.
 * If diff is not empty it is placed to (*.dif) file.
 *
 * NOTE: this function requires external diff utility.
 * Both logs must be ended by newline, otherwise there
 * will be 'No newline at end of file' messages
 * in resulting diff.
 *
 * @param jsTest - path to js file, for which just created *.log
 * to be diffed with *.et.
 */
export declare function diff({ jsTest, highlight, htmlWrap, }: {
    jsTest: string;
    highlight?: string;
    htmlWrap?: boolean;
}): void;
