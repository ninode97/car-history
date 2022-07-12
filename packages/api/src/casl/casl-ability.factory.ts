import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  User,
  Car,
  Brand,
  CarHistory,
  CodeForAccounting,
  Company,
  Model,
  UserRole,
} from '@prisma/client';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { UserRoleEnumeration } from 'src/user/enums/user-role.enum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

//type PrismaModels =
//type Subjects = InferSubjects<User | Car> | 'all';

//export type AppAbility = Ability<[Action, Subjects]>;

enum PrismaModels {
  User = 'User',
  UserRole = 'UserRole',
  Car = 'Car',
  CarHistory = 'CarHistory',
  Brand = 'Brand',
  Model = 'Model',
  CodeForAccounting = 'CodeForAccounting',
  Company = 'Company',
}

type ActionOptions = {
  key: PrismaModels;
  canRead: boolean;
  canCreate: boolean;
  canDelete: boolean;
  canManage: boolean;
  canUpdate: boolean;
};

export type PrismaSubjects = Subjects<{
  User: User;
  UserRole: UserRole;
  Car: Car;
  CarHistory: CarHistory;
  Brand: Brand;
  Model: Model;
  CodeForAccounting: CodeForAccounting;
  Company: Company;
}>;

export type PrismaAppAbility = PrismaAbility<[string, PrismaSubjects]>;

export const AppAbility = PrismaAbility as AbilityClass<PrismaAppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { build, can, cannot } = new AbilityBuilder(AppAbility);
    const apply = this.apply[user?.userRoleId];
    apply && apply.bind(this)(can, cannot);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<PrismaSubjects>,
    });
  }

  get apply() {
    return {
      [UserRoleEnumeration.ADMINISTRATOR]: this.applyAdminUser,
      [UserRoleEnumeration.MODERATOR]: this.applyModeratorUser,
      [UserRoleEnumeration.REGULAR]: this.applyRegularUser,
    };
  }

  applyRegularUser(can, cannot) {}

  applyModeratorUser(can, cannot) {
    this.setPerms(can, cannot, {
      key: PrismaModels.User,
      canRead: true,
      canUpdate: true,
      canCreate: true,
      canManage: true,
      canDelete: false,
    });
    this.setPerms(can, cannot, {
      key: PrismaModels.Car,
      canRead: true,
      canUpdate: true,
      canCreate: true,
      canManage: false,
      canDelete: false,
    });
    this.setPerms(can, cannot, {
      key: PrismaModels.CarHistory,
      canRead: true,
      canUpdate: false,
      canCreate: false,
      canManage: false,
      canDelete: false,
    });
    this.setPerms(can, cannot, {
      key: PrismaModels.UserRole,
      canRead: true,
      canUpdate: true,
      canCreate: true,
      canManage: false,
      canDelete: false,
    });
  }

  applyAdminUser(can, cannot) {
    can(Action.Manage, 'all');
  }

  setPerms(can, cannot, options: ActionOptions) {
    options.canRead
      ? can(Action.Read, options.key)
      : cannot(Action.Read, options.key);
    options.canCreate
      ? can(Action.Create, options.key)
      : cannot(Action.Create, options.key);
    options.canDelete
      ? can(Action.Delete, options.key)
      : cannot(Action.Delete, options.key);
    options.canManage
      ? can(Action.Manage, options.key)
      : cannot(Action.Manage, options.key);
    options.canUpdate
      ? can(Action.Update, options.key)
      : cannot(Action.Update, options.key);
  }
}
