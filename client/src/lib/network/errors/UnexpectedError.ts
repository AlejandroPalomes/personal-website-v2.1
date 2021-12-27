export class UnexpectedError extends Error {
    private constructor(message: string) {
      super(message);
    }
  
    static from(message = 'Unexpected error', element?: any): UnexpectedError {
      if (!element) {
        return new UnexpectedError(message);
      }
  
      if (typeof element === 'object') {
        return new UnexpectedError(`${message}: ${JSON.stringify(element)}`);
      }
  
      return new UnexpectedError(`${message}: ${element}`);
    }
  }
  