# TEMPORAL NEXUS - Product Requirements Document (PRD)

## 📋 Table of Contents
1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [User Stories & LLM System Prompts](#user-stories--llm-system-prompts)
4. [Technical Architecture](#technical-architecture)
5. [Database Schema](#database-schema)
6. [API Specification](#api-specification)
7. [Security & Compliance](#security--compliance)
8. [Performance Requirements](#performance-requirements)
9. [Deployment Strategy](#deployment-strategy)
10. [Future Roadmap](#future-roadmap)

## 🎯 Executive Summary

### Purpose
The TEMPORAL NEXUS is a revolutionary decision-making platform designed to optimize choices across time dimensions, helping users decide not just what to do but when to do it. By integrating temporal optimization, counterfactual life simulation, collective intelligence, and quantum decision modeling, it empowers individuals to make informed decisions about career changes, investments, relocations, and more, with a focus on minimizing regret and maximizing outcomes.

### Scope
The platform combines the Temporal Decision Arbitrage, Counterfactual Life Simulator, Swarm Wisdom Predictor, and Quantum Decision Engine. It uses Gemini 2.5 Flash LLM for intelligent data processing, Supabase for secure storage and authentication (with guest login support), and Netlify for scalable deployment. Local browser storage (localStorage) caches user profiles, decision details, and simulation results to optimize performance.

### Key Value Propositions
- **Temporal Optimization**: Identify optimal timing windows for life decisions
- **AI-Powered Analysis**: Leverage Gemini 2.5 Flash for intelligent decision processing
- **Collective Intelligence**: Learn from thousands of similar decision patterns
- **Quantum Visualization**: Interactive 3D probability cloud representations
- **Real-time Collaboration**: Multi-user decision exploration and sharing

## 🏗 Product Overview

### Core Features
1. **Temporal Optimization Engine**: Identify optimal timing windows for decisions
2. **Alternative Reality Simulator**: Simulate statistical outcomes of different choices
3. **Collective Intelligence Integration**: Leverage user decision data for insights
4. **Quantum Decision Modeling**: Visualize decisions as probability clouds
5. **Time-Travel Decision Testing**: Simulate decisions at different times

### Target Users
- **Primary**: Professionals making career transitions (25-45 years)
- **Secondary**: Investors and entrepreneurs (30-55 years)
- **Tertiary**: Students and life planners (18-35 years)

### Success Metrics
- **User Engagement**: 70%+ weekly active users
- **Decision Accuracy**: 85%+ user satisfaction with recommendations
- **Platform Growth**: 50%+ month-over-month user growth
- **AI Performance**: <200ms API response times

## 👥 User Stories & LLM System Prompts

### 1. Optimize Career Change Timing
**User Story**: As a professional, I want to determine the optimal time to change careers within the next five years to maximize career satisfaction and financial stability.

**LLM System Prompt**:
```
You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing the timing for career changes via the /api/v1/timing-analysis endpoint. Your goal is to interpret natural language requests and extract structured parameters for timing analysis. Focus on:

1. Current Situation: Identify the user's current job title, industry, years of experience, and location.
2. Desired Career Path: Extract the target career or industry and any specific preferences (e.g., company type).
3. Timeframe: Determine the timeframe for the career change (e.g., 5_years).
4. Key Factors: Consider personal factors (e.g., age, financial stability) and external factors (e.g., job market trends, economic forecasts).
5. Clarification: Ask targeted questions for missing details, referencing labor market data.
6. Validation: Ensure parameters are realistic (e.g., valid industries, feasible timeframe).

Input: User text (e.g., "When's the best time to switch from software engineering to data science in the next three years?")
Output Format:
{
  "user_id": "string",
  "decision_type": "career_change",
  "current_situation": {
    "job_title": "string",
    "industry": "string",
    "experience_years": integer,
    "location": "string"
  },
  "desired_path": {
    "career": "string",
    "industry": "string"
  },
  "timeframe": "string"
}

Constraints: Validate industries and locations against labor market data. Cache user profile in localStorage for iterative queries. For guest users, generate a temporary user_id. Return results including optimal_timing_windows and rationale.
```

### 2. Simulate Marriage Decision Outcomes
**User Story**: As an individual, I want to simulate the long-term outcomes of getting married versus staying single based on my personal profile and preferences.

**LLM System Prompt**:
```
You are an AI assistant for the TEMPORAL NEXUS platform, specializing in simulating life path outcomes for marriage decisions via the /api/v1/simulations/run endpoint. Your goal is to:

1. Identify User Profile: Extract relationship status, age, financial status, and life goals.
2. Extract Decision Details: Determine preferences for marriage (e.g., partner traits, timing).
3. Simulate Outcomes: Model statistical outcomes for marriage versus staying single based on user profile and collective data.
4. Clarify: Ask for specifics if details are vague, referencing demographic trends.
5. Validate: Ensure parameters align with realistic scenarios.

Input: User text (e.g., "Should I get married in the next two years or stay single?")
Output Format:
{
  "user_id": "string",
  "decision_type": "marriage",
  "profile": {
    "relationship_status": "string",
    "age": integer,
    "financial_status": "string",
    "life_goals": ["string", ...]
  },
  "decision_details": {
    "marriage_preference": "string",
    "timeframe": "string"
  }
}

Constraints: Validate profile data. Cache simulation parameters in localStorage. Return results including outcome_probabilities (e.g., happiness, financial_impact).
```

### 3-10. Additional Decision Types
[Similar detailed prompts for Investment Timing, Relocation, Education Path, Health Decisions, Retirement Planning, Startup Launch, Real Estate Purchase, and Personal Development]

## 🏛 Technical Architecture

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                        TEMPORAL NEXUS                          │
│                     System Architecture                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Layer      │    │   Database      │
│                 │    │                  │    │                 │
│ React 18 + TS   │◄──►│ Netlify Functions│◄──►│ Supabase        │
│ Tailwind CSS    │    │ Express.js       │    │ PostgreSQL      │
│ Vite Build      │    │ Node.js 18+      │    │ Row Level Sec   │
│ PWA Support     │    │ JWT Auth         │    │ Real-time       │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Local Storage   │    │ Gemini 2.5 Flash│    │ File Storage    │
│                 │    │                  │    │                 │
│ User Profiles   │    │ LLM Processing   │    │ Exports/Imports │
│ Decisions Cache │    │ Decision AI      │    │ Backup Data     │
│ Offline Support │    │ Simulations      │    │ Shared Content  │
│ Performance     │    │ Collective Intel │    │ Media Assets    │
└─────────────────┘    └──────────────────┘    └─────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    Data Flow Architecture                       │
└─────────────────────────────────────────────────────────────────┘

User Input → React Components → API Calls → Gemini Processing → 
Database Storage → Real-time Updates → UI Refresh → Local Cache
```

### Technology Stack

#### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **State Management**: React hooks with context API
- **Routing**: React Router for SPA navigation

#### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Deployment**: Netlify Functions (serverless)
- **Authentication**: Supabase Auth with JWT tokens
- **Database**: PostgreSQL via Supabase
- **AI Integration**: Google Gemini 2.5 Flash API
- **File Storage**: Supabase Storage for exports/imports

#### Infrastructure
- **Hosting**: Netlify with global CDN
- **Database**: Supabase (managed PostgreSQL)
- **Monitoring**: Built-in Netlify analytics
- **Security**: HTTPS, CORS, rate limiting
- **Backup**: Automated Supabase backups

## 🗄 Database Schema

### Core Tables

#### user_profiles
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_guest BOOLEAN DEFAULT FALSE,
  profile_data JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id OR is_guest = true);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### decisions
```sql
CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  decision_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  timeframe TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT CHECK (status IN ('analyzing', 'completed', 'pending')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  analysis_result JSONB,
  simulation_result JSONB,
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage own decisions" ON decisions
  FOR ALL USING (auth.uid() = user_id);
```

#### simulations
```sql
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
  simulation_type TEXT NOT NULL,
  parameters JSONB NOT NULL,
  results JSONB,
  status TEXT CHECK (status IN ('running', 'completed', 'failed')) DEFAULT 'running',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  execution_time_ms INTEGER,
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can access simulations for own decisions" ON simulations
  FOR ALL USING (
    decision_id IN (
      SELECT id FROM decisions WHERE user_id = auth.uid()
    )
  );
```

#### timing_analysis
```sql
CREATE TABLE timing_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id UUID REFERENCES decisions(id) ON DELETE CASCADE,
  timeframe TEXT NOT NULL,
  optimal_windows JSONB,
  market_conditions JSONB,
  personal_readiness JSONB,
  risk_factors JSONB,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE timing_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can access timing analysis for own decisions" ON timing_analysis
  FOR ALL USING (
    decision_id IN (
      SELECT id FROM decisions WHERE user_id = auth.uid()
    )
  );
```

#### collective_insights
```sql
CREATE TABLE collective_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_type TEXT NOT NULL,
  insight_type TEXT NOT NULL,
  data JSONB NOT NULL,
  user_count INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable RLS
ALTER TABLE collective_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can read collective insights" ON collective_insights
  FOR SELECT USING (is_active = true);
```

### Indexes for Performance
```sql
-- User profiles
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_is_guest ON user_profiles(is_guest);

-- Decisions
CREATE INDEX idx_decisions_user_id ON decisions(user_id);
CREATE INDEX idx_decisions_type ON decisions(decision_type);
CREATE INDEX idx_decisions_status ON decisions(status);
CREATE INDEX idx_decisions_created_at ON decisions(created_at DESC);

-- Simulations
CREATE INDEX idx_simulations_decision_id ON simulations(decision_id);
CREATE INDEX idx_simulations_status ON simulations(status);

-- Timing analysis
CREATE INDEX idx_timing_analysis_decision_id ON timing_analysis(decision_id);

-- Collective insights
CREATE INDEX idx_collective_insights_type ON collective_insights(decision_type);
CREATE INDEX idx_collective_insights_active ON collective_insights(is_active);
```

## 🔌 API Specification

### Authentication Endpoints

#### POST /api/v1/auth/signup
```json
{
  "request": {
    "email": "string",
    "password": "string",
    "name": "string"
  },
  "response": {
    "userId": "uuid",
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "created_at": "timestamp"
    }
  }
}
```

#### POST /api/v1/auth/login
```json
{
  "request": {
    "email": "string",
    "password": "string"
  },
  "response": {
    "userId": "uuid",
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "last_active": "timestamp"
    }
  }
}
```

### Decision Management Endpoints

#### POST /api/v1/decisions
```json
{
  "request": {
    "user_id": "uuid",
    "decision_type": "career_change|investment|marriage|relocation|education_path|health|retirement|startup_launch|real_estate_purchase|personal_development",
    "title": "string",
    "description": "string",
    "timeframe": "3_months|6_months|1_year|2_years|5_years|10_years",
    "priority": "low|medium|high"
  },
  "response": {
    "decisionId": "uuid",
    "status": "analyzing",
    "estimated_completion": "timestamp"
  }
}
```

#### GET /api/v1/decisions/{id}
```json
{
  "response": {
    "id": "uuid",
    "user_id": "uuid",
    "decision_type": "string",
    "title": "string",
    "description": "string",
    "status": "analyzing|completed|pending",
    "confidence": "integer",
    "analysis_result": {
      "extracted_data": "object",
      "timing_analysis": "object",
      "recommendations": "object",
      "confidence_score": "integer"
    },
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

### Simulation Endpoints

#### POST /api/v1/simulations
```json
{
  "request": {
    "decision_id": "uuid",
    "simulation_type": "counterfactual|probability|timeline",
    "parameters": "object"
  },
  "response": {
    "simulationId": "uuid",
    "status": "running",
    "estimated_completion": "timestamp"
  }
}
```

#### GET /api/v1/simulations/{id}
```json
{
  "response": {
    "id": "uuid",
    "decision_id": "uuid",
    "simulation_type": "string",
    "status": "running|completed|failed",
    "results": {
      "scenarios": "object",
      "timeline_projection": "object",
      "risk_analysis": "object",
      "probability_distribution": "array"
    },
    "execution_time_ms": "integer",
    "created_at": "timestamp",
    "completed_at": "timestamp"
  }
}
```

### Analysis Endpoints

#### POST /api/v1/timing-analysis
```json
{
  "request": {
    "decision_id": "uuid",
    "timeframe": "string",
    "context": "object"
  },
  "response": {
    "timingWindows": [
      {
        "period": "string",
        "probability": "decimal",
        "factors": "array",
        "recommendation": "string"
      }
    ],
    "marketConditions": "object",
    "personalReadiness": "object",
    "riskFactors": "array"
  }
}
```

#### GET /api/v1/collective-insights
```json
{
  "request": {
    "decision_type": "string",
    "user_profile": "object"
  },
  "response": {
    "insights": [
      {
        "type": "string",
        "message": "string",
        "confidence": "decimal",
        "source_count": "integer"
      }
    ],
    "success_rate": "decimal",
    "common_patterns": "array",
    "trending_factors": "array"
  }
}
```

### User Profile Endpoints

#### GET /api/v1/user/profile
```json
{
  "response": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "is_guest": "boolean",
    "profile_data": "object",
    "preferences": "object",
    "statistics": {
      "total_decisions": "integer",
      "completed_decisions": "integer",
      "average_confidence": "decimal",
      "success_rate": "decimal"
    },
    "created_at": "timestamp",
    "last_active": "timestamp"
  }
}
```

#### PUT /api/v1/user/profile
```json
{
  "request": {
    "name": "string",
    "profile_data": "object",
    "preferences": "object"
  },
  "response": {
    "status": "success",
    "updated_fields": "array",
    "updated_at": "timestamp"
  }
}
```

## 🔒 Security & Compliance

### Data Protection
- **GDPR Compliance**: Full compliance with European data protection regulations
- **CCPA Compliance**: California Consumer Privacy Act compliance
- **Data Minimization**: Collect only necessary data for functionality
- **Anonymization**: Personal data anonymized for collective insights
- **Encryption**: AES-256 encryption for data at rest, TLS 1.3 for data in transit

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Row Level Security**: Database-level access controls
- **Session Management**: Secure session handling with automatic timeout
- **Guest Mode**: Full functionality without registration
- **Multi-factor Authentication**: Optional 2FA for enhanced security

### Privacy Features
- **Data Portability**: Full data export in standard formats
- **Right to Deletion**: Complete data removal on request
- **Consent Management**: Granular privacy controls
- **Audit Logging**: Comprehensive activity logging
- **Data Retention**: Configurable data retention policies

### Security Measures
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Protection**: Parameterized queries and ORM
- **XSS Prevention**: Content Security Policy and input encoding
- **CSRF Protection**: Anti-CSRF tokens for state-changing operations

## ⚡ Performance Requirements

### Response Time Targets
- **API Endpoints**: <200ms for non-simulation requests
- **Simulation Processing**: <5s for standard simulations
- **Page Load Time**: <1.5s First Contentful Paint
- **Time to Interactive**: <3s on 3G networks
- **Database Queries**: <50ms for simple queries

### Scalability Requirements
- **Concurrent Users**: Support 10,000+ simultaneous users
- **API Throughput**: 1,000+ requests per second
- **Database Connections**: Efficient connection pooling
- **Storage**: Unlimited user data with efficient compression
- **CDN**: Global content delivery for optimal performance

### Optimization Strategies
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Progressive loading of non-critical resources
- **Caching**: Multi-layer caching strategy (browser, CDN, database)
- **Image Optimization**: WebP format with fallbacks
- **Bundle Optimization**: Tree shaking and minification

### Monitoring & Alerting
- **Performance Monitoring**: Real-time performance tracking
- **Error Tracking**: Comprehensive error logging and alerting
- **Uptime Monitoring**: 99.9% uptime target with alerting
- **Resource Monitoring**: CPU, memory, and database monitoring
- **User Experience**: Core Web Vitals tracking

## 🚀 Deployment Strategy

### Environment Configuration

#### Development
```yaml
Environment: development
Database: Local Supabase instance
API: Local Netlify Functions
AI: Gemini API (development quota)
Monitoring: Console logging
```

#### Staging
```yaml
Environment: staging
Database: Supabase staging instance
API: Netlify staging deployment
AI: Gemini API (staging quota)
Monitoring: Basic analytics
```

#### Production
```yaml
Environment: production
Database: Supabase production instance
API: Netlify production deployment
AI: Gemini API (production quota)
Monitoring: Full analytics and alerting
```

### Deployment Pipeline
1. **Code Commit**: Developer pushes to feature branch
2. **Automated Testing**: Unit tests, integration tests, E2E tests
3. **Code Review**: Peer review and approval process
4. **Staging Deployment**: Automatic deployment to staging
5. **QA Testing**: Manual and automated testing on staging
6. **Production Deployment**: Approved changes deployed to production
7. **Monitoring**: Post-deployment monitoring and alerting

### Infrastructure as Code
```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Backup & Recovery
- **Database Backups**: Daily automated backups with 30-day retention
- **Code Repository**: Git-based version control with multiple remotes
- **Configuration Backups**: Environment variable backups
- **Disaster Recovery**: RTO: 4 hours, RPO: 1 hour
- **Testing**: Monthly disaster recovery testing

## 🗺 Future Roadmap

### Version 1.1 (Q2 2024)
- [ ] **Enhanced Authentication**
  - Email/password registration UI
  - Social authentication (Google, GitHub)
  - Password recovery system
  - Account verification

- [ ] **Team Collaboration**
  - Shared decision workspaces
  - Real-time collaborative editing
  - Comment and annotation system
  - Team analytics dashboard

- [ ] **Mobile Application**
  - React Native mobile app
  - Push notifications
  - Offline synchronization
  - Mobile-specific UI optimizations

### Version 1.2 (Q3 2024)
- [ ] **Advanced Analytics**
  - Custom analytics dashboard
  - Decision outcome tracking
  - Success rate analysis
  - Predictive insights

- [ ] **API Enhancements**
  - Public API for third-party integrations
  - Webhook system for real-time updates
  - Rate limiting and usage analytics
  - API documentation portal

- [ ] **Integration Marketplace**
  - Calendar integration (Google, Outlook)
  - CRM integration (Salesforce, HubSpot)
  - Financial data integration (Plaid)
  - Social media integration

### Version 2.0 (Q4 2024)
- [ ] **Advanced AI Features**
  - Custom LLM model training
  - Multi-modal input (voice, image)
  - Personalized AI assistants
  - Advanced simulation algorithms

- [ ] **Enterprise Features**
  - Single Sign-On (SSO)
  - Advanced user management
  - Custom branding options
  - Enterprise-grade security

- [ ] **Emerging Technologies**
  - AR/VR decision visualization
  - Blockchain-based decision verification
  - IoT data integration
  - Voice interface

### Version 3.0 (2025)
- [ ] **Global Expansion**
  - Multi-language support (10+ languages)
  - Regional compliance (GDPR, CCPA, etc.)
  - Local market adaptations
  - Global CDN optimization

- [ ] **AI Advancement**
  - Quantum computing integration
  - Advanced neural networks
  - Federated learning
  - Explainable AI

---

## 📊 Appendices

### A. Glossary of Terms
- **Temporal Optimization**: The process of finding optimal timing for decisions
- **Counterfactual Simulation**: Modeling alternative outcomes of different choices
- **Collective Intelligence**: Aggregated insights from multiple user decisions
- **Quantum Decision Modeling**: Probabilistic representation of decision outcomes
- **Decision Arbitrage**: Exploiting timing differences for optimal outcomes

### B. Technical Dependencies
```json
{
  "frontend": {
    "react": "^18.3.1",
    "typescript": "^5.5.3",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2",
    "lucide-react": "^0.344.0",
    "recharts": "^2.8.0"
  },
  "backend": {
    "@supabase/supabase-js": "^2.39.3",
    "@google/generative-ai": "^0.21.0",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2"
  }
}
```

### C. Environment Variables
```env
# Required
GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
VITE_ANALYTICS_ID=your_analytics_id
```

---

**Document Version**: 1.0.0  
**Last Updated**: January 2024  
**Next Review**: March 2024  
**Owner**: TEMPORAL NEXUS Development Team