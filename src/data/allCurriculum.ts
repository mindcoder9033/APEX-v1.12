import { LevelCurriculum, DriverLevel } from '../types/curriculum'
import { beginnerCurriculum } from './beginnerCurriculum'
import { intermediateCurriculum } from './intermediateCurriculum'
import { expertCurriculum } from './expertCurriculum'

export const allCurricula: LevelCurriculum[] = [
  beginnerCurriculum,
  intermediateCurriculum,
  expertCurriculum
]

export const curriculumByLevel: Record<DriverLevel, LevelCurriculum> = {
  BEGINNER: beginnerCurriculum,
  INTERMEDIATE: intermediateCurriculum,
  EXPERT: expertCurriculum
}
