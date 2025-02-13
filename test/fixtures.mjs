import dotenv from "dotenv";
import assert from "assert";

import { logger } from "../build/src/logger.js";
import { createNotionClient } from "../build/src/notion-client.js";
import { getDbInfo } from "../build/src/notion-db-access.js";

dotenv.config({ path: ".env.test" });

if (process.env["NODE_ENV"] === "development")
    logger.level = 'debug';

export async function mochaGlobalSetup() {
    logger.info("-------- mocha global setup --------");

    assert(process.env["NOTION_TOKEN"], "Notion token is not set");
    assert(process.env["TEST_DATABASE_ID"], "test database ID is not set");

    createNotionClient(process.env["NOTION_TOKEN"]);

    const [dbName, propertyNameToType] = await getDbInfo(
        process.env["TEST_DATABASE_ID"]
    );
    assert(dbName === "DB for Tests");
}
