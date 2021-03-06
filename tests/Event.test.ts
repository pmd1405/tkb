import { describe, it, expect } from 'vitest';

import { Event } from '../src/lib/Event';
import { Entry } from '../src/lib/Entry';

describe('Event', () => {
  let entry = new Entry(
    'CO1023	Hệ thống số 	3	3	L01	2	2-4	7:00 - 9:50	H1-201	BK-CS2	--|--|--|42|43|44|--|--|--|--|49|50|--|52|53|01|'
  );

  let event = Event.fromEntry(entry, {
    semester: 1,
    yearFrom: 2020,
    yearTo: 2021,
  });
  const vevent = event.toVEvent();

  it('should be able to convert simple entry', () => {

    expect(event.start.hour).toBe(7);
    expect(event.start.day).toBe(12);
    expect(event.start.month).toBe(10);
    expect(event.end.hour).toBe(10);
    expect(event.repeats[0].day).toBe(12);
    expect(event.repeats[3].day).toBe(30);
  });

  it('should ignore HANGOUT_TUONGTAC room', () => {
    let event = Event.fromEntry(
      new Entry(
        'CO1028	Kỹ thuật lập trình (tn) 	--	--	L11	6	8-9	13:00 - 14:50	HANGOUT_TUONGTAC	BK-CS1	--|--|--|--|--|--|--|--|--|--|--|19|20|'
      ),
      { semester: 2, yearFrom: 2020, yearTo: 2021 }
    );

    const vevent = event.toVEvent();
    expect(vevent).not.toContain("LOCATION");

    expect(event.location).toBeUndefined();


  });

  it('should convert to VEVENT correctly', () => {
    expect(vevent).toContain('20201019T000000Z')
  })
});
