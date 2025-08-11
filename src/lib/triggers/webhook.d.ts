import { TriggerStrategy } from '@activepieces/pieces-framework';
export declare const drupalWebhook: import("@activepieces/pieces-framework").ITrigger<TriggerStrategy.WEBHOOK, import("@activepieces/pieces-framework").CustomAuthProperty<{
    website_url: import("@activepieces/pieces-framework").ShortTextProperty<true>;
    api_key: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}>, {
    id: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}> | import("@activepieces/pieces-framework").ITrigger<TriggerStrategy.POLLING, import("@activepieces/pieces-framework").CustomAuthProperty<{
    website_url: import("@activepieces/pieces-framework").ShortTextProperty<true>;
    api_key: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}>, {
    id: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}> | import("@activepieces/pieces-framework").ITrigger<TriggerStrategy.APP_WEBHOOK, import("@activepieces/pieces-framework").CustomAuthProperty<{
    website_url: import("@activepieces/pieces-framework").ShortTextProperty<true>;
    api_key: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}>, {
    id: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}>;
