import { date, name, internet, address } from 'faker/locale/en';

import { randomDate, weightedBoolean } from './utils';

export default (db, { serializeDate }) =>
  Array.from(Array(900).keys()).map((id) => {
    const firstSeen = randomDate();
    const lastSeen = randomDate(firstSeen);
    const hasOrdered = weightedBoolean(25);
    const firstName = name.firstName();
    const lastName = name.lastName();
    const email = internet.email(firstName, lastName);
    const birthday = hasOrdered ? date.past(60) : null;
    return {
      firstName,
      lastName,
      email,
      address: hasOrdered ? address.streetName() : null,
      zipcode: hasOrdered ? address.zipCode() : null,
      city: hasOrdered ? address.city() : null,
      avatar: internet.avatar(),
      birthday: serializeDate && birthday ? birthday.toISOString() : birthday,
      firstSeen: serializeDate ? firstSeen.toISOString() : firstSeen,
      lastSeen: serializeDate ? lastSeen.toISOString() : lastSeen,
      hasOrdered: hasOrdered,
      latestPurchase: null, // finalize
      hasNewsLetter: hasOrdered ? weightedBoolean(30) : true,
      nbOrders: 0,
      totalSpent: 0,
    };
  });
