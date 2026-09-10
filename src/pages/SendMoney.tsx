import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SendMoney() {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [searchCountry, setSearchCountry] = useState('');

  const africaCountries = [
    { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
    { code: 'RW', name: 'Rwanda', currency: 'RWF', flag: '🇷🇼' },
    { code: 'UG', name: 'Uganda', currency: 'UGX', flag: '🇺🇬' },
    { code: 'SN', name: 'Senegal', currency: 'XOF', flag: '🇸🇳' },
    { code: 'TZ', name: 'Tanzania', currency: 'TZS', flag: '🇹🇿' },
    { code: 'ET', name: 'Ethiopia', currency: 'ETB', flag: '🇪🇹' },
    { code: 'CM', name: 'Cameroon', currency: 'XAF', flag: '🇨🇲' },
  ];

  const payoutMethods = {
    GH: [
      { id: 1, name: 'MTN MoMo', icon: '📱', fee: '₵2.50' },
      { id: 2, name: 'Telecel Cash', icon: '📱', fee: '₵2.50' },
      { id: 3, name: 'AirtelTigo Money', icon: '📱', fee: '₵2.50' },
      { id: 4, name: 'Bank Transfer', icon: '🏦', fee: '₵5.00' },
    ],
    NG: [
      { id: 1, name: 'Opay', icon: '📱', fee: '₦50' },
      { id: 2, name: 'PalmPay', icon: '📱', fee: '₦50' },
      { id: 3, name: 'Bank Transfer', icon: '🏦', fee: '₦100' },
    ],
    KE: [
      { id: 1, name: 'M-Pesa', icon: '📱', fee: 'KES 50' },
      { id: 2, name: 'Bank Transfer', icon: '🏦', fee: 'KES 100' },
    ],
  };

  const filteredCountries = africaCountries.filter(c =>
    c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
    c.code.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const exchangeRates = {
    GH: 1,
    NG: 0.0015,
    KE: 0.008,
    ZA: 0.052,
  };

  const getRecipientAmount = () => {
    if (!amount || !selectedCountry) return 0;
    return (parseFloat(amount) * (exchangeRates[selectedCountry.code] || 1)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-4 rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => setStep(Math.max(1, step - 1))} className="p-1.5 hover:bg-primary/80 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex-1">Send Money</h1>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Step {step}/4</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1">
          <div 
            className="bg-success h-1 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Select Country */}
      {step === 1 && (
        <div className="p-4 space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search country..."
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country);
                  setStep(2);
                }}
                className={`p-4 rounded-xl border-2 transition text-left ${
                  selectedCountry?.code === country.code
                    ? 'border-primary bg-blue-50'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="text-2xl mb-1">{country.flag}</p>
                <p className="font-semibold text-sm">{country.name}</p>
                <p className="text-xs text-muted-foreground">{country.currency}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Enter Amount */}
      {step === 2 && selectedCountry && (
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">You send</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-lg font-bold text-foreground">₵</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-4 text-2xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Card className="p-4 bg-success/5 border-success/20">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span className="font-semibold">1 GHS = {(1 / (exchangeRates[selectedCountry.code] || 1)).toFixed(2)} {selectedCountry.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-semibold text-red-600">₵2.50</span>
              </div>
              <div className="border-t border-success/20 pt-3 flex justify-between">
                <span className="font-semibold">Recipient gets</span>
                <span className="text-xl font-bold text-success">{getRecipientAmount()} {selectedCountry.currency}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button onClick={() => setStep(3)} disabled={!amount || parseFloat(amount) <= 0} className="flex-1 bg-success hover:bg-success/90">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Select Payout Method */}
      {step === 3 && selectedCountry && (
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold">How should {selectedCountry.name} receive?</h2>
          
          <div className="space-y-3">
            {(payoutMethods[selectedCountry.code] || []).map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method);
                  setStep(4);
                }}
                className={`w-full p-4 rounded-xl border-2 transition text-left flex items-center justify-between ${
                  selectedMethod?.id === method.id
                    ? 'border-primary bg-blue-50'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className="font-semibold">{method.name}</p>
                    <p className="text-xs text-muted-foreground">Instant delivery</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{method.fee}</p>
                  {selectedMethod?.id === method.id && <Check className="w-5 h-5 text-primary ml-auto" />}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm & Send */}
      {step === 4 && selectedCountry && selectedMethod && (
        <div className="p-4 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <p className="text-muted-foreground text-sm mb-2">You're sending</p>
            <h2 className="text-4xl font-bold text-foreground mb-4">₵{amount}</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-semibold">{selectedCountry.flag} {selectedCountry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="font-semibold">{selectedMethod.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recipient gets</span>
                <span className="font-semibold">{getRecipientAmount()} {selectedCountry.currency}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-yellow-200 bg-yellow-50">
            <p className="text-xs text-yellow-800">
              ⚠️ Make sure the recipient details are correct. Transfers cannot be reversed.
            </p>
          </Card>

          <div className="space-y-3">
            <Button className="w-full bg-success hover:bg-success/90 h-12 text-base font-semibold">
              Send ₵{amount}
            </Button>
            <Button variant="outline" onClick={() => setStep(3)} className="w-full">
              Change Method
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
