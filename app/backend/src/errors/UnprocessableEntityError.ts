export default class UnprocessableError extends Error {
  private status;
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
    this.status = 422;
  }
}
