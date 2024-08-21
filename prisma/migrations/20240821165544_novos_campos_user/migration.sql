-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "disease" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "meta" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "specialCondition" TEXT,
ADD COLUMN     "trainingDays" INTEGER,
ADD COLUMN     "weight" DOUBLE PRECISION,
ALTER COLUMN "name" DROP NOT NULL;
