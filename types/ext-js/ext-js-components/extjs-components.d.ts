import {AnyComponent} from './any';
import {Button} from './button';
import {CheckBox} from './checkbox';
import {ComboBox} from './combobox';
import {TabPanel} from './tabpanel';
import {Tab} from './tab';
import {TextField} from './textfield';

export interface ExtJsComponents {
  any: AnyComponent;
  button: Button;
  checkbox: CheckBox;
  combobox: ComboBox;
  tab: Tab;
  tabpanel: TabPanel;
  textfield: TextField;
}
