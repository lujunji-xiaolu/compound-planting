<template>
  <view>
    <nut-tabbar
      class="tab-bar"
      v-model:visible="selectedTabIndex"
      @tab-switch="tabSwitch"
    >
      <nut-tabbar-item
        v-for="tab of tabs"
        :key="tab.to"
        :tab-title="tab.title"
        :icon="tab.icon"
        :to="tab.to"
      ></nut-tabbar-item>
    </nut-tabbar>
    <slot></slot>
  </view>
</template>

<script lang="ts">
import { getCurrentInstance, redirectTo } from "@tarojs/taro";

const map = new Map([
  [
    "/pages/index/index",
    { index: 0, title: "首页", icon: "home", to: "/pages/index/index" },
  ],
  [
    "/pages/density/index",
    {
      index: 1,
      title: "种植密度",
      icon: "category",
      to: "/pages/density/index",
    },
  ],
  [
    "/pages/seeding/index",
    {
      index: 2,
      title: "播种量",
      icon: "find",
      to: "/pages/seeding/index",
    },
  ],
  [
    "/pages/fertilizer/index",
    {
      index: 3,
      title: "用肥量",
      icon: "cart",
      to: "/pages/fertilizer/index",
    },
  ],
  [
    "/pages/visual/index",
    {
      index: 4,
      title: "可视化",
      icon: "my",
      to: "/pages/visual/index",
    },
  ],
]);

const getPath = (path?: string) => {
  if (path === undefined) return "/pages/index/index";
  return path.split("?")[0];
};

export default {
  setup() {
    const instance = getCurrentInstance();

    const selectedTabIndex = map.get(getPath(instance.router?.path))!.index;

    function tabSwitch(item: { to: string }) {
      redirectTo({ url: item.to });
    }

    return {
      tabSwitch,
      tabs: map.values(),
      selectedTabIndex,
    };
  },
};
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0px;
  z-index: 1;
}
</style>
