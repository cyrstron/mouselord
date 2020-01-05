import {observable, computed, action} from 'mobx';

export interface FormField<Value = any> {
  validate: () => Promise<void>;
  value: Value;
  isValid?: boolean;
  isPending: boolean;
  debouncePromise?: Promise<void>;
  reset: () => void;
}

interface InputsStoreProps {
  inputs: FormField[];
  validate?: (inputs: FormField[]) => void | Promise<void>;
}

export class InputsStore {
  inputs: FormField[] = [];

  @observable error?: Error;
  @observable isPending = false;

  validateInputs?: (inputs: FormField[]) => void | Promise<void>;

  constructor({
    inputs,
    validate,
  }: InputsStoreProps) {
    this.inputs = inputs;
    this.validateInputs = validate;
  }

  @computed
  get isValid(): boolean {
    return !this.error && this.inputs.reduce(
      (isValid: boolean, input) => isValid && input.isValid !== false && !input.isPending,
      true,
    );
  }

  setInputs(inputs: FormField[]): void {
    this.inputs = inputs;
  }

  @action
  async validate(): Promise<void | never> {
    let error: Error | undefined;

    await Promise.all(
      this.inputs
        .filter(({isValid, debouncePromise}) => isValid === undefined || !!debouncePromise)
        .map((input) => input.debouncePromise || input.validate()),
    );

    if (!this.validateInputs) return;

    try {
      const validationPromise = this.validateInputs(this.inputs);

      if (!(validationPromise instanceof Promise)) return;

      this.isPending = true;

      await validationPromise;
    } catch (err) {
      error = err;
    } finally {
      if (this.isPending) {
        this.isPending = false;
      }

      this.error = error;
    }
  }

  reset(): void {
    this.inputs.forEach((input) => input.reset());
  }

  refresh(): void {
    this.error = undefined;
    this.isPending = false;
  }
}
