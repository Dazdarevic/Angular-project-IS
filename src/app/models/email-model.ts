export class EmailModel {
  email: string;
  subject: string;
  message: string;

  constructor(email: string, subject: string, message: string) {
    this.email = email;
    this.subject = subject;
    this.message = message;
  }
}
