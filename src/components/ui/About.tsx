"use client";

import { motion } from "framer-motion";

const BRANDS = [
    "Bank of Baroda",
    "Kotak Bank",
    "Narayana Health",
    "Joveo",
    "KwikPay",
    "Netflix" // conceptual
];

export function About() {
    return (
        <section className="py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

                {/* Left: Content */}
                <div>
                    <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-8 leading-tight">
                        Design that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            means business.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                        I don't just move pixels. I build systems that scale, interactions that delight, and products that solve real problems.
                    </p>
                </div>

                {/* Right: Orbital Animation */}
                <div className="relative h-[600px] w-full flex items-center justify-center">

                    {/* Center Profile */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative z-20 w-64 h-80 bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="w-24 h-24 bg-gray-800 rounded-full mb-4 overflow-hidden">
                            {/* Placeholder for Meet's Image */}
                            <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold">Meet Shah</h3>
                        <p className="text-sm text-gray-500 mt-1">Product Designer</p>
                        <div className="mt-4 flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs text-gray-400">Available for projects</span>
                        </div>
                    </motion.div>

                    {/* Orbiting Brands */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="w-[500px] h-[500px] rounded-full border border-white/5 relative"
                        >
                            {BRANDS.map((brand, i) => {
                                const angle = (i / BRANDS.length) * 360;
                                return (
                                    <motion.div
                                        key={brand}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            transform: `rotate(${angle}deg) translate(250px) rotate(-${angle}deg)`
                                        }}
                                    >
                                        <div className="px-4 py-2 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors whitespace-nowrap">
                                            {brand}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Inner Orbit (Decorative) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[350px] h-[350px] rounded-full border border-white/5 border-dashed"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
