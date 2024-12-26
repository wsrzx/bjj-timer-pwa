'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/assets/buzzer.mp3')
    
    // Initialize AudioContext for fallback
    const AudioContextConstructor = 
      window.AudioContext || ((window as any).webkitAudioContext as typeof AudioContext)
    audioContextRef.current = new AudioContextConstructor()
  }, [])

  const playFallbackSound = useCallback(() => {
    if (audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      // Set sound properties
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)

      // Play sound
      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + 0.5)

      // Fade out
      gainNode.gain.exponentialRampToValueAtTime(
        0.01, 
        audioContextRef.current.currentTime + 0.5
      )
    }
  }, [])

  const playBuzzer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Reset audio to start
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed, using fallback sound:', error)
        playFallbackSound()
      })
    } else {
      playFallbackSound()
    }
  }, [playFallbackSound])

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
  }, [isActive, timeLeft, playBuzzer])

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

