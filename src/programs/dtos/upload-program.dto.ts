import {
  // IsArray,
  IsBoolean,
  IsCurrency,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UploadProgramDto {
  @IsNumber()
  ProgramID: number;

  @IsString()
  ProgramName: string;

  // @IsArray()
  // TherapeuticAreas: string[];

  // @IsArray()
  // Drugs: string[];

  // @IsArray()
  // CoverageEligibilities: string[];

  // @IsArray()
  // FundLevels: any[];

  // @IsArray()
  // Manufacturers: string[];

  @IsUrl()
  ProgramURL: string;

  @IsString()
  HelpLine: string; // TODO: Consider changing to phone number type

  @IsBoolean()
  EnrollmentReq: boolean;

  @IsUrl()
  EnrollmentURL: string;

  @IsString()
  ExpirationDate: string;

  @IsString()
  EstAppTime: string;

  @IsString()
  EligibilityDetails: string;

  @IsBoolean()
  IncomeReq: boolean;

  @IsString()
  IncomeDetails: string;

  @IsCurrency()
  AnnualMax: string;

  @IsOptional()
  @IsString()
  MaximumBenefit: string;

  @IsBoolean()
  OfferRenewable: boolean;

  @IsString()
  RenewalMethod: string;

  @IsString()
  AddRenewalDetails: string;

  @IsString()
  ProgramDetails: string;

  @IsString()
  MADetails: string;

  @IsBoolean()
  AddOnProgram: boolean;

  @IsOptional()
  @IsBoolean()
  AddOnDetails: boolean; // TODO: Confirm type

  @IsBoolean()
  BridgeProgram: boolean;

  @IsOptional()
  @IsString()
  BridgeDetails: string; // TODO: Confirm type

  @IsBoolean()
  FreeTrialOffer: boolean;

  @IsString()
  CouponVehicle: string;

  @IsString()
  ProcessingVendor: string;

  @IsNumberString()
  BinNum: string;

  @IsString()
  PCNNum: string;

  @IsNumberString()
  GroupNum: string;

  @IsString()
  MaxNumberUses: string;

  @IsBoolean()
  ActivationReq: boolean;

  @IsString()
  ActivationMethod: string;

  @IsString()
  ActivationNum: string;

  @IsBoolean()
  ClicknPrint: boolean;

  @IsOptional()
  @IsString()
  FundLevelType: string; // TODO: Confirm type

  @IsOptional()
  @IsString()
  RestrictionDetails: string; // TODO: Confirm type

  @IsString()
  AssistanceType: string;

  @IsString()
  LastUpdated: string; // TODO: Change to date

  @IsOptional()
  @IsString()
  AssociatedCoupons: string; // TODO: Confirm type

  // @IsArray()
  // AssociatedPAPs: any[]; // TODO: Confirm type
}
