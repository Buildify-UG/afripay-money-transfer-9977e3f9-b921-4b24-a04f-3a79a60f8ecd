import { useState } from 'react';
import { ChevronLeft, Download, Filter, ArrowUpRight, ArrowDownLeft, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TransactionHistory() {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allTransactions = [
    {
      id: 1,
      name: 'Kwame Boateng',
      type: 'sent',
      amount: '₵500.00',
      amountUSD: '$85.00',
      date: 'Today, 2:30 PM',
      country: 'Ghana',
      method: 'MTN MoMo',
      status: 'completed',
      receipt: 'REC-2024-001',
    },
    {
      id: 2,
      name: 'Ama Osei',
      type: 'received',
      amount: '₵1,200.00',
      amountUSD: '$204.00',
      date: 'Yesterday, 10:15 AM',
      country: 'Ghana',
      method: 'Bank Transfer',
      status: 'completed',
      receipt: 'REC-2024-002',
    },
    {
      id: 3,
      name: 'Chioma Adeyemi',
      type: 'sent',
      amount: '₦5,000.00',
      amountUSD: '$3.50',
      date: '2 days ago',
      country: 'Nigeria',
      method: 'Bank Transfer',
      status: 'completed',
      receipt: 'REC-2024-003',
    },
    {
      id: 4,
      name: 'John Kipchoge',
      type: 'sent',
      amount: 'KES 5,000.00',
      amountUSD: '$38.00',
      date: '3 days ago',
      country: 'Kenya',
      method: 'M-Pesa',
      status: 'completed',
      receipt: 'REC-2024-004',
    },
    {
      id: 5,
      name: 'Abebe Tekle',
      type: 'sent',
      amount: '₵250.00',
      amountUSD: '$42.50',
      date: '5 days ago',
      country: 'Ghana',
      method: 'Telecel Cash',
      status: 'completed',
      receipt: 'REC-2024-005',
    },
    {
      id: 6,
      name: 'Fatima Hassan',
      type: 'received',
      amount: '₵800.00',
      amountUSD: '$136.00',
      date: '1 week ago',
      country: 'Ghana',
      method: 'Bank Transfer',
      status: 'completed',
      receipt: 'REC-2024-006',
    },
  ];

  const filtered = allTransactions.filter(tx => {
    const matchType = filterType === 'all' || tx.type === filterType;
    const matchSearch = tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       tx.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const groupedByDate = filtered.reduce((acc, tx) => {
    const date = tx.date.split(',')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {} as Record<string, typeof filtered>);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-primary text-primary-foreground px-4 py-4 rounded-b-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button className="p-1.5 hover:bg-primary/80 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold flex-1">Transaction History</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-primary-foreground/60" />
          <input
            type="text"
            placeholder="Search name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/20 text-primary-foreground placeholder-primary-foreground/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'sent', 'received'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition ${
                filterType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {type === 'all' ? 'All' : type === 'sent' ? 'Sent' : 'Received'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-xs text-muted-foreground mb-1">Total Sent</p>
          <p className="text-lg font-bold text-red-600">₵750.00</p>
          <p className="text-xs text-muted-foreground mt-1">3 transactions</p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-xs text-muted-foreground mb-1">Total Received</p>
          <p className="text-lg font-bold text-success">₵2,000.00</p>
          <p className="text-xs text-muted-foreground mt-1">2 transactions</p>
        </Card>
      </div>

      {/* Transactions */}
      <div className="px-4 py-4 space-y-4">
        {Object.entries(groupedByDate).map(([date, transactions]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{date}</h3>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <Card key={tx.id} className="p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-3 rounded-full ${
                          tx.type === 'sent'
                            ? 'bg-red-50'
                            : 'bg-success/10'
                        }`}
                      >
                        {tx.type === 'sent' ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{tx.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">{tx.country}</p>
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            {tx.method}
                          </span>
                          <span className="text-xs text-success font-medium">
                            ✓ {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${tx.type === 'sent' ? 'text-red-600' : 'text-success'}`}>
                        {tx.type === 'sent' ? '-' : '+'}{tx.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.amountUSD}</p>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Receipt ID</p>
                        <p className="font-mono font-semibold">{tx.receipt}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-semibold">{tx.date.split(',')[1]?.trim()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Download className="w-3 h-3 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
