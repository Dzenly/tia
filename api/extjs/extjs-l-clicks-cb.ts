'use strict';

// TODO: Deprecated, remove.

function createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, enableLog) {
  return function clickCb(inputEl, noPrint) {
    return inputEl
      .sendKeys(gT.sOrig.key.ARROW_DOWN)
      .then(() => {
        gIn.tracer.msg3('Before wait after cb inputEl click');
        return gT.sOrig.driver
          .wait(
            () => gT.s.browser.executeScriptWrapper(jsWaitBoundList),
            gT.engineConsts.cbBoundListTimeout
          )
          .catch(err => {
            // Catch for bound list wait.
            const errMsg = 'Error at wait for bound list';
            gIn.tracer.err(errMsg);
            gIn.tracer.exc(err);
            throw new Error(errMsg);
          });
      })
      .then(() => {
        gIn.tracer.msg3('Before get list item');
        return gT.s.browser.executeScript(jsGetListItem, false);
      })
      .then(el => gT.e.lClick.createFuncPrintTextDelayClick(isDblClick, noPrint, enableLog)(el));
  };
}

function createFuncClickCbByInputEl1(jsWaitBoundList, jsGetListItem, isDblClick, enableLog) {
  return function clickCb1(inputEl, count, noPrint) {
    let cancel = false;
    count = count || 0;
    if (count > gT.engineConsts.cbRetryClicksCount) {
      const errStr = `Exceeded count of attempts to click combobox, wait condition: ${jsWaitBoundList}`;
      gIn.tracer.err(errStr);
      return Promise.reject(new Error(errStr));
    }
    return gT.e.lClick
      .clickAndWaitForAjaxFinish(inputEl)
      .then(
        () => {
          gIn.tracer.msg3('Before wait after cb inputEl click');
          return gT.sOrig.driver
            .wait(
              () => gT.s.browser.executeScriptWrapper(jsWaitBoundList),
              gT.engineConsts.cbBoundListTimeout
            )
            .catch(err => {
              // Catch for bound list wait.
              gIn.tracer.exc(err);

              // Sometimes combobox treated one click as two and closes immediately after open.
              // So this code gives a second chance to it.
              gIn.tracer.msg1('Using one more chance to click combo box (bound list wait failed)');
              cancel = true;
              return clickCb(inputEl, count + 1, noPrint);
            });
        },
        err => {
          // Catch for click or ajax wait.
          if (cancel) {
            return;
          }
          gIn.tracer.exc(err);
          gIn.tracer.msg1(
            'Using one more chance to click combo box (inputEl click or ajax wait failed)'
          );
          cancel = true;
          return clickCb(inputEl, count + 1, noPrint);
        }
      )
      .then(() => {
        if (cancel) {
          return;
        }
        gIn.tracer.msg3('Before get list item');
        return gT.s.browser.executeScript(jsGetListItem, false);
      })
      .then(el => {
        if (cancel) {
          return;
        }
        return gT.e.lClick
          .createFuncPrintTextDelayClick(isDblClick, noPrint, enableLog)(el)
          .catch(err => {
            // Catch for text item getting or click.
            gIn.tracer.exc(err);
            gIn.tracer.msg1('Using one more chance to click combo box (item click failed)');
            if (err !== gT.engineConsts.elGetTextFail) {
              noPrint = true;
            }
            cancel = true;
            return clickCb(inputEl, count + 1, noPrint);
          });
      });
  };
}

function createFuncClickCbByJsToGetInputEl(
  jsGetInputEl,
  jsWaitBoundList,
  jsGetListItem,
  isDblClick,
  enableLog
) {
  return function() {
    return gT.s.browser
      .executeScript(jsGetInputEl, false)
      .then(createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, enableLog));
  };
}

function clickCb(logText, jsGetInputEl, jsWaitBoundList, jsGetListItem, isDblClick, enableLog) {
  return gIn.wrap(logText, enableLog, () =>
    gT.s.browser
      .executeScript(jsGetInputEl, false)
      .then(createFuncClickCbByInputEl(jsWaitBoundList, jsGetListItem, isDblClick, enableLog))
  );
}

export function idIndex(cbId, itemIndex, enableLog) {
  return gIn.wrap('', enableLog, () =>
    gT.s.browser
      .executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(obj => {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), item #${itemIndex}`,
          enableLog
        );
      })
      .then(
        createFuncClickCbByJsToGetInputEl(
          `return tiaEJ.hEById.getInputEl('${cbId}');`,
          `return tiaEJ.hEById.isCBPickerVisible('${cbId}', ${itemIndex});`,
          `return tiaEJ.hEById.getCBItemByIndex('${cbId}', ${itemIndex});`,
          false,
          enableLog
        )
      )
  );
}

export function idField(cbId, fieldValue, fieldName, enableLog) {
  return gIn.wrap('', enableLog, () =>
    gT.s.browser
      .executeScript(`return tiaEJ.hEById.getNameAndLabels('${cbId}');`, false)
      .then(obj => {
        gIn.logger.logIfNotDisabled(
          `Click combo box(name: '${obj.name}', label: '${obj.label}'), by field (name: ${fieldName}, value: ${fieldValue})`,
          enableLog
        );
      })
      .then(
        createFuncClickCbByJsToGetInputEl(
          `return tiaEJ.hEById.getInputEl('${cbId}');`,
          `return tiaEJ.hEById.isCBPickerVisible('${cbId}');`,
          `return tiaEJ.hEById.getCBItemByField('${cbId}', ${gT.s.browser.valueToParameter(
            fieldValue
          )}, '${fieldName}');`,
          false,
          enableLog
        )
      )
  );
}

export function formIdNameIndex(formId, name, index, enableLog) {
  return clickCb(
    // logText
    `Double Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,

    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,

    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}', ${index});`,

    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,

    // isDblClick
    false,

    // enableLog
    enableLog
  );
}

export function dblFormIdNameIndex(formId, name, index, enableLog) {
  return clickCb(
    // logText
    `Double Click combobox item by formId: ${formId}, name: ${name}, index: ${index}`,

    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,

    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}', ${index});`,

    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameIndex('${formId}', '${name}', ${index});`,

    // isDblClick
    true,

    // enableLog
    enableLog
  );
}

export function formIdNameField(formId, name, fieldValue, fieldName, enableLog) {
  return clickCb(
    // logText
    `Click combobox item by formId: ${formId}, name: ${name}, fieldName: ${fieldName}, fieldValue: ${fieldValue}`,

    // jsGetInputEl
    `return tiaEJ.hEById.getInputElByFormName('${formId}', '${name}');`,

    // jsWaitBoundList
    `return tiaEJ.hEById.isCBPickerVisibleByFormName('${formId}', '${name}');`,

    // jsGetListItem
    `return tiaEJ.hEById.getCBItemByFormNameField('${formId}', '${name}', ${gT.s.browser.valueToParameter(
      fieldValue
    )}, '${fieldName}');`,

    // isDblClick
    false,

    // enableLog
    enableLog
  );
}
