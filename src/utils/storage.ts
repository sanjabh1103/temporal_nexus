// Local storage utilities for caching user data and decisions
export interface User {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
  isGuest: boolean;
}

export interface Decision {
  id: string;
  type: string;
  title: string;
  description: string;
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
  status: 'analyzing' | 'completed' | 'pending';
  createdAt: string;
  confidence?: number;
  results?: any;
}

export interface Insight {
  type: 'optimal' | 'warning' | 'neutral';
  message: string;
  timeframe: string;
}

class StorageManager {
  private static instance: StorageManager;
  
  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // User management
  getUser(): User | null {
    const userData = localStorage.getItem('temporal_nexus_user');
    return userData ? JSON.parse(userData) : null;
  }

  createUser(userData?: Partial<User>): User {
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: userData?.name || 'Guest User',
      email: userData?.email,
      createdAt: new Date().toISOString(),
      isGuest: !userData?.email
    };
    
    localStorage.setItem('temporal_nexus_user', JSON.stringify(user));
    return user;
  }

  updateUser(updates: Partial<User>): User | null {
    const user = this.getUser();
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    localStorage.setItem('temporal_nexus_user', JSON.stringify(updatedUser));
    return updatedUser;
  }

  // Decision management
  getDecisions(): Decision[] {
    const decisions = localStorage.getItem('temporal_nexus_decisions');
    return decisions ? JSON.parse(decisions) : this.getMockDecisions();
  }

  createDecision(decision: Decision): Decision {
    const decisions = this.getDecisions();
    decisions.unshift(decision);
    localStorage.setItem('temporal_nexus_decisions', JSON.stringify(decisions));
    
    // Simulate analysis completion after a delay
    setTimeout(() => {
      this.updateDecisionStatus(decision.id, 'completed', { confidence: Math.floor(Math.random() * 20) + 80 });
    }, 3000);
    
    return decision;
  }

  updateDecisionStatus(id: string, status: Decision['status'], updates?: Partial<Decision>): void {
    const decisions = this.getDecisions();
    const index = decisions.findIndex(d => d.id === id);
    
    if (index !== -1) {
      decisions[index] = { ...decisions[index], status, ...updates };
      localStorage.setItem('temporal_nexus_decisions', JSON.stringify(decisions));
    }
  }

  // Insights management
  getInsights(): Insight[] {
    const insights = localStorage.getItem('temporal_nexus_insights');
    return insights ? JSON.parse(insights) : this.getMockInsights();
  }

  addInsight(insight: Insight): void {
    const insights = this.getInsights();
    insights.unshift(insight);
    if (insights.length > 10) insights.pop(); // Keep only last 10 insights
    localStorage.setItem('temporal_nexus_insights', JSON.stringify(insights));
  }

  // Mock data generators
  private getMockDecisions(): Decision[] {
    return [
      {
        id: 'mock_1',
        type: 'career_change',
        title: 'Switch to Data Science Career',
        description: 'Transition from software engineering to data science',
        timeframe: '1_year',
        priority: 'high',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        confidence: 87
      },
      {
        id: 'mock_2',
        type: 'investment',
        title: 'Tech Stock Investment',
        description: 'Invest in emerging tech companies',
        timeframe: '6_months',
        priority: 'medium',
        status: 'analyzing',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'mock_3',
        type: 'relocation',
        title: 'Move to Seattle',
        description: 'Relocate for better career opportunities',
        timeframe: '2_years',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
      }
    ];
  }

  private getMockInsights(): Insight[] {
    return [
      {
        type: 'optimal',
        message: 'Market conditions favor tech career transitions in Q2 2024',
        timeframe: 'Next 3 months'
      },
      {
        type: 'warning',
        message: 'Economic uncertainty may impact investment timing',
        timeframe: 'Next 6 months'
      },
      {
        type: 'neutral',
        message: 'Personal readiness metrics show steady improvement',
        timeframe: 'Ongoing'
      }
    ];
  }

  // Cache management
  clearCache(): void {
    localStorage.removeItem('temporal_nexus_user');
    localStorage.removeItem('temporal_nexus_decisions');
    localStorage.removeItem('temporal_nexus_insights');
  }

  exportData(): string {
    const data = {
      user: this.getUser(),
      decisions: this.getDecisions(),
      insights: this.getInsights(),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }
}

// Export singleton instance methods
export const UserStorage = StorageManager.getInstance();