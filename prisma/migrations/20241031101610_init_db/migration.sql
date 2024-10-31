/*
  Warnings:

  - Added the required column `login_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ColorTheme" AS ENUM ('DARK', 'LIGHT');

-- CreateEnum
CREATE TYPE "ScreenMode" AS ENUM ('IMAGE', 'WIDGET');

-- CreateEnum
CREATE TYPE "WidgetSize" AS ENUM ('L', 'M', 'S');

-- CreateEnum
CREATE TYPE "WidgetColor" AS ENUM ('DEFAULT', 'WHITE', 'BLACK');

-- CreateEnum
CREATE TYPE "ClockDesign" AS ENUM ('DIGITAL', 'ANALOG');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "login_id" TEXT NOT NULL,
ADD COLUMN     "mode" "ScreenMode" NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "theme" "ColorTheme" NOT NULL;

-- CreateTable
CREATE TABLE "SettingCommon" (
    "id" SERIAL NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "size" "WidgetSize" NOT NULL,
    "color" "WidgetColor" NOT NULL,

    CONSTRAINT "SettingCommon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherWidgetSetting" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "settingCommonid" INTEGER NOT NULL,

    CONSTRAINT "WeatherWidgetSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarWidgetSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "settingCommonId" INTEGER NOT NULL,

    CONSTRAINT "CalendarWidgetSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicPlayWidgetSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "settingCommonId" INTEGER NOT NULL,

    CONSTRAINT "MusicPlayWidgetSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClockWidgetSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "settingCommonId" INTEGER NOT NULL,
    "design" "ClockDesign" NOT NULL,
    "timezone" INTEGER NOT NULL,

    CONSTRAINT "ClockWidgetSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlideShowImage" (
    "id" SERIAL NOT NULL,
    "slideShowid" INTEGER NOT NULL,

    CONSTRAINT "SlideShowImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlideShow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SlideShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "uuid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mediauuid" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CalendarWidgetSettingToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicToMusicPlayWidgetSetting" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WeatherWidgetSetting_settingCommonid_key" ON "WeatherWidgetSetting"("settingCommonid");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarWidgetSetting_settingCommonId_key" ON "CalendarWidgetSetting"("settingCommonId");

-- CreateIndex
CREATE UNIQUE INDEX "MusicPlayWidgetSetting_settingCommonId_key" ON "MusicPlayWidgetSetting"("settingCommonId");

-- CreateIndex
CREATE UNIQUE INDEX "ClockWidgetSetting_settingCommonId_key" ON "ClockWidgetSetting"("settingCommonId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_mediauuid_key" ON "Music"("mediauuid");

-- CreateIndex
CREATE UNIQUE INDEX "_CalendarWidgetSettingToSchedule_AB_unique" ON "_CalendarWidgetSettingToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_CalendarWidgetSettingToSchedule_B_index" ON "_CalendarWidgetSettingToSchedule"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToMusicPlayWidgetSetting_AB_unique" ON "_MusicToMusicPlayWidgetSetting"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToMusicPlayWidgetSetting_B_index" ON "_MusicToMusicPlayWidgetSetting"("B");

-- AddForeignKey
ALTER TABLE "WeatherWidgetSetting" ADD CONSTRAINT "WeatherWidgetSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherWidgetSetting" ADD CONSTRAINT "WeatherWidgetSetting_settingCommonid_fkey" FOREIGN KEY ("settingCommonid") REFERENCES "SettingCommon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarWidgetSetting" ADD CONSTRAINT "CalendarWidgetSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarWidgetSetting" ADD CONSTRAINT "CalendarWidgetSetting_settingCommonId_fkey" FOREIGN KEY ("settingCommonId") REFERENCES "SettingCommon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicPlayWidgetSetting" ADD CONSTRAINT "MusicPlayWidgetSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicPlayWidgetSetting" ADD CONSTRAINT "MusicPlayWidgetSetting_settingCommonId_fkey" FOREIGN KEY ("settingCommonId") REFERENCES "SettingCommon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClockWidgetSetting" ADD CONSTRAINT "ClockWidgetSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClockWidgetSetting" ADD CONSTRAINT "ClockWidgetSetting_settingCommonId_fkey" FOREIGN KEY ("settingCommonId") REFERENCES "SettingCommon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlideShowImage" ADD CONSTRAINT "SlideShowImage_slideShowid_fkey" FOREIGN KEY ("slideShowid") REFERENCES "SlideShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlideShow" ADD CONSTRAINT "SlideShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_mediauuid_fkey" FOREIGN KEY ("mediauuid") REFERENCES "Media"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CalendarWidgetSettingToSchedule" ADD CONSTRAINT "_CalendarWidgetSettingToSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "CalendarWidgetSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CalendarWidgetSettingToSchedule" ADD CONSTRAINT "_CalendarWidgetSettingToSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToMusicPlayWidgetSetting" ADD CONSTRAINT "_MusicToMusicPlayWidgetSetting_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToMusicPlayWidgetSetting" ADD CONSTRAINT "_MusicToMusicPlayWidgetSetting_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicPlayWidgetSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
