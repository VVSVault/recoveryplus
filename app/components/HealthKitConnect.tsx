'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HealthKitConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  const handleConnectHealthKit = async () => {
    setIsConnecting(true);
    
    try {
      // Check if we're on iOS Safari
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      if (!isIOS) {
        alert('Apple HealthKit is only available on iOS devices. Please open this page on your iPhone or iPad.');
        setIsConnecting(false);
        return;
      }

      // For production, you'll need to implement OAuth flow with Apple HealthKit
      // This is a simplified example
      const response = await fetch('/api/healthkit/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-id', // Get from your auth system
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        setHealthData(data);
      }
    } catch (error) {
      console.error('Failed to connect to HealthKit:', error);
      alert('Failed to connect to Apple Health. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/healthkit/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsConnected(false);
      setHealthData(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <section className="py-20 bg-sand/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-olivewood">
              Track Your Recovery Progress
            </h2>
            <p className="text-lg text-bark max-w-2xl mx-auto">
              Connect your Apple Health to automatically track your wellness metrics and optimize your recovery journey
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {!isConnected ? (
              <div className="text-center">
                <div className="mb-8">
                  <svg
                    className="w-24 h-24 mx-auto text-olive"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.57 12.47c-.02-2.19 1.79-3.25 1.87-3.3-.95-1.39-2.44-1.58-2.98-1.6-1.25-.13-2.47.75-3.11.75-.65 0-1.63-.73-2.69-.71-1.36.02-2.64.81-3.34 2.03-1.45 2.5-.37 6.17.98 8.19.68 1 1.47 2.1 2.5 2.06 1.02-.04 1.4-.66 2.63-.66 1.22 0 1.57.66 2.64.64 1.1-.02 1.77-.99 2.43-2 .78-1.15 1.09-2.28 1.11-2.34-.02-.01-2.11-.81-2.13-3.24zM18.68 6.24c.54-.67.91-1.58.81-2.51-.79.04-1.78.55-2.35 1.22-.5.59-.95 1.56-.84 2.47.9.07 1.82-.45 2.38-1.18z"/>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-olivewood">
                  Connect Apple Health
                </h3>
                
                <p className="text-bark mb-8">
                  Sync your health data to personalize your recovery experience and track progress over time
                </p>

                <div className="space-y-4 text-left mb-8 max-w-md mx-auto">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-bark">Track sleep patterns and recovery metrics</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-bark">Monitor heart rate variability and stress</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-sage mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-bark">Get personalized recovery recommendations</span>
                  </div>
                </div>

                <button
                  onClick={handleConnectHealthKit}
                  disabled={isConnecting}
                  className={`bg-olivewood text-white px-8 py-4 rounded-full font-medium transition-all ${
                    isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-bark'
                  }`}
                >
                  {isConnecting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Connecting...
                    </span>
                  ) : (
                    'Connect Apple Health'
                  )}
                </button>

                <p className="text-xs text-bark/60 mt-4">
                  Your health data is encrypted and never shared with third parties
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-8">
                  <svg className="w-24 h-24 mx-auto text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-olivewood">
                  Apple Health Connected
                </h3>

                <p className="text-bark mb-8">
                  Your health data is syncing automatically
                </p>

                {healthData && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-sand/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-olivewood">7.5h</div>
                      <div className="text-sm text-bark">Avg Sleep</div>
                    </div>
                    <div className="bg-sand/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-olivewood">62</div>
                      <div className="text-sm text-bark">HRV</div>
                    </div>
                    <div className="bg-sand/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-olivewood">8,432</div>
                      <div className="text-sm text-bark">Steps</div>
                    </div>
                    <div className="bg-sand/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-olivewood">85%</div>
                      <div className="text-sm text-bark">Recovery</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDisconnect}
                  className="text-bark hover:text-olivewood transition-colors"
                >
                  Disconnect Apple Health
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-bark/60">
              Apple Health integration requires iOS 13.0 or later. 
              Data syncing may take a few moments to complete.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}