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
      <!-- 玉米行数 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>玉米行数</view>
          </nut-col>
          <nut-col :span="8">
            <view>2行</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 大豆行数 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>大豆行数</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="soybean.rows">{{ soybean.rows }}行</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 玉米行距 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>玉米行距</view>
          </nut-col>
          <nut-col :span="8">
            <view>40厘米</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 大豆行距 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>大豆行距</view>
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
              <nut-button type="default" size="mini" class="nut-button-rewrite"
                >调整</nut-button
              >
            </picker>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 玉米株距 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>玉米株距</view>
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
              <nut-button type="default" size="mini" class="nut-button-rewrite"
                >调整</nut-button
              >
            </picker>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 大豆株距 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>大豆株距</view>
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
              <nut-button type="default" size="mini" class="nut-button-rewrite"
                >调整</nut-button
              >
            </picker>
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 玉米密度 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>玉米密度</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="corn.density"
              >{{ Math.round(corn.density) }}粒/亩</view
            >
          </nut-col>
          <nut-col :span="8">
            <nut-dialog
              teleport="#app"
              title="玉米密度"
              v-model:visible="cornDensityDialogVisible"
              @ok="updateExpectedCornDensity"
            >
              <view class="center">
                <nut-inputnumber
                  v-model="expectedCornDensity"
                  min="2500"
                  max="5000"
                />
              </view>
            </nut-dialog>
            <nut-button
              v-show="corn.density"
              type="default"
              size="mini"
              class="nut-button-rewrite"
              @click="showCornDensityDialog"
              >调整</nut-button
            >
          </nut-col>
        </nut-row>
      </nut-cell>
      <!-- 大豆密度 -->
      <nut-cell class="nut-cell-rewrite">
        <nut-row>
          <nut-col :span="8">
            <view>大豆密度</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="soybean.density"
              >{{ Math.round(soybean.density) }}粒/亩</view
            >
          </nut-col>
          <nut-col :span="8">
            <nut-dialog
              teleport="#app"
              title="大豆密度"
              v-model:visible="soybeanDensityDialogVisible"
              @ok="updateExpectedSoybeanDensity"
            >
              <view class="center">
                <nut-inputnumber
                  v-model="expectedSoybeanDensity"
                  min="6500"
                  max="12000"
                />
              </view>
            </nut-dialog>
            <nut-button
              v-show="soybean.density"
              type="default"
              size="mini"
              class="nut-button-rewrite"
              @click="showSoybeanDensityDialog"
              >调整</nut-button
            >
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-button type="primary" @click="calculate">计算</nut-button>
      <Picture />
    </view>
  </layout>
</template>

<script lang="ts">
import type { ExpectedFactors } from '@/types'
import type { CommonEventFunction } from "@tarojs/components";
import { reactive, toRefs } from "vue";
import { storeToRefs } from 'pinia'
import Layout from '@/layout.vue'
import Picture from '@/components/Picture.vue'
import range from "lodash/range";
import { useStore } from "@/stores/global";

const cornColumnSpacingRange = range(5, 21);
const soybeanRowSpacingRange = range(20, 41);
const soybeanColumnSpacingRange = range(5, 31);
let cachedExpectedOptions: ExpectedFactors = {}

export default {
  name: "Index",
  components: {
    Layout,
    Picture,
    Picture
},
  setup() {
    const state = reactive({
      tabValue: 0,
      cornDensityDialogVisible: false,
      expectedCornDensity: 4500,
      soybeanDensityDialogVisible: false,
      expectedSoybeanDensity: 9000
    });

    const showCornDensityDialog = () => {
      state.cornDensityDialogVisible = true
    }

    const showSoybeanDensityDialog = () => {
      state.soybeanDensityDialogVisible = true
    }

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

    const updateExpectedCornDensity = () => {
      cachedExpectedOptions.expectedCornDensity = state.expectedCornDensity
      store.updateSolution(cachedExpectedOptions)
    }

    const updateExpectedSoybeanDensity = () => {
      cachedExpectedOptions.expectedSoybeanDensity = state.expectedSoybeanDensity
      store.updateSolution(cachedExpectedOptions)
    }

    return {
      ...toRefs(state),
      ...storeToRefs(store),
      showCornDensityDialog,
      showSoybeanDensityDialog,
      calculate,
      cornColumnSpacingRange,
      soybeanRowSpacingRange,
      soybeanColumnSpacingRange,
      updateExpectedCornColumnSpacing,
      updateExpectedSoybeanRowSpacing,
      updateExpectedSoybeanColumnSpacing,
      updateExpectedCornDensity,
      updateExpectedSoybeanDensity
    };
  },
};
</script>

<style lang="scss">
.nut-range-container .min,
.nut-range-container .max {
  white-space: nowrap;
}
.nut-button-rewrite {
  display: block;
}
.nut-cell-rewrite {
  display: flex;
  align-items: center;
  height: 50px;
}
</style>
