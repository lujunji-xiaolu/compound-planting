export interface Factors {
  rows: number;
  rowSpacing?: number;
  columnSpacing?: number;
  wholeFieldYieldingRowSpacing?: number;
  density?: number;
  HGW: number;
}

export interface ExpectedFactors {
  expectedCornColumnSpacing?: number;
  expectedSoybeanRowSpacing?: number;
  expectedSoybeanColumnSpacing?: number;
  expectedCornDensity?: number;
  expectedSoybeanDensity?: number;
}
