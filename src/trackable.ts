export interface Trackable {
  id?: number|undefined
}

export type Tracked<T extends Trackable = Trackable> = T & {id: number}

export type UnTracked<T extends Tracked = Tracked> = Omit<T, "id"> | Trackable
