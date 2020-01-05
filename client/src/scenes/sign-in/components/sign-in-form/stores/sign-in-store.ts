import {action, computed} from 'mobx';
import {InputStore} from '@stores/input-store';
import {InputsStore} from '@stores/inputs-store';
import {SignInPayload} from '@state/reducers/auth/auth-operations';
import {emailValidationRegex} from '../../../../../consts';

export class SignInStore {
  email: InputStore<string>;
  password: InputStore<string>;

  inputs: InputsStore;

  constructor() {
    this.email = new InputStore({
      value: '',
      validate: this.validateEmail,
    });
    this.password = new InputStore({
      value: '',
      validate: this.validatePassword,
    });

    this.inputs = new InputsStore({
      inputs: [
        this.email,
        this.password,
      ],
    });
  }

  validateEmail = (value: string): void | never => {
    if (!value) throw Error('Email is required field');

    if (!emailValidationRegex.test(value)) throw Error('Email is not valid');
  }

  validatePassword = (value: string): void | never => {
    if (!value) throw Error('Password is required field');

    if (value.length < 3) throw Error('Password should have at least 3 characters');
  }

  get isValid(): boolean {
    return this.inputs.isValid;
  }

  @computed
  get values(): SignInPayload {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }

  async validate(): Promise<void> {
    await this.inputs.validate();
  }

  @action
  reset(): void {
    this.inputs.reset();
  }
}
