import BaseNodeLogic from './BaseNodeLogic';

export default class OpenAiNodeLogic extends BaseNodeLogic {

validate() {
  if (!this.data.prompt || this.data.prompt.length < 2) {
    return { valid: false, reason: 'No prompt or promt too short' };
  }
  return { valid: true };
}

  async execute() 
  {

    const endpoint = this.data.tool === 'web_search_preview'
  ? 'http://localhost:8000/agentWithWeb'
  : 'http://localhost:8000/agentBasic';

    const input = this.getInputData(); // ← może być null
    console.log('🔁 INPUT DO OPENAI:', input);
    const prompt = (this.data.prompt || '').replace('{{input}}', input ?? '');

    const fullPrompt = input
      ? `${prompt}\n\nInput data:\n${typeof input === 'object' ? JSON.stringify(input, null, 2) : input}`
      : prompt;

    console.log(fullPrompt);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        apiKey: localStorage.getItem('openai_key'),
        prompt: fullPrompt,
        tool: this.data.tool,
      }),
    });

      const json = await response.json();
      const result = json.output || json.error || 'no response';

      this.setOutputData(result); 
      return result;

    } catch (err) {
      return `Open AI error: ${err.message}`;
    }
  }
}


