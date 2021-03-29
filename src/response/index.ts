class Base {
  data!: any;
  message!: string;
  constructor(data, message) {
    this.data = data;
    this.message = message;
  }
}

export class Success extends Base {
  errno!: number;
  constructor(data, message) {
    super(data, message);
    this.errno = 1;
  }
}

export class Error extends Base {
  errno!: number;
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}
