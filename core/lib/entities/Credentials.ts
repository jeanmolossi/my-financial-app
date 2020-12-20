export class Credentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    if(isInvalid(password)) {
      throw new Error('Sua senha deve conter letras e números');
    }

    this.email = email;
    this.password = password;
  }
}

function isInvalid(password: string) {
  const passwordRegex = /^[a-zA-Z0-9_.-]*$/;
  return !passwordRegex.test(password);
}