(function setEBrCheck() {
  'use strict';

  console.log('setEBrCheck');

  // Class to get dynamic id's.
  window.tiaEJ.check = {

    formFieldDisabled: function formFieldDisabled(formId, name) {
      var field = tiaEJ.search.byFormIdName(formId, name);
      return field.isDisabled();
    },

    formFieldEnabled: function formFieldEnabled(formId, name) {
      return !this.formFieldDisabled(formId, name);
    }
  };
})();
