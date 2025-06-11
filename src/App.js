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
      adminSalaries,
      partnerAdminHours, associateAdminHours, paralegalAdminHours
    } = formData;

    // Current annual opportunity cost
    const partnerOpportunityCost = partnerAdminHours * partnerRate * 52;
    const associateOpportunityCost = associateAdminHours * associateRate * 52;
    const paralegalOpportunityCost = paralegalAdminHours * paralegalRate * 52;
    const totalOpportunityCost = partnerOpportunityCost + associateOpportunityCost + paralegalOpportunityCost;

    // Current administrative overhead
    const benefits = adminSalaries * 0.25; // 25% for benefits
    const hiddenCosts = adminSalaries * 0.15; // 15% for recruitment, training, management
    const officeSpace = (partners + associates + paralegals) * 2000; // Estimated office space allocation
    const currentAdminCost = adminSalaries + benefits + hiddenCosts + officeSpace;

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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-8">
          <div className="flex items-center gap-3 mb-4">
            <Calculator size={40} className="text-blue-200" />
            <h1 className="text-3xl font-bold">Law Firm Profitability Calculator</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Discover how much your firm could save with strategic VA delegation
          </p>
        </div>

        <div className="p-8">
          {!showResults ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="text-blue-600" size={24} />
                    Firm Structure
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Partners</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 2"
                        onChange={(e) => handleInputChange('partners', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Associates</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 3"
                        onChange={(e) => handleInputChange('associates', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Paralegals</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 2"
                        onChange={(e) => handleInputChange('paralegals', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="text-green-600" size={24} />
                    Hourly Rates
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Average Partner Rate ($/hour)</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 400"
                        onChange={(e) => handleInputChange('partnerRate', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Average Associate Rate ($/hour)</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 300"
                        onChange={(e) => handleInputChange('associateRate', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Average Paralegal Rate ($/hour)</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 75"
                        onChange={(e) => handleInputChange('paralegalRate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="text-orange-600" size={24} />
                    Admin Time Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Partner Admin Hours/Week</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 8"
                        onChange={(e) => handleInputChange('partnerAdminHours', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Associate Admin Hours/Week</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 10"
                        onChange={(e) => handleInputChange('associateAdminHours', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Paralegal Admin Hours/Week</label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 5"
                        onChange={(e) => handleInputChange('paralegalAdminHours', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="text-purple-600" size={24} />
                    Current Admin Costs
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Annual Admin Staff Salaries</label>
                    <input
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 120000"
                      onChange={(e) => handleInputChange('adminSalaries', e.target.value)}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Total salaries for all administrative staff
                    </p>
                  </div>
                </div>

                <button
                  onClick={calculateResults}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <TrendingUp size={24} />
                  Calculate My Savings
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl">
                <h2 className="text-3xl font-bold mb-4">Your Profitability Analysis</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold">{formatCurrency(results.totalAnnualSavings)}</div>
                    <div className="text-sm opacity-90">Annual Savings Potential</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold">{Math.round(results.roi)}%</div>
                    <div className="text-sm opacity-90">Return on Investment</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold">{Math.round(results.breakEvenMonths)}</div>
                    <div className="text-sm opacity-90">Months to Break Even</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Firm's Profitability?</h3>
                <p className="mb-6 text-blue-100">
                  Schedule a free consultation to discuss your specific needs and implementation strategy.
                </p>
                <div className="space-y-4">
                  <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Schedule Free Consultation
                  </button>
                  <div className="text-sm text-blue-200">
                    ✓ 2-Week Free Trial Available ✓ Legal-Specialized VAs ✓ Bar-Compliant Processes
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowResults(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Calculator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawFirmCalculator;
