# @md/jsx

A primitive JSX compiler that can be used with e.g. esbuild to leverage JSX syntax for element creation.

## Example

```
/// <reference types="npm:@types/react" />
//  ^  Leverage react types in this file  ^
import { React } from "@md/jsx"; // Named import as standard JSX transform uses React namespace

/** This will be converted into a DOM element with correct attributes and children */
const ul = (
  <ul id="example">
    {[1, 2, 3].map((i) => (
      <li className="item" onClick={() => console.log(i)}>
        {i}
      </li>
    ))}
  </ul>
) as unknown as HTMLUListElement; 
// ^ Have to cast as React assumes non native DOM elements ^

document.append(ul)
```
