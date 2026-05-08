-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectKey" TEXT NOT NULL,
    "encryptedData" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectKey_key" ON "Project"("projectKey");
