import { Transform, TransformConfig } from "redux-persist";

export type PathSelector<State> = (state: State) => string|Array<string>;

interface PasswordConfig<State> extends TransformConfig {
  serviceName: string;
  accountName?: string;
  passwordPaths?: string|Array<string>|PathSelector<State>;
  clearPasswords?: boolean;
  serialize?: boolean;
  logger?: Function;
}

export default function createPasswordTransform<State, Raw>(config?: PasswordConfig<State>): Transform<State, Raw>;
