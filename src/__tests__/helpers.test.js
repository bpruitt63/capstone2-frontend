import { calculateDistance, makeReadableDate } from "../static/helpers";

describe('calculateDistance', function() {
    test('works metric', function() {
        const res = calculateDistance('m', 1000);
        expect(res).toEqual('1.00');
    });

    test('works imperial', function() {
        const res = calculateDistance('i', 1000);
        expect(res).toEqual('0.62');
    });

    test('works large num', function() {
        const res = calculateDistance('m', 10000000);
        expect(res).toEqual('10000.00');
    });

    test('works small num', function() {
        const res = calculateDistance('m', 10);
        expect(res).toEqual('0.01');
    });

    test('works NaN', function() {
        const res = calculateDistance('m', '1000');
        expect(res).toEqual('1.00');
    });

    test('returns NaN for non num', function() {
        const res = calculateDistance('m', 'word');
        expect(res).toEqual('NaN');
    });
});

describe('makeReadableDates', function() {
    test('works', function() {
        const res = makeReadableDate('1928-12-05');
        expect(res).toEqual('December 05, 1928');
    });

    test('works different date', function() {
        const res = makeReadableDate('1268-01-30');
        expect(res).toEqual('January 30, 1268');
    });
});