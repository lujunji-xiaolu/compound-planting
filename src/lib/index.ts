import range from "lodash/range";
import cartesian from "fast-cartesian-product";
import {
  density,
  wholeFieldYieldingRowSpacing,
  widthOfPlantingStrip
} from "./helper";
import type { ExpectedFactors } from '@/types'

const CORN_ROWS = 2;
const CORN_ROW_SPACING = 40;
const BEST_CORN_DENSITY = 4500;
const BEST_SOYBEAN_DENSITY = 9000;
const CORN_DENSITY_WEIGHT = 0.8;

/**
 * 计算可选组合
 * @param soybeanRows 大豆行数
 * @param options 玉米株距期望值、大豆行距期望值、大豆株距期望值
 * @returns 可选组合
 */
function getAllCandidates(
  soybeanRows: number,
  options: {
    expectedCornColumnSpacing?: number;
    expectedSoybeanRowSpacing?: number;
    expectedSoybeanColumnSpacing?: number;
  }
) {
  const {
    expectedCornColumnSpacing,
    expectedSoybeanRowSpacing,
    expectedSoybeanColumnSpacing
  } = options;
  const cornRowsFactor = [CORN_ROWS];
  const cornRowSpacingFactor = [CORN_ROW_SPACING];
  const cornColumnSpacingFactor = expectedCornColumnSpacing
    ? [expectedCornColumnSpacing]
    : range(5, 21);
  const soybeanRowsFactor = [soybeanRows];
  const soybeanRowSpacingFactor = expectedSoybeanRowSpacing
    ? [expectedSoybeanRowSpacing]
    : range(20, 40);
  const soybeanColumnSpacingFactor = expectedSoybeanColumnSpacing
    ? [expectedSoybeanColumnSpacing]
    : range(5, 30);
  return cartesian([
    cornRowsFactor,
    cornRowSpacingFactor,
    cornColumnSpacingFactor,
    soybeanRowsFactor,
    soybeanRowSpacingFactor,
    soybeanColumnSpacingFactor
  ]);
}

/**
 * 计算比较依据
 * @param cornDensity 玉米密度
 * @param soybeanDensity 大豆密度
 * @param options 玉米密度期望值、大豆密度期望值
 * @returns 比较依据
 */
function standard(
  cornDensity: number,
  soybeanDensity: number
) {
  const soybeanDensityWeight = 1 - CORN_DENSITY_WEIGHT;
  return (
    CORN_DENSITY_WEIGHT * Math.abs(cornDensity - BEST_CORN_DENSITY) +
    soybeanDensityWeight * Math.abs(soybeanDensity - BEST_SOYBEAN_DENSITY)
  );
}

/**
 * 计算相关参数
 * @param factors 笛卡尔积参数
 * @param spacing 玉米带大豆带间距
 * @returns 相关参数
 */
function getFactors(
  factors: [number, number, number, number, number, number],
  spacing: number
) {
  const [
    cornRows,
    cornRowSpacing,
    cornColumnSpacing,
    soybeanRows,
    soybeanRowSpacing,
    soybeanColumnSpacing
  ] = factors;
  const cornBeltWidth = widthOfPlantingStrip(cornRows, cornRowSpacing);
  const soybeanBeltWidth = widthOfPlantingStrip(soybeanRows, soybeanRowSpacing);
  const cornWholeFieldYieldingRowSpacing = wholeFieldYieldingRowSpacing(
      cornBeltWidth,
      soybeanBeltWidth,
      spacing,
      cornRows
    )
  const soybeanWholeFieldYieldingRowSpacing = wholeFieldYieldingRowSpacing(
      cornBeltWidth,
      soybeanBeltWidth,
      spacing,
      soybeanRows
    )
  const cornDensity = density(
    cornWholeFieldYieldingRowSpacing,
    cornColumnSpacing
  );
  const soybeanDensity = density(
    soybeanWholeFieldYieldingRowSpacing,
    soybeanColumnSpacing
  );
  return {
    corn: {
      rows: cornRows,
      rowSpacing: cornRowSpacing,
      columnSpacing: cornColumnSpacing,
      wholeFieldYieldingRowSpacing: cornWholeFieldYieldingRowSpacing,
      density: cornDensity
    },
    soybean: {
      rows: soybeanRows,
      rowSpacing: soybeanRowSpacing,
      columnSpacing: soybeanColumnSpacing,
      wholeFieldYieldingRowSpacing: soybeanWholeFieldYieldingRowSpacing,
      density: soybeanDensity
    }
  };
}

/**
 * 计算最佳参数列表
 * @param soybeanRows 大豆行数
 * @param spacing 玉米带鱼大豆带的间距
 * @param options 选项
 * @returns 计算最佳参数列表
 */
export function optimalSolution(
  soybeanRows: number,
  spacing: number,
  options: ExpectedFactors
) {
  const {
    expectedCornColumnSpacing,
    expectedSoybeanRowSpacing,
    expectedSoybeanColumnSpacing,
  } = options;
  const candidates = getAllCandidates(soybeanRows, {
    expectedCornColumnSpacing,
    expectedSoybeanRowSpacing,
    expectedSoybeanColumnSpacing
  }).map(candidate => getFactors(candidate, spacing));
  
  const sortedCandidates = candidates.sort((a, b) => {
    const standardA = standard(a.corn.density, a.soybean.density);
    const standardB = standard(b.corn.density, b.soybean.density);
    return standardA - standardB;
  });
  const candidate = sortedCandidates[0];

  if (candidate) {
    return candidate
  }
}
