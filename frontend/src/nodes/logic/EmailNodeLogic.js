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

      this.setOutputData(json.status); // 🔥 przekazuje dalej np. "SENT"
      return json.status;

    } catch (err) {
      const errorMessage = 'EmailNode: ' + err.message;
      this.setOutputData(errorMessage); // 🔥 propaguje komunikat błędu
      console.error('EmailNode Error:', err);
      throw new Error(errorMessage);
    }
  }

  validate() {
    if (!this.data.recipient) return `Missing recipient address in email node "${this.id}".`;
    return null;
  }
}
