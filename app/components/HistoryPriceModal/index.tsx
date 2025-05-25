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
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

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
                    date: dayjs(item.update_date).format('YYYY-MM-DD'),
                    price: Number(item.price),
                }));

                processed.sort((a: { date: string | number | dayjs.Dayjs | Date | null | undefined; }, b: { date: string | number | dayjs.Dayjs | Date | null | undefined; }) => dayjs(a.date).unix() - dayjs(b.date).unix());

                if (processed.length > 0) {
                    const today = dayjs().format('YYYY-MM-DD');
                    const filled: { date: string; price: number }[] = [];

                    for (let i = 0; i < processed.length; i++) {
                        const current = processed[i];
                        const nextDate = i + 1 < processed.length
                            ? dayjs(processed[i + 1].date)
                            : dayjs(today);
                        let date = dayjs(current.date);

                        filled.push({ date: date.format('YYYY-MM-DD'), price: current.price });

                        while (date.add(1, 'day').isSameOrBefore(nextDate)) {
                            date = date.add(1, 'day');
                            filled.push({ date: date.format('YYYY-MM-DD'), price: current.price });
                        }
                    }

                    setData(filled);
                } else {
                    const today = dayjs().format('YYYY-MM-DD');
                    setData([{ date: today, price: 0 }]);
                }
            } catch (e: any) {
                setError(e.message || 'Error desconegut');
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [clothId, fetchWithAuth, range]);

    // Calcular límit superior per al YAxis
    const maxPrice = Math.max(...data.map((d) => d.price), 0);
    const yMax = Math.ceil(maxPrice * 1.2); // 20% més alt

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

                {/* Botons de rang amb scroll horitzontal */}
                <div className="overflow-x-auto mb-4">
                    <div className="flex flex-nowrap space-x-2">
                        {TIME_RANGES.map((r) => (
                            <button
                                key={r.value}
                                onClick={() => setRange(r.value)}
                                className={`whitespace-nowrap px-4 py-2 rounded-lg transition ${
                                    range === r.value
                                        ? 'bg-faqblue text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                            >
                                {t(`externalPage.range_${r.value}`, r.label)}
                            </button>
                        ))}
                    </div>
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
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: '#CBD5E0', fontSize: 12 }}
                                    tickFormatter={(str) => dayjs(str).format('DD/MM')}
                                    minTickGap={20}
                                />
                                <YAxis
                                    tick={{ fill: '#CBD5E0' }}
                                    domain={[0, yMax]}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1A202C', color: 'white' }}
                                    labelStyle={{ color: '#E2E8F0' }}
                                    labelFormatter={(label) => dayjs(label).format('DD/MM/YYYY')}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#0072f5"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
}
