-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending';
