import {AnyComponent} from './any';
import {BoundList} from './boundlist';
import {Button} from './button';
import {CheckBox} from './checkbox';
import {ComboBox} from './combobox';
import {Form} from './form';
import {GridColumn} from './gridcolumn';
import {Table} from './table';
import {TabPanel} from './tabpanel';
import {Tab} from './tab';
import {TextField} from './textfield';
import {Tree} from './tree';

export interface ExtJsComponents {
  any: AnyComponent;
  boundlist: BoundList;
  button: Button;
  checkbox: CheckBox;
  combobox: ComboBox;
  form: Form;
  gridcolumn: GridColumn;
  tab: Tab;
  table: Table;
  tabpanel: TabPanel;
  textfield: TextField;
  tree: Tree;
}
