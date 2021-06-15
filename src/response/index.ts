class response {
  data!: any;
  message!: string;
  errno!: number;
  constructor(data: any, message: string) {
    this.data = data;
    this.message = message;
  }
}

export class Success extends response {
  constructor(data: any, message = 'Success!') {
    super(data, message);
    this.errno = 1;
  }
}

export class Failure extends response {
  constructor(data: any, message = 'Failure!') {
    super(data, message);
    this.errno = 0;
  }
}

export class CodeError extends Error {
  code!: number;
  message!: string;
  constructor(message = '未知错误', code: number) {
    super(message);
    this.code = code;
  }
}

export class ForbiddenError extends CodeError {
  constructor(message = '拒绝访问') {
    super(message, 403);
  }
}

export class InvalidQueryError extends CodeError {
  constructor(message = '参数错误') {
    super(message, 400);
  }
}
