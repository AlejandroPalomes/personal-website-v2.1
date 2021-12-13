export class UnauthorizedError extends Error {
    public readonly error: string;
    private code: number;
  
    constructor(error = 'Unauthorized error') {
      super(error);
      this.error = error;
      this.code = 401;
    }
  }
  