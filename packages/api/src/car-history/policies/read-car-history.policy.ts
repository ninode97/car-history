import { Action, PrismaAppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy-handler';

export class ReadCarHistoryPolicyHandler implements IPolicyHandler {
  handle(ability: PrismaAppAbility) {
    return ability.can(Action.Read, 'CarHistory');
  }
}
