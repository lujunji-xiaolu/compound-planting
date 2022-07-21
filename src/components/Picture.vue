<template>
  <layout>
    <view class="container" style="position: relative;">
      <nut-grid :column-num="11" :icon-size="24">
        <!-- 玉米 -->
        <nut-grid-item :icon="cornIcon" />
        <nut-grid-item>
          <view>40</view>
          <nut-icon
            font-class-name="iconfont"
            class-prefix="icon"
            name="arrows-horizontal"
          />
        </nut-grid-item>
        <nut-grid-item :icon="cornIcon" />
        <!-- 间距 -->
        <nut-grid-item>
          <view>{{ spacing }}</view>
          <nut-icon
            font-class-name="iconfont"
            class-prefix="icon"
            name="arrows-horizontal"
          />
        </nut-grid-item>
        <!-- 大豆 -->
        <nut-grid-item :icon="soybeanIcon" />
        <nut-grid-item>
          <view>{{ soybean.rowSpacing }}</view>
          <nut-icon
            font-class-name="iconfont"
            class-prefix="icon"
            name="arrows-horizontal"
          />
        </nut-grid-item>
        <nut-grid-item :icon="soybeanIcon" />
        <!-- 间距 -->
        <nut-grid-item />
        <!-- 玉米 -->
        <nut-grid-item :icon="cornIcon" />
        <nut-grid-item />
        <nut-grid-item :icon="cornIcon" />

        <nut-grid-item>
          <view>{{ corn.columnSpacing }}</view>
          <nut-icon
            font-class-name="iconfont"
            class-prefix="icon"
            name="arrows-vertical"
          />
        </nut-grid-item>
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item>
          <view>{{ soybean.columnSpacing }}</view>
          <nut-icon
            font-class-name="iconfont"
            class-prefix="icon"
            name="arrows-vertical"
          />
        </nut-grid-item>
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item />
        <nut-grid-item />
        <template v-for="num in 3" :key="num">
          <!-- 玉米 -->
          <nut-grid-item :icon="cornIcon" />
          <nut-grid-item />
          <nut-grid-item :icon="cornIcon" />
          <!-- 间距 -->
          <nut-grid-item />
          <!-- 大豆 -->
          <nut-grid-item :icon="soybeanIcon" />
          <nut-grid-item />
          <nut-grid-item :icon="soybeanIcon" />
          <!-- 间距 -->
          <nut-grid-item />
          <!-- 玉米 -->
          <nut-grid-item :icon="cornIcon" />
          <nut-grid-item />
          <nut-grid-item :icon="cornIcon" />

          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
          <nut-grid-item />
        </template>
      </nut-grid>
    </view>
  </layout>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import Layout from "@/layout.vue";
import { useStore } from "@/stores/global";
const cornIcon =
  "https://bpic.588ku.com/element_origin_min_pic/19/03/07/ea50a958da31b73b50bfa573036bf9a1.jpg";
const soybeanIcon = "https://img95.699pic.com/element/40156/7492.png_860.png";
export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const { corn, soybean, spacing } = storeToRefs(store);
    return { corn, soybean, spacing, cornIcon, soybeanIcon };
  },
};
</script>

<style lang="scss">
.nut-grid-item__content {
  padding: 0;
}
</style>
