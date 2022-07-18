import type { Factors, ExpectedFactors } from "@/types";
import { defineStore } from "pinia";
import { optimalSolution } from "@/lib";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("global", {
  // other options...
  state: () => ({
    spacing: 60,
    corn: {
      rows: 2,
      HGW: 20
    },
    soybean: {
      rows: 2,
      HGW: 10
    },
  }) as { spacing: number, corn: Factors, soybean: Factors },
  actions: {
    updateSolution(options: ExpectedFactors) {
      const solution = optimalSolution(this.soybean.rows, this.spacing, options);
      if (solution) {
        this.corn.columnSpacing = solution.corn.columnSpacing;
        this.corn.wholeFieldYieldingRowSpacing = solution.corn.wholeFieldYieldingRowSpacing
        this.corn.density = solution.corn.density;
        this.soybean.rowSpacing = solution.soybean.rowSpacing;
        this.soybean.columnSpacing = solution.soybean.columnSpacing;
        this.soybean.wholeFieldYieldingRowSpacing = solution.soybean.wholeFieldYieldingRowSpacing
        this.soybean.density = solution.soybean.density;
      }
    }
  }
});
