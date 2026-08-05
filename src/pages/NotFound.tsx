import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { AlertOctagon } from 'lucide-react'

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-16">
      <Card className="text-center space-y-6 p-8">
        <AlertOctagon className="w-16 h-16 text-[#FF3B30] mx-auto" />
        <div>
          <span className="text-xs font-mono text-[#FF3B30] uppercase tracking-widest font-bold">
            Telemetry Error 404
          </span>
          <h2 className="text-2xl font-bold text-[#F3F4F6] mt-1">Track Limits Exceeded</h2>
          <p className="text-sm text-[#9CA3AF] mt-2">
            The requested curriculum route does not exist within the APEX Academy schema.
          </p>
        </div>

        <Link to="/dashboard" className="block">
          <Button className="w-full">Return to Dashboard</Button>
        </Link>
      </Card>
    </div>
  )
}
