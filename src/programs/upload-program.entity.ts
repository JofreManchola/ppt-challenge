import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UploadProgramDto {
  @PrimaryColumn()
  ProgramID: number;

  @Column()
  ProgramName: string;

  @Column()
  TherapeuticAreas: string[];

  @Column()
  Drugs: string[];

  @Column()
  CoverageEligibilities: string[];

  @Column()
  FundLevels: any[];

  @Column()
  Manufacturers: string[];

  @Column()
  ProgramURL: string;

  @Column()
  HelpLine: string;

  @Column()
  EnrollmentReq: boolean;

  @Column()
  EnrollmentURL: string;

  @Column()
  ExpirationDate: string;

  @Column()
  EstAppTime: string;

  @Column()
  EligibilityDetails: string;

  @Column()
  IncomeReq: boolean;

  @Column()
  IncomeDetails: string;

  @Column()
  AnnualMax: string;

  @Column()
  MaximumBenefit: string; // TODO: Confirm type

  @Column()
  OfferRenewable: boolean;

  @Column()
  RenewalMethod: string;

  @Column()
  AddRenewalDetails: string;

  @Column()
  ProgramDetails: string;

  @Column()
  MADetails: string;

  @Column()
  AddOnProgram: boolean;

  @Column()
  AddOnDetails: boolean; // TODO: Confirm type

  @Column()
  BridgeProgram: boolean;

  @Column()
  BridgeDetails: string; // TODO: Confirm type

  @Column()
  FreeTrialOffer: boolean;

  @Column()
  CouponVehicle: string;

  @Column()
  ProcessingVendor: string;

  @Column()
  BinNum: string;

  @Column()
  PCNNum: string;

  @Column()
  GroupNum: string;

  @Column()
  MaxNumberUses: string;

  @Column()
  ActivationReq: boolean;

  @Column()
  ActivationMethod: string;

  @Column()
  ActivationNum: string;

  @Column()
  ClicknPrint: boolean;

  @Column()
  FundLevelType: string; // TODO: Confirm type

  @Column()
  RestrictionDetails: string; // TODO: Confirm type

  @Column()
  AssistanceType: string;

  @Column()
  LastUpdated: string; // TODO: Change to date

  @Column()
  AssociatedCoupons: string; // TODO: Confirm type

  @Column()
  AssociatedPAPs: any[]; // TODO: Confirm type
}
