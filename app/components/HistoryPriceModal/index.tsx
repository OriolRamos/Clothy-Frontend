import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthContext';
import { useTranslation } from 'react-i18next';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

interface HistoryPriceModalProps {
    clothId: string;
    onClose: () => void;
}

const TIME_RANGES = [
    { label: '1 mes', value: '1m' },
    { label: '3 mesos', value: '3m' },
    { label: '6 mesos', value: '6m' },
    { label: '1 any', value: '1y' },
];

export default function HistoryPriceModal({ clothId, onClose }: HistoryPriceModalProps) {
    const { fetchWithAuth } = useAuth();
    const { t } = useTranslation('common');
    const [range, setRange] = useState<string>('1m');
    const [data, setData] = useState<Array<{ date: string; price: number }>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            console.log('🔍 Carregant historial per a clothId:', clothId, 'i range:', range);
            setLoading(true);
            setError(null);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetchWithAuth(`${apiUrl}/price-history?clothId=${clothId}&range=${range}`);
                if (!res.ok) throw new Error("Error carregant l'historial");
                const json = await res.json();

                let processed = json.map((item: any) => ({
                    date: new Date(item.update_date).toLocaleDateString(),
                    price: Number(item.price),
                }));

                if (processed.length === 0) {
                    const today = new Date().toLocaleDateString();
                    processed = [{ date: today, price: 0 }];
                }

                setData(processed);
            } catch (e: any) {
                setError(e.message || 'Error desconegut');
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [clothId, range]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-11/12 max-w-3xl p-6 relative">
                {/* Capçalera */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold dark:text-white">
                        {t('externalPage.priceHistory', 'Historial de preus')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-2xl font-bold text-gray-600 dark:text-gray-300"
                    >
                        &times;
                    </button>
                </div>

                {/* Botons de rang */}
                <div className="flex space-x-2 mb-4">
                    {TIME_RANGES.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => setRange(r.value)}
                            className={`px-4 py-2 rounded-lg transition ${
                                range === r.value
                                    ? 'bg-faqblue text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                        >
                            {t(`externalPage.range_${r.value}`, r.label)}
                        </button>
                    ))}
                </div>

                {/* Gràfic o missatges */}
                <div className="h-64">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-12 h-12 border-4 border-faqblue border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="date" tick={{ fill: '#CBD5E0' }} />
                                <YAxis tick={{ fill: '#CBD5E0' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1A202C', color: 'white' }}
                                    labelStyle={{ color: '#E2E8F0' }}
                                />
                                <Line type="monotone" dataKey="price" stroke="#0072f5" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
