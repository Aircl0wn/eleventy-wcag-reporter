---
title: Focus style missing

# minor / moderate / severe / blocker
impact: Blocker
sample: all
---

![alt text](images/default-screenshot.png)

#### Problem

Focus styles have been removed through the website's stylesheets:

```css
* { 
  outline: none 
}
```

This causes problems for people who use the website without a mouse, as they will not be able to see where they are.

#### Solution

Remove the `outline: none` rule, and/or add a specific style that applies on `:focus`. Make sure that it has sufficient contrast, too.

#### Read more

- [Indicating focus to improve accessibility](https://hiddedevries.nl/en/blog/2019-06-06-indicating-focus-to-improve-accessibility)
