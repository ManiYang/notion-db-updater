import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { logger } from '../build/src/logger.js'

export function mochaGlobalSetup() {
    logger.info('mocha global setup');

    assert(process.env['NOTION_TOKEN'], 'Notion token is not set');
    assert(process.env['TEST_DATABASE_ID'], 'test database ID is not set');   
}