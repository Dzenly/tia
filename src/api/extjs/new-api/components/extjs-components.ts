

/* eslint-disable no-param-reassign */

// import * as _ from 'lodash';

import { ComponentAPI } from './component';
import { FormFieldBaseAPI } from './form-field-base';
import { BoundListAPI } from './boundlist';
import { ButtonAPI } from './button';
import { CheckBoxAPI } from './checkbox';
import { ComboBoxAPI } from './combobox';
import { FormAPI } from './form';
import { GridColumnAPI } from './gridcolumn';
import { TabAPI } from './tab';
import { TableViewAPI } from './tableview';
import { TabPanelAPI } from './tabpanel';
import { TextFieldAPI } from './textfield';
import { TreeViewAPI } from './treeview';

export class ExtJsCmpAPI {
  static component = ComponentAPI;
  static formFieldBase = FormFieldBaseAPI;
  static boundlist = BoundListAPI;
  static button = ButtonAPI;
  static checkbox = CheckBoxAPI;
  static combobox = ComboBoxAPI;
  static form = FormAPI;
  static gridcolumn = GridColumnAPI;
  static tab = TabAPI;
  static tableview = TableViewAPI;
  static tabpanel = TabPanelAPI;
  static textfield = TextFieldAPI;
  static treeview = TreeViewAPI;
}
