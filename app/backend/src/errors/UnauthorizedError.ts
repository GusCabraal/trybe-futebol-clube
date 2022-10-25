export default class UnauthorizedError extends Error {
  private status;
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
