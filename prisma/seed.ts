import { PrismaClient } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // 1. Создаем 10 пассажиров
  const passengers = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.passenger.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          passportNumber: `AB${faker.number.int({ min: 1000000, max: 9999999 })}`,
          nationality: 'Russia',
          phone: generateRussianPhoneNumber(),
          email: faker.internet.email(),
        },
      });
    })
  );

  // 2. Создаем 5 сотрудников аэропорта
  const staffMembers = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.airportStaff.create({
        data: {
          employeeId: `EMP-${faker.number.int({ min: 100, max: 999 })}`,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          position: faker.helpers.arrayElement(['Кассир', 'Агент', 'Менеджер']),
          department: 'Регистрация',
        },
      });
    })
  );

  // 3. Создаем 5 рейсов
  const flights = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      const departureDate = faker.date.soon({ days: 30 });
      return prisma.flight.create({
        data: {
          flightNumber: `SU-${100 + i}`,
          departureAirport: faker.helpers.arrayElement(['SVO', 'DME', 'LED']),
          arrivalAirport: faker.helpers.arrayElement(['JFK', 'LAX', 'IST']),
          departureTime: departureDate,
          arrivalTime: new Date(departureDate.getTime() + faker.number.int({ min: 2, max: 12 }) * 60 * 60 * 1000),
          aircraftType: faker.helpers.arrayElement(['Boeing 737', 'Airbus A320']),
          totalSeats: 150,
          availableSeats: 150,
        },
      });
    })
  );

  // 4. Создаем 20 бронирований
  for (let i = 0; i < 20; i++) {
    await prisma.booking.create({
      data: {
        bookingReference: `BR-${faker.string.alphanumeric(6).toUpperCase()}`,
        passengerId: faker.helpers.arrayElement(passengers).id,
        flightId: faker.helpers.arrayElement(flights).id,
        seatNumber: `${faker.number.int({ min: 1, max: 30 })}${faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E', 'F'])}`,
        status: faker.helpers.arrayElement(['CONFIRMED', 'CANCELLED', 'CHECKED_IN']),
        paymentStatus: faker.helpers.arrayElement(['COMPLETED', 'PENDING']),
        staffId: faker.helpers.arrayElement(staffMembers).id,
      },
    });
  }
}

// Генератор российских телефонных номеров
function generateRussianPhoneNumber(): string {
  const prefix = '+7';
  const operator = ['900', '901', '902', '903', '904', '905', '906', '908', '909', '912', '913', '914', '915', '916', '917', '918', '919', '920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930', '931', '932', '933', '934', '936', '937', '938', '939', '941', '950', '951', '952', '953', '954', '955', '956', '958', '960', '961', '962', '963', '964', '965', '966', '967', '968', '969', '970', '971', '980', '981', '982', '983', '984', '985', '986', '987', '988', '989', '991', '992', '993', '994', '995', '996', '997', '999'];
  const op = operator[Math.floor(Math.random() * operator.length)];
  const num = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${op}${num}`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });