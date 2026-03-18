/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "fullName",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "orderStatus",
DROP COLUMN "paymentStatus",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "delivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pointsGiven" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reviewGiven" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
