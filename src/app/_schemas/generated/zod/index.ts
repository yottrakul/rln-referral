import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','password','role','hospitalId']);

export const HospitalScalarFieldEnumSchema = z.enum(['id','hospitalName']);

export const Hitory_process_listScalarFieldEnumSchema = z.enum(['id','hospitalId','sender','recive','reject','accept','createAt']);

export const Referral_caseScalarFieldEnumSchema = z.enum(['id','patientId','status','senderHospital','startHospital','receiverHospital']);

export const Patient_infoScalarFieldEnumSchema = z.enum(['id','citizenId','patientFirstname','patientSurname','brithDate','gender','bloodType','houseNumber','moo','subDistrict','subArea','province','postalCode']);

export const Med_recordScalarFieldEnumSchema = z.enum(['id','case','date','doctor','hospital','detail']);

export const Log_case_statusScalarFieldEnumSchema = z.enum(['caseId','statusTo','statusFrom','changeAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','PHYSICIAN','MEDICAL_ASSISTANT','GUEST']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const StatusSchema = z.enum(['PENDING','ACCEPT','REJECT','COMPLETE']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const GenderSchema = z.enum(['MALE','FEMALE','UNDEFINED']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const BloodTypeSchema = z.enum(['A','B','AB','O','UNDEFINED']);

export type BloodTypeType = `${z.infer<typeof BloodTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  password: z.string().nullable(),
  hospitalId: z.number().int().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// HOSPITAL SCHEMA
/////////////////////////////////////////

export const HospitalSchema = z.object({
  id: z.number().int(),
  hospitalName: z.string(),
})

export type Hospital = z.infer<typeof HospitalSchema>

/////////////////////////////////////////
// HOSPITAL PARTIAL SCHEMA
/////////////////////////////////////////

export const HospitalPartialSchema = HospitalSchema.partial()

export type HospitalPartial = z.infer<typeof HospitalPartialSchema>

/////////////////////////////////////////
// HITORY PROCESS LIST SCHEMA
/////////////////////////////////////////

export const Hitory_process_listSchema = z.object({
  id: z.number().int(),
  hospitalId: z.number().int(),
  sender: z.number().int(),
  recive: z.number().int(),
  reject: z.number().int(),
  accept: z.number().int(),
  createAt: z.coerce.date(),
})

export type Hitory_process_list = z.infer<typeof Hitory_process_listSchema>

/////////////////////////////////////////
// HITORY PROCESS LIST PARTIAL SCHEMA
/////////////////////////////////////////

export const Hitory_process_listPartialSchema = Hitory_process_listSchema.partial()

export type Hitory_process_listPartial = z.infer<typeof Hitory_process_listPartialSchema>

/////////////////////////////////////////
// REFERRAL CASE SCHEMA
/////////////////////////////////////////

export const Referral_caseSchema = z.object({
  status: StatusSchema,
  id: z.string().cuid(),
  patientId: z.number().int(),
  senderHospital: z.number().int(),
  startHospital: z.number().int(),
  receiverHospital: z.number().int(),
})

export type Referral_case = z.infer<typeof Referral_caseSchema>

/////////////////////////////////////////
// REFERRAL CASE PARTIAL SCHEMA
/////////////////////////////////////////

export const Referral_casePartialSchema = Referral_caseSchema.partial()

export type Referral_casePartial = z.infer<typeof Referral_casePartialSchema>

/////////////////////////////////////////
// PATIENT INFO SCHEMA
/////////////////////////////////////////

export const Patient_infoSchema = z.object({
  gender: GenderSchema,
  bloodType: BloodTypeSchema,
  id: z.number().int(),
  citizenId: z.string(),
  patientFirstname: z.string(),
  patientSurname: z.string(),
  brithDate: z.coerce.date(),
  houseNumber: z.string().nullable(),
  moo: z.string().nullable(),
  subDistrict: z.string().nullable(),
  subArea: z.string().nullable(),
  province: z.string().nullable(),
  postalCode: z.string().nullable(),
})

export type Patient_info = z.infer<typeof Patient_infoSchema>

/////////////////////////////////////////
// PATIENT INFO PARTIAL SCHEMA
/////////////////////////////////////////

export const Patient_infoPartialSchema = Patient_infoSchema.partial()

export type Patient_infoPartial = z.infer<typeof Patient_infoPartialSchema>

/////////////////////////////////////////
// MED RECORD SCHEMA
/////////////////////////////////////////

export const Med_recordSchema = z.object({
  id: z.string().cuid(),
  case: z.string(),
  date: z.coerce.date(),
  doctor: z.string(),
  hospital: z.string(),
  detail: z.string(),
})

export type Med_record = z.infer<typeof Med_recordSchema>

/////////////////////////////////////////
// MED RECORD PARTIAL SCHEMA
/////////////////////////////////////////

export const Med_recordPartialSchema = Med_recordSchema.partial()

export type Med_recordPartial = z.infer<typeof Med_recordPartialSchema>

/////////////////////////////////////////
// LOG CASE STATUS SCHEMA
/////////////////////////////////////////

export const Log_case_statusSchema = z.object({
  caseId: z.string(),
  statusTo: z.string(),
  statusFrom: z.string(),
  changeAt: z.coerce.date(),
})

export type Log_case_status = z.infer<typeof Log_case_statusSchema>

/////////////////////////////////////////
// LOG CASE STATUS PARTIAL SCHEMA
/////////////////////////////////////////

export const Log_case_statusPartialSchema = Log_case_statusSchema.partial()

export type Log_case_statusPartial = z.infer<typeof Log_case_statusPartialSchema>
