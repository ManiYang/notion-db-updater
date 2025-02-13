import assert from 'assert';
import { isFullDatabase, collectPaginatedAPI } from '@notionhq/client';

import { getNotionClient } from './notion-client.js';
import { logger } from './logger.js';
// import { ItemId, DbRow } from './types.js';

/**
 * @returns (db-title, property-name-to-type)
 */
export async function getDbInfo(
    dbId: string
): Promise<[string, Record<string, string>]> {
    logger.info('getting database info');
    const response = await getNotionClient().databases.retrieve({ database_id: dbId });
    assert(isFullDatabase(response), 'response is not a full DatabaseObjectResponse');

    const dbTitle: string = response.title.map(
        (richTextItem) => richTextItem.plain_text
    ).join();


    const propertyNameToType: Record<string, string> = Object.fromEntries(
        Object.entries(response.properties).map(
            ([propertyName, propertyInfo]) => [propertyName, propertyInfo.type]
        )
    );

    return [dbTitle, propertyNameToType]; 
}

export async function getPageIdsInDb(dbId: string) : Promise<string[]> {
    logger.info('querying database');
    const queryResults: any[] = await collectPaginatedAPI(
        getNotionClient().databases.query, 
        { database_id: dbId }
    );

    let result: string[] = [];
    for (const item of queryResults) {
        if (item['object'] !== 'page')
            continue;
        result.push(item['id']);
    }

    return result;
}