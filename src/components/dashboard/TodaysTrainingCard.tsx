import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Play, Target, ArrowRight } from 'lucide-react'
import { PrescribedTarget } from '../../lib/curriculumEngine'
import { useCurriculum } from '../../context/CurriculumContext'

interface TodaysTrainingCardProps {
  target: PrescribedTarget | null
}

export const TodaysTrainingCard: React.FC<TodaysTrainingCardProps> = ({ target }) => {
  const { setActiveLevelName, setActiveModuleId, setActiveSessionId } = useCurriculum()

  if (!target) {
    return (
      <Card accentBorder className="space-y-4 bg-[#121216] border-[#262630]">
        <div className="flex justify-between items-start">
          <Badge variant="success">Level Completed</Badge>
          <span className="text-xs font-mono text-[#E10600]">ALL DRILLS PASSED</span>
        </div>
        <h3 className="text-xl font-bold text-[#F3F4F6]">Mastery Achieved!</h3>
        <p className="text-sm text-[#9CA3AF] font-learning">
          You have completed all prescribed sessions in this level. Review completed drills or prepare for your Level Graduation Exam.
        </p>
        <Link to="/curriculum">
          <Button variant="primary" className="w-full gap-2 mt-2">
            Review Curriculum Matrix <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </Card>
    )
  }

  const handleLaunchSession = () => {
    setActiveLevelName(target.level.levelName)
    setActiveModuleId(target.module.id)
    setActiveSessionId(target.session.id)
  }

  return (
    <Card accentBorder className="space-y-5 bg-[#121216] border-[#262630] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Target className="w-32 h-32 text-[#E10600]" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262630] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#E10600] font-bold">
            Prescribed Training Target
          </span>
        </div>
        <Badge variant="info">
          {target.level.levelName} • M{target.module.moduleNumber} S{target.session.sessionNumber}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono text-[#9CA3AF]">
          Module {target.module.moduleNumber}: {target.module.title}
        </div>
        <h3 className="text-2xl font-bold text-[#F3F4F6] tracking-tight">
          {target.session.title}
        </h3>
        <p className="text-sm text-[#9CA3AF] font-learning line-clamp-2">
          {target.session.description}
        </p>
      </div>

      <div className="bg-[#1A1A20] p-3.5 rounded-lg border border-[#262630] space-y-2 text-xs">
        <div className="flex items-center justify-between text-[#9CA3AF] font-mono">
          <span>Active Step {target.step.stepNumber}:</span>
          <span className="text-[#E10600] font-bold">{target.step.title}</span>
        </div>
        <div className="text-[#F3F4F6] text-xs font-learning">
          <strong>Objective:</strong> {target.step.objective}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <Link
          to={`/session/${target.session.id}`}
          onClick={handleLaunchSession}
          className="w-full sm:flex-1"
        >
          <Button size="lg" className="w-full gap-2 justify-center shadow-[0_0_15px_rgba(225,6,0,0.35)]">
            <Play className="w-4 h-4 fill-current" />
            Launch Prescribed Session
          </Button>
        </Link>
        <Link to="/curriculum" className="w-full sm:w-auto">
          <Button variant="telemetry" size="lg" className="w-full justify-center">
            View Curriculum
          </Button>
        </Link>
      </div>
    </Card>
  )
}
