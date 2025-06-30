import NodeLogicRegistry from './NodeLogicRegistry';
import OpenAiNodeLogic from '../nodes/logic/OpenAiNodeLogic';
import HttpNodeLogic from '../nodes/logic/HttpNodeLogic';
import DelayNodeLogic from '../nodes/logic/DelayNodeLogic';
import ResultNodeLogic from '../nodes/logic/ResultNodeLogic';
import EmailNodeLogic from '../nodes/logic/EmailNodeLogic';

const registry = new NodeLogicRegistry();

registry.register('openai', OpenAiNodeLogic);
registry.register('http', HttpNodeLogic);
registry.register('delay', DelayNodeLogic);
registry.register('result', ResultNodeLogic);
registry.register('email', EmailNodeLogic);

export default registry;
