<template>
  <layout>
    <view class="container">
      <nut-cell class="custom-range">
        <view class="custom-range-title">大豆行数(行)</view>
        <nut-range v-model="soybean.rows" :min="2" :max="6"></nut-range>
      </nut-cell>
      <nut-cell class="custom-range">
        <view class="custom-range-title">玉豆间距(厘米)</view>
        <nut-range v-model="spacing" :min="60" :max="70"></nut-range>
      </nut-cell>
      <nut-button type="primary" @click="calculate">计算</nut-button>
      <nut-tabs v-model="tabValue">
        <nut-tabpane title="玉米">
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>行数</view>
              </nut-col>
              <nut-col :span="8">
                <view>2行</view>
              </nut-col>
            </nut-row>
          </nut-cell>
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>行距</view>
              </nut-col>
              <nut-col :span="8">
                <view>40厘米</view>
              </nut-col>
            </nut-row>
          </nut-cell>
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>株距</view>
              </nut-col>
              <nut-col :span="8">
                <view v-show="corn.columnSpacing"
                  >{{ corn.columnSpacing }}厘米</view
                >
              </nut-col>
              <nut-col :span="8">
                <picker
                  v-show="corn.columnSpacing"
                  mode="selector"
                  :range="cornColumnSpacingRange"
                  @change="updateExpectedCornColumnSpacing"
                >
                  <nut-button type="default" size="small">调整</nut-button>
                </picker>
              </nut-col>
            </nut-row>
          </nut-cell>
        </nut-tabpane>
        <nut-tabpane title="大豆">
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>行数</view>
              </nut-col>
              <nut-col :span="8">
                <view v-show="soybean.rows">{{ soybean.rows }}行</view>
              </nut-col>
            </nut-row>
          </nut-cell>
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>行距</view>
              </nut-col>
              <nut-col :span="8">
                <view v-show="soybean.rowSpacing"
                  >{{ soybean.rowSpacing }}厘米</view
                >
              </nut-col>
              <nut-col :span="8">
                <picker
                  v-show="soybean.rowSpacing"
                  mode="selector"
                  :range="soybeanRowSpacingRange"
                  @change="updateExpectedSoybeanRowSpacing"
                >
                  <nut-button type="default" size="small">调整</nut-button>
                </picker>
              </nut-col>
            </nut-row>
          </nut-cell>
          <nut-cell>
            <nut-row>
              <nut-col :span="8">
                <view>株距</view>
              </nut-col>
              <nut-col :span="8">
                <view v-show="soybean.columnSpacing"
                  >{{ soybean.columnSpacing }}厘米</view
                >
              </nut-col>
              <nut-col :span="8">
                <picker
                  v-show="soybean.columnSpacing"
                  mode="selector"
                  :range="soybeanColumnSpacingRange"
                  @change="updateExpectedSoybeanColumnSpacing"
                >
                  <nut-button type="default" size="small">调整</nut-button>
                </picker>
              </nut-col>
            </nut-row>
          </nut-cell>
        </nut-tabpane>
      </nut-tabs>
    </view>
  </layout>
</template>

<script lang="ts">
import type { ExpectedFactors } from '@/types'
import type { CommonEventFunction } from "@tarojs/components";
import { reactive, toRefs } from "vue";
import { storeToRefs } from 'pinia'
import Layout from '../../layout.vue'
import range from "lodash/range";
import { useStore } from "@/stores/global";

const cornColumnSpacingRange = range(5, 21);
const soybeanRowSpacingRange = range(20, 41);
const soybeanColumnSpacingRange = range(5, 31);
let cachedExpectedOptions: ExpectedFactors = {}

export default {
  name: "Index",
  components: {
    Layout
  },
  setup() {
    const state = reactive({
      tabValue: 0,
    });

    const store = useStore()

    const calculate = () => {
      store.updateSolution({})
      cachedExpectedOptions = {}
    };

    const updateExpectedCornColumnSpacing: CommonEventFunction<{ value: number }> = (e) => {
      const expectedCornColumnSpacing = cornColumnSpacingRange[e.detail.value];
      cachedExpectedOptions.expectedCornColumnSpacing = expectedCornColumnSpacing
      store.updateSolution(cachedExpectedOptions)
    };

    const updateExpectedSoybeanRowSpacing: CommonEventFunction<{ value: number }> = (e) => {
      const expectedSoybeanRowSpacing = soybeanRowSpacingRange[e.detail.value];
      cachedExpectedOptions.expectedSoybeanRowSpacing = expectedSoybeanRowSpacing
      store.updateSolution(cachedExpectedOptions)
    };

    const updateExpectedSoybeanColumnSpacing: CommonEventFunction<{ value: number }> = (e) => {
      const expectedSoybeanColumnSpacing = soybeanColumnSpacingRange[e.detail.value];
      cachedExpectedOptions.expectedSoybeanColumnSpacing = expectedSoybeanColumnSpacing
      store.updateSolution(cachedExpectedOptions)
    };

    return {
      ...toRefs(state),
      ...storeToRefs(store),
      calculate,
      cornColumnSpacingRange,
      soybeanRowSpacingRange,
      soybeanColumnSpacingRange,
      updateExpectedCornColumnSpacing,
      updateExpectedSoybeanRowSpacing,
      updateExpectedSoybeanColumnSpacing
    };
  },
};
</script>

<style lang="scss">

.nut-range-container .min,
.nut-range-container .max {
  white-space: nowrap;
}
</style>
