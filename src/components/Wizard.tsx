import React, { useState, useMemo, useEffect } from 'react';
import './Wizard.css';
import { KeyboardProduct } from '../types/keyboard';

interface WizardProps {
  products: KeyboardProduct[];
  onFilterChange: (filtered: KeyboardProduct[], selections: WizardState) => void;
  activeFilters?: WizardState | null;
}

interface WizardState {
  useCase: string | null;
  workspace: string | null;
  size: string | null;
  hotswap: string | null;
  budget: string | null;
}

interface Option {
  id: string;
  label: string;
  desc: string;
}

interface Step {
  id: keyof WizardState;
  question: string;
  subtitle: string;
  options: Option[];
}

// Filter logic - same for both counting and applying
const applyFilter = (products: KeyboardProduct[], selections: WizardState, stepId?: keyof WizardState): KeyboardProduct[] => {
  let filtered = [...products];
  
  // 🔴 CRITICAL: Filter to keyboards only first - exclude accessories, keycaps, switches, etc.
  const nonKeyboardCategories = ['keycaps', 'switches', 'accessories', 'mice', 'deskmats', 'lubricants', 'case', 'cable', 'artisan'];
  filtered = filtered.filter(p => {
    const cat = p.category?.toLowerCase();
    // Include keyboards and items without a category (assume keyboard by default)
    return !cat || cat === 'keyboard' || !nonKeyboardCategories.includes(cat);
  });
  
  // Use case filtering
  if (selections.useCase && stepId !== 'useCase') {
    const keywords: Record<string, string[]> = {
      gaming: ['gaming', 'rgb', 'macro', 'fast', 'reaction', 'competitive', 'esports', 'rapid trigger', 'hall effect'],
      work: ['ergonomic', 'quiet', 'office', 'professional', 'productivity', 'typing', 'wireless', 'bluetooth', 'programmer', 'coding', 'developer', 'mechanical', 'mx switches'],
      creative: ['media', 'macro', 'programmable', 'control', 'dial', 'knob', 'encoder', 'editing', 'design'],
      general: ['mechanical', 'keyboard', 'mx', 'keychron', 'epomaker', 'drop'],
    };
    const words = keywords[selections.useCase] || [];
    if (words.length > 0) {
      filtered = filtered.filter(p => 
        words.some(w => 
          p.name?.toLowerCase().includes(w) || 
          p.description?.toLowerCase().includes(w)
        )
      );
    }
  }

  // Workspace filtering (noise level)
  if (selections.workspace && stepId !== 'workspace') {
    if (selections.workspace === 'shared') {
      // For shared spaces, exclude loud/clicky switches - expanded keywords
      const loudKeywords = ['clicky', 'blue', 'jade', 'navy', 'green', 'white', 'box white', 'kailh box', 'buckling', 'model m', 'loud', 'noisy'];
      filtered = filtered.filter(p => {
        const text = (p.name + ' ' + (p.description || '')).toLowerCase();
        return !loudKeywords.some(kw => text.includes(kw));
      });
    }
  }

  // Size filtering - fixed keywords to be more accurate
  if (selections.size && stepId !== 'size') {
    const sizeKeywords: Record<string, string[]> = {
      fullsize: ['full', '100%', 'numpad', '104-key', '104key', '108-key', '108key', '96%', '96-key', '96key', '98%', '98-key', '98key', '1800-compact', '1800compact'],
      tkl: ['tkl', 'tenkeyless', '80%', '87-key', '87key', '88-key', '88key', '84-key', '84key'],
      '75percent': ['75%', '75-key', '75key', '82-key', '82key', '84-key', '84key', '80-key', '80key'],
      compact: ['60%', '65%', 'mini', '40%', '68-key', '68key', '69-key', '69key', '67-key', '67key', '61-key', '61key', '64-key', '64key', '75-key'], // 75-key only, not 75%
    };
    const keywords = sizeKeywords[selections.size] || [];
    if (keywords.length > 0) {
      filtered = filtered.filter(p => 
        keywords.some(k => 
          p.name?.toLowerCase().includes(k) ||
          p.description?.toLowerCase().includes(k)
        )
      );
    }
  }

  // Hotswap filtering - improved logic to handle soldered filtering
  if (selections.hotswap && selections.hotswap !== 'any' && stepId !== 'hotswap') {
    const searchHotswap = selections.hotswap === 'hotswap';
    filtered = filtered.filter(p => {
      const text = (p.name + ' ' + (p.description || '')).toLowerCase();
      const hasHotswap = /\b(hotswap|hot-swap|hot\s?swap|hot-swappable|hotswappable)\b/i.test(text) ||
                        /\b(swappable switches|swap switches)\b/i.test(text);
      
      if (searchHotswap) {
        // Looking for hotswap - return true if product has hotswap mentioned
        return hasHotswap;
      } else {
        // Looking for soldered - exclude if hotswap is mentioned, or if it's explicitly soldered
        const isSoldered = /\b(soldered|solder|pcb only|barebones|non-hotswap|non hotswap)\b/i.test(text);
        // Return true if explicitly soldered, or if hotswap is not mentioned (assume soldered for safety)
        return isSoldered || !hasHotswap;
      }
    });
  }

  // Budget filtering - improved to handle price ranges like "$199.99 - $249.99"
  // Using non-overlapping ranges to avoid products matching multiple categories
  if (selections.budget && stepId !== 'budget') {
    const priceRanges: Record<string, [number, number]> = {
      budget: [0, 99.99],
      mid: [100, 199.99],
      premium: [200, 10000],
    };
    const [min, max] = priceRanges[selections.budget] || [0, 10000];
    filtered = filtered.filter(p => {
      const priceStr = p.price || '';
      // Extract first number from price string (handles "$199.99", "From $99", "$199.99 - $249.99")
      const match = priceStr.match(/[\d,]+\.?\d*/);
      if (!match) return false;
      const price = parseFloat(match[0].replace(/,/g, ''));
      // Use strict checks to avoid boundary issues
      return price >= min && price <= max + 0.01; // Small buffer for floating point
    });
  }

  return filtered;
};

// Calculate matches for a specific option
const calculateOptionMatches = (
  products: KeyboardProduct[],
  selections: WizardState,
  stepId: keyof WizardState,
  optionId: string
): number => {
  const testSelections = { ...selections, [stepId]: optionId };
  return applyFilter(products, testSelections).length;
};

const steps: Step[] = [
  {
    id: 'useCase',
    question: 'What will you use this for?',
    subtitle: 'This helps us find the right features',
    options: [
      { id: 'gaming', label: 'Gaming', desc: 'Fast response, RGB, macro keys' },
      { id: 'work', label: 'Work', desc: 'Comfortable, ergonomic, quiet' },
      { id: 'creative', label: 'Creative', desc: 'Media controls, macros, precision' },
      { id: 'general', label: 'General', desc: 'All-around performer' },
    ]
  },
  {
    id: 'workspace',
    question: 'Your workspace?',
    subtitle: 'Some keyboards are louder than others',
    options: [
      { id: 'shared', label: 'Shared Space', desc: 'Need something quieter' },
      { id: 'private', label: 'Private Office', desc: 'No noise concerns' },
      { id: 'home', label: 'Home Setup', desc: 'Whatever sounds good' },
    ]
  },
  {
    id: 'size',
    question: 'Preferred size?',
    subtitle: 'Full-size to compact',
    options: [
      { id: 'fullsize', label: 'Full Size', desc: 'With numpad (100%)' },
      { id: 'tkl', label: 'TKL', desc: 'No numpad (80%)' },
      { id: '75percent', label: '75%', desc: 'Compact F-row, no numpad (75-84%)' },
      { id: 'compact', label: 'Compact', desc: 'Small and portable (40-69%)' },
    ]
  },
  {
    id: 'hotswap',
    question: 'Customize later?',
    subtitle: 'Hot-swap vs soldered switches',
    options: [
      { id: 'hotswap', label: 'Hot-swap Only', desc: 'Easy switch changes' },
      { id: 'soldered', label: 'Soldered is OK', desc: 'Often cheaper, permanent' },
      { id: 'any', label: 'Any', desc: 'Show both options' },
    ]
  },
  {
    id: 'budget',
    question: 'What is your budget?',
    subtitle: 'We will find the best value',
    options: [
      { id: 'budget', label: 'Under $100', desc: 'Entry level' },
      { id: 'mid', label: '$100-200', desc: 'Mid-range quality' },
      { id: 'premium', label: '$200+', desc: 'Premium builds' },
    ]
  },
];

export default function Wizard({ products, onFilterChange, activeFilters }: WizardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<WizardState>({
    useCase: null,
    workspace: null,
    size: null,
    hotswap: null,
    budget: null,
  });

  // Sync selections with activeFilters when provided or changed
  useEffect(() => {
    if (activeFilters) {
      setSelections(activeFilters);
    }
  }, [activeFilters]);

  // Track if wizard filters are active
  const isWizardActive = useMemo(() => {
    return Object.values(selections).some(s => s !== null);
  }, [selections]);

  // Calculate current possible matches after all selections so far
  const currentMatches = useMemo(() => {
    return applyFilter(products, selections).length;
  }, [products, selections]);

  // Calculate matches for each option in current step
  const optionsWithCounts = useMemo(() => {
    const step = steps[currentStep];
    return step.options.map(option => {
      const count = calculateOptionMatches(products, selections, step.id, option.id);
      return { ...option, count };
    });
  }, [products, selections, currentStep]);

  // Check if we're about to have 0 results
  const willHaveZeroResults = currentMatches === 0;

  // Real-time filtering: apply filters as user makes selections
  useEffect(() => {
    if (isOpen && isWizardActive) {
      const filtered = applyFilter(products, selections);
      onFilterChange(filtered, selections);
    }
  }, [products, selections, isOpen, isWizardActive]);

  const handleSelect = (optionId: string) => {
    const stepId = steps[currentStep].id;
    const newSelections = { ...selections, [stepId]: optionId };
    
    // Check if this selection would result in 0 matches
    const testCount = calculateOptionMatches(products, selections, stepId, optionId);
    
    if (testCount === 0) {
      // Don't allow selection that leads to 0 results
      return;
    }
    
    setSelections(newSelections);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
    // Note: We don't auto-apply filters on final step anymore - user must click "See Results"
  };

  const applyFilters = () => {
    const filtered = applyFilter(products, selections);
    setIsOpen(false);
    onFilterChange(filtered, selections);
  };

  const resetWizard = () => {
    setSelections({
      useCase: null,
      workspace: null,
      size: null,
      hotswap: null,
      budget: null,
    });
    setCurrentStep(0);
    const emptySelections = {
      useCase: null,
      workspace: null,
      size: null,
      hotswap: null,
      budget: null,
    };
    onFilterChange(products, emptySelections);
  };

  // Go back one step
  const goBack = () => {
    if (currentStep > 0) {
      // Clear the current step's selection when going back
      const currentStepId = steps[currentStep].id;
      setSelections(prev => ({ ...prev, [currentStepId]: null }));
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const hasSelections = Object.values(selections).some(s => s !== null);

  // Generate filter summary text
  const getFilterSummary = () => {
    const parts: string[] = [];
    if (selections.useCase) {
      const labels: Record<string, string> = {
        gaming: 'Gaming',
        work: 'Work',
        creative: 'Creative',
        general: 'General',
      };
      parts.push(labels[selections.useCase] || selections.useCase);
    }
    if (selections.size) {
      const labels: Record<string, string> = {
        fullsize: 'Full Size',
        tkl: 'TKL',
        compact: 'Compact',
      };
      parts.push(labels[selections.size] || selections.size);
    }
    if (selections.budget) {
      const labels: Record<string, string> = {
        budget: 'Under $100',
        mid: '$100-200',
        premium: '$200+',
      };
      parts.push(labels[selections.budget] || selections.budget);
    }
    return parts.join(' • ');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`wizard-fab ${isWizardActive ? 'active' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open keyboard finder"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h12" />
        </svg>
        {isWizardActive && currentMatches > 0 && (
          <span className="match-count">{currentMatches}</span>
        )}
      </button>

      {/* Active Filters Summary */}
      {isWizardActive && !isOpen && (
        <div className="wizard-active-indicator" onClick={() => setIsOpen(true)}>
          <div className="wizard-active-content">
            <span className="wizard-active-icon">🎯</span>
            <span className="wizard-active-text">{getFilterSummary()}</span>
            <span className="wizard-active-count">{currentMatches} results</span>
          </div>
          <button 
            className="wizard-clear-btn"
            onClick={(e) => {
              e.stopPropagation();
              resetWizard();
            }}
            title="Clear wizard filters"
          >
            ×
          </button>
        </div>
      )}

      {/* Wizard Panel */}
      {isOpen && (
        <div className="wizard-overlay" onClick={() => setIsOpen(false)}>
          <div className="wizard-panel" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="wizard-header">
              <span className="step-indicator">
                Step {currentStep + 1} of {steps.length}
              </span>
              {hasSelections && (
                <button className="reset-btn" onClick={resetWizard}>
                  Reset
                </button>
              )}
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar">
              {steps.map((_, idx) => (
                <div 
                  key={idx}
                  className={`progress-segment ${idx <= currentStep ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="wizard-question">
              <h3>{currentStepData.question}</h3>
              <p className="subtitle">{currentStepData.subtitle}</p>
            </div>

            {/* Info banner showing current matches */}
            <div className={`match-info-banner ${currentMatches === 0 ? 'warning' : currentMatches < 10 ? 'low' : 'good'}`}>
              {currentMatches === 0 ? (
                <span>⚠️ No keyboards match your current selections</span>
              ) : currentMatches < 10 ? (
                <span>⚡ {currentMatches} keyboards match so far</span>
              ) : (
                <span>✓ {currentMatches} keyboards match your criteria</span>
              )}
            </div>

            {/* Options with counts */}
            <div className="wizard-options">
              {optionsWithCounts.map((option) => {
                const isSelected = selections[currentStepData.id] === option.id;
                const hasMatches = option.count > 0;
                
                return (
                  <button
                    key={option.id}
                    className={`option-card ${isSelected ? 'selected' : ''} ${!hasMatches ? 'disabled' : ''}`}
                    onClick={() => hasMatches && handleSelect(option.id)}
                    disabled={!hasMatches}
                  >
                    <div className="option-row">
                      <div className="option-label">{option.label}</div>
                      <div className={`option-count ${option.count === 0 ? 'zero' : option.count < 10 ? 'low' : ''}`}>
                        {option.count > 0 ? `${option.count} options` : 'No matches'}
                      </div>
                    </div>
                    <div className="option-desc">{option.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Warning if 0 results */}
            {willHaveZeroResults && (
              <div className="zero-results-warning">
                <p>❌ Your current selections don't match any keyboards.</p>
                <button onClick={goBack} className="back-to-adjust">
                  ← Go back and adjust
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="wizard-nav">
              {currentStep > 0 && (
                <button 
                  className="nav-btn secondary"
                  onClick={goBack}
                >
                  ← Back
                </button>
              )}
              {/* Always show "See Results" button when we have matches */}
              {currentMatches > 0 && (
                <button 
                  className="nav-btn primary"
                  onClick={applyFilters}
                >
                  See {currentMatches} Results →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
