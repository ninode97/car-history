-- CreateTable
CREATE TABLE "HistoryV2" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "vin" TEXT,
    "category" TEXT,
    "info" VARCHAR(2000) NOT NULL,

    CONSTRAINT "HistoryV2_pkey" PRIMARY KEY ("id")
);
