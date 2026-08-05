import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ArrowRight } from 'lucide-react'

export const Home: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-[#12151E] border border-[#262C3D] rounded-xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">Curriculum-Driven Academy</Badge>
            <Badge variant="info">Moza R3 Ready</Badge>
            <Badge variant="neutral">Forza Motorsport 2023</Badge>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F3F4F6] font-sans">
            Transforming Beginners Into <span className="text-[#00E599]">Disciplined Sim Racers</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            APEX is not a collection of casual YouTube tutorials or gamified chatbots. It is a schema-first racing academy where every lesson, telemetry drill, and assessment enforces mastery-based progression.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/curriculum">
              <Button size="lg" className="gap-2">
                Enter Level 1 Academy <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="telemetry" size="lg">
                View Driver Passport
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Driver Development Progression Framework */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00E599]">
            Educational Progression
          </span>
          <h2 className="text-2xl font-bold text-[#F3F4F6] mt-1">3-Stage Driver Development Framework</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level 1 */}
          <Card accentBorder className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-[#00E599] font-bold">STAGE 01</span>
              <Badge variant="success">Active MVP Scope</Badge>
            </div>
            <h3 className="text-xl font-bold text-[#F3F4F6]">Level 1: Driver Control</h3>
            <p className="text-sm text-[#9CA3AF]">
              Focus on smooth vehicle control, geometric apex consistency, and eliminating erratic inputs.
            </p>
            <div className="bg-[#1A1E2B] p-3 rounded text-xs font-mono text-[#9CA3AF] space-y-1.5 border border-[#262C3D]">
              <div className="text-[#F3F4F6] font-bold">Graduation Profile:</div>
              <div>"A Beginner graduate is a consistent driver—not a fast driver."</div>
            </div>
            <Link to="/curriculum" className="block pt-2">
              <Button variant="telemetry" className="w-full text-xs gap-1.5">
                Explore Level 1 Drills <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </Card>

          {/* Level 2 */}
          <Card className="space-y-4 opacity-75">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-[#3B82F6] font-bold">STAGE 02</span>
              <Badge variant="neutral">Upcoming Phase</Badge>
            </div>
            <h3 className="text-xl font-bold text-[#F3F4F6]">Level 2: Driver Adaptation</h3>
            <p className="text-sm text-[#9CA3AF]">
              Learn racecraft, traffic management, tire degradation, and competing under variable track conditions.
            </p>
            <div className="bg-[#1A1E2B] p-3 rounded text-xs font-mono text-[#9CA3AF] space-y-1.5 border border-[#262C3D]">
              <div className="text-[#F3F4F6] font-bold">Graduation Profile:</div>
              <div>"An Intermediate graduate is an adaptable racing driver."</div>
            </div>
          </Card>

          {/* Level 3 */}
          <Card className="space-y-4 opacity-75">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-[#FFB800] font-bold">STAGE 03</span>
              <Badge variant="neutral">Upcoming Phase</Badge>
            </div>
            <h3 className="text-xl font-bold text-[#F3F4F6]">Level 3: Performance Engineering</h3>
            <p className="text-sm text-[#9CA3AF]">
              Read raw telemetry graphs, engineer custom suspension geometry, differential tuning, and race strategy.
            </p>
            <div className="bg-[#1A1E2B] p-3 rounded text-xs font-mono text-[#9CA3AF] space-y-1.5 border border-[#262C3D]">
              <div className="text-[#F3F4F6] font-bold">Graduation Profile:</div>
              <div>"An Expert graduate is a driver-engineer."</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Academy Core Principles Grid */}
      <section className="bg-[#12151E] border border-[#262C3D] rounded-xl p-8 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6]">
            Academy Philosophy
          </span>
          <h2 className="text-2xl font-bold text-[#F3F4F6] mt-1">Non-Negotiable Coaching Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded bg-[#00E599]/10 text-[#00E599] flex items-center justify-center font-bold">1</div>
            <h4 className="font-bold text-[#F3F4F6] text-sm">Curriculum First</h4>
            <p className="text-xs text-[#9CA3AF]">No skipping modules. Learning path is strictly prescribed by the academy.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center font-bold">2</div>
            <h4 className="font-bold text-[#F3F4F6] text-sm">Mastery Before Progression</h4>
            <p className="text-xs text-[#9CA3AF]">Watching videos does not unlock content. Demonstrated telemetry skill is required.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded bg-[#FFB800]/10 text-[#FFB800] flex items-center justify-center font-bold">3</div>
            <h4 className="font-bold text-[#F3F4F6] text-sm">Objective Coaching</h4>
            <p className="text-xs text-[#9CA3AF]">No emotional validation or empty praise. Feedback is calculated from objective telemetry metrics.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">4</div>
            <h4 className="font-bold text-[#F3F4F6] text-sm">One Variable At A Time</h4>
            <p className="text-xs text-[#9CA3AF]">Never change car, track, and technique simultaneously during active drills.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
