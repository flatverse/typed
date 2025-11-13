import { UnexpectedTypeError } from "./errors"
import { isObjWithProp, isStr } from "./guards"

/**
 * @interface Typed
 * Generic that guarantees than anything declared to be of this type will have a
 * type string matching the typeparameter T
 */
export interface Typed<T extends string> {
  type: T
}

/**
 * convenience type for getting the specific type-string type of the given Typed implementer TO (TypedObject)
 */
export type TOf<TO extends Typed<string>> = TO["type"]

/**
 * convenience type to remove the Typed-type-string requirement from anything implementing Typed.
 */
export type Untyped<TO extends Typed<string>> = Omit<TO, "type">

/**
 * Guard for ensuring that the given any-value implements/is Typed
 * @param value
 * @returns {boolean} whether or not the value has the required "type" property required to "be a" Typed
 */
export function isTyped(value:any):value is Typed<string> {
    return isObjWithProp("type", isStr, value)
}

/**
 * Ensures the the given value implements Typed and the value of it's .type property matches the "type" value passed in.
 * value.type === type.
 * @param type the type-name to verify that value has
 * @param value the value to check the .type of
 * @returns {boolean} whether or not the value has a "type" property that is set to the value of the parameter "type"
 */
export function isOfType<T extends Typed<string> = Typed<string>>(type:TOf<T>, value:any):value is T {
    return isTyped(value) && value.type === type
}

/**
 * Assert that the given value's type field matches what is passed in
 * @param type 
 * @param value 
 * @returns 
 */
export function assertOfType<T extends Typed<string> = Typed<string>>(type:TOf<T>, value:any):value is T {
    if (!isOfType(type, value)) {
        throw new UnexpectedTypeError(`expected: ${type}, received: ${value?.type}`)
    }
    return true
}

/**
 * Convenience function for "casting" values to a given Typed implementer.
 * Throws an error if the given does not has a type field matching the given `type`
 * returns the value (cast as T) otherwise
 * @param {string} type The type string the given value should be
 * @param value The value to assert is of type T before returning
 * @returns The value (cast as T)
 */
export function guaranteeOfType<T extends Typed<string> = Typed<string>>(type:TOf<T>, value:any):T {
    assertOfType(type, value)
    return value
}

/**
 * Convenience function for making an empty or skeleton typed object.
 * Kind of like a constructor, but the caller is responsible for adding the properties.
 * @param type 
 * @returns 
 */
export function makeEmpty<T extends string>(type:T):Typed<T> {
    return {
        type
    }
}
