'use client'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative -my-1 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full flex items-center">
              <div className="flex-1 border-t border-bark/20"></div>
              <div className="px-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-bark/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-bark/30"></div>
                  <div className="w-8 h-[1px] bg-bark/20"></div>
                </div>
              </div>
              <div className="flex-1 border-t border-bark/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}