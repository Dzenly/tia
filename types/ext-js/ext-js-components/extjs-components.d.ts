import {AnyComponent} from './any';
import {CheckBox} from './checkbox';
import {ComboBox} from './combobox';
import {TabPanel} from './tabpanel';
import {Tab} from './tab';
import {TextField} from './textfield';

export interface ExtJsComponents {
  any: AnyComponent;
  checkbox: CheckBox;
  combobox: ComboBox;
  tab: Tab;
  tabpanel: TabPanel;
  textfield: TextField;
}
