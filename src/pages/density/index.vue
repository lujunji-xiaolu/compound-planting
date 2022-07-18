<template>
  <view>
    <layout>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>玉米</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="corn.density"
              >{{ Math.round(corn.density) }}粒/亩</view
            >
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>大豆</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="soybean.density"
              >{{ Math.round(soybean.density) }}粒/亩</view
            >
          </nut-col>
        </nut-row>
      </nut-cell>
    </layout>
  </view>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import Layout from "@/layout.vue";
import { useStore } from "@/stores/global";
export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const { corn, soybean } = storeToRefs(store);
    return { corn, soybean };
  },
};
</script>
