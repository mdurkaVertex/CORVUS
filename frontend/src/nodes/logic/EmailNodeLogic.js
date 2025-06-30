import BaseNodeLogic from './BaseNodeLogic';

export default class EmailNodeLogic extends BaseNodeLogic {
  async execute() {
  const input = this.getInputData();
  const recipient = this.data.recipient;

  if (!recipient || !input) {
    throw new Error('[Error: no recipient or no email body]');
  }

  try {
    const response = await fetch('http://localhost:8000/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipient,
        content: input,
      }),
    });

    const json = await response.json();

    if (json.status !== 'SENT') {
      throw new Error('Email sending failed: ' + (json.error || 'Unknown error'));
    }

    return json.status;
  } catch (err) {
    console.error('EmailNode Error:', err);
    throw new Error('EmailNode: ' + err.message);
  }
}

validate() {
  if (!this.data.recipient) return `Missing recipient address in email node "${this.id}".`;
  return null;
}

}
