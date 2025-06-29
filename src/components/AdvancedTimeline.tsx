import React, { useState, useEffect } from 'react';
import { Clock, Calendar, TrendingUp, AlertTriangle, CheckCircle, Zap, Users, Brain } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'milestone' | 'risk' | 'opportunity' | 'decision';
  probability: number;
  impact: 'low' | 'medium' | 'high';
  description: string;
  collaborators?: string[];
}

interface AdvancedTimelineProps {
  decisionId?: string;
  timeframe: string;
}

export const AdvancedTimeline: React.FC<AdvancedTimelineProps> = ({ decisionId, timeframe }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'probability'>('timeline');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y' | '2y'>('1y');
  const [isCollaborative, setIsCollaborative] = useState(true);

  useEffect(() => {
    // Generate mock timeline events based on decision analysis
    const mockEvents: TimelineEvent[] = [
      {
        id: '1',
        date: '2024-03-15',
        title: 'Optimal Market Entry Window',
        type: 'opportunity',
        probability: 0.85,
        impact: 'high',
        description: 'Market conditions align perfectly for career transition',
        collaborators: ['Alex Chen', 'Sarah Kim']
      },
      {
        id: '2',
        date: '2024-04-01',
        title: 'Skill Development Milestone',
        type: 'milestone',
        probability: 0.92,
        impact: 'medium',
        description: 'Complete certification requirements',
        collaborators: ['Alex Chen']
      },
      {
        id: '3',
        date: '2024-05-15',
        title: 'Economic Uncertainty Risk',
        type: 'risk',
        probability: 0.35,
        impact: 'medium',
        description: 'Potential market volatility may affect timing'
      },
      {
        id: '4',
        date: '2024-06-01',
        title: 'Decision Execution Point',
        type: 'decision',
        probability: 0.78,
        impact: 'high',
        description: 'Recommended decision implementation date',
        collaborators: ['Sarah Kim', 'Mike Johnson']
      },
      {
        id: '5',
        date: '2024-08-15',
        title: 'Industry Conference Opportunity',
        type: 'opportunity',
        probability: 0.65,
        impact: 'medium',
        description: 'Networking and visibility opportunity'
      }
    ];

    setEvents(mockEvents);
  }, [decisionId, timeframe]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <CheckCircle className="w-5 h-5 text-collective-400" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-temporal-400" />;
      case 'decision':
        return <Brain className="w-5 h-5 text-quantum-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'border-collective-400 bg-collective-400/10';
      case 'risk':
        return 'border-red-400 bg-red-400/10';
      case 'opportunity':
        return 'border-temporal-400 bg-temporal-400/10';
      case 'decision':
        return 'border-quantum-400 bg-quantum-400/10';
      default:
        return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getImpactSize = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'w-4 h-4';
      case 'medium':
        return 'w-3 h-3';
      case 'low':
        return 'w-2 h-2';
      default:
        return 'w-3 h-3';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderTimelineView = () => (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-temporal-400 via-quantum-400 to-collective-400"></div>
      
      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`relative flex items-start space-x-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
              getEventColor(event.type)
            } ${selectedEvent?.id === event.id ? 'ring-2 ring-temporal-400' : ''}`}
            onClick={() => setSelectedEvent(event)}
          >
            {/* Timeline dot */}
            <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getEventColor(event.type)}`}>
              {getEventIcon(event.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{formatDate(event.date)}</span>
                  <div className={`rounded-full bg-temporal-400 ${getImpactSize(event.impact)}`}></div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{event.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-temporal-400" />
                    <span className="text-sm text-gray-300">
                      {Math.round(event.probability * 100)}% probability
                    </span>
                  </div>
                  
                  {event.collaborators && isCollaborative && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-collective-400" />
                      <span className="text-sm text-gray-300">
                        {event.collaborators.length} collaborator{event.collaborators.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.impact === 'high' ? 'bg-red-400/20 text-red-300' :
                  event.impact === 'medium' ? 'bg-yellow-400/20 text-yellow-300' :
                  'bg-green-400/20 text-green-300'
                }`}>
                  {event.impact} impact
                </span>
              </div>
              
              {event.collaborators && isCollaborative && (
                <div className="mt-3 flex -space-x-2">
                  {event.collaborators.slice(0, 3).map((collaborator, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-temporal-400 to-quantum-500 flex items-center justify-center text-white text-xs font-medium border-2 border-gray-900"
                      title={collaborator}
                    >
                      {collaborator.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {event.collaborators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-medium border-2 border-gray-900">
                      +{event.collaborators.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendarView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
            getEventColor(event.type)
          }`}
          onClick={() => setSelectedEvent(event)}
        >
          <div className="flex items-center space-x-3 mb-3">
            {getEventIcon(event.type)}
            <div>
              <h3 className="font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-gray-400">{formatDate(event.date)}</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-3">{event.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-temporal-400">
              {Math.round(event.probability * 100)}%
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              event.impact === 'high' ? 'bg-red-400/20 text-red-300' :
              event.impact === 'medium' ? 'bg-yellow-400/20 text-yellow-300' :
              'bg-green-400/20 text-green-300'
            }`}>
              {event.impact}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProbabilityView = () => (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getEventIcon(event.type)}
              <h3 className="font-semibold text-white">{event.title}</h3>
            </div>
            <span className="text-sm text-gray-400">{formatDate(event.date)}</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-300">Probability</span>
              <span className="text-sm text-temporal-400">{Math.round(event.probability * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-temporal-gradient h-2 rounded-full transition-all duration-500"
                style={{ width: `${event.probability * 100}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-300">{event.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-temporal-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Advanced Temporal Timeline</h2>
            <p className="text-sm text-gray-400">Interactive decision timeline with collaboration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as any)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="timeline">Timeline</option>
            <option value="calendar">Calendar</option>
            <option value="probability">Probability</option>
          </select>
          
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
            <option value="2y">2 Years</option>
          </select>
          
          <button
            onClick={() => setIsCollaborative(!isCollaborative)}
            className={`p-2 rounded-lg transition-colors ${
              isCollaborative ? 'bg-collective-500 text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            <Users className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'calendar' && renderCalendarView()}
        {viewMode === 'probability' && renderProbabilityView()}
      </div>

      {selectedEvent && (
        <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Date</p>
              <p className="text-white">{formatDate(selectedEvent.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Probability</p>
              <p className="text-temporal-400">{Math.round(selectedEvent.probability * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Impact</p>
              <p className="text-white capitalize">{selectedEvent.impact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Type</p>
              <p className="text-white capitalize">{selectedEvent.type}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Description</p>
            <p className="text-gray-300">{selectedEvent.description}</p>
          </div>
          {selectedEvent.collaborators && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Collaborators</p>
              <div className="flex space-x-2">
                {selectedEvent.collaborators.map((collaborator, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-collective-400/20 text-collective-300 rounded-full text-sm"
                  >
                    {collaborator}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};