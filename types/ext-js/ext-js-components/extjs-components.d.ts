import {Component} from './component';
import {BoundList} from './boundlist';
import {Button} from './button';
import {CheckBox} from './checkbox';
import {ComboBox} from './combobox';
import {Form} from './form';
import {FormFieldBase} from './form-field-base';
import {GridColumn} from './gridcolumn';
import {TableView} from './tableview';
import {TabPanel} from './tabpanel';
import {Tab} from './tab';
import {TextField} from './textfield';
import {TreeView} from './treeview';

export interface ExtJsComponents {
  component: Component;
  formFieldBase: FormFieldBase;
  boundlist: BoundList;
  button: Button;
  checkbox: CheckBox;
  combobox: ComboBox;
  form: Form;
  gridcolumn: GridColumn;
  tab: Tab;
  tableview: TableView;
  tabpanel: TabPanel;
  textfield: TextField;
  treeview: TreeView;
}
