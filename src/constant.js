const voidTags = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
];

// Each rule: configKey, regex, replacement
const conversionRuleConfigs = [
    {
        configKey: 'replaceClassWithClassName',
        regex: /class=/g,
        replace: 'className='
    },
    {
        configKey: 'replaceForWithHtmlFor',
        regex: /for=/g,
        replace: 'htmlFor='
    },
    {
        configKey: 'replaceInlineEventHandlers',
        regex: /on([a-z]+)=/g,
        replace: (match, p1) => 'on' + p1.charAt(0).toUpperCase() + p1.slice(1) + '='
    }
];

module.exports = {
    voidTags,
    conversionRuleConfigs
};
