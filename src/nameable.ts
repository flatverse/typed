export interface Nameable {
  name?: string|undefined
}

export type Named<T extends Nameable = Nameable> = T & {readonly name:string}

export type UnNamed<T extends Nameable> = Omit<T, "name">
