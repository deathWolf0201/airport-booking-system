-- CreateTable
CREATE TABLE `Passenger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `passportNumber` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Passenger_passportNumber_key`(`passportNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flightNumber` VARCHAR(191) NOT NULL,
    `departureAirport` VARCHAR(191) NOT NULL,
    `arrivalAirport` VARCHAR(191) NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `aircraftType` VARCHAR(191) NOT NULL,
    `totalSeats` INTEGER NOT NULL,
    `availableSeats` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Flight_flightNumber_key`(`flightNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingReference` VARCHAR(191) NOT NULL,
    `passengerId` INTEGER NOT NULL,
    `flightId` INTEGER NOT NULL,
    `seatNumber` VARCHAR(191) NOT NULL,
    `bookingTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('CONFIRMED', 'CANCELLED', 'CHECKED_IN', 'BOARDED', 'NO_SHOW') NOT NULL DEFAULT 'CONFIRMED',
    `staffId` INTEGER NULL,
    `paymentStatus` ENUM('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Booking_bookingReference_key`(`bookingReference`),
    UNIQUE INDEX `Booking_flightId_seatNumber_key`(`flightId`, `seatNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AirportStaff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AirportStaff_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `Passenger`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `Flight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `AirportStaff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
