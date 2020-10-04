const plugin = require('tailwindcss/plugin')

const pseudoElementVariants = plugin(function ({
  addComponents,
  addVariant,
  e,
}) {
  const elements = ['before', 'after']

  for (const element of elements) {
    addComponents({
      [`.${e(`${element}-content`)}::${element}`]: {
        content: `var(--${element}-content, '')`,
      },
      [`.${e(`${element}-inset-0`)}`]: {
        position: 'relative',
      },
      [`.${e(`${element}-inset-0`)}::${element}`]: {
        content: `var(--${element}-content, '')`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    })

    addVariant(element, ({ modifySelectors, separator }) => {
      modifySelectors(
        ({ className }) =>
          `.${e([element, className].join(separator))}::${element}`
      )
    })
  }
})

module.exports = pseudoElementVariants
