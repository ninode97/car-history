import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { UserRoleEnumeration } from "../app/models/user";

export enum ActionEnumeration {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum SubjectsEnumeration {
  User = "User",
  UserRole = "UserRole",
  Car = "Car",
  CarHistory = "CarHistory",
  Brand = "Brand",
  Model = "Model",
  CodeForAccounting = "CodeForAccounting",
  Company = "Company",
}

export type SubjectsType = Subjects;

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "User" | "All";

// * If from server

export type AppAbilityType = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbilityType>;

function buildAnonymous(can: any, cannot: any) {
  cannot(["manage"], SubjectsEnumeration.User);
}

function buildAdmin(can: any, cannot: any) {
  can(
    ["manage", "create", "read", "update", "delete"],
    SubjectsEnumeration.Brand
  );
  can(
    ["manage", "create", "read", "update", "delete"],
    SubjectsEnumeration.Model
  );
  can(
    ["manage", "create", "read", "update", "delete"],
    SubjectsEnumeration.Company
  );
  can(
    ["manage", "create", "read", "update", "delete"],
    SubjectsEnumeration.User
  );
}

function buildRegular(can: any, cannot: any) {
  cannot(["manage"], SubjectsEnumeration.User);
}

function buildModerator(can: any, cannot: any) {
  cannot(["manage"], SubjectsEnumeration.User);
}

function buildPermissions() {
  return {
    [UserRoleEnumeration.LOGGED_OFF]: buildAnonymous,
    [UserRoleEnumeration.REGULAR]: buildRegular,
    [UserRoleEnumeration.MODERATOR]: buildModerator,
    [UserRoleEnumeration.ADMINISTRATOR]: buildAdmin,
  };
}

export default function defineRulesFor(role: UserRoleEnumeration) {
  const { can, rules, cannot } = new AbilityBuilder(AppAbility);
  buildPermissions()[role](can, cannot);
  return rules;
}

export function buildAbilityFor(role: UserRoleEnumeration): AppAbilityType {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object!.type,
  });
}
