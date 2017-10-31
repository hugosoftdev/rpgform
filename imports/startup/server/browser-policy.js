import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowInlineScripts();

BrowserPolicy.content.allowOriginForAll('https://fonts.googleapis.com');
BrowserPolicy.content.allowOriginForAll('https://fonts.gstatic.com');
BrowserPolicy.content.allowOriginForAll('https://js.driftt.com');
