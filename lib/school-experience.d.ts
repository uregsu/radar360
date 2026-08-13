/* eslint-disable @typescript-eslint/no-explicit-any */
export type DimensionKey = "class_quality" | "school_climate" | "spaces_and_bathrooms" | "learning_support" | "engagement_life_project" | "overall_satisfaction";
export type DimensionValues = Record<DimensionKey, number>;
export const EXPERIENCE_DIMENSIONS: ReadonlyArray<{key:DimensionKey;label:string}>;
export const ATTENTION_LEVELS: ReadonlyArray<{min:number;max:number;value:string;label:string;rank:number}>;
export function normalizeSchoolName(value:unknown):string;
export function validateDimensionValues(values:DimensionValues):string[];
export function baseAttentionLevel(score:number):{min:number;max:number;value:string;label:string;rank:number};
export function calculateSchoolExperience(values:DimensionValues):any;
export function toSchoolExperienceInsert(row:Record<string,unknown>,importedBy:string):Record<string,unknown>;
export function parseExperienceCsv(text:string):Array<{row:number;schoolName:string;values:DimensionValues}>;
export function prepareExperienceImport(rows:any[],schools:any[],options:{referencePeriod:string;source:string}):{received:number;matched:number;notFound:number;duplicates:number;invalid:number;pending:any[];accepted:any[]};
