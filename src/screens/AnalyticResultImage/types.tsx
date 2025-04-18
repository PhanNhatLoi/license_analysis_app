export type AnalyticsResultType = {
  data: AnalyticsResultDetailDataType[];
  idealProfession: string[];
  impression: string;
  detailedAnalysis: unknown[];
};

export type AnalyticsResultDetailDataType = {
  part: string;
  overview: string[];
  humanlogy: string[];
  suggestion: string;
};
