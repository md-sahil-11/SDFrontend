import { lazy } from "react";

/**
 * 
 * @param {String} path accepts paths under src folder
 * @param {String} namedExport 
 * @returns imported components/functions/objects
 */

export const lazyload = (path, namedExport) => {
  return lazy(async () => {
    if (namedExport == null)
      return await import(`../${path}`);
    return import(`src/${path}`).then((module) => ({ default: module[namedExport] }));
  });
};
