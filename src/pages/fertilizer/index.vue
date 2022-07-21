<template>
  <layout>
    <view class="container">
      <nut-cell class="between">
        <nut-row>
          <nut-col :span="13"> <view>玉米每株施纯氮量(克/株)</view></nut-col>
          <nut-col :span="11">
            <nut-inputnumber
              v-model="corn.pureNitrogenAmount"
              :min="3"
              :max="5"
              step="0.1"
              decimal-places="1"
            />
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell class="custom-range">
        <view class="custom-range-title">玉米复合肥含氮百分率(%)</view>
        <nut-range
          v-model="corn.percentageOfNitrogen"
          :min="15"
          :max="35"
        ></nut-range>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>玉米亩用肥量</view>
          </nut-col>
          <nut-col :span="16">
            <view v-show="cornTheAmountOfFertilizerUsed"
              >{{ cornTheAmountOfFertilizerUsed }}千克/亩</view
            >
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="13">
            <view>玉米播种单体10米下肥量</view>
          </nut-col>
          <nut-col :span="11">
            <view v-show="cornTheAmountOfFertilizerUsedPerTenMeters"
              >{{ cornTheAmountOfFertilizerUsedPerTenMeters }}千克/10米</view
            >
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell class="center">玉米-大豆带状复合种植施肥方案（参考）</nut-cell>
      <nut-table :columns="columns" :data="data"></nut-table>
    </view>
  </layout>
</template>

<script lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import Layout from "@/layout.vue";
import { useStore } from "@/stores/global";
import {
  theAmountOfFertilizerUsed,
  theAmountOfFertilizerUsedPerTenMeters,
} from "@/lib/helper";
import round from "lodash/round";
const columns = [
  {
    title: "",
    key: "name",
  },
  {
    title: "间作区",
    key: "sex",
  },
  {
    title: "套作区",
    key: "record",
  },
];
const data = [
  {
    name: "玉米",
    sex:
      "选用高氮缓控释肥，每亩施用50～65公斤（折合纯氮14～18公斤/亩，如N‒P2O5‒K2O=28‒8‒6）",
    record: "每亩施20～25公斤玉米专用复合肥（N‒P2O5‒K2O=28‒8‒6）",
  },
  {
    name: "大豆",
    sex:
      "大豆选用低氮缓控释肥，每亩施用15～20公斤（折合纯氮2.0～3.0公斤/亩，如N‒P2O5‒K2O=14‒15‒14）",
    record:
      "玉米大喇叭口期结合机播大豆，距离玉米行20～25 厘米处每亩追施复合肥40～50公斤（折合纯氮6～7公斤/亩，如N‒P2O5‒K2O=14‒15‒14），实现玉米大豆肥料共用",
  },
];

export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const { corn } = storeToRefs(store);

    const cornTheAmountOfFertilizerUsed = computed(() => {
      if (store.corn.density === undefined) return;
      return round(
        theAmountOfFertilizerUsed(
          store.corn.density,
          store.corn.pureNitrogenAmount / 1000,
          store.corn.percentageOfNitrogen / 100
        ),
        3
      );
    });
    const cornTheAmountOfFertilizerUsedPerTenMeters = computed(() => {
      if (
        cornTheAmountOfFertilizerUsed.value === undefined ||
        store.corn.wholeFieldYieldingRowSpacing === undefined
      )
        return;
      return round(
        theAmountOfFertilizerUsedPerTenMeters(
          cornTheAmountOfFertilizerUsed.value,
          store.corn.wholeFieldYieldingRowSpacing
        ),
        3
      );
    });

    return {
      corn,
      cornTheAmountOfFertilizerUsed,
      cornTheAmountOfFertilizerUsedPerTenMeters,
      columns,
      data,
    };
  },
};
</script>

<style lang="scss">
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
