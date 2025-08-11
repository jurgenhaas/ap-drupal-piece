"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drupalCallToolAction = void 0;
const tslib_1 = require("tslib");
const pieces_framework_1 = require("@activepieces/pieces-framework");
const pieces_common_1 = require("@activepieces/pieces-common");
const __1 = require("../../");
exports.drupalCallToolAction = (0, pieces_framework_1.createAction)({
    auth: __1.drupalAuth,
    name: 'drupal-call-tool',
    displayName: 'Call Tool',
    description: 'Call a tool on the Drupal site',
    props: {
        tool: pieces_framework_1.Property.Dropdown({
            displayName: 'Tool',
            description: 'The tool to call.',
            required: true,
            refreshers: [],
            options: (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ auth }) {
                const { website_url, api_key } = auth;
                if (!auth) {
                    return {
                        disabled: true,
                        options: [],
                        placeholder: 'Please authenticate first.',
                    };
                }
                try {
                    const response = yield pieces_common_1.httpClient.sendRequest({
                        method: pieces_common_1.HttpMethod.GET,
                        url: website_url + `/modeler_api/tools`,
                        headers: {
                            'x-api-key': api_key,
                        },
                    });
                    console.debug('Tool response', response);
                    if (response.status === 200) {
                        return {
                            disabled: false,
                            options: response.body.map((tool) => {
                                return {
                                    label: tool.label,
                                    description: tool.description,
                                    value: tool,
                                };
                            }),
                        };
                    }
                }
                catch (e) {
                    console.debug('Tool error', e);
                }
                return {
                    disabled: true,
                    options: [],
                    placeholder: 'Error processing tools',
                };
            }),
        }),
        config: pieces_framework_1.Property.DynamicProperties({
            displayName: 'Tool configuration',
            refreshers: ['tool'],
            required: true,
            props: (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ tool }) {
                console.debug('Tool config input', tool);
                const fields = {};
                const items = tool['config'];
                items.forEach((config) => {
                    fields[config.key] = pieces_framework_1.Property.ShortText({
                        displayName: config.label,
                        description: config.description,
                        required: config.required,
                    });
                });
                console.debug('Field for this tool', fields);
                return fields;
            }),
        }),
    },
    run(_a) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ({ auth, propsValue }) {
            const { website_url, api_key } = auth;
            const request = {
                method: pieces_common_1.HttpMethod.POST,
                url: website_url + `/modeler_api/tool/execute`,
                body: {
                    tool: propsValue.tool.id,
                    config: propsValue.config,
                },
                headers: {
                    'x-api-key': api_key,
                },
            };
            const result = yield pieces_common_1.httpClient.sendRequest(request);
            console.debug('Tool call completed', result);
            if (result.status === 200 || result.status === 202) {
                return result.body;
            }
            else {
                return result;
            }
        });
    },
});
//# sourceMappingURL=tools.js.map