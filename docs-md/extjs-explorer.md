# ExtJs Application exploration mode.

If you use --ej-explore cmd line option (see `tia --help` for details),
you get two abilities:

## Info about ExtJs component under the mouse cursor.

Press Ctrl + Alt + Left_Mouse_Button and you will get a window with info about
the component under the cursor and all its parents.
I.e. hierarchy from a leaf to the root component. 

### Terms

[TEQ](http://dzenly.github.io/tia/modules/_ext_js_common_d_.html#teq)

### Format:
```
How to access the Component in API: say: gT.eC.combobox.
If the Component is not supported yet, there will be gT.eC.any.

The TEQ xtype precendence string in bold blue color.
If there is no id and xtype is custom in unique, this xtype is used to identify the component.

The TEQ reference precendence string in bold blue color.
If there is reference - it has precedence on the custom unique xtype.
This string is showed only if it does not equal to the string described above. 

TIA checks the TEQ string, so sometimes above the TEQ string there can be fail message for check.
In most cases these error messages are due to multiple localization keys, which can fit for
some native language string. In such case you must choose the most appropriate key
from the comma separated keys suggested in the TEQ.

======================
Component properties.
If xtype is custom type it will be shown as a yellow bold string.
And after the xtype there will be ' * <count> ', where count - is count
of components found by Ext.ComponentQuery.query(xtype).
------
keyMap: Supported buttons.
------
Attrs:
component css attributes.
------
======================
If there is reference, here will be reference holder info, like:
lookupReferenceHolder() info:
$className: R.view.assets.information.Controller
getReferences(): filters, grid, tree, center_card, form, assets-information-processes, assets-information-assets, assets_information_documents, related-grid, assets-information-history, user_fields_form, assets-information-organization, workgroup-grid, right-panel, addNew, removeBtn, infoBtn, user_fields_form_button, processesBtn, assetsBtn, organizationBtn, documentsBtn, relatedItemsBtn, historyBtn, workgroupBtn, refreshBtn, exportAssetsToExcelButton, company_id, identifierField, group_id, type_id, owner, compliance_manager, open_incidents_grid, estimationSchemeField, progressbar_field, attr_grid
++++++++++
CONTROLLER INFO (reference holder):
And here will be view controller info, like:
alias: controller.assets.information, Locale Keys:
controller: isViewController: true
clName: R.view.assets.information.Controller
getId(): controller-1696
getReferences(): filters, grid, tree, center_card, form, assets-information-processes, assets-information-assets, assets_information_documents, related-grid, assets-information-history, user_fields_form, assets-information-organization, workgroup-grid, right-panel, addNew, removeBtn, infoBtn, user_fields_form_button, processesBtn, assetsBtn, organizationBtn, documentsBtn, relatedItemsBtn, historyBtn, workgroupBtn, refreshBtn, exportAssetsToExcelButton, company_id, identifierField, group_id, type_id, owner, compliance_manager, open_incidents_grid, estimationSchemeField, progressbar_field, attr_grid
routes:
viewModel.$className: R.view.assets.information.Model
view.$className: R.view.assets.information.Container, getConfig("xtype"): information getId(): information, itemId: undefined
++++++++++
======================
Then info about the component state, like:
isVisible(true): true
isHidden(): false
isDisabled(): true
isSuspended(): false
isFocusable(): false
rendered: true
====================================================================
Here is parent info with the same format.
====================================================================
Here is parent of parent info.
====================================================================
Etc.
```

### window.tcmp

Each time you Ctrl + Alt + LClick on some ExtJs element.
The component under cursor is assigned to window.tcmp (Tia EJ Explorer Cmp). 
So you can investigate it in your browser DevTools console.

## The whole components hierarchy.

* Ctrl + Alt + T - shows the whole components hierarchy starting from the main view.
I.e. hierarchy from the root component to all leaf components.

Format is similar. Children are denoted by indentation.
