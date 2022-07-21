import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Button,
  Toast,
  Icon,
  Cell,
  Range,
  Layout,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Dialog,
  Popup,
  OverLay,
  InputNumber,
  Table,
} from "@nutui/nutui-taro";

import "./app.scss";
import "./assets/font/iconfont.css";

const pinia = createPinia();
const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(pinia)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Cell)
  .use(Range)
  .use(Layout)
  .use(Row)
  .use(Col)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Grid)
  .use(GridItem)
  .use(Dialog)
  .use(Popup)
  .use(OverLay)
  .use(InputNumber)
  .use(Table);

export default App;
