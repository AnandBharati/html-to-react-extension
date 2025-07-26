const vscode = require('vscode');
const { voidTags, conversionRuleConfigs } = require('./constant');

function htmlToReact(html) {
    let reactCode = html;

    // Get user settings
    const config = vscode.workspace.getConfiguration('htmlToReactConverter');

    // Apply conversion rules based on settings
    for (const rule of conversionRuleConfigs) {
        if (config.get(rule.configKey, true)) {
            reactCode = reactCode.replace(rule.regex, rule.replace);
        }
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

