import { getNotionClient } from '../src/notion-client.js';
import { getDbInfo, getPageIdsInDb } from '../src/notion-db-access.js';
import { logger } from '../src/logger.js';
import { SupportedNonRelationColumnType } from '../src/types.js'

/**
 * Remove all rows and columns from the database.
 */
export async function clearDb(dbId: string) {
    const pageIds: string[] = await getPageIdsInDb(dbId);
    
    logger.info('archiving all pages of database');
    for (const pageId of pageIds) {
        logger.info(`  archiving page ${pageId}`);
        await getNotionClient().pages.update({
            page_id: pageId,
	        archived: true
        });
    }

    //
    const [, propertyNameToType] = await getDbInfo(dbId);

    logger.info('removing all non-title properties from database');
    await getNotionClient().databases.update({
        database_id: dbId,
        properties: Object.fromEntries(
            Object.entries(propertyNameToType).filter(
                ([, propertyType]) => propertyType !== 'title'
            ).map(
                ([propertyName, ]) => [propertyName, null]
            )
        )
    });
}

export async function addNonRelationColumnsToDb(
    dbId: string, 
    columnNameToType: Record<string, SupportedNonRelationColumnType>
) {
    logger.info('adding columns to database');
    await getNotionClient().databases.update({
        database_id: dbId,
        properties: Object.fromEntries(
            Object.entries(columnNameToType).map(
                ([columnName, type]) => {
                    switch (type) {
                        case 'title':
                            return [columnName, { title: {} }];
                        case 'checkbox':
                            return [columnName, { checkbox: {} }];
                        case 'number':
                            return [columnName, { number: {} }];
                        case 'rich_text':
                            return [columnName, { rich_text: {} }];
                        case 'select':
                            return [columnName, { select: {} }];
                        case 'multi_select':
                            return [columnName, { multi_select: {} }];
                        case 'date':
                            return [columnName, { date: {} }];
                        default:
                            return [columnName, null];
                    }
                }
            )
        )
    });
}
