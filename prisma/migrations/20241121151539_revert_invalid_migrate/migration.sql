/*
  Warnings:

  - You are about to drop the column `color` on the `SettingCommon` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ColorTheme" AS ENUM ('DARK', 'LIGHT');

-- AlterTable
ALTER TABLE "SettingCommon" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "theme" "ColorTheme" NOT NULL DEFAULT 'LIGHT';

-- DropEnum
DROP TYPE "WidgetColor";
