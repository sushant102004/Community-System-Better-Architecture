export interface IErrorSeralized {
    message: string;
    param?: string;
  }
  export default abstract class CustomError extends Error {
    abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    abstract serialize(): IErrorSeralized[];
  }