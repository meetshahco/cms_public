"use client";

import { useState, useEffect } from "react";
import {
    Save,
    User,
    Globe,
    Shield,
    Zap,
    Smartphone,
    Bell,
    Lock,
    Loader2
} from "lucide-react";

interface Settings {
    siteTitle: string;
    siteUrl: string;
    metaDescription: string;
    favicon?: string;
    socialLinks: {
        twitter: string;
        github: string;
        linkedin: string;
    };
    adminName: string;
    adminEmail: string;
}

const settingTabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/cms/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch settings", err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        try {
            const res = await fetch("/api/cms/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                const updated = await res.json();
                setSettings(updated);
            }
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
            </div>
        );
    }

    if (!settings) return null;

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                    <p className="text-sm text-neutral-500 mt-1">Configure your site, account preferences, and integrations.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            {/* Horizontal Navigation */}
            <div className="flex items-center gap-8 border-b border-white/[0.06]">
                {settingTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-medium transition-all relative flex items-center gap-2 ${activeTab === tab.id
                            ? "text-white"
                            : "text-neutral-500 hover:text-neutral-300"
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 gap-6">
                {activeTab === "general" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
                            <h2 className="text-base font-semibold text-white">Site Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Site Title</label>
                                    <input
                                        type="text"
                                        value={settings.siteTitle}
                                        onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Site URL</label>
                                    <input
                                        type="text"
                                        value={settings.siteUrl}
                                        onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Meta Description</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium resize-none text-neutral-300"
                                    value={settings.metaDescription}
                                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider block mb-2">Favicon</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {settings.favicon ? (
                                            <img src={settings.favicon} alt="Favicon preview" className="w-8 h-8 object-contain" />
                                        ) : (
                                            <Globe className="w-6 h-6 text-neutral-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Paste image URL..."
                                            value={settings.favicon || ""}
                                            onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/png, image/svg+xml, image/x-icon"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                title="Upload Favicon"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setSettings({ ...settings, favicon: reader.result as string });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="whitespace-nowrap px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/5"
                                            >
                                                Upload File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-neutral-500 mt-2">Upload an SVG, PNG, or ICO file from your computer (max 100kb recommended).</p>
                            </div>
                        </section>

                        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                            <h2 className="text-base font-semibold text-white">Social Links</h2>
                            <div className="space-y-4">
                                {[
                                    { label: "Twitter / X", key: "twitter" as const },
                                    { label: "GitHub", key: "github" as const },
                                    { label: "LinkedIn", key: "linkedin" as const }
                                ].map((link) => (
                                    <div key={link.label} className="flex items-center gap-4">
                                        <div className="w-24 text-xs font-medium text-neutral-500 uppercase tracking-wider">{link.label}</div>
                                        <input
                                            type="text"
                                            value={settings.socialLinks[link.key]}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, [link.key]: e.target.value }
                                            })}
                                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "account" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-6">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/5 transition-transform group-hover:scale-105 duration-300">
                                    <span className="text-3xl font-bold text-white">
                                        {settings.adminName.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                                    <Smartphone className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-white">{settings.adminName}</h2>
                                <p className="text-sm text-neutral-500 mt-0.5">Primary Administrator</p>
                                <div className="flex gap-2 mt-4">
                                    <button className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-all">Change Avatar</button>
                                    <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs text-red-400 hover:bg-red-500/20 transition-all">Remove Photo</button>
                                </div>
                            </div>
                        </section>

                        <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                            <h2 className="text-base font-semibold text-white">Profile Details</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={settings.adminName}
                                            onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            value={settings.adminEmail}
                                            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab !== "general" && activeTab !== "account" && (
                    <div className="min-h-[300px] rounded-2xl border border-dashed border-white/[0.06] flex flex-col items-center justify-center text-center p-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4 text-neutral-500">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings coming soon</h3>
                        <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                            We're currently building out this section of the CMS. It will be available in the next update.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
