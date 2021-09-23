import * as utils from '../baseUtils';

describe('#BaseUtils', () => {
  it('#helperRemoveObjectFromArray', () => {
    const savedPosts = ['obj1', 'obj2', 'obj3'];
    const idIndex = 2;
    expect(utils.helperRemoveObjectFromArray(savedPosts, idIndex)).toEqual([
      'obj1',
      'obj2',
    ]);
  });
  it('#helperReplaceObjectInArray', () => {
    const titles = {
      titles: [
        { id: 1, name: 'hi' },
        { id: 2, name: 'there' },
      ],
    };
    const data = {
      id: 2,
      name: 'heyo',
    };
    expect(utils.helperReplaceObjectInArray(titles, 'titles', data)).toEqual([
      { id: 1, name: 'hi' },
      { id: 2, name: 'heyo' },
    ]);
  });
  it('#helperReplacePropertyInArray', () => {
    const arr1 = [
      {
        test: {
          id: 1,
          name: 'test',
        },
      },
      {
        test: {
          id: 2,
          name: 'test 2',
        },
      },
    ];
    const data1 = {
      id: 1,
      name: 'new test',
    };
    const arr2 = [
      {
        cow: {
          id: 1,
          milk: true,
        },
      },
      {
        cow: {
          id: 2,
          milk: false,
        },
      },
    ];
    const data2 = {
      id: 2,
      milk: true,
    };
    expect(utils.helperReplacePropertyInArray(arr1, 'test', data1)).toEqual([
      {
        test: {
          id: 1,
          name: 'new test',
        },
      },
      {
        test: {
          id: 2,
          name: 'test 2',
        },
      },
    ]);
    expect(utils.helperReplacePropertyInArray(arr2, 'cow', data2)).toEqual([
      {
        cow: {
          id: 1,
          milk: true,
        },
      },
      {
        cow: {
          id: 2,
          milk: true,
        },
      },
    ]);
  });
});
