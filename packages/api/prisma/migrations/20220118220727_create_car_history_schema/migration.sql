-- CreateTable
CREATE TABLE "CarHistory" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "billCode" TEXT NOT NULL,
    "serviceCompany" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,

    CONSTRAINT "CarHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarHistory" ADD CONSTRAINT "CarHistory_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarHistory" ADD CONSTRAINT "CarHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarHistory" ADD CONSTRAINT "CarHistory_code_fkey" FOREIGN KEY ("code") REFERENCES "CodeForAccounting"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
