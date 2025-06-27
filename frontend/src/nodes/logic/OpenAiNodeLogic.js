import BaseNodeLogic from './BaseNodeLogic';

export default class OpenAiNodeLogic extends BaseNodeLogic {

validate() {
  if (!this.data.prompt || this.data.prompt.length < 2) {
    return { valid: false, reason: 'No prompt or promt too short' };
  }
  return { valid: true };
}

  async execute() {

    try {
      const response = await fetch('http://localhost:8000/testAgent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        apiKey: localStorage.getItem('openai_key'),
        prompt: this.data.prompt,
        tool: this.data.tool,
      }),
    });

      const json = await response.json();
      return json.output || json.error || 'no response';
    } catch (err) {
      return `Błąd: ${err.message}`;
    }
  }
}


