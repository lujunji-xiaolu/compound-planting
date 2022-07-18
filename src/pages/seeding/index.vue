<template>
  <layout>
    <view class="container">
      <nut-cell class="custom-range">
        <view class="custom-range-title">玉米百粒重(克)</view>
        <nut-range v-model="corn.HGW" :min="20" :max="35"></nut-range>
      </nut-cell>
      <nut-cell class="custom-range">
        <view class="custom-range-title">大豆百粒重(克)</view>
        <nut-range v-model="soybean.HGW" :min="10" :max="30"></nut-range>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>玉米亩播种量</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="cornSeedingRate">{{
              `${cornSeedingRate}千克/亩`
            }}</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="13">
            <view>玉米播种单体10米下种量</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="cornSeedingRatePerTenMeters">{{
              `${cornSeedingRatePerTenMeters}克/10米`
            }}</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>大豆亩播种量</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="soybeanSeedingRate">{{
              `${soybeanSeedingRate}千克/亩`
            }}</view>
          </nut-col>
        </nut-row>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="13">
            <view>大豆播种单体10米下种量</view>
          </nut-col>
          <nut-col :span="8">
            <view v-show="soybeanSeedingRatePerTenMeters">{{
              `${soybeanSeedingRatePerTenMeters}克/10米`
            }}</view>
          </nut-col>
        </nut-row>
      </nut-cell>
    </view>
  </layout>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import Layout from "@/layout.vue";
import { useStore } from "@/stores/global";
import { seedingRate, seedingRatePerTenMeters } from "@/lib/helper";
import round from "lodash/round";
export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const { corn, soybean } = storeToRefs(store);

    const cornSeedingRate = computed(() => {
      if (store.corn.density === undefined) {
        return;
      }
      return round(seedingRate(store.corn.density, store.corn.HGW), 3);
    });
    const cornSeedingRatePerTenMeters = computed(() => {
      if (
        cornSeedingRate.value === undefined ||
        store.corn.wholeFieldYieldingRowSpacing === undefined
      )
        return;
      return round(
        seedingRatePerTenMeters(
          cornSeedingRate.value,
          store.corn.wholeFieldYieldingRowSpacing
        )
      );
    });

    const soybeanSeedingRate = computed(() => {
      if (store.soybean.density === undefined) {
        return;
      }
      return round(seedingRate(store.soybean.density, store.soybean.HGW), 3);
    });
    const soybeanSeedingRatePerTenMeters = computed(() => {
      if (
        soybeanSeedingRate.value === undefined ||
        store.soybean.wholeFieldYieldingRowSpacing === undefined
      )
        return;
      return round(
        seedingRatePerTenMeters(
          soybeanSeedingRate.value,
          store.soybean.wholeFieldYieldingRowSpacing
        )
      );
    });

    return {
      corn,
      soybean,
      cornSeedingRate,
      cornSeedingRatePerTenMeters,
      soybeanSeedingRate,
      soybeanSeedingRatePerTenMeters,
    };
  },
};
</script>
