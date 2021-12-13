export class BadRequestError extends Error {
    public readonly error: string;
    public readonly errorCode: number;
    private code: number;
  
    constructor(error = 'User error', errorCode?) {
      super(error);
      this.error = error;
      this.errorCode = parseInt(errorCode);
      this.code = 400;
    }
  }
  