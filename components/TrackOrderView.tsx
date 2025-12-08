
import React, { useState } from 'react';
import { Search, MapPin, Truck, CheckCircle, Box, CreditCard, XCircle, ChevronLeft, Sparkles } from 'lucide-react';
import { MOCK_ORDERS } from '../constants';
import { Order } from '../types';

interface TrackOrderViewProps {
    onBack: () => void;
}

export const TrackOrderView: React.FC<TrackOrderViewProps> = ({ onBack }) => {
    const [orderId, setOrderId] = useState('');
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e?: React.FormEvent, overrideId?: string) => {
        if (e) e.preventDefault();
        
        const searchInput = overrideId || orderId;
        if (!searchInput.trim()) return;

        // If triggered via chip, update input visual
        if (overrideId) setOrderId(overrideId);

        setIsSearching(true);
        setError('');
        setFoundOrder(null);

        const normalizedInput = searchInput.trim().toLowerCase();

        // Simulate API call
        setTimeout(() => {
            const order = MOCK_ORDERS.find(o => {
                const id = o.id.toLowerCase();
                const tracking = o.trackingNumber?.toLowerCase() || '';
                
                // Match exact ID, Tracking Number, or if user just typed the numbers (e.g. 72910 for ORD-72910)
                return id === normalizedInput || 
                       tracking === normalizedInput || 
                       id.endsWith(normalizedInput) ||
                       tracking.endsWith(normalizedInput);
            });
            
            if (order) {
                setFoundOrder(order);
            } else {
                setError(`Order "${searchInput}" not found. Please check the ID.`);
            }
            setIsSearching(false);
        }, 800);
    };

    // Tracking Logic (Copied from UserProfileView for standalone function)
    const getSteps = (order: Order) => {
        const steps = [
            { title: 'Order Placed', date: order.date, time: '10:30 AM', location: 'Online', status: 'completed', icon: Box },
            { title: 'Payment Confirmed', date: order.date, time: '10:35 AM', location: 'System', status: 'completed', icon: CreditCard },
            { title: 'Packed & Ready', date: order.date, time: '04:00 PM', location: 'Warehouse A', status: 'completed', icon: Box },
        ];

        if (order.status === 'Processing') {
            steps.push({ title: 'Shipped', date: 'Estimated', time: '--:--', location: 'Dhaka Hub', status: 'current', icon: Truck });
            steps.push({ title: 'Delivered', date: 'Estimated', time: '--:--', location: 'Your Address', status: 'pending', icon: CheckCircle });
        } else if (order.status === 'Shipped') {
            steps[2].status = 'completed';
            steps.push({ title: 'Shipped', date: 'Yesterday', time: '09:00 AM', location: 'Dhaka Hub', status: 'completed', icon: Truck });
            steps.push({ title: 'In Transit', date: 'Today', time: '08:00 AM', location: 'Gulshan Branch', status: 'current', icon: MapPin });
            steps.push({ title: 'Delivered', date: 'Estimated Tomorrow', time: '--:--', location: 'Your Address', status: 'pending', icon: CheckCircle });
        } else if (order.status === 'Delivered') {
            steps.push({ title: 'Shipped', date: '2 days ago', time: '09:00 AM', location: 'Dhaka Hub', status: 'completed', icon: Truck });
            steps.push({ title: 'Out for Delivery', date: 'Yesterday', time: '08:00 AM', location: 'Local Courier', status: 'completed', icon: MapPin });
            steps.push({ title: 'Delivered', date: 'Yesterday', time: '02:15 PM', location: 'Your Address', status: 'completed', icon: CheckCircle });
        } else if (order.status === 'Cancelled') {
            steps.push({ title: 'Cancelled', date: 'Today', time: '11:00 AM', location: 'System', status: 'current', icon: XCircle });
        }
        return steps;
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-start pt-12 pb-20 animate-fade-in">
            <div className="w-full max-w-3xl px-4">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Track Your Order</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your Order ID (e.g. ORD-72910) or Tracking Number to see current status.</p>
                </div>

                {/* Search Box */}
                <div className="max-w-xl mx-auto mb-12">
                    <form onSubmit={(e) => handleSearch(e)} className="relative mb-4">
                        <input 
                            type="text" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID / Tracking Number" 
                            className="w-full h-14 pl-6 pr-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg shadow-gray-200/50 dark:shadow-none focus:ring-2 focus:ring-cyan-500 outline-none text-lg dark:text-white"
                        />
                        <button 
                            type="submit"
                            disabled={isSearching}
                            className="absolute right-2 top-2 h-10 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-full transition-colors flex items-center justify-center disabled:opacity-70"
                        >
                            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Track'}
                        </button>
                    </form>

                    {/* Quick Demo Chips */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide self-center mr-1">Try Demo:</span>
                        {MOCK_ORDERS.slice(0, 3).map((order) => (
                            <button 
                                key={order.id}
                                onClick={() => handleSearch(undefined, order.id)}
                                className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 text-xs font-bold rounded-full border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 transition-colors flex items-center gap-1"
                            >
                                <Sparkles className="w-3 h-3" /> {order.id}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
                            <p className="text-red-600 dark:text-red-400 font-bold">{error}</p>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                {foundOrder && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 overflow-hidden animate-fade-in-up">
                        {/* Order Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-wrap justify-between items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-bold">Order ID</p>
                                <p className="text-xl font-mono font-bold text-cyan-600">#{foundOrder.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 uppercase font-bold">Estimated Delivery</p>
                                <p className="text-lg font-bold dark:text-white">
                                    {foundOrder.status === 'Delivered' ? 'Delivered' : 'Oct 24, 2023'}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                             {/* Map Visual */}
                            <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl mb-10 relative overflow-hidden group">
                                <img 
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
                                    className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                                        <MapPin className="w-4 h-4 text-cyan-600" />
                                        <span className="text-xs font-bold dark:text-white">
                                        {foundOrder.status === 'Delivered' ? 'Delivered to You' : 'In Transit'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Stepper */}
                            <div className="relative pl-4 md:pl-8 border-l-2 border-gray-100 dark:border-gray-800 space-y-8">
                                {getSteps(foundOrder).map((step: any, idx: number) => (
                                    <div key={idx} className={`relative pl-8 ${step.status === 'pending' ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                                        <div className={`absolute -left-[35px] md:-left-[39px] top-0 w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center z-10 
                                        ${step.status === 'completed' ? 'bg-cyan-600 text-white' : 
                                            step.status === 'current' ? 'bg-orange-500 text-white animate-pulse' : 
                                            'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}
                                        >
                                        <step.icon className="w-4 h-4" />
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                            <div>
                                                <h4 className={`font-bold text-sm ${step.status === 'current' ? 'text-orange-500' : 'text-gray-900 dark:text-white'}`}>
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{step.location}</p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{step.date}</p>
                                                <p className="text-[10px] text-gray-400">{step.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                            <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Items in this shipment</h4>
                            <div className="space-y-3">
                                {foundOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white dark:bg-black/20 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                                        <img src={item.images[0]} className="w-12 h-12 rounded-md object-cover bg-gray-100" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold dark:text-white line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <button onClick={onBack} className="mt-8 flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>
        </div>
    );
};
