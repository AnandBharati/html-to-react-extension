const conversionRules = [
    // class -> className
    {
        regex: /class=/g,
        replace: 'className='
    },
    // for -> htmlFor
    {
        regex: /for=/g,
        replace: 'htmlFor='
    },
    // inline event handlers (onclick -> onClick, etc.)
    {
        regex: /on([a-z]+)=/g,
        replace: (match, p1) => 'on' + p1.charAt(0).toUpperCase() + p1.slice(1) + '='
    }
];

const voidTags = [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
];

module.exports = {
    conversionRules,
    voidTags
};
