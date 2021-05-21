import { blueprint as bp } from './blueprint';

describe('blueprint rendering', () => {
    it('test', () => {
        expect(bp()).toEqual('foo');
    })
});