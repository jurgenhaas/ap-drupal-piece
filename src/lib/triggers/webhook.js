"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drupalWebhook = void 0;
const tslib_1 = require("tslib");
const pieces_common_1 = require("@activepieces/pieces-common");
const pieces_framework_1 = require("@activepieces/pieces-framework");
const __1 = require("../../");
exports.drupalWebhook = (0, pieces_framework_1.createTrigger)({
    auth: __1.drupalAuth,
    name: 'drupalWebhook',
    displayName: 'Webhook',
    description: 'A webhook that the Drupal site can call to trigger a flow.',
    props: {
        id: pieces_framework_1.Property.ShortText({
            displayName: 'Webhook ID',
            description: 'The ID of the webhook, make sure this is unique.',
            required: true,
        }),
    },
    sampleData: {},
    type: pieces_framework_1.TriggerStrategy.WEBHOOK,
    onEnable(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { website_url, api_key } = context.auth;
            const body = {
                id: context.propsValue.id,
                webHookUrl: context.webhookUrl,
            };
            const response = yield pieces_common_1.httpClient.sendRequest({
                method: pieces_common_1.HttpMethod.POST,
                url: website_url + `/modeler_api/webhook/register`,
                body: body,
                headers: {
                    'x-api-key': api_key,
                },
            });
            console.debug('Webhook register response', response);
            yield context.store.put(`_drupal_webhook_trigger_` + context.propsValue.id, response.body);
        });
    },
    onDisable(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { website_url, api_key } = context.auth;
            const webhook = yield context.store.get(`_drupal_webhook_trigger` + context.propsValue.id);
            if (webhook) {
                const response = yield pieces_common_1.httpClient.sendRequest({
                    method: pieces_common_1.HttpMethod.POST,
                    url: website_url + `/modeler_api/webhook/unregister`,
                    body: webhook,
                    headers: {
                        'x-api-key': api_key,
                    },
                });
                console.debug('Webhook unregister response', response);
            }
        });
    },
    run(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return [context.payload.body];
        });
    },
});
//# sourceMappingURL=webhook.js.map