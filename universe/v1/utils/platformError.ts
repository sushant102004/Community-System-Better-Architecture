import CustomError, { IErrorSeralized } from "./CustomError";

export class PlatformError extends CustomError {
  statusCode: number = 400;

  errors: IErrorSeralized[] = [];

  constructor(errors: IErrorSeralized[]) {
    super("InvalidRequest");

    this.message = "InvalidRequest";

    this.errors = errors;

    Object.setPrototypeOf(this, PlatformError.prototype);
  }

  serialize(): IErrorSeralized[] {
    return this.errors.map((item) => ({
      message: item.message,
      param: item.param,
    }));
  }
}