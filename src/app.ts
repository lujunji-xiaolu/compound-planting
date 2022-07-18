import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Button,
  Toast,
  Tabs,
  TabPane,
  Icon,
  Cell,
  Range,
  Layout,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  Radio,
  RadioGroup,
} from "@nutui/nutui-taro";

import "./app.scss";

const pinia = createPinia();
const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(pinia)
  .use(Button)
  .use(Toast)
  .use(Tabs)
  .use(TabPane)
  .use(Icon)
  .use(Cell)
  .use(Range)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Radio)
  .use(RadioGroup);

export default App;
