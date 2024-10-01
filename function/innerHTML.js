/**
 * @param {string[]} optionInnerTexts
 * @param {string[]} selectedOptionInnerTexts
 * @returns {string}
 */
export default (
    optionInnerTexts,
    selectedOptionInnerTexts
) => optionInnerTexts
    .map(text => {
        if (selectedOptionInnerTexts.includes(text)) {
            return `<option selected>${text}</option>`
        } else {
            return `<option>${text}</option>`
        }
    }).join('\n')
