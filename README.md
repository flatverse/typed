# Typed
Some Extra Guards and Types for TypeScript

## Gist, Vibes, Philosophy, Misc.
- Lightweight / Minimal / KISS
- Simplify basic type checking during runtime with guards.
- Add a few types and utility classes that make generic typing a bit easier.
- No `null`s, ever, just undefined.
    - Nothing against `null`, it just causes a lot of problems to have both `null` and undefined.
    - Most guards in this package will throw an error if a `null` is encountered.
    - `undefined`s are OK!
- favor shorter variable names when the abbreviations/shorthand names are widely recognized (i.e. `isStr` over `isString`).
    - favor more verbose names when no widely recognized alternative exists
    - `isObjWithOptionalProp`

## Examples
### _*TODO:*_ more examples

```typescript
import { isDef } from "typed/guards";

function someUselessFunc(idk?:string|object = undefined):string|object|undefined {
    return idk;
}

let anUndefinedVar = someUselessFunc(undefined);
if (!isDef(anUndefinedVar)) {
    console.log("anUndefinedVar is undefined");
}

let aNullVar = someUselessFunc(null);
!isDef(anUndefinedVar); // throws an error because we don't like null's here

let aString = someUselessFunc("a real string");
if (!isDef(aString))
{
    throw new Error("its not defined.")
}

let anObjectOrString = aString; // the compiler now knows that anObjectOrString is of type object or string because we used the isDef guard.

let definitelyAString = isStr()

```

## Package Reference
### _*TODO!*_
