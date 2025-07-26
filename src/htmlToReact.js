const { conversionRules, voidTags } = require('./constant');

function htmlToReact(html) {
    let reactCode = html;

    // Apply conversion rules
    for (const rule of conversionRules) {
        reactCode = reactCode.replace(rule.regex, rule.replace);
    }

    // Self-close common void elements
    voidTags.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*)>(?!</${tag}>)`, 'gi');
        reactCode = reactCode.replace(regex, `<${tag}$1 />`);
    });

    // Remove unnecessary closing tags for void elements
    voidTags.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*)></${tag}>`, 'gi');
        reactCode = reactCode.replace(regex, `<${tag}$1 />`);
    });

    return reactCode;
}

module.exports = htmlToReact;

