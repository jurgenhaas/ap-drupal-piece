"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drupalPolling = void 0;
const tslib_1 = require("tslib");
const pieces_framework_1 = require("@activepieces/pieces-framework");
const pieces_common_1 = require("@activepieces/pieces-common");
const __1 = require("../../");
const polling = {
    strategy: pieces_common_1.DedupeStrategy.TIMEBASED,
    items: (_a) => tslib_1.__awaiter(void 0, [_a], void 0, function* ({ auth, propsValue, lastFetchEpochMS }) {
        const { website_url, api_key } = auth;
        const body = {
            id: propsValue['id'],
            timestamp: lastFetchEpochMS,
        };
        const response = yield pieces_common_1.httpClient.sendRequest({
            method: pieces_common_1.HttpMethod.POST,
            url: website_url + `/modeler_api/poll`,
            body: body,
            headers: {
                'x-api-key': api_key,
            },
        });
        console.debug('Poll response', response);
        return response.body.map((item) => ({
            epochMilliSeconds: item.timestamp,
            data: item,
        }));
    }),
};
exports.drupalPolling = (0, pieces_framework_1.createTrigger)({
    auth: __1.drupalAuth,
    name: 'drupalPolling',
    displayName: 'Polling',
    description: 'A trigger that polls the Drupal site.',
    props: {
        id: pieces_framework_1.Property.ShortText({
            displayName: 'Polling ID',
            description: 'The ID of the polling, make sure this is unique.',
            required: true,
        }),
    },
    sampleData: {},
    type: pieces_framework_1.TriggerStrategy.POLLING,
    test(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { auth, propsValue, store, files } = context;
            return yield pieces_common_1.pollingHelper.test(polling, { store, auth, propsValue, files });
        });
    },
    onEnable(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { auth, propsValue, store } = context;
            yield pieces_common_1.pollingHelper.onEnable(polling, { store, auth, propsValue });
        });
    },
    onDisable(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { auth, propsValue, store } = context;
            yield pieces_common_1.pollingHelper.onDisable(polling, { store, auth, propsValue });
        });
    },
    run(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { auth, propsValue, store, files } = context;
            return yield pieces_common_1.pollingHelper.poll(polling, { store, auth, propsValue, files });
        });
    },
});
//# sourceMappingURL=polling.js.map