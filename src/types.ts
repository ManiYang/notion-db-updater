export type ItemId = number | string;

export type PropertyValue = boolean | number | string | Array<any> | Record<string, any>;

export type ForeignKey = {
    pageId?: string,
    itemId?: ItemId
}

export type DbRow = {
    itemId: ItemId,
    pageId?: string,
    pageName: string,
    nonRelationProperties: Record<string, PropertyValue>, 
    relationProperties: Record<string, Array<ForeignKey>> 
};

export type SupportedNonRelationColumnType 
    = 'title' | 'checkbox' | 'number' | 'rich_text' | 'select' | 'multi_select' | 'date';