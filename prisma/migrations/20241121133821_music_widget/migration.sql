/*
  Warnings:

  - You are about to drop the `Music` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MusicToMusicPlayWidgetSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_mediauuid_fkey";

-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MusicToMusicPlayWidgetSetting" DROP CONSTRAINT "_MusicToMusicPlayWidgetSetting_A_fkey";

-- DropForeignKey
ALTER TABLE "_MusicToMusicPlayWidgetSetting" DROP CONSTRAINT "_MusicToMusicPlayWidgetSetting_B_fkey";

-- DropTable
DROP TABLE "Music";

-- DropTable
DROP TABLE "_MusicToMusicPlayWidgetSetting";

-- CreateTable
CREATE TABLE "MusicPath" (
    "id" SERIAL NOT NULL,
    "musicPlayWidgetId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "MusicPath_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MusicPath" ADD CONSTRAINT "MusicPath_musicPlayWidgetId_fkey" FOREIGN KEY ("musicPlayWidgetId") REFERENCES "MusicPlayWidgetSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
