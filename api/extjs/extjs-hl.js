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

  formId = idToIdObj(formId);

  function *checkCBAffects() {

    const resAccName = 'checkCBAffects';
    a.initResultsAccumulator(resAccName);

    yield e.wait.ajaxRequestsFinish();

    let isSet = yield e.getByFormIdName.rawValue(formId, checkBoxName);

    for (let i = 0, len = directFields.length; i < len; i++) {
      let name = directFields[i];
      let isDisabled = yield e.getByFormIdName.isDisabled(formId, name);
      gT.a.true(isDisabled !== isSet, 'Direct check for "' + name + '"', {accName: resAccName});
    }

    for (let i = 0, len = reverseFields.length; i < len; i++) {
      let name = reverseFields[i];
      let isDisabled = yield e.getByFormIdName.isDisabled(formId, name);
      gT.a.true(isDisabled === isSet, 'Reverse check for "' + name + '"', {accName: resAccName});
    }

    yield e.lClick.checkBoxByFormIdName(formId, checkBoxName);
    isSet = !isSet;
    a.true(isSet === (yield e.getByFormIdName.rawValue(formId, checkBoxName)),
      'Checkbox state changed after click', {passSilently: true, noPassIncrement: true, accName: resAccName});

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
    a.true(isSet === (yield e.getByFormIdName.rawValue(formId, checkBoxName)),
      'Checkbox state changed after click', {passSilently: true, noPassIncrement: true, accName: resAccName});
  }

  var res = yield *gT.hL.wrapGenerator(
    checkCBAffects,
    `Check checkbox (name: ${checkBoxName}) affects for form ${formId.logStr}`, {passLlPrinting: true});

  return res;
};

