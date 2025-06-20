import React, { useState } from 'react';
import { Calculator, DollarSign, Users, Clock, TrendingUp, FileText, CheckCircle } from 'lucide-react';

const LawFirmCalculator = () => {
  const [formData, setFormData] = useState({
    partners: 0,
    associates: 0,
    paralegals: 0,
    partnerRate: 0,
    associateRate: 0,
    paralegalRate: 0,
    adminSalaries: 0,
    adminBenefits: 0,
    officeSpace: 0,
    adminSoftware: 0,
    partnerAdminHours: 0,
    associateAdminHours: 0,
    paralegalAdminHours: 0
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateResults = () => {
    const {
      partners, associates, paralegals,
      partnerRate, associateRate, paralegalRate,
      adminSalaries, adminBenefits, officeSpace, adminSoftware,
      partnerAdminHours, associateAdminHours, paralegalAdminHours
    } = formData;

    // Current annual opportunity cost
    const partnerOpportunityCost = partnerAdminHours * partnerRate * 52;
    const associateOpportunityCost = associateAdminHours * associateRate * 52;
    const paralegalOpportunityCost = paralegalAdminHours * paralegalRate * 52;
    const totalOpportunityCost = partnerOpportunityCost + associateOpportunityCost + paralegalOpportunityCost;

    // Current administrative overhead (using actual inputs)
    const currentAdminCost = adminSalaries + adminBenefits + officeSpace + adminSoftware;

    // VA team costs
    const vaTeamCost = 58000; // Senior Legal VA ($25k) + Admin VA ($18k) + Customer Service VA ($15k)

    // Savings calculations
    const laborSavings = currentAdminCost - vaTeamCost;
    const billableHoursRecovered = (partnerAdminHours + associateAdminHours + paralegalAdminHours) * 0.7; // 70% of admin time recovered
    const revenueRecovery = billableHoursRecovered * 52 * 
      ((partnerAdminHours * partnerRate + associateAdminHours * associateRate + paralegalAdminHours * paralegalRate) / 
       (partnerAdminHours + associateAdminHours + paralegalAdminHours));

    const totalAnnualSavings = laborSavings + revenueRecovery;
    const roi = totalAnnualSavings > 0 ? ((totalAnnualSavings / vaTeamCost) * 100) : 0;
    const breakEvenMonths = totalAnnualSavings > 0 ? (vaTeamCost / (totalAnnualSavings / 12)) : 0;

    // Monthly improvements
    const monthlyImprovement = totalAnnualSavings / 12;
    const monthlyBillableIncrease = billableHoursRecovered * 52 / 12;

    setResults({
      currentOpportunityCost: totalOpportunityCost,
      currentAdminCost: currentAdminCost,
      vaTeamCost: vaTeamCost,
      laborSavings: laborSavings,
      revenueRecovery: revenueRecovery,
      totalAnnualSavings: totalAnnualSavings,
      roi: roi,
      breakEvenMonths: breakEvenMonths,
      monthlyImprovement: monthlyImprovement,
      monthlyBillableIncrease: monthlyBillableIncrease,
      billableHoursRecovered: billableHoursRecovered * 52
    });

    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  // Inline styles using your brand colors
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: window.innerWidth <= 768 ? '16px' : '24px',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #333333 0%, #008080 100%)',
      color: 'white',
      padding: window.innerWidth <= 768 ? '24px 20px' : '32px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: window.innerWidth <= 768 ? '8px' : '12px',
      marginBottom: '16px',
      flexWrap: 'wrap'
    },
    title: {
      fontSize: window.innerWidth <= 768 ? '20px' : window.innerWidth <= 1024 ? '24px' : '28px',
      fontWeight: 'bold',
      margin: 0,
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: window.innerWidth <= 768 ? '14px' : '18px',
      opacity: 0.9,
      margin: 0,
      lineHeight: '1.4'
    },
    content: {
      padding: window.innerWidth <= 768 ? '20px' : '32px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 
        ? '1fr' 
        : window.innerWidth <= 1024 
          ? 'repeat(2, 1fr)' 
          : 'repeat(2, 1fr)',
      gap: window.innerWidth <= 768 ? '20px' : '32px'
    },
    section: {
      backgroundColor: '#f8fafc',
      padding: window.innerWidth <= 768 ? '16px' : '24px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      fontSize: window.innerWidth <= 768 ? '16px' : '18px',
      fontWeight: '600',
      color: '#334155'
    },
    inputGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: window.innerWidth <= 768 ? '13px' : '14px',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#374151',
      lineHeight: '1.4'
    },
    input: {
      width: '100%',
      padding: window.innerWidth <= 768 ? '10px 12px' : '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: window.innerWidth <= 768 ? '14px' : '16px',
      backgroundColor: 'white',
      transition: 'border-color 0.2s',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#008080',
      boxShadow: '0 0 0 3px rgba(0, 128, 128, 0.1)'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #008080 0%, #333333 100%)',
      color: 'white',
      padding: window.innerWidth <= 768 ? '14px 20px' : '16px 24px',
      borderRadius: '8px',
      border: 'none',
      fontSize: window.innerWidth <= 768 ? '16px' : '18px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'transform 0.2s'
    },
    buttonHover: {
      transform: 'translateY(-2px)'
    },
    resultsHeader: {
      textAlign: 'center',
      background: 'linear-gradient(135deg, #008080 0%, #10b981 100%)',
      color: 'white',
      padding: window.innerWidth <= 768 ? '24px 16px' : '32px',
      borderRadius: '12px',
      marginBottom: '32px'
    },
    resultsTitle: {
      fontSize: window.innerWidth <= 768 ? '22px' : '28px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    resultsGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 
        ? '1fr' 
        : window.innerWidth <= 1024 
          ? 'repeat(2, 1fr)' 
          : 'repeat(3, 1fr)',
      gap: window.innerWidth <= 768 ? '16px' : '24px'
    },
    resultCard: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '8px',
      padding: window.innerWidth <= 768 ? '12px' : '16px',
      textAlign: 'center'
    },
    resultNumber: {
      fontSize: window.innerWidth <= 768 ? '20px' : '24px',
      fontWeight: 'bold'
    },
    resultLabel: {
      fontSize: window.innerWidth <= 768 ? '12px' : '14px',
      opacity: 0.9,
      marginTop: '4px',
      lineHeight: '1.3'
    },
    ctaSection: {
      background: 'linear-gradient(135deg, #333333 0%, #008080 100%)',
      color: 'white',
      padding: window.innerWidth <= 768 ? '24px 20px' : '32px',
      borderRadius: '12px',
      textAlign: 'center',
      marginTop: '32px'
    },
    ctaTitle: {
      fontSize: window.innerWidth <= 768 ? '20px' : '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
      lineHeight: '1.3'
    },
    ctaText: {
      fontSize: window.innerWidth <= 768 ? '14px' : '16px',
      marginBottom: '24px',
      opacity: 0.9,
      lineHeight: '1.5'
    },
    ctaButton: {
      backgroundColor: 'white',
      color: '#333333',
      padding: window.innerWidth <= 768 ? '10px 24px' : '12px 32px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      display: 'inline-block',
      transition: 'background-color 0.2s',
      fontSize: window.innerWidth <= 768 ? '14px' : '16px'
    },
    ctaFeatures: {
      fontSize: window.innerWidth <= 768 ? '12px' : '14px',
      marginTop: '16px',
      opacity: 0.8,
      lineHeight: '1.4'
    },
    backButton: {
      textAlign: 'center',
      marginTop: '24px'
    },
    backLink: {
      color: '#008080',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: window.innerWidth <= 768 ? '14px' : '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <Calculator size={40} color="#b2dfdb" />
            <h1 style={styles.title}>Law Firm Profitability Calculator</h1>
          </div>
          <p style={styles.subtitle}>
            Discover how much your firm could save with strategic VA delegation
          </p>
        </div>

        <div style={styles.content}>
          {!showResults ? (
            <div style={styles.formGrid}>
              {/* Firm Structure */}
              <div style={{...styles.section, backgroundColor: '#f0fdfa'}}>
                <div style={styles.sectionHeader}>
                  <Users color="#008080" size={24} />
                  Firm Structure
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Number of Partners</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 2"
                    onChange={(e) => handleInputChange('partners', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Number of Associates</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 3"
                    onChange={(e) => handleInputChange('associates', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Number of Paralegals</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 2"
                    onChange={(e) => handleInputChange('paralegals', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Hourly Rates */}
              <div style={{...styles.section, backgroundColor: '#ecfdf5'}}>
                <div style={styles.sectionHeader}>
                  <DollarSign color="#10b981" size={24} />
                  Hourly Rates
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Average Partner Rate ($/hour)</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 400"
                    onChange={(e) => handleInputChange('partnerRate', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Average Associate Rate ($/hour)</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 300"
                    onChange={(e) => handleInputChange('associateRate', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Average Paralegal Rate ($/hour)</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 75"
                    onChange={(e) => handleInputChange('paralegalRate', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Admin Time Analysis */}
              <div style={{...styles.section, backgroundColor: '#fffbeb'}}>
                <div style={styles.sectionHeader}>
                  <Clock color="#f59e0b" size={24} />
                  Admin Time Analysis
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Partner Admin Hours/Week</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 8"
                    onChange={(e) => handleInputChange('partnerAdminHours', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Associate Admin Hours/Week</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 10"
                    onChange={(e) => handleInputChange('associateAdminHours', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Paralegal Admin Hours/Week</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="e.g., 5"
                    onChange={(e) => handleInputChange('paralegalAdminHours', e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#008080'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>

              {/* Current Admin Costs */}
              <div style={{...styles.section, backgroundColor: '#f8fafc', gridColumn: window.innerWidth <= 768 ? 'auto' : 'span 2'}}>
                <div style={styles.sectionHeader}>
                  <FileText color="#64748b" size={24} />
                  Current Administrative Costs (Annual)
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(2, 1fr)', gap: '16px'}}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Administrative Staff Salaries</label>
                    <input
                      type="number"
                      style={styles.input}
                      placeholder="e.g., 120000"
                      onChange={(e) => handleInputChange('adminSalaries', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                      Base salaries for receptionists, legal assistants, etc.
                    </p>
                  </div>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Benefits & Payroll Taxes</label>
                    <input
                      type="number"
                      style={styles.input}
                      placeholder="e.g., 30000"
                      onChange={(e) => handleInputChange('adminBenefits', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                      Health, dental, 401k, FICA, unemployment (typically 25-40% of salaries)
                    </p>
                  </div>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Office Space Allocation</label>
                    <input
                      type="number"
                      style={styles.input}
                      placeholder="e.g., 15000"
                      onChange={(e) => handleInputChange('officeSpace', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                      Rent, utilities, furniture for admin staff workspace
                    </p>
                  </div>
                  
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Administrative Software & Tools</label>
                    <input
                      type="number"
                      style={styles.input}
                      placeholder="e.g., 8000"
                      onChange={(e) => handleInputChange('adminSoftware', e.target.value)}
                      onFocus={(e) => e.target.style.borderColor = '#008080'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                      Practice management, billing software, phone systems
                    </p>
                  </div>
                </div>
              </div>

              <div style={{gridColumn: window.innerWidth <= 768 ? 'auto' : 'span 2', marginTop: '24px'}}>
                <button
                  onClick={calculateResults}
                  style={styles.button}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <TrendingUp size={24} />
                  Calculate My Savings
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Results Header */}
              <div style={styles.resultsHeader}>
                <h2 style={styles.resultsTitle}>Your Profitability Analysis</h2>
                <div style={styles.resultsGrid}>
                  <div style={styles.resultCard}>
                    <div style={styles.resultNumber}>{formatCurrency(results.totalAnnualSavings)}</div>
                    <div style={styles.resultLabel}>Annual Savings Potential</div>
                  </div>
                  <div style={styles.resultCard}>
                    <div style={styles.resultNumber}>{Math.round(results.roi)}%</div>
                    <div style={styles.resultLabel}>Return on Investment</div>
                  </div>
                  <div style={styles.resultCard}>
                    <div style={styles.resultNumber}>{Math.round(results.breakEvenMonths)}</div>
                    <div style={styles.resultLabel}>Months to Break Even</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div style={styles.ctaSection}>
                <h3 style={styles.ctaTitle}>Ready to Transform Your Firm's Profitability?</h3>
                <p style={styles.ctaText}>
                  Schedule a free consultation to discuss your specific needs and implementation strategy.
                </p>
                <a 
                  href="https://link.hirevirtuals.com/widget/bookings/hire-virtuals"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.ctaButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f0fdfa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Schedule Free Consultation
                </a>
                <div style={styles.ctaFeatures}>
                  ✓ 2-Week Free Trial Available ✓ Legal-Specialized VAs ✓ Bar-Compliant Processes
                </div>
              </div>

              <div style={styles.backButton}>
                <span
                  onClick={() => setShowResults(false)}
                  style={styles.backLink}
                >
                  ← Back to Calculator
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawFirmCalculator;