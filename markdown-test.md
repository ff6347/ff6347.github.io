# Markdown Test Document

This document tests various markdown elements to ensure proper rendering.

## Text Formatting

**Bold text** and __also bold__
*Italic text* and _also italic_
***Bold and italic*** and ___also bold and italic___
~~Strikethrough text~~
`Inline code`

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Deeply nested item
- Third item

* Alternative bullet
* Another item
+ Yet another bullet style

### Ordered Lists

1. First numbered item
2. Second numbered item
   1. Nested numbered item
   2. Another nested numbered item
3. Third numbered item

## Code Blocks

### Inline Code
Use `console.log()` to output to the console.

### Code Blocks

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}

greetUser('World');
```

```python
def calculate_sum(a, b):
    return a + b

result = calculate_sum(5, 3)
print(f"The sum is: {result}")
```

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
> 
> > This is a nested blockquote.

## Links and Images

[Link to Google](https://google.com)
[Link with title](https://example.com "Example Title")

Auto-link: https://github.com

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |

## Horizontal Rule

---

## Special Characters

- Em dash: —
- En dash: –
- Ellipsis: …
- Copyright: ©
- Trademark: ™

## HTML Elements

<strong>Bold HTML</strong>
<em>Italic HTML</em>
<code>Inline HTML code</code>

<div>
  <p>HTML block element</p>
</div>

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
  - [x] Nested completed task
  - [ ] Nested incomplete task

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## Footnotes

This text has a footnote[^1].

Another footnote reference[^note].

[^1]: This is the first footnote.
[^note]: This is a named footnote.