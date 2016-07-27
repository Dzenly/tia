(function () {
  'use strict';
  // Class to get dynamic id's.
  window.tiaEJ.check = {

    formFieldDisabled: function (formId, name) {
      var field = tiaEJ.search.byFormIdName(formId, name);
      return field.isDisabled();
    },

    formFieldEnabled: function (formId, name) {
      return !this.formFieldDisabled(formId, name);
    }
  };
})();
