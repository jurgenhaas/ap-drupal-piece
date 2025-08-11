export declare const drupalCallToolAction: import("@activepieces/pieces-framework").IAction<import("@activepieces/pieces-framework").CustomAuthProperty<{
    website_url: import("@activepieces/pieces-framework").ShortTextProperty<true>;
    api_key: import("@activepieces/pieces-framework").ShortTextProperty<true>;
}>, {
    tool: import("@activepieces/pieces-framework").DropdownProperty<DrupalTool, true>;
    config: import("@activepieces/pieces-framework").DynamicProperties<true>;
}>;
interface DrupalTool {
    id: string;
    label: string;
    description: string;
    config: DrupalToolConfig[];
}
interface DrupalToolConfig {
    key: string;
    label: string;
    description: string;
    required: boolean;
}
export {};
