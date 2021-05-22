import { blueprint as bp } from './core/blueprint';
import * as u from './core/utils';

describe('blueprint rendering', () => {
    it('renders static attrs', () => {
        const input = {
            name: 'test',
            nested: {
                thing: 'thing',
            },
            things: [ 'foo', 'bar' ],
        };
        
        expect(bp(input).gen()).toEqual(input);
    });

    it('renders dynamic attrs', () => {
        expect(bp({
            foo: u.always('foo'),
            bar: 'bar'
        }).gen()).toEqual({ foo: 'foo', bar: 'bar' });
    });

    it('renders nested dynamic attrs', () => {
        expect(bp({
            foo: {
                bar: u.always('bar')
            }
        }).gen()).toEqual({
            foo: {
                bar: 'bar'
            }
        })
    });
});