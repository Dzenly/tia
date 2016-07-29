'use strict';
/* globals gT: true */
/* globals gIn: true */


/**
 * Checks that checkbox enables/disables corresponding form fields.
 * @param formId
 * @param checkBoxName
 * @param directFields - Fields which are enabled when the checkbox is set.
 * @param reverseFields - Fields which are enabled when the checkbox is reset.
 */
exports.checkCheckboxAffects = function *(formId, checkBoxName, directFields, reverseFields, logActions) {

  function *checkCBAffects() {
    let isSet = yield e.getByFormIdName.rawValue(formId, checkBoxName);

    for (let i = 0, len = directFields.length; i < len; i++) {
      let name = directFields[i];
      let isDisabled = yield e.getByFormIdName.isDisabled(formId, name);
      gT.a.true(isDisabled !== isSet, 'Direct check for "' + name + '"');
    }

    for (let i = 0, len = reverseFields.length; i < len; i++) {
      let name = reverseFields[i];
      let isDisabled = yield e.getByFormIdName.isDisabled(formId, name);
      gT.a.true(isDisabled === isSet, 'Reverse check for "' + name + '"');
    }

    yield e.lClick.checkBoxByFormIdName(formId, checkBoxName);
    isSet = !isSet;
    a.sP.true(isSet === (yield e.getByFormIdName.rawValue(formId, checkBoxName)), 'Checkbox state changed after click');

    for (let i = 0, len = directFields.length; i < len; i++) {
      let name = directFields[i];
      yield isSet ? e.wait.formFieldEnabled(formId, name) : e.wait.formFieldDisabled(formId, name);
    }

    for (let i = 0, len = reverseFields.length; i < len; i++) {
      let name = reverseFields[i];
      yield !isSet ? e.wait.formFieldEnabled(formId, name) : e.wait.formFieldDisabled(formId, name);
    }

    yield e.lClick.checkBoxByFormIdName(formId, checkBoxName);
    isSet = !isSet;
    a.sP.true(isSet === (yield e.getByFormIdName.rawValue(formId, checkBoxName)), 'Checkbox state changed after click');
  }

  yield *gT.hL.wrapGenerator(
    checkCBAffects,
    `Check checkbox (name: ${checkBoxName}) affects for form with id: ${formId}`, {passLlPrinting: true});

};

