import { useState } from 'react';
import { Send, Plus, History, Eye, EyeOff, Bell, Settings, ArrowUpRight, ArrowDownLeft, Smartphone, Building2, Banknote, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Index() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const transactions = [
    {
      id: 1,
      name: 'Kwame Boateng',
      type: 'sent',
      amount: '₵500',
      date: 'Today, 2:30 PM',
      country: 'Ghana',
    },
    {
      id: 2,
      name: 'Ama Osei',
      type: 'received',
      amount: '₵1,200',
      date: 'Yesterday',
      country: 'Ghana',
    },
    {
      id: 3,
      name: 'Chioma Adeyemi',
      type: 'sent',
      amount: '₦5,000',
      date: '2 days ago',
      country: 'Nigeria',
    },
  ];

  const quickActions = [
    { icon: Send, label: 'Send Money', color: 'bg-blue-50 text-primary' },
    { icon: Plus, label: 'Add Money', color: 'bg-green-50 text-success' },
    { icon: Smartphone, label: 'Request', color: 'bg-purple-50 text-purple-600' },
    { icon: History, label: 'History', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">AfriPay</h1>
            <p className="text-primary-foreground/80 text-sm">Send Money Across Africa</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-primary/80 rounded-full transition">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-primary/80 rounded-full transition">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-primary-foreground/80 text-sm font-medium">Total Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1.5 hover:bg-white/20 rounded-full transition"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {showBalance ? '₵5,420.50' : '••••'}
          </h2>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-primary-foreground/70">USD</p>
              <p className="font-semibold">${showBalance ? '850' : '•••'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-primary-foreground/70">NGN</p>
              <p className="font-semibold">{showBalance ? '₦425K' : '•••'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-primary-foreground/70">KES</p>
              <p className="font-semibold">{showBalance ? 'Ksh125K' : '•••'}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <p className="text-primary-foreground/70">GHS</p>
              <p className="font-semibold">{showBalance ? '₵5.4K' : '•••'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition hover:shadow-md ${action.color}`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <button className="text-primary text-sm font-medium hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="p-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-full ${
                      tx.type === 'sent'
                        ? 'bg-red-50'
                        : 'bg-success/10'
                    }`}
                  >
                    {tx.type === 'sent' ? (
                      <ArrowUpRight className={`w-5 h-5 ${tx.type === 'sent' ? 'text-red-600' : 'text-success'}`} />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'sent' ? 'text-red-600' : 'text-success'}`}>
                    {tx.type === 'sent' ? '-' : '+'}{tx.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.country}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Preview */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-bold mb-4">Available Payout Methods</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Smartphone className="w-6 h-6 text-primary mb-2" />
            <p className="font-semibold text-sm">Mobile Money</p>
            <p className="text-xs text-muted-foreground mt-1">MTN, Telecel, Airtel</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Building2 className="w-6 h-6 text-success mb-2" />
            <p className="font-semibold text-sm">Bank Transfer</p>
            <p className="text-xs text-muted-foreground mt-1">All African Banks</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Banknote className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-semibold text-sm">Cash Pickup</p>
            <p className="text-xs text-muted-foreground mt-1">54 African Countries</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <Globe className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-semibold text-sm">Global</p>
            <p className="text-xs text-muted-foreground mt-1">Cards, Apple Pay, ACH</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3">
        <div className="flex justify-around items-center">
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'send', label: 'Send' },
            { icon: 'activity', label: 'Activity' },
            { icon: 'card', label: 'Cards' },
            { icon: 'profile', label: 'Profile' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label.toLowerCase())}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === item.label.toLowerCase()
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {item.icon === 'home' && <History className="w-5 h-5" />}
                {item.icon === 'send' && <Send className="w-5 h-5" />}
                {item.icon === 'activity' && <ArrowUpRight className="w-5 h-5" />}
                {item.icon === 'card' && <Banknote className="w-5 h-5" />}
                {item.icon === 'profile' && <Settings className="w-5 h-5" />}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
