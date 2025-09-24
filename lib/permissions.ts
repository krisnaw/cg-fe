import {createAccessControl} from "better-auth/plugins/access";
import {adminAc, defaultStatements, memberAc, ownerAc} from 'better-auth/plugins/organization/access'

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements,
  manager: ["create", "update", "view", "delete"],
  writer: ["create", "update", "view", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const manager = ac.newRole({
  manager: ["create", "update", "view", "delete"],
});

export const writer = ac.newRole({
  writer: ["create", "update", "view", "delete"],
})

export const admin = ac.newRole({
  ...adminAc.statements,
})

export const owner = ac.newRole({
  ...ownerAc.statements,
})

export const member = ac.newRole({
   ...memberAc.statements,
})