import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { RateLock } from '../../contexts/FxRateContext';
import { ArrowRight, Copy, Check, Clock } from 'lucide-react';

type RateLockDetailsProps = {
  rateLock: RateLock;
  onMarkAsUsed?: (id: string) => Promise<void>;
};

const RateLockDetails: React.FC<RateLockDetailsProps> = ({ 
  rateLock,
  onMarkAsUsed 
}) => {
  const [copied, setCopied] = useState(false);
  const [isMarkingAsUsed, setIsMarkingAsUsed] = useState(false);
  
  // Calculate time left until expiration
  const now = new Date();
  const expiresAt = new Date(rateLock.expiresAt);
  const timeLeft = expiresAt.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  // Check if the rate lock is expired
  const isExpired = timeLeft <= 0 || rateLock.status === 'expired';
  const isUsed = rateLock.status === 'used';
  
  // Status badge color
  const statusColor = isExpired ? 'bg-error-100 text-error-800' : 
                     isUsed ? 'bg-success-100 text-success-800' : 
                     'bg-accent-100 text-accent-800';
  
  // Status text
  const statusText = isExpired ? 'Expired' : 
                    isUsed ? 'Used' : 
                    'Active';
  
  // Format amount with commas
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Create QR code data
  const qrData = JSON.stringify({
    reference: rateLock.reference,
    fromCurrency: rateLock.fromCurrency,
    toCurrency: rateLock.toCurrency,
    fromAmount: rateLock.fromAmount,
    toAmount: rateLock.toAmount,
    rate: rateLock.rate,
    expiresAt: rateLock.expiresAt
  });
  
  // Copy reference to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(rateLock.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Mark rate lock as used
  const handleMarkAsUsed = async () => {
    if (onMarkAsUsed && rateLock.id && !isUsed && !isExpired) {
      setIsMarkingAsUsed(true);
      try {
        await onMarkAsUsed(rateLock.id);
      } catch (error) {
        console.error('Error marking rate lock as used:', error);
      } finally {
        setIsMarkingAsUsed(false);
      }
    }
  };

  return (
    <div className="card bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Rate Lock Details</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {statusText}
        </span>
      </div>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Reference:</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{rateLock.reference}</span>
            <button 
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-primary-600 transition-colors"
              aria-label="Copy reference"
            >
              {copied ? <Check className="w-4 h-4 text-success-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Created:</span>
          <span className="font-medium">
            {format(new Date(rateLock.createdAt), 'PPP p')}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Expires:</span>
          <span className="font-medium">
            {format(new Date(rateLock.expiresAt), 'PPP p')}
          </span>
        </div>
        
        {!isExpired && !isUsed && (
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1 text-accent-600" />
            <span>Expires in {hoursLeft}h {minutesLeft}m</span>
          </div>
        )}
      </div>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">From</span>
            <span className="font-semibold text-lg">{rateLock.fromCurrency}</span>
          </div>
          <ArrowRight className="text-gray-400 w-5 h-5" />
          <div className="flex flex-col items-end">
            <span className="text-gray-500 text-sm">To</span>
            <span className="font-semibold text-lg">{rateLock.toCurrency}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Rate:</span>
          <span className="font-medium">
            1 {rateLock.fromCurrency} = {rateLock.rate.toFixed(4)} {rateLock.toCurrency}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">From Amount:</span>
          <span className="font-medium">
            {formatAmount(rateLock.fromAmount)} {rateLock.fromCurrency}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-600">To Amount:</span>
          <span className="font-semibold text-primary-800">
            {formatAmount(rateLock.toAmount)} {rateLock.toCurrency}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="mb-4 bg-white p-2 border border-gray-200 rounded-lg">
          <QRCodeSVG
            value={qrData}
            size={180}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={false}
          />
        </div>
        
        <p className="text-sm text-gray-500 text-center mb-4">
          Scan this QR code to use your locked rate
        </p>
        
        {!isExpired && !isUsed && onMarkAsUsed && (
          <button
            onClick={handleMarkAsUsed}
            disabled={isMarkingAsUsed}
            className="btn-primary w-full"
          >
            {isMarkingAsUsed ? 'Processing...' : 'Mark as Used'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RateLockDetails;