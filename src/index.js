"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drupal = exports.drupalAuth = void 0;
const tslib_1 = require("tslib");
const pieces_common_1 = require("@activepieces/pieces-common");
const pieces_framework_1 = require("@activepieces/pieces-framework");
const shared_1 = require("@activepieces/shared");
const tools_1 = require("./lib/actions/tools");
const polling_1 = require("./lib/triggers/polling");
const webhook_1 = require("./lib/triggers/webhook");
const markdownPropertyDescription = `
First, install the [Drupal Modeler API](https://www.drupal.org/project/modeler_api) module.

Then, after you've enabled the **modeler_api_connect** module, you get your API key from your user profile in Drupal.

Provide the website URL in the format https://www.example.com.
`;
exports.drupalAuth = pieces_framework_1.PieceAuth.CustomAuth({
    description: markdownPropertyDescription,
    required: true,
    props: {
        website_url: pieces_framework_1.Property.ShortText({
            displayName: 'Website URL',
            required: true,
            description: 'URL of the Drupal website, e.g. https://www.example.com',
        }),
        api_key: pieces_framework_1.Property.ShortText({
            displayName: 'API Key',
            required: true,
        }),
    },
    validate: (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ auth }) {
        const { website_url, api_key } = auth;
        if (!website_url || !api_key) {
            return {
                valid: false,
                error: 'Please fill all the fields [website_url, api_key]',
            };
        }
        try {
            const response = yield pieces_common_1.httpClient.sendRequest({
                method: pieces_common_1.HttpMethod.GET,
                url: website_url + `/modeler_api`,
                headers: {
                    'x-api-key': api_key,
                },
            });
            console.debug('Auth validation response', response);
            if (response.status === 200) {
                return {
                    valid: true,
                };
            }
            return {
                valid: false,
                error: 'Validation failed with response code ' + response.status,
            };
        }
        catch (e) {
            return {
                valid: false,
                error: 'Validation failed: ' + e.message,
            };
        }
    }),
});
exports.drupal = (0, pieces_framework_1.createPiece)({
    displayName: 'Drupal',
    auth: exports.drupalAuth,
    minimumSupportedRelease: '0.36.1',
    logoUrl: 'https://www.drupal.org/sites/all/themes/bluecheese/images/drupal-drop-062025.svg',
    categories: [
        shared_1.PieceCategory.ARTIFICIAL_INTELLIGENCE,
        shared_1.PieceCategory.BUSINESS_INTELLIGENCE,
        shared_1.PieceCategory.COMMERCE,
        shared_1.PieceCategory.CONTENT_AND_FILES,
        shared_1.PieceCategory.DEVELOPER_TOOLS,
        shared_1.PieceCategory.FLOW_CONTROL,
        shared_1.PieceCategory.FORMS_AND_SURVEYS,
        shared_1.PieceCategory.MARKETING,
    ],
    authors: ['jurgenhaas'],
    actions: [tools_1.drupalCallToolAction],
    triggers: [polling_1.drupalPolling, webhook_1.drupalWebhook],
});
//# sourceMappingURL=index.js.map