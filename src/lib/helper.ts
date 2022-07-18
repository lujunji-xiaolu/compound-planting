const MU = 6000 / 9;

/**
 * 计算种植带宽度
 * @param rows 行数
 * @param rowSpacing 行距
 * @returns 种植带宽度
 */
export function widthOfPlantingStrip(rows: number, rowSpacing: number) {
  return (rows - 1) * rowSpacing;
}

/**
 * 计算全田计产行距
 * 全田计产行距=[玉米带宽度+大豆带宽度+2个间距]/带内行数
 * @param cornBeltWidth 玉米带宽度
 * @param soybeanBeltWidth 大豆带宽度
 * @param spacing 间距
 * @param rows 带内行数
 * @returns 全田计产行距
 */
export function wholeFieldYieldingRowSpacing(
  cornBeltWidth: number,
  soybeanBeltWidth: number,
  spacing: number,
  rows: number
) {
  return (cornBeltWidth + soybeanBeltWidth + 2 * spacing) / rows;
}

/**
 * 计算密度
 * 密度=亩/[全田计产行距×株距]
 * @param wholeFieldYieldingRowSpacing 全田计产行距(cm)
 * @param columnSpacing 株距(cm)
 * @returns 密度(粒/亩)
 */
export function density(
  wholeFieldYieldingRowSpacing: number,
  columnSpacing: number
) {
  return (MU * 10000) / (wholeFieldYieldingRowSpacing * columnSpacing);
}

/**
 * 计算亩播种量
 * 亩播种量=密度×百粒重/100
 * @param density 密度(粒/亩)
 * @param HGW 百粒重(hundred-grain weight)(克)
 * @returns 亩播种量(千克/亩)
 */
export function seedingRate(density: number, HGW: number) {
  return (density * HGW) / 100000;
}

/**
 * 计算每个播种单体10米下种量
 * 每个播种单体10米下种量=[亩播种量/亩]×[全田计产行距×10米]
 * 玉米：百粒重按30克计，每增加(减少)1克，10米下种量增加（减少）10克，1千克=1000克
 * 大豆：百粒重按20克计，每增加(减少)1克，10米下种量增加（减少）10克，1千克=1000克
 * @param seedingRate 亩播种量(千克/亩)
 * @param wholeFieldYieldingRowSpacing 全田计产行距(cm)
 * @returns 每个播种单体10米下种量(克/10米)
 */
export function seedingRatePerTenMeters(
  seedingRate: number,
  wholeFieldYieldingRowSpacing: number
) {
  return (
    (seedingRate / MU) * ((wholeFieldYieldingRowSpacing / 100) * 10) * 1000
  );
}

/**
 * 计算亩用肥量
 * 亩用肥量=密度×每株施纯氮量/复合肥含氮百分率
 * @param density 密度(粒/亩)
 * @param pureNitrogenAmount 千克
 * @param percentageOfNitrogen
 * @returns 亩用肥量(千克/亩)
 */
export function theAmountOfFertilizerUsed(
  density: number,
  pureNitrogenAmount: number,
  percentageOfNitrogen: number
) {
  return (density * pureNitrogenAmount) / percentageOfNitrogen;
}

/**
 * 计算每个播种单体10米下肥量
 * 每个播种单体10米下肥量=[亩用肥量/亩]×[10米×计产行距]
 * 按每亩种肥12千克纯氮计，每增加（减少)1千克纯氮，每10米下肥量增加（减少）75克
 * @param theAmountOfFertilizerUsed 亩用肥量(千克/亩)
 * @param wholeFieldYieldingRowSpacing 全田计产行距(cm)
 * @returns 每个播种单体10米下肥量(千克/10米)
 */
export function theAmountOfFertilizerUsedPerTenMeters(
  theAmountOfFertilizerUsed: number,
  wholeFieldYieldingRowSpacing: number
) {
  return (
    (theAmountOfFertilizerUsed / MU) * 10 * (wholeFieldYieldingRowSpacing / 100)
  );
}
