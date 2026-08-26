export type SchoolQualityIndicator = {
  id:string; school_id:string; indicator_key:string; indicator_name:string; dimension:string|null;
  value:number; value_unit:"NUMBER"|"PERCENT"; scale_min:number|null; scale_max:number|null;
  classification:string|null; regional_value:number|null; reference_period:string; source:string;
  source_updated_at:string|null; is_primary:boolean;
};
export const SCHOOL_QUALITY_SOURCE:string;
export function latestReferencePeriod(rows:SchoolQualityIndicator[]):string|null;
export function projectSchoolQuality(rows:SchoolQualityIndicator[], requestedPeriod?:string):{
  periods:string[];period:string|null;current:SchoolQualityIndicator[];primary:SchoolQualityIndicator|null;
  dimensions:SchoolQualityIndicator[];comparable:SchoolQualityIndicator[];best:SchoolQualityIndicator|null;
  lowest:SchoolQualityIndicator|null;aboveRegional:SchoolQualityIndicator[];largestPositiveGap:SchoolQualityIndicator|null;
  officialAttention:SchoolQualityIndicator[];
};
export function formatQualityValue(row:SchoolQualityIndicator|null):string;
