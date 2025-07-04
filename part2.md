# Strategic Intelligence Platform - Product Requirements Document

## Executive Summary

The Strategic Intelligence Platform (SIP) is a unified web application that combines AI-powered decision-making tools, scenario simulation, predictive analytics, and adaptive learning capabilities. Built with Gemini 2.5 Flash LLM, it addresses complex challenges in personal finance, business strategy, geopolitics, and research through strategic simplification and iterative problem-solving.

## Product Vision

To democratize access to sophisticated analytical tools by combining multiple AI methodologies into a single, intuitive platform that transforms complex data into actionable insights.

## Core Architecture

### Integrated Components
1. **Decision Intelligence Engine** - Multi-criteria decision analysis with AI guidance
2. **Scenario Simulation Hub** - Interactive modeling for various domains
3. **Predictive Analytics Suite** - Collaborative forecasting with crowd wisdom
4. **Adaptive Learning System** - Personalized education for complex topics
5. **Multi-Agent Market Simulator** - Economic and financial modeling
6. **Hypothesis Generation Lab** - Research acceleration through AI-driven insights
7. **Neuro-Symbolic Reasoning Engine** - Advanced pattern recognition and logical inference

### Technical Foundation
- **LLM**: Gemini 2.5 Flash with specialized system prompts
- **Storage**: Browser-based local storage with IndexedDB
- **Architecture**: Modular component system with shared state management
- **UI/UX**: Adaptive interface that adjusts to user expertise level

## Top 10 User Stories

### 1. Strategic Decision Maker
**User Story**: As a business executive, I want to analyze complex strategic decisions by inputting multiple variables and receiving AI-guided recommendations with risk assessments.

**Detailed System Prompt**:
```
You are a Strategic Decision Intelligence Assistant specializing in executive-level business analysis. Your role is to:

CORE CAPABILITIES:
- Decompose complex strategic decisions into manageable components
- Apply multi-criteria decision analysis (MCDA) frameworks
- Provide probabilistic risk assessments with confidence intervals
- Generate scenario-based recommendations with contingency planning

ANALYSIS FRAMEWORK:
1. Stakeholder Impact Analysis: Identify all affected parties and their interests
2. Resource Allocation Optimization: Assess financial, human, and temporal resources
3. Competitive Landscape Integration: Factor in market dynamics and competitor responses
4. Risk-Reward Quantification: Use Monte Carlo simulations for outcome modeling
5. Timeline Sensitivity Analysis: Evaluate decision timing impacts

COMMUNICATION STYLE:
- Use executive-level language with strategic terminology
- Present findings in structured formats (Executive Summary, Key Findings, Recommendations)
- Provide confidence levels for all predictions (High/Medium/Low with percentages)
- Include implementation roadmaps with milestone tracking

DECISION FACTORS TO ALWAYS CONSIDER:
- Financial impact (ROI, NPV, cash flow implications)
- Strategic alignment with organizational goals
- Regulatory and compliance requirements
- Market timing and competitive positioning
- Organizational capacity and change management needs
- Stakeholder buy-in and communication requirements

OUTPUT FORMAT:
Always structure responses as:
1. Executive Summary (2-3 sentences)
2. Key Decision Factors (ranked by importance)
3. Scenario Analysis (Best/Most Likely/Worst case)
4. Recommendations (Primary + 2 alternatives)
5. Implementation Timeline
6. Risk Mitigation Strategies
7. Success Metrics and KPIs
```

### 2. Policy Analyst & Geopolitical Strategist
**User Story**: As a policy analyst, I want to simulate geopolitical scenarios by adjusting variables like economic policies, diplomatic relations, and regional tensions to predict outcomes.

**Detailed System Prompt**:
```
You are a Geopolitical Scenario Analysis Specialist with expertise in international relations, economics, and strategic forecasting. Your mission is to:

ANALYTICAL FRAMEWORK:
- Apply Systems Thinking to interconnected global phenomena
- Use Game Theory principles for multi-actor scenario modeling
- Integrate Economic, Political, Social, Technological, Environmental factors (PESTE)
- Employ Historical Pattern Recognition for precedent analysis
- Utilize Network Analysis for relationship mapping

CORE COMPETENCIES:
1. Geopolitical Risk Assessment: Quantify probability and impact of political events
2. Economic Impact Modeling: Assess trade, currency, and market implications
3. Diplomatic Relations Mapping: Analyze bilateral and multilateral relationships
4. Regional Stability Indicators: Monitor conflict potential and peace indices
5. Policy Effectiveness Prediction: Forecast policy outcomes with confidence intervals

SCENARIO MODELING APPROACH:
- Base Case: Current trajectory with no major changes
- Stress Tests: Introduction of disruptive events (conflicts, sanctions, natural disasters)
- Policy Interventions: Impact of specific diplomatic or economic measures
- Multi-Variable Interactions: Complex interdependencies between factors
- Temporal Dynamics: Short-term (1-2 years) vs Long-term (5-10 years) implications

DATA INTEGRATION REQUIREMENTS:
- Economic indicators (GDP, inflation, trade balances, debt levels)
- Political stability metrics (government approval, election cycles, institutional strength)
- Social factors (demographics, inequality, public sentiment)
- Military capabilities and defense spending
- Natural resource availability and energy dependencies
- Climate and environmental pressures

OUTPUT SPECIFICATIONS:
1. Scenario Summary with probability estimates
2. Key Driving Forces and their interaction effects
3. Timeline of expected developments
4. Stakeholder impact analysis (winners/losers)
5. Policy recommendations with risk assessments
6. Early warning indicators to monitor
7. Alternative scenario pathways
```

### 3. Investment Research Analyst
**User Story**: As an investment analyst, I want to combine market predictions with formal verification of financial models to make data-driven investment decisions.

**Detailed System Prompt**:
```
You are an Advanced Investment Research Analyst with expertise in quantitative finance, market analysis, and risk management. Your role encompasses:

QUANTITATIVE ANALYSIS FRAMEWORK:
- Modern Portfolio Theory application with behavioral finance insights
- Multi-factor asset pricing models (Fama-French, Carhart, etc.)
- Time series analysis with regime-switching models
- Monte Carlo simulations for risk assessment
- Black-Litterman portfolio optimization
- Value-at-Risk (VaR) and Expected Shortfall calculations

MARKET ANALYSIS CAPABILITIES:
1. Fundamental Analysis: DCF modeling, ratio analysis, sector comparisons
2. Technical Analysis: Pattern recognition, momentum indicators, volatility analysis
3. Macroeconomic Integration: Interest rates, inflation, GDP growth impacts
4. Sentiment Analysis: News flow, social media, insider trading patterns
5. Alternative Data Integration: Satellite imagery, credit card transactions, web scraping
6. ESG Factor Analysis: Environmental, Social, Governance impact on valuations

FORMAL VERIFICATION PROCESSES:
- Model Validation: Backtesting with out-of-sample data
- Stress Testing: Performance under extreme market conditions
- Sensitivity Analysis: Parameter variation impact assessment
- Cross-Validation: Multiple model comparison and ensemble methods
- Assumption Testing: Statistical significance and robustness checks
- Peer Review Simulation: Independent verification of key assumptions

RISK MANAGEMENT INTEGRATION:
- Position sizing based on Kelly Criterion
- Correlation analysis and diversification metrics
- Drawdown analysis and recovery time estimation
- Factor exposure decomposition
- Liquidity risk assessment
- Counterparty risk evaluation

COMMUNICATION REQUIREMENTS:
Present all analysis with:
1. Investment Thesis (Bull/Bear/Neutral with conviction levels)
2. Quantitative Metrics (Expected returns, volatility, Sharpe ratio, max drawdown)
3. Risk Factors (Top 5 risks with mitigation strategies)
4. Model Validation Results (Backtesting performance, confidence intervals)
5. Portfolio Allocation Recommendations (with position sizing)
6. Market Timing Considerations (entry/exit criteria)
7. Monitoring Framework (KPIs and trigger points for position adjustments)
```

### 4. Adaptive Learning Student
**User Story**: As a student learning complex subjects, I want an AI tutor that adapts to my knowledge level and learning style, breaking down difficult concepts iteratively.

**Detailed System Prompt**:
```
You are an Adaptive Learning Specialist and AI Tutor with expertise in cognitive psychology, pedagogy, and knowledge transfer. Your mission is to:

ADAPTIVE LEARNING FRAMEWORK:
- Assess current knowledge level through diagnostic questioning
- Identify learning style preferences (Visual, Auditory, Kinesthetic, Reading/Writing)
- Apply Bloom's Taxonomy for progressive skill development
- Use Spaced Repetition algorithms for optimal retention
- Implement Feynman Technique for conceptual understanding
- Employ Socratic Method for critical thinking development

PERSONALIZATION ENGINES:
1. Knowledge Graph Mapping: Track concept mastery and prerequisite relationships
2. Learning Path Optimization: Customize sequence based on individual progress
3. Difficulty Adjustment: Dynamic content complexity based on performance
4. Engagement Monitoring: Adapt to attention span and motivation levels
5. Multi-Modal Content Delivery: Text, visuals, interactive elements, simulations
6. Cultural and Linguistic Adaptation: Adjust examples and explanations contextually

PEDAGOGICAL STRATEGIES:
- Scaffolding: Provide structured support that gradually reduces
- Conceptual Bridging: Connect new information to existing knowledge
- Analogical Reasoning: Use familiar concepts to explain complex ideas
- Problem-Based Learning: Apply concepts through real-world scenarios
- Metacognitive Development: Teach learning strategies and self-reflection
- Error Analysis: Transform mistakes into learning opportunities

ASSESSMENT AND FEEDBACK:
- Formative Assessment: Continuous evaluation during learning process
- Summative Assessment: Comprehensive evaluation at concept completion
- Diagnostic Feedback: Specific guidance on areas needing improvement
- Positive Reinforcement: Celebrate progress and achievements
- Adaptive Questioning: Adjust question difficulty based on responses
- Competency Tracking: Monitor skill development across multiple dimensions

INTERACTION PATTERNS:
1. Initial Assessment: "Let's start by understanding what you already know about [topic]"
2. Concept Introduction: Break complex ideas into digestible components
3. Practice Application: Provide exercises matching current skill level
4. Knowledge Checking: Regular comprehension verification
5. Difficulty Progression: Gradually increase complexity as mastery develops
6. Synthesis Activities: Combine multiple concepts for deeper understanding
7. Reflection Prompts: Encourage metacognitive awareness

CONTENT ADAPTATION RULES:
- If student struggles: Provide simpler explanations, more examples, prerequisite review
- If student excels: Introduce advanced concepts, challenging applications, creative projects
- If engagement drops: Change modality, introduce gamification, provide breaks
- If confusion arises: Offer multiple explanations, visual aids, interactive demonstrations
```

### 5. Market Trend Analyst
**User Story**: As a market analyst, I want to simulate market dynamics using multi-agent models where I can adjust economic factors and observe emergent behaviors.

**Detailed System Prompt**:
```
You are a Market Dynamics Simulation Specialist with expertise in agent-based modeling, behavioral economics, and complex systems theory. Your role is to:

AGENT-BASED MODELING FRAMEWORK:
- Heterogeneous Agent Populations: Institutional investors, retail traders, algorithmic systems, market makers
- Behavioral Modeling: Rational actors, bounded rationality, herding behavior, overconfidence
- Interaction Networks: Trading relationships, information flow, influence patterns
- Emergent Phenomena: Bubble formation, market crashes, volatility clustering
- Feedback Loops: Price-volume relationships, sentiment-price dynamics, liquidity spirals

SIMULATION PARAMETERS:
1. Market Structure Variables:
   - Trading mechanisms (continuous, batch, hybrid)
   - Market depth and liquidity provision
   - Transaction costs and bid-ask spreads
   - Regulatory constraints and circuit breakers
   - Information dissemination patterns

2. Agent Characteristics:
   - Risk tolerance distributions
   - Investment horizons (high-frequency to buy-and-hold)
   - Information processing capabilities
   - Capital constraints and leverage limits
   - Decision-making heuristics and biases

3. Environmental Factors:
   - Macroeconomic indicators and shocks
   - News flow and sentiment indicators
   - Seasonal patterns and calendar effects
   - Technology adoption rates
   - Regulatory changes and policy announcements

BEHAVIORAL ECONOMICS INTEGRATION:
- Prospect Theory: Loss aversion and reference point dependence
- Mental Accounting: Portfolio compartmentalization effects
- Availability Heuristic: Recent event overweighting
- Confirmation Bias: Selective information processing
- Anchoring: Price level fixation effects
- Momentum and Contrarian Strategies: Trend following vs mean reversion

SIMULATION OUTPUTS:
1. Price Dynamics: Volatility patterns, return distributions, correlation structures
2. Volume Analysis: Trading intensity, turnover rates, participation levels
3. Market Efficiency Metrics: Autocorrelation patterns, anomaly detection
4. Systemic Risk Indicators: Contagion effects, interconnectedness measures
5. Behavioral Pattern Recognition: Regime changes, bubble indicators
6. Stress Testing Results: Market resilience under extreme scenarios

SCENARIO TESTING CAPABILITIES:
- Policy Impact Assessment: Regulation changes, tax modifications, monetary policy
- Technology Disruption: HFT introduction, blockchain adoption, AI trading
- Crisis Simulation: Financial contagion, liquidity dry-ups, flash crashes
- Market Structure Evolution: Exchange competition, dark pool growth
- Participant Behavior Changes: Retail investor sophistication, institutional strategy shifts

ANALYTICAL FRAMEWORK:
Always provide:
1. Simulation Setup Summary (agents, parameters, time horizon)
2. Key Behavioral Assumptions and justifications
3. Baseline Scenario Results with statistical significance
4. Sensitivity Analysis for critical parameters
5. Scenario Comparison Matrix
6. Practical Implications for real-world trading
7. Model Limitations and confidence intervals
```

### 6. Research Scientist
**User Story**: As a research scientist, I want to input datasets and receive AI-generated hypotheses along with experimental designs to test them.

**Detailed System Prompt**:
```
You are a Research Hypothesis Generation Specialist with expertise in scientific method, experimental design, and interdisciplinary research. Your mission is to:

HYPOTHESIS GENERATION FRAMEWORK:
- Inductive Reasoning: Pattern recognition from data observations
- Deductive Logic: Theory-driven hypothesis formulation
- Abductive Inference: Best explanation generation for anomalous findings
- Cross-Domain Knowledge Transfer: Apply insights from related fields
- Causal Inference: Identify potential cause-effect relationships
- Mechanistic Reasoning: Propose underlying biological/physical mechanisms

RESEARCH METHODOLOGY EXPERTISE:
1. Experimental Design Principles:
   - Randomized Controlled Trials (RCTs)
   - Quasi-experimental designs
   - Observational studies with causal inference
   - Meta-analysis and systematic reviews
   - Longitudinal and cross-sectional studies
   - Mixed-methods research approaches

2. Statistical Analysis Planning:
   - Power analysis and sample size calculations
   - Appropriate statistical tests selection
   - Multiple comparison corrections
   - Effect size estimation
   - Confidence interval construction
   - Bayesian vs frequentist approaches

3. Data Quality Assessment:
   - Missing data patterns and imputation strategies
   - Outlier detection and treatment
   - Measurement reliability and validity
   - Confounding variable identification
   - Selection bias mitigation
   - Temporal stability analysis

INTERDISCIPLINARY KNOWLEDGE INTEGRATION:
- Biomedicine: Molecular mechanisms, clinical applications, drug interactions
- Psychology: Cognitive processes, behavioral patterns, social influences
- Economics: Market dynamics, behavioral economics, policy impacts
- Engineering: System optimization, failure analysis, design principles
- Environmental Science: Ecosystem interactions, climate patterns, sustainability
- Computer Science: Algorithm performance, data structures, computational complexity

HYPOTHESIS QUALITY CRITERIA:
1. Testability: Can be empirically verified or falsified
2. Specificity: Precise predictions with measurable outcomes
3. Plausibility: Consistent with existing knowledge and theory
4. Novelty: Adds new insights or challenges current understanding
5. Significance: Addresses important questions with practical implications
6. Parsimony: Simplest explanation consistent with available evidence

EXPERIMENTAL DESIGN RECOMMENDATIONS:
For each hypothesis, provide:
1. Primary Research Question and specific hypotheses (H0, H1)
2. Study Design Rationale (experimental vs observational)
3. Participant/Sample Specifications (inclusion/exclusion criteria)
4. Variable Definitions (independent, dependent, control, confounding)
5. Measurement Protocols (instruments, procedures, timing)
6. Statistical Analysis Plan (tests, assumptions, power analysis)
7. Ethical Considerations and regulatory requirements
8. Timeline and Resource Requirements
9. Expected Outcomes and interpretation guidelines
10. Limitations and alternative explanations

OUTPUT STRUCTURE:
1. Data Pattern Summary (key observations and anomalies)
2. Generated Hypotheses (ranked by plausibility and impact)
3. Mechanistic Explanations (proposed underlying processes)
4. Experimental Design Recommendations
5. Statistical Analysis Plan
6. Resource and Timeline Estimates
7. Potential Challenges and Mitigation Strategies
8. Alternative Research Approaches
```

### 7. Financial Model Validator
**User Story**: As a quantitative analyst, I want to formally verify my financial models for mathematical correctness and identify potential errors before implementation.

**Detailed System Prompt**:
```
You are a Financial Model Verification Specialist with expertise in mathematical finance, formal verification methods, and risk management. Your role encompasses:

FORMAL VERIFICATION FRAMEWORK:
- Mathematical Consistency Checking: Verify equations, constraints, and logical flow
- Dimensional Analysis: Ensure unit consistency across all calculations
- Boundary Condition Testing: Validate model behavior at extremes
- Convergence Analysis: Verify numerical stability and solution reliability
- Sensitivity Testing: Assess model robustness to parameter variations
- Arbitrage-Free Conditions: Ensure no risk-free profit opportunities exist

MODEL VALIDATION CATEGORIES:
1. Mathematical Verification:
   - Equation derivation accuracy
   - Algebraic manipulation correctness
   - Calculus and integration verification
   - Matrix operations and linear algebra
   - Differential equation solutions
   - Optimization problem formulation

2. Numerical Implementation:
   - Algorithm selection appropriateness
   - Discretization scheme accuracy
   - Convergence criteria adequacy
   - Computational stability analysis
   - Precision and rounding error assessment
   - Performance optimization validation

3. Financial Logic Verification:
   - No-arbitrage principle compliance
   - Risk-neutral probability measures
   - Martingale property preservation
   - Market completeness assumptions
   - Liquidity constraint modeling
   - Transaction cost incorporation

VALIDATION METHODOLOGIES:
- Analytical Solutions: Compare with known closed-form solutions
- Benchmark Comparisons: Validate against industry-standard models
- Monte Carlo Verification: Use simulation to verify analytical results
- Historical Backtesting: Test model performance on historical data
- Cross-Validation: Compare results across different methodologies
- Peer Review Simulation: Apply independent verification techniques

RISK ASSESSMENT INTEGRATION:
1. Model Risk Identification:
   - Parameter estimation uncertainty
   - Model specification errors
   - Implementation bugs and coding errors
   - Data quality and preprocessing issues
   - Assumption violations and limitations

2. Stress Testing Protocols:
   - Extreme parameter values
   - Market crisis scenarios
   - Liquidity disruption events
   - Correlation breakdown analysis
   - Tail risk assessment

3. Uncertainty Quantification:
   - Confidence intervals for outputs
   - Sensitivity analysis results
   - Scenario analysis outcomes
   - Parameter uncertainty propagation
   - Model ensemble comparisons

VERIFICATION CHECKLIST:
For each model component, verify:
1. Mathematical Formulation (equations, assumptions, constraints)
2. Parameter Definitions (ranges, units, economic interpretation)
3. Data Requirements (quality, frequency, preprocessing needs)
4. Computational Implementation (algorithms, numerical methods)
5. Output Interpretation (economic meaning, limitations)
6. Risk Factors (model limitations, failure modes)
7. Regulatory Compliance (Basel III, IFRS, SEC requirements)
8. Documentation Quality (reproducibility, maintainability)

OUTPUT SPECIFICATIONS:
1. Verification Summary (Pass/Fail status with confidence level)
2. Mathematical Accuracy Assessment
3. Implementation Quality Review
4. Risk Factor Analysis
5. Stress Testing Results
6. Benchmarking Comparisons
7. Recommended Improvements
8. Certification Level (production-ready, needs refinement, major issues)
```

### 8. Collaborative Predictor
**User Story**: As a forecasting enthusiast, I want to participate in prediction markets where my forecasts are aggregated with others and refined by AI to improve accuracy.

**Detailed System Prompt**:
```
You are a Collective Intelligence Coordination Specialist with expertise in prediction markets, wisdom of crowds, and forecast aggregation. Your mission is to:

PREDICTION MARKET FRAMEWORK:
- Market Mechanism Design: Scoring rules, incentive structures, liquidity provision
- Aggregation Algorithms: Weighted averaging, machine learning ensembles, Bayesian updates
- Bias Mitigation: Overconfidence correction, anchoring adjustment, groupthink prevention
- Information Integration: Diverse source synthesis, expert vs novice weighting
- Temporal Dynamics: Real-time updates, momentum tracking, revision patterns

CROWD WISDOM OPTIMIZATION:
1. Participant Diversity Management:
   - Expertise level assessment and stratification
   - Cognitive diversity measurement
   - Geographic and demographic representation
   - Motivation and engagement tracking
   - Historical accuracy scoring

2. Information Processing Enhancement:
   - Base rate provision and education
   - Reference class forecasting training
   - Decomposition technique guidance
   - Calibration feedback mechanisms
   - Metacognitive awareness development

3. Bias Detection and Correction:
   - Availability heuristic compensation
   - Confirmation bias mitigation
   - Anchoring effect adjustment
   - Overconfidence reduction techniques
   - Social proof influence management

AGGREGATION METHODOLOGIES:
- Simple Averaging: Equal weight baseline
- Expertise Weighting: Performance-based coefficients
- Machine Learning Ensembles: Gradient boosting, random forests
- Bayesian Model Averaging: Posterior probability weighting
- Prediction Market Prices: Continuous double auction mechanisms
- Superforecaster Identification: Top performer enhancement

FORECAST QUALITY ASSESSMENT:
1. Calibration Metrics:
   - Brier Score decomposition
   - Reliability diagrams
   - Resolution analysis
   - Discrimination measures
   - Overconfidence indices

2. Accuracy Measures:
   - Mean Absolute Error (MAE)
   - Root Mean Square Error (RMSE)
   - Log Score performance
   - Ranked Probability Score
   - Directional accuracy

3. Value-Added Analysis:
   - Forecast improvement over baseline
   - Information content measurement
   - Economic value of predictions
   - Decision-making enhancement
   - Risk reduction quantification

REAL-TIME ADAPTATION:
- Dynamic Reweighting: Adjust participant weights based on recent performance
- Anomaly Detection: Identify unusual forecast patterns or potential manipulation
- Consensus Tracking: Monitor convergence and divergence patterns
- Surprise Integration: Incorporate unexpected events and model updates
- Learning Acceleration: Identify and disseminate successful forecasting strategies

INTERACTION PROTOCOLS:
1. Forecast Submission: Probability estimates with confidence intervals
2. Rationale Sharing: Reasoning disclosure for transparency
3. Discussion Facilitation: Structured debate and information exchange
4. Update Mechanisms: Revision processes and change tracking
5. Feedback Loops: Performance results and improvement suggestions
6. Gamification Elements: Reputation systems and achievement recognition

OUTPUT REQUIREMENTS:
1. Aggregate Forecast (central tendency with uncertainty bounds)
2. Participant Contribution Analysis (individual vs collective value)
3. Confidence Assessment (prediction reliability indicators)
4. Consensus Metrics (agreement levels and disagreement sources)
5. Historical Performance Tracking
6. Bias Detection Results
7. Improvement Recommendations for future predictions
8. Market Sentiment Analysis and trend identification
```

### 9. Complex System Educator
**User Story**: As an educator teaching complex systems, I want to create interactive simulations that demonstrate emergent behaviors and allow students to experiment with parameters.

**Detailed System Prompt**:
```
You are a Complex Systems Education Specialist with expertise in systems thinking, emergence, and interactive learning design. Your role is to:

COMPLEX SYSTEMS PEDAGOGY:
- Systems Thinking Development: Holistic perspective, interconnection awareness
- Emergence Demonstration: Show how simple rules create complex behaviors
- Feedback Loop Understanding: Positive and negative feedback mechanisms
- Network Effects Visualization: Connectivity and interaction patterns
- Adaptive Behavior Modeling: Learning and evolution in systems
- Scale Transition Explanation: Micro to macro level phenomena

EDUCATIONAL FRAMEWORK:
1. Conceptual Scaffolding:
   - Start with simple systems and gradually increase complexity
   - Use familiar examples before introducing abstract concepts
   - Provide multiple representations (visual, mathematical, verbal)
   - Connect to real-world applications and case studies
   - Emphasize pattern recognition across different domains

2. Interactive Learning Design:
   - Parameter Manipulation: Sliders and controls for real-time experimentation
   - Visualization Tools: Graphs, networks, phase spaces, time series
   - Scenario Comparison: Side-by-side system behavior analysis
   - Hypothesis Testing: Prediction and verification cycles
   - Collaborative Exploration: Multi-user system interaction

3. Cognitive Load Management:
   - Progressive Disclosure: Reveal complexity incrementally
   - Attention Direction: Highlight key relationships and patterns
   - Memory Aids: Provide reference materials and concept maps
   - Practice Opportunities: Guided exercises and open exploration
   - Assessment Integration: Formative feedback during interaction

SIMULATION DESIGN PRINCIPLES:
- Scientific Accuracy: Mathematically sound models with realistic parameters
- Pedagogical Effectiveness: Clear learning objectives and assessment criteria
- User Experience: Intuitive interfaces with immediate feedback
- Scalability: Performance optimization for complex calculations
- Accessibility: Multiple learning modalities and accommodation options

COMPLEX SYSTEMS DOMAINS:
1. Biological Systems:
   - Ecosystem dynamics and food webs
   - Population growth and predator-prey relationships
   - Cellular automata and pattern formation
   - Genetic algorithms and evolution
   - Neural networks and brain function

2. Social Systems:
   - Social network formation and influence
   - Crowd behavior and collective action
   - Economic markets and trading dynamics
   - Urban growth and traffic patterns
   - Cultural evolution and norm formation

3. Physical Systems:
   - Fluid dynamics and turbulence
   - Climate systems and weather patterns
   - Crystal formation and phase transitions
   - Chaotic systems and strange attractors
   - Quantum systems and measurement

LEARNING OBJECTIVE ALIGNMENT:
For each simulation, ensure:
1. Clear Learning Goals (what students should understand)
2. Conceptual Prerequisites (required background knowledge)
3. Guided Exploration Activities (structured investigation tasks)
4. Open-Ended Investigation (student-driven discovery)
5. Reflection Prompts (metacognitive awareness questions)
6. Assessment Rubrics (evaluation criteria and standards)
7. Extension Activities (advanced exploration opportunities)

ADAPTIVE TEACHING STRATEGIES:
- Misconception Detection: Identify and address common student errors
- Difficulty Adjustment: Modify complexity based on student performance
- Learning Style Accommodation: Visual, analytical, and kinesthetic approaches
- Peer Collaboration: Group activities and discussion facilitation
- Real-World Connection: Current events and practical applications
- Cross-Disciplinary Links: Connections to other subject areas

INTERACTION PATTERNS:
1. Demonstration Mode: Teacher-led exploration with explanation
2. Guided Discovery: Structured student investigation with prompts
3. Open Exploration: Student-driven experimentation and hypothesis testing
4. Collaborative Analysis: Group discussion and interpretation
5. Presentation Mode: Student explanation of findings to peers
6. Assessment Integration: Formative and summative evaluation tools

FEEDBACK MECHANISMS:
- Real-Time Visualization: Immediate response to parameter changes
- Pattern Recognition Hints: Guidance for identifying key relationships
- Conceptual Explanations: Just-in-time theory and background information
- Performance Tracking: Progress monitoring and mastery assessment
- Peer Comparison: Anonymous benchmarking and collaboration opportunities
```

### 10. Integrated Intelligence User
**User Story**: As a power user, I want to seamlessly switch between different AI tools within the platform, maintaining context and insights across decision-making, prediction, and analysis tasks.

**Detailed System Prompt**:
```
You are a Unified Intelligence Orchestrator with expertise in context management, cross-domain synthesis, and adaptive user experience design. Your mission is to:

CONTEXT MANAGEMENT FRAMEWORK:
- Persistent Memory: Maintain user preferences, project history, and learned patterns
- Cross-Module Integration: Share insights and data between different analytical tools
- Workflow Optimization: Streamline transitions between analysis types
- Knowledge Graph Maintenance: Build and update interconnected concept relationships
- Personalization Engine: Adapt interface and recommendations to user behavior patterns

INTELLIGENCE INTEGRATION CAPABILITIES:
1. Multi-Modal Analysis Synthesis:
   - Combine quantitative and qualitative insights
   - Integrate predictive and descriptive analytics
   - Merge individual and collective intelligence
   - Synthesize domain-specific and general knowledge
   - Balance automated and human-guided analysis

2. Workflow Orchestration:
   - Intelligent task sequencing based on user goals
   - Automatic data flow between modules
   - Conflict resolution when modules provide contradictory insights
   - Priority management for competing analytical demands
   - Resource allocation optimization across tools

3. Adaptive User Experience:
   - Interface customization based on expertise level
   - Proactive suggestion of relevant tools and analyses
   - Context-sensitive help and guidance
   - Progressive disclosure of advanced features
   - Personalized dashboard and workflow configuration

CROSS-DOMAIN INTELLIGENCE:
- Pattern Recognition: Identify similar structures across different domains
- Analogical Reasoning: Apply insights from one field to another
- Conceptual Transfer: Leverage knowledge from familiar to unfamiliar contexts
- Synthesis Generation: Combine insights from multiple analytical perspectives
- Meta-Learning: Learn from the user's learning patterns and preferences

USER PROFILING DIMENSIONS:
1. Expertise Level Assessment:
   - Domain knowledge depth in various fields
   - Analytical sophistication and methodology familiarity
   - Tool usage patterns and efficiency metrics
   - Learning velocity and adaptation speed
   - Collaboration preferences and communication style

2. Goal-Oriented Categorization:
   - Strategic vs Tactical decision-making focus
   - Exploration vs Exploitation analytical balance
   - Individual vs Collaborative work preferences
   - Short-term vs Long-term planning horizon
   - Risk tolerance and uncertainty comfort level

3. Cognitive Style Adaptation:
   - Visual vs Analytical information processing
   - Sequential vs Holistic thinking patterns
   - Detail-oriented vs Big-picture perspective
   - Intuitive vs Systematic decision-making
   - Convergent vs Divergent problem-solving approach

INTELLIGENT ROUTING SYSTEM:
Based on user query and context, automatically:
1. Identify Relevant Modules (decision-making, prediction, simulation, etc.)
2. Sequence Analysis Steps (optimal workflow for user goals)
3. Prepare Data Flows (ensure smooth information transfer)
4. Configure Interfaces (appropriate complexity and visualization)
5. Set Collaboration Parameters (individual vs group analysis)
6. Establish Quality Criteria (accuracy, speed, comprehensiveness trade-offs)

CONTEXT PRESERVATION PROTOCOLS:
- Session Continuity: Maintain state across module transitions
- Project Memory: Store and retrieve complex analytical workflows
- Insight Tracking: Record and connect discoveries across sessions
- Hypothesis Evolution: Track how ideas develop and change over time
- Decision Audit Trail: Maintain record of choices and rationales

INTEGRATION PATTERNS:
1. Sequential Analysis: One module output becomes another's input
2. Parallel Processing: Multiple modules analyze same data simultaneously
3. Iterative Refinement: Repeated cycles of analysis and improvement
4. Cross-Validation: Different modules verify each other's conclusions
5. Ensemble Decision-Making: Combine multiple analytical perspectives
6. Meta-Analysis: Analyze the analytical process itself for improvement

ADAPTIVE LEARNING MECHANISMS:
- Usage Pattern Recognition: Identify frequently used tool combinations
- Preference Learning: Adapt to user's analytical style and priorities
- Efficiency Optimization: Suggest shortcuts and automation opportunities
- Error Pattern Detection: Identify and help correct systematic mistakes
- Success Pattern Replication: Suggest approaches that worked well previously

QUALITY ASSURANCE INTEGRATION:
- Cross-Module Consistency Checking: Ensure coherent results across tools
- Uncertainty Propagation: Track confidence levels through analytical chain
- Bias Detection: Identify systematic errors in analytical approaches
- Robustness Testing: Validate conclusions using alternative methods
- Peer Review Simulation: Apply independent verification techniques

OUTPUT COORDINATION:
1. Unified Reporting: Integrate insights from multiple modules
2. Executive Summary Generation: Distill complex analysis into key points
3. Visual Integration: Combine charts, graphs, and visualizations coherently
4. Recommendation Synthesis: Merge suggestions from different analytical approaches
5. Action Plan Generation: Convert analysis into implementable steps
6. Communication Optimization: Tailor reports for different audiences and purposes
```

## Detailed LLM System Architecture

### Core Prompt Management System
Each user story utilizes a specialized system prompt that can be dynamically loaded and enhanced based on:
- User expertise level (Beginner, Intermediate, Advanced, Expert)
- Domain context (Finance, Politics, Education, Research, etc.)
- Task complexity (Simple, Moderate, Complex, Expert-level)
- Interaction history and learning patterns

### Prompt Enhancement Mechanisms
1. **Context Injection**: Real-time data from previous interactions
2. **Domain Adaptation**: Specialized terminology and methodologies
3. **Complexity Scaling**: Adjusting technical depth based on user level
4. **Personalization**: Incorporating user preferences and success patterns
5. **Cross-Modal Integration**: Combining insights from multiple analytical tools

## API Implementation Plan

### 1. Core Architecture Setup
```javascript
// Core API structure for Gemini 2.5 Flash integration
class StrategyIntelligenceAPI {
    constructor() {
        this.geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        this.apiKey = process.env.GEMINI_API_KEY;
        this.contextManager = new ContextManager();
        this.promptEngine = new PromptEngine();
        this.storageManager = new LocalStorageManager();
        this.userProfiler = new UserProfiler();
    }

    async generateResponse(userStory, userInput, context = {}) {
        try {
            const userProfile = await this.userProfiler.getProfile();
            const enhancedPrompt = this.promptEngine.buildPrompt(
                userStory, 
                userInput, 
                context, 
                userProfile
            );
            
            const response = await this.callGemini(enhancedPrompt);
            await this.contextManager.updateContext(userInput, response);
            return this.formatResponse(response, userStory);
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to generate response');
        }
    }

    async callGemini(prompt) {
        const response = await fetch(this.geminiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4096,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
}
```

### 2. Context Management System
```javascript
class ContextManager {
    constructor() {
        this.maxContextSize = 8192; // tokens
        this.contextWindow = [];
        this.persistentContext = new Map();
        this.sessionContext = new Map();
    }

    async updateContext(userInput, aiResponse) {
        const contextEntry = {
            timestamp: Date.now(),
            userInput: userInput,
            aiResponse: aiResponse,
            tokens: this.estimateTokens(userInput + aiResponse)
        };

        this.contextWindow.push(contextEntry);
        await this.manageContextSize();
        await this.extractPersistentInsights(contextEntry);
    }

    async manageContextSize() {
        let totalTokens = this.contextWindow.reduce((sum, entry) => sum + entry.tokens, 0);
        
        while (totalTokens > this.maxContextSize && this.contextWindow.length > 1) {
            const removed = this.contextWindow.shift();
            totalTokens -= removed.tokens;
        }
    }

    async extractPersistentInsights(contextEntry) {
        // Extract key insights for long-term memory
        const insights = await this.identifyKeyInsights(contextEntry);
        insights.forEach(insight => {
            this.persistentContext.set(insight.key, insight.value);
        });
    }

    getRelevantContext(userStory, currentInput) {
        const relevantEntries = this.contextWindow.filter(entry => 
            this.isRelevant(entry, userStory, currentInput)
        );
        
        const persistentInsights = Array.from(this.persistentContext.entries())
            .filter(([key, value]) => this.isRelevantInsight(key, value, userStory));

        return {
            recentContext: relevantEntries,
            persistentInsights: persistentInsights
        };
    }

    estimateTokens(text) {
        return Math.ceil(text.length / 4); // Rough approximation
    }

    isRelevant(entry, userStory, currentInput) {
        // Implement relevance scoring based on semantic similarity
        return true; // Simplified for demo
    }

    isRelevantInsight(key, value, userStory) {
        // Check if persistent insight is relevant to current user story
        return true; // Simplified for demo
    }
}
```

### 3. Advanced Prompt Engineering System
```javascript
class PromptEngine {
    constructor() {
        this.basePrompts = new Map();
        this.promptEnhancers = [];
        this.domainAdapters = new Map();
        this.loadBasePrompts();
    }

    loadBasePrompts() {
        // Load the 10 detailed system prompts from the PRD
        this.basePrompts.set('strategic_decision_maker', this.getStrategicDecisionPrompt());
        this.basePrompts.set('policy_analyst', this.getPolicyAnalystPrompt());
        this.basePrompts.set('investment_analyst', this.getInvestmentAnalystPrompt());
        this.basePrompts.set('adaptive_learner', this.getAdaptiveLearnerPrompt());
        this.basePrompts.set('market_analyst', this.getMarketAnalystPrompt());
        this.basePrompts.set('research_scientist', this.getResearchScientistPrompt());
        this.basePrompts.set('model_validator', this.getModelValidatorPrompt());
        this.basePrompts.set('collaborative_predictor', this.getCollaborativePredictorPrompt());
        this.basePrompts.set('system_educator', this.getSystemEducatorPrompt());
        this.basePrompts.set('integrated_user', this.getIntegratedUserPrompt());
    }

    buildPrompt(userStory, userInput, context, userProfile) {
        let basePrompt = this.basePrompts.get(userStory);
        
        // Enhance with context
        basePrompt = this.injectContext(basePrompt, context);
        
        // Adapt to user profile
        basePrompt = this.adaptToUser(basePrompt, userProfile);
        
        // Add domain-specific enhancements
        basePrompt = this.enhanceForDomain(basePrompt, userInput);
        
        // Construct final prompt
        return this.constructFinalPrompt(basePrompt, userInput, context);
    }

    injectContext(prompt, context) {
        if (!context.recentContext || context.recentContext.length === 0) {
            return prompt;
        }

        const contextSummary = context.recentContext
            .map(entry => `Previous: ${entry.userInput} -> ${entry.aiResponse.substring(0, 200)}...`)
            .join('\n');

        return prompt + `\n\nRECENT CONTEXT:\n${contextSummary}\n\nUse this context to provide continuity and build upon previous analysis.`;
    }

    adaptToUser(prompt, userProfile) {
        const expertiseLevel = userProfile.expertiseLevel || 'intermediate';
        const preferences = userProfile.preferences || {};

        let adaptedPrompt = prompt;

        // Adjust complexity based on expertise
        switch (expertiseLevel) {
            case 'beginner':
                adaptedPrompt += '\n\nADAPTATION: Use simple language, provide more explanations, include basic concepts.';
                break;
            case 'expert':
                adaptedPrompt += '\n\nADAPTATION: Use technical language, assume advanced knowledge, focus on nuanced insights.';
                break;
            default:
                adaptedPrompt += '\n\nADAPTATION: Use moderate technical language, balance explanation with insight.';
        }

        // Add preference-based adaptations
        if (preferences.visualLearner) {
            adaptedPrompt += ' Suggest visualizations and diagrams where helpful.';
        }

        if (preferences.detailOriented) {
            adaptedPrompt += ' Provide comprehensive details and thorough analysis.';
        }

        return adaptedPrompt;
    }

    enhanceForDomain(prompt, userInput) {
        const detectedDomain = this.detectDomain(userInput);
        const domainEnhancement = this.domainAdapters.get(detectedDomain);
        
        if (domainEnhancement) {
            return prompt + '\n\nDOMAIN ENHANCEMENT:\n' + domainEnhancement;
        }
        
        return prompt;
    }

    constructFinalPrompt(basePrompt, userInput, context) {
        return `${basePrompt}

CURRENT USER INPUT: ${userInput}

INSTRUCTIONS:
1. Analyze the user input in the context of your specialized role
2. Apply your expertise to provide actionable insights
3. Use the specified output format from your role description
4. Maintain consistency with previous context if provided
5. Adapt your response to the user's expertise level and preferences

Response:`;
    }

    detectDomain(userInput) {
        // Simple keyword-based domain detection
        const keywords = {
            finance: ['investment', 'portfolio', 'market', 'trading', 'financial'],
            politics: ['policy', 'geopolitical', 'government', 'election', 'diplomatic'],
            education: ['learn', 'teach', 'student', 'course', 'curriculum'],
            research: ['hypothesis', 'experiment', 'data', 'study', 'analysis']
        };

        for (const [domain, domainKeywords] of Object.entries(keywords)) {
            if (domainKeywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
                return domain;
            }
        }

        return 'general';
    }

    // System prompt getter methods (implementing the detailed prompts from PRD)
    getStrategicDecisionPrompt() {
        return `You are a Strategic Decision Intelligence Assistant specializing in executive-level business analysis. Your role is to:

CORE CAPABILITIES:
- Decompose complex strategic decisions into manageable components
- Apply multi-criteria decision analysis (MCDA) frameworks
- Provide probabilistic risk assessments with confidence intervals
- Generate scenario-based recommendations with contingency planning

ANALYSIS FRAMEWORK:
1. Stakeholder Impact Analysis: Identify all affected parties and their interests
2. Resource Allocation Optimization: Assess financial, human, and temporal resources
3. Competitive Landscape Integration: Factor in market dynamics and competitor responses
4. Risk-Reward Quantification: Use Monte Carlo simulations for outcome modeling
5. Timeline Sensitivity Analysis: Evaluate decision timing impacts

COMMUNICATION STYLE:
- Use executive-level language with strategic terminology
- Present findings in structured formats (Executive Summary, Key Findings, Recommendations)
- Provide confidence levels for all predictions (High/Medium/Low with percentages)
- Include implementation roadmaps with milestone tracking

DECISION FACTORS TO ALWAYS CONSIDER:
- Financial impact (ROI, NPV, cash flow implications)
- Strategic alignment with organizational goals
- Regulatory and compliance requirements
- Market timing and competitive positioning
- Organizational capacity and change management needs
- Stakeholder buy-in and communication requirements

OUTPUT FORMAT:
Always structure responses as:
1. Executive Summary (2-3 sentences)
2. Key Decision Factors (ranked by importance)
3. Scenario Analysis (Best/Most Likely/Worst case)
4. Recommendations (Primary + 2 alternatives)
5. Implementation Timeline
6. Risk Mitigation Strategies
7. Success Metrics and KPIs`;
    }

    // Additional prompt methods would follow similar pattern...
    getPolicyAnalystPrompt() {
        return `You are a Geopolitical Scenario Analysis Specialist with expertise in international relations, economics, and strategic forecasting. Your mission is to:

ANALYTICAL FRAMEWORK:
- Apply Systems Thinking to interconnected global phenomena
- Use Game Theory principles for multi-actor scenario modeling
- Integrate Economic, Political, Social, Technological, Environmental factors (PESTE)
- Employ Historical Pattern Recognition for precedent analysis
- Utilize Network Analysis for relationship mapping

CORE COMPETENCIES:
1. Geopolitical Risk Assessment: Quantify probability and impact of political events
2. Economic Impact Modeling: Assess trade, currency, and market implications
3. Diplomatic Relations Mapping: Analyze bilateral and multilateral relationships
4. Regional Stability Indicators: Monitor conflict potential and peace indices
5. Policy Effectiveness Prediction: Forecast policy outcomes with confidence intervals

SCENARIO MODELING APPROACH:
- Base Case: Current trajectory with no major changes
- Stress Tests: Introduction of disruptive events (conflicts, sanctions, natural disasters)
- Policy Interventions: Impact of specific diplomatic or economic measures
- Multi-Variable Interactions: Complex interdependencies between factors
- Temporal Dynamics: Short-term (1-2 years) vs Long-term (5-10 years) implications

OUTPUT SPECIFICATIONS:
1. Scenario Summary with probability estimates
2. Key Driving Forces and their interaction effects
3. Timeline of expected developments
4. Stakeholder impact analysis (winners/losers)
5. Policy recommendations with risk assessments
6. Early warning indicators to monitor
7. Alternative scenario pathways`;
    }

    // Continue with other prompt methods...
}
```

### 4. Local Storage Management System
```javascript
class LocalStorageManager {
    constructor() {
        this.dbName = 'StrategyIntelligenceDB';
        this.version = 1;
        this.db = null;
        this.initDB();
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('userProfiles')) {
                    db.createObjectStore('userProfiles', { keyPath: 'userId' });
                }
                
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { keyPath: 'sessionId' });
                    sessionStore.createIndex('timestamp', 'timestamp');
                }
                
                if (!db.objectStoreNames.contains('analyses')) {
                    const analysisStore = db.createObjectStore('analyses', { keyPath: 'analysisId' });
                    analysisStore.createIndex('userStory', 'userStory');
                    analysisStore.createIndex('timestamp', 'timestamp');
                }
                
                if (!db.objectStoreNames.contains('insights')) {
                    const insightStore = db.createObjectStore('insights', { keyPath: 'insightId' });
                    insightStore.createIndex('category', 'category');
                }
            };
        });
    }

    async saveUserProfile(profile) {
        const transaction = this.db.transaction(['userProfiles'], 'readwrite');
        const store = transaction.objectStore('userProfiles');
        await store.put(profile);
    }

    async getUserProfile(userId) {
        const transaction = this.db.transaction(['userProfiles'], 'readonly');
        const store = transaction.objectStore('userProfiles');
        return await store.get(userId);
    }

    async saveSession(sessionData) {
        const transaction = this.db.transaction(['sessions'], 'readwrite');
        const store = transaction.objectStore('sessions');
        await store.put({
            ...sessionData,
            timestamp: Date.now()
        });
    }

    async getRecentSessions(limit = 10) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const index = store.index('timestamp');
        
        const request = index.openCursor(null, 'prev');
        const sessions = [];
        
        return new Promise((resolve) => {
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor && sessions.length < limit) {
                    sessions.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(sessions);
                }
            };
        });
    }

    async saveAnalysis(analysisData) {
        const transaction = this.db.transaction(['analyses'], 'readwrite');
        const store = transaction.objectStore('analyses');
        await store.put({
            ...analysisData,
            analysisId: this.generateId(),
            timestamp: Date.now()
        });
    }

    async getAnalysesByUserStory(userStory, limit = 20) {
        const transaction = this.db.transaction(['analyses'], 'readonly');
        const store = transaction.objectStore('analyses');
        const index = store.index('userStory');
        
        const request = index.getAll(userStory, limit);
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
        });
    }

    async saveInsight(insight) {
        const transaction = this.db.transaction(['insights'], 'readwrite');
        const store = transaction.objectStore('insights');
        await store.put({
            ...insight,
            insightId: this.generateId(),
            timestamp: Date.now()
        });
    }

    async getInsightsByCategory(category) {
        const transaction = this.db.transaction(['insights'], 'readonly');
        const store = transaction.objectStore('insights');
        const index = store.index('category');
        
        const request = index.getAll(category);
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async clearOldData(maxAge = 30 * 24 * 60 * 60 * 1000) { // 30 days
        const cutoff = Date.now() - maxAge;
        const stores = ['sessions', 'analyses'];
        
        for (const storeName of stores) {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore('store');
            const index = store.index('timestamp');
            
            const request = index.openCursor(IDBKeyRange.upperBound(cutoff));
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };
        }
    }
}
```

### 5. User Profiling System
```javascript
class UserProfiler {
    constructor() {
        this.storageManager = new LocalStorageManager();
        this.defaultProfile = {
            userId: 'default',
            expertiseLevel: 'intermediate',
            preferences: {
                visualLearner: false,
                detailOriented: true,
                collaborativeStyle: false
            },
            usagePatterns: {
                mostUsedStories: [],
                avgSessionLength: 0,
                preferredComplexity: 'moderate'
            },
            performanceMetrics: {
                successRate: 0,
                taskCompletionRate: 0,
                learningVelocity: 0
            }
        };
    }

    async initializeProfile(userId = 'default') {
        let profile = await this.storageManager.getUserProfile(userId);
        
        if (!profile) {
            profile = { ...this.defaultProfile, userId };
            await this.storageManager.saveUserProfile(profile);
        }
        
        return profile;
    }

    async updateProfile(userId, updates) {
        const profile = await this.getProfile(userId);
        const updatedProfile = this.deepMerge(profile, updates);
        await this.storageManager.saveUserProfile(updatedProfile);
        return updatedProfile;
    }

    async getProfile(userId = 'default') {
        let profile = await this.storageManager.getUserProfile(userId);
        
        if (!profile) {
            profile = await this.initializeProfile(userId);
        }
        
        return profile;
    }

    async trackUsage(userId, userStory, sessionData) {
        const profile = await this.getProfile(userId);
        
        // Update usage patterns
        profile.usagePatterns.mostUsedStories = this.updateMostUsed(
            profile.usagePatterns.mostUsedStories, 
            userStory
        );
        
        profile.usagePatterns.avgSessionLength = this.updateAverage(
            profile.usagePatterns.avgSessionLength,
            sessionData.duration
        );
        
        // Update performance metrics if available
        if (sessionData.success !== undefined) {
            profile.performanceMetrics.successRate = this.updateAverage(
                profile.performanceMetrics.successRate,
                sessionData.success ? 1 : 0
            );
        }
        
        await this.updateProfile(userId, profile);
    }

    async adaptExpertiseLevel(userId, performanceData) {
        const profile = await this.getProfile(userId);
        const currentLevel = profile.expertiseLevel;
        
        // Simple adaptation logic based on performance
        if (performanceData.avgAccuracy > 0.8 && performanceData.avgSpeed > 0.7) {
            if (currentLevel === 'beginner') {
                profile.expertiseLevel = 'intermediate';
            } else if (currentLevel === 'intermediate') {
                profile.expertiseLevel = 'advanced';
            }
        } else if (performanceData.avgAccuracy < 0.4 || performanceData.avgSpeed < 0.3) {
            if (currentLevel === 'advanced') {
                profile.expertiseLevel = 'intermediate';
            } else if (currentLevel === 'intermediate') {
                profile.expertiseLevel = 'beginner';
            }
        }
        
        await this.updateProfile(userId, profile);
    }

    updateMostUsed(currentList, newItem, maxItems = 5) {
        const index = currentList.findIndex(item => item.story === newItem);
        
        if (index !== -1) {
            currentList[index].count++;
        } else {
            currentList.push({ story: newItem, count: 1 });
        }
        
        return currentList
            .sort((a, b) => b.count - a.count)
            .slice(0, maxItems);
    }

    updateAverage(currentAvg, newValue, weight = 0.1) {
        return currentAvg * (1 - weight) + newValue * weight;
    }

    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }
}
```

### 6. Main Application Integration
```javascript
class StrategyIntelligencePlatform {
    constructor() {
        this.api = new StrategyIntelligenceAPI();
        this.currentUserStory = null;
        this.currentUserId = 'default';
        this.sessionId = this.generateSessionId();
        this.sessionStartTime = Date.now();
    }

    async initialize() {
        await this.api.storageManager.initDB();
        await this.api.userProfiler.initializeProfile(this.currentUserId);
        
        // Load user interface
        this.setupUI();
        this.bindEvents();
    }

    async switchUserStory(userStory) {
        this.currentUserStory = userStory;
        this.updateUIForUserStory(userStory);
        
        // Track usage
        await this.api.userProfiler.trackUsage(
            this.currentUserId, 
            userStory, 
            { switchTime: Date.now() }
        );
    }

    async processUserInput(input) {
        if (!this.currentUserStory) {
            throw new Error('No user story selected');
        }

        const startTime = Date.now();
        
        try {
            const context = this.api.contextManager.getRelevantContext(
                this.currentUserStory, 
                input
            );
            
            const response = await this.api.generateResponse(
                this.currentUserStory,
                input,
                context
            );
            
            const processingTime = Date.now() - startTime;
            
            // Save analysis
            await this.api.storageManager.saveAnalysis({
                userStory: this.currentUserStory,
                input: input,
                response: response,
                processingTime: processingTime,
                sessionId: this.sessionId
            });
            
            // Update session data
            await this.updateSessionData(input, response, processingTime);
            
            return response;
            
        } catch (error) {
            console.error('Processing error:', error);
            throw error;
        }
    }

    async updateSessionData(input, response, processingTime) {
        const sessionData = {
            sessionId: this.sessionId,
            userId: this.currentUserId,
            userStory: this.currentUserStory,
            interactions: [{
                input: input,
                response: response,
                processingTime: processingTime,
                timestamp: Date.now()
            }]
        };
        
        await this.api.storageManager.saveSession(sessionData);
    }

    setupUI() {
        // Create dynamic UI components for each user story
        const userStories = [
            'strategic_decision_maker',
            'policy_analyst', 
            'investment_analyst',
            'adaptive_learner',
            'market_analyst',
            'research_scientist',
            'model_validator',
            'collaborative_predictor',
            'system_educator',
            'integrated_user'
        ];
        
        const container = document.getElementById('platform-container');
        
        // Create navigation
        const nav = document.createElement('nav');
        nav.className = 'user-story-nav';
        
        userStories.forEach(story => {
            const button = document.createElement('button');
            button.textContent = this.formatStoryName(story);
            button.dataset.story = story;
            button.addEventListener('click', () => this.switchUserStory(story));
            nav.appendChild(button);
        });
        
        container.appendChild(nav);
        
        // Create main interface
        const main = document.createElement('main');
        main.id = 'main-interface';
        container.appendChild(main);
    }

    updateUIForUserStory(userStory) {
        const main = document.getElementById('main-interface');
        main.innerHTML = this.generateUIForStory(userStory);
        
        // Bind story-specific events
        this.bindStoryEvents(userStory);
    }

    generateUIForStory(userStory) {
        const storyConfigs = {
            'strategic_decision_maker': {
                title: 'Strategic Decision Intelligence',
                inputPlaceholder: 'Describe your strategic decision challenge...',
                features: ['Multi-criteria analysis', 'Risk assessment', 'Scenario modeling']
            },
            'policy_analyst': {
                title: 'Geopolitical Scenario Analysis',
                inputPlaceholder: 'Enter policy scenario or geopolitical situation...',
                features: ['Scenario simulation', 'Impact assessment', 'Policy recommendations']
            },
            'investment_analyst': {
                title: 'Investment Research & Analysis',
                inputPlaceholder: 'Enter investment thesis or market analysis request...',
                features: ['Financial modeling', 'Risk analysis', 'Portfolio optimization']
            }
            // Add configurations for other stories...
        };

        const config = storyConfigs[userStory] || {
            title: 'Intelligence Platform',
            inputPlaceholder: 'Enter your request...',
            features: ['AI-powered analysis']
        };

        return `
            <div class="story-interface">
                <header>
                    <h1>${config.title}</h1>
                    <div class="features">
                        ${config.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                </header>
                
                <div class="input-section">
                    <textarea 
                        id="user-input" 
                        placeholder="${config.inputPlaceholder}"
                        rows="4"
                    ></textarea>
                    <button id="submit-btn">Analyze</button>
                </div>
                
                <div class="output-section">
                    <div id="analysis-output"></div>
                </div>
                
                <div class="context-section">
                    <h3>Context & History</h3>
                    <div id="context-display"></div>
                </div>
            </div>
        `;
    }

    bindStoryEvents(userStory) {
        const submitBtn = document.getElementById('submit-btn');
        const userInput = document.getElementById('user-input');
        
        submitBtn.addEventListener('click', async () => {
            const input = userInput.value.trim();
            if (!input) return;
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Analyzing...';
                
                const response = await this.processUserInput(input);
                this.displayResponse(response);
                
                userInput.value = '';
            } catch (error) {
                this.displayError(error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Analyze';
            }
        });
        
        // Enter key support
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                submitBtn.click();
            }
        });
    }

    displayResponse(response) {
        const output = document.getElementById('analysis-output');
        output.innerHTML = `
            <div class="response-container">
                <div class="response-header">
                    <span class="response-type">${this.formatStoryName(this.currentUserStory)}</span>
                    <span class="response-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="response-content">
                    ${this.formatResponse(response)}
                </div>
            </div>
        `;
    }

    formatResponse(response) {
        // Enhanced formatting for different response types
        return response.split('\n').map(line => {
            if (line.match(/^\d+\./)) {
                return `<div class="numbered-item">${line}</div>`;
            } else if (line.match(/^[A-Z\s]+:$/)) {
                return `<h4 class="section-header">${line}</h4>`;
            } else if (line.includes('•') || line.includes('-')) {
                return `<div class="bullet-item">${line}</div>`;
            } else {
                return `