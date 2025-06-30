import BaseNodeLogic from './BaseNodeLogic';

export default class HttpNodeLogic extends BaseNodeLogic {
  async execute() {
    const { url = '', method = 'GET', body = null } = this.data;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      });

      const json = await response.json();
      return json;
    } catch (err) {
      return `HTTP error: ${err.message}`;
    }
  }

  validate() {
    if (!this.data.url) return `Missing URL in HTTP node "${this.id}".`;
    return null;
  }
}
