---
title: Captions (Live)
sc: 1.2.4

# Properties (lowercase!)
# keyboard / magnification / screenreader / cognitive
group: cognitive

# minor / moderate / severe / blocker
impact: Blocker

sample: all
---

![test](images/001.jpg)
![alt text](images/002.jpg)

##### Problem

Focus styles have been removed through the website's stylesheets:

```css
* { 
  outline: none 
}
```

This causes problems for people who use the website without a mouse, as they will not be able to see where they are.

##### Solution

Remove the `outline: none` rule, and/or add a specific style that applies on `:focus`. Make sure that it has sufficient contrast, too.

##### Documentation

- [Indicating focus to improve accessibility](https://hiddedevries.nl/en/blog/2019-06-06-indicating-focus-to-improve-accessibility)
