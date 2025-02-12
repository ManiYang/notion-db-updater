import { assert } from 'chai';

describe('Basic', function () {
  const notionToken: string | undefined = process.env['NOTION_TOKEN'];
  const testDbId: string | undefined = process.env['TEST_DATABASE_ID'];
  
  describe('#check', function () {
    it('should find env vars', function () {
      assert.isDefined(notionToken, 'notionToken not found');
      assert.isDefined(testDbId, 'testDbID not found');
    });
  });
});
          