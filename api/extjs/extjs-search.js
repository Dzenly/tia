'use strict';

exports.byIdCompQuery = function (id, compQuery, logAction) {
  return gIn.wrap(`Searching id by container id: '${id}', compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdCompQuery('${id}', '${compQuery}')`)
      .then(function (id) {
        gIn.tracer.msg3(`search by byIdCompQuery, found id: ${id}`);
        return id;
      });
  });
};
