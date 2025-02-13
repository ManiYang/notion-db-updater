import assert from 'assert';
import { Client } from '@notionhq/client';

let notionClient: Client | null = null;

export function createNotionClient(notionToken: string) {
    assert(notionClient === null, 'Notion client is already created');
    notionClient = new Client({ auth: notionToken });
}

export function getNotionClient(): Client {
    assert(notionClient !== null, 'Notion client is not set');
    return notionClient;
}
