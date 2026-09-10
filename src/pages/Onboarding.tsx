import { useState } from 'react';
import { ChevronRight, Phone, Lock, Smartphone, Fingerprint, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const handleFileUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) setter(file.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/90 text-primary-foreground flex flex-col">
      {/* Logo */}
      <div className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">AfriPay</h1>
        <p className="text-primary-foreground/80">Send Money Across Africa</p>
      </div>

      <div className="flex-1 bg-background rounded-t-3xl text-foreground overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Step 1: Phone Login */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome</h2>
                <p className="text-muted-foreground">Enter your phone number to get started</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Phone Number</label>
                <div className="flex gap-2">
                  <div className="w-20 px-3 py-3 border border-border rounded-lg bg-secondary text-center font-semibold">
                    +233
                  </div>
                  <input
                    type="tel"
                    placeholder="501234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Ghana number example: 501234567</p>
              </div>

              <Button onClick={() => setStep(2)} disabled={phone.length < 9} className="w-full bg-primary text-primary-foreground">
                Send OTP <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Verify Code</h2>
                <p className="text-muted-foreground">We sent a 6-digit code to +233{phone}</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Enter OTP</label>
                <div className="flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[i] = e.target.value;
                        setOtp(newOtp.join(''));
                      }}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  ))}
                </div>
                <button className="text-sm text-primary font-medium hover:underline">Resend code</button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={otp.length < 6} className="flex-1 bg-primary text-primary-foreground">
                  Verify
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: KYC Verification */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Verify Your Identity</h2>
                <p className="text-muted-foreground">We need some documents to verify your account</p>
              </div>

              <Card className="p-4 border-2 border-dashed border-border hover:border-primary transition cursor-pointer">
                <label className="block text-center py-6 cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Upload Selfie</p>
                  <p className="text-xs text-muted-foreground">JPG or PNG, max 5MB</p>
                  <input type="file" hidden onChange={(e) => handleFileUpload(e, setSelfieFile)} accept="image/*" />
                </label>
                {selfieFile && <p className="text-sm text-success font-medium text-center">✓ {selfieFile}</p>}
              </Card>

              <Card className="p-4 border-2 border-dashed border-border hover:border-primary transition cursor-pointer">
                <label className="block text-center py-6 cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold mb-1">Upload ID/Passport</p>
                  <p className="text-xs text-muted-foreground">Ghana Card, Passport, or Driver License</p>
                  <input type="file" hidden onChange={(e) => handleFileUpload(e, setIdFile)} accept="image/*" />
                </label>
                {idFile && <p className="text-sm text-success font-medium text-center">✓ {idFile}</p>}
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(4)} disabled={!selfieFile || !idFile} className="flex-1 bg-primary text-primary-foreground">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Set PIN & Biometric */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Secure Your Account</h2>
                <p className="text-muted-foreground">Set a PIN and enable biometric security</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Create 4-Digit PIN</label>
                <input
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 text-center text-2xl letter-spacing border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">You'll use this PIN to confirm transactions</p>
              </div>

              <Card className="p-4 bg-success/10 border-success/30">
                <div className="flex items-center gap-3 mb-3">
                  <Fingerprint className="w-5 h-5 text-success" />
                  <p className="font-semibold">Enable Biometric</p>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Use fingerprint or Face ID for faster login</p>
                <Button className="w-full bg-success text-success-foreground hover:bg-success/90">
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Enable Biometric
                </Button>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(5)} disabled={pin.length < 4} className="flex-1 bg-primary text-primary-foreground">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 bg-success/30 rounded-full flex items-center justify-center">
                  <div className="text-3xl">✓</div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
                <p className="text-muted-foreground">Your AfriPay account is ready to use</p>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm font-medium text-foreground mb-2">✓ Phone verified</p>
                <p className="text-sm font-medium text-foreground mb-2">✓ Identity verified</p>
                <p className="text-sm font-medium text-foreground">✓ Security enabled</p>
              </Card>

              <Button className="w-full bg-success text-success-foreground hover:bg-success/90 h-12 font-semibold">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
