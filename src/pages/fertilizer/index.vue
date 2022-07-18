<template>
  <layout>
    <view class="container">
      <nut-cell class="between">
        <view>玉米每株施纯氮量</view>
        <nut-radiogroup v-model="pureNitrogenAmount">
          <nut-radio :label="4.0">间作-4.0克/株</nut-radio>
          <nut-radio :label="2.2">套作-2.2克/株</nut-radio>
        </nut-radiogroup>
      </nut-cell>
      <nut-cell class="custom-range">
        <view class="custom-range-title">玉米复合肥含氮百分率(%)</view>
        <nut-range
          v-model="percentageOfNitrogen"
          :min="15"
          :max="35"
        ></nut-range>
      </nut-cell>
      <nut-cell>
        <nut-row>
          <nut-col :span="8">
            <view>玉米亩用肥量</view>
          </nut-col>
          <nut-col :span="8">
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
    </view>
  </layout>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import Layout from "@/layout.vue";
import { useStore } from "@/stores/global";
import {
  theAmountOfFertilizerUsed,
  theAmountOfFertilizerUsedPerTenMeters,
} from "@/lib/helper";
import round from "lodash/round";
export default {
  components: {
    Layout,
  },
  setup() {
    const store = useStore();
    const percentageOfNitrogen = ref(15);
    const pureNitrogenAmount = ref(4.0);

    const cornTheAmountOfFertilizerUsed = computed(() => {
      if (store.corn.density === undefined) return;
      return round(
        theAmountOfFertilizerUsed(
          store.corn.density,
          pureNitrogenAmount.value / 1000,
          percentageOfNitrogen.value
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
      percentageOfNitrogen,
      pureNitrogenAmount,
      cornTheAmountOfFertilizerUsed,
      cornTheAmountOfFertilizerUsedPerTenMeters,
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
