"use client";

import React, { useState, useEffect } from 'react';
import { Lock, Mail, Phone, Calendar, User } from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "neliosoftadmin") {
            setIsAuthenticated(true);
            fetchMessages();
        } else {
            setError("Hatalı şifre!");
        }
    };

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/messages');
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Admin Girişi</h2>

                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
                        >
                            Giriş Yap
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Gelen Mesajlar</h1>
                        <p className="text-slate-500">Toplam {messages.length} mesaj</p>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50"
                    >
                        Çıkış Yap
                    </button>
                </header>

                {loading ? (
                    <div className="text-center py-20">Yükleniyor...</div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-400">Henüz mesaj yok</h3>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {messages.map((msg: any) => (
                            <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 pb-4 border-b border-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                            {msg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800">{msg.name}</h3>
                                            <p className="text-sm text-slate-500">{msg.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end gap-1 text-sm text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(msg.date).toLocaleString('tr-TR')}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} />
                                            {msg.phone}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
