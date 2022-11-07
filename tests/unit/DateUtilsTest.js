import moment from 'moment';
import DateUtils from '../../src/libs/DateUtils';

describe('DateUtils', () => {
    it('getLocalMomentFromTimestamp', () => {
        const locale = 'en';
        const datetime = '2022-11-07 00:00:00';
        const timezone = 'America/Los_Angeles';
        const localMoment = DateUtils.getLocalMomentFromTimestamp(locale, datetime, timezone);
        expect(moment.isMoment(localMoment)).toBe(true);
        expect(moment(localMoment).format()).toEqual('2022-11-06T23:00:00-08:00');
    });
});
