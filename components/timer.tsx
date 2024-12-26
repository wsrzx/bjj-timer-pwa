'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      playBuzzer()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = useCallback((minutes: number) => {
    setTimeLeft(minutes * 60)
    setIsActive(true)
  }, [])

  const addMinute = useCallback(() => {
    if (isActive) {
      setTimeLeft(time => time + 60)
    } else {
      startTimer(1)
    }
  }, [isActive, startTimer])

  const stopTimer = useCallback(() => {
    setIsActive(false)
    setTimeLeft(0)
  }, [])

  const playBuzzer = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.5)
  }, [])

  return (
    <div className="h-full w-full grid place-items-center p-0 m-0 bg-transparent">
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="timer-display text-center">
          <span className="timer-text font-mono">{formatTime(timeLeft)}</span>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-5 gap-4">
            <Button 
              onClick={addMinute}
              className="aspect-square rounded-full text-2xl font-medium w-16 h-16 bg-white text-black hover:bg-gray-100"
              variant="outline"
            >
              +1
            </Button>
            <Button 
              onClick={() => startTimer(5)} 
              disabled={isActive}
              className="aspect-square rounded-full text-2xl font-medium w-16 h-16 bg-white text-black hover:bg-gray-100"
              variant="outline"
            >
              5
            </Button>
            <Button 
              onClick={() => startTimer(7)} 
              disabled={isActive}
              className="aspect-square rounded-full text-2xl font-medium w-16 h-16 bg-white text-black hover:bg-gray-100"
              variant="outline"
            >
              7
            </Button>
            <Button 
              onClick={() => startTimer(10)} 
              disabled={isActive}
              className="aspect-square rounded-full text-2xl font-medium w-16 h-16 bg-white text-black hover:bg-gray-100"
              variant="outline"
            >
              10
            </Button>
            {isActive && (
              <Button 
                onClick={stopTimer} 
                variant="destructive" 
                className="aspect-square rounded-full text-xl font-medium w-16 h-16 bg-red-600 text-white hover:bg-red-700"
              >
                ⏹️
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

