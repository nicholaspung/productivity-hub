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
});
