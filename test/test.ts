import { assert } from 'chai';
import { clearDb, addNonRelationColumnsToDb } from "./notion-db-access-for-tests.js";
import { SupportedNonRelationColumnType } from '../src/types.js';

describe('createActionsOfDbUpdate', async function () {
  const testDbId = process.env['TEST_DATABASE_ID'] as string;
  
  before(async function () {
    await clearDb(testDbId);
  });

  describe('no relation property', function () {
    type Property = {
      inputName: string,
      inputValue: any,
      columnName: string,
      columnType: SupportedNonRelationColumnType
    };

    const properties: Property[] = [
      {
        inputName: 'id',
        inputValue: 101,
        columnName: 'Item ID',
        columnType: 'number'
      },
      {
        inputName: 'name',
        inputValue: 'data item 101',
        columnName: 'Name',
        columnType: 'title'
      },
      {
        inputName: 'bool',
        inputValue: true,
        columnName: 'Bool',
        columnType: 'checkbox'
      },
      {
        inputName: 'text',
        inputValue: 'abc',
        columnName: 'Text',
        columnType: 'rich_text'
      },
      {
        inputName: 'select',
        inputValue: 'option 1',
        columnName: 'Select',
        columnType: 'select'
      },
      {
        inputName: 'number',
        inputValue: 123,
        columnName: 'Number',
        columnType: 'number'
      },
      {
        inputName: 'multiSelect',
        inputValue: ['a', 'b', 'c'],
        columnName: 'Multi-Select',
        columnType: 'multi_select'
      },
      {
        inputName: 'date',
        inputValue: '2025-01-01T12:30:45Z',
        columnName: 'Date',
        columnType: 'date'
      },
      {
        inputName: 'jsonArray',
        inputValue: [1, true, 'a'],
        columnName: 'JSON Array',
        columnType: 'rich_text'
      },
      {
        inputName: 'jsonObject',
        inputValue: {'a': 1, 'b': true, 'c': [10, 'x']},
        columnName: 'JSON Object',
        columnType: 'rich_text'
      },
    ]
    
    const propertyToColumn: Record<string, string> = Object.fromEntries(
      properties.map(
        (p) => [p.inputName, p.columnName]
      )
    );

    before(async function () {
      addNonRelationColumnsToDb(
        testDbId, 
        Object.fromEntries(
          properties.map(
            (p) => [p.columnName, p.columnType]
          )
        )
      );
    });

    it('should ...', async function () {
      const inputData: Record<string, any> = Object.fromEntries(
        properties.map(
          (p) => [p.inputName, p.inputValue]
        )
      );
  
      const actions = await createActionsOfDbUpdate(itemTypeNameToSetting);
    });
  });
});
          