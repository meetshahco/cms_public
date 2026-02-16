export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    caseStudyCount: number;
    image: string;
    video: string; // New property for hover preview
    metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
    {
        id: "kwikpay",
        title: "KwikPay",
        category: "FinTech",
        description: "Streamlining digital payments for the next billion users.",
        tags: ["FinTech", "UX Research", "Mobile App"],
        caseStudyCount: 4,
        image: "https://placehold.co/600x400/171717/ededed?text=KwikPay+Preview",
        video: "https://assets.mixkit.co/videos/preview/mixkit-finger-sliding-on-a-tablet-screen-4645-large.mp4",
        metrics: [
            { label: "Retention", value: "+25%" },
            { label: "Transactions", value: "1M+" },
        ],
    },
    {
        id: "bank-of-baroda",
        title: "Bank of Baroda",
        category: "Banking",
        description: "Digital transformation of a legacy banking giant.",
        tags: ["Banking", "Digital Transformation", "Web Platform"],
        caseStudyCount: 6,
        image: "https://placehold.co/600x400/171717/ededed?text=BoB+Transformation",
        video: "https://assets.mixkit.co/videos/preview/mixkit-code-and-numbers-on-a-monitor-close-up-42581-large.mp4",
        metrics: [
            { label: "User Base", value: "50M+" },
            { label: "NPS Score", value: "+40" },
        ],
    },
    {
        id: "out-of-the-blue",
        title: "Out of the Blue",
        category: "Hospitality",
        description: "A premium dining experience reimagined for the digital age.",
        tags: ["Hospitality", "Branding", "Visual Design"],
        caseStudyCount: 2,
        image: "https://placehold.co/600x400/171717/ededed?text=Out+of+the+Blue",
        video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-1647-large.mp4",
        metrics: [
            { label: "Bookings", value: "+120%" },
            { label: "Engagement", value: "High" },
        ],
    },
    {
        id: "joveo",
        title: "Joveo",
        category: "AdTech",
        description: "Programmatic job advertising platform optimization.",
        tags: ["AdTech", "B2B", "SaaS"],
        caseStudyCount: 3,
        image: "https://placehold.co/600x400/171717/ededed?text=Joveo+Dashboard",
        video: "https://assets.mixkit.co/videos/preview/mixkit-animation-of-futuristic-devices-99786-large.mp4",
        metrics: [
            { label: "Efficiency", value: "3x" },
            { label: "ROI", value: "+200%" },
        ],
    },
    {
        id: "unify",
        title: "Unify",
        category: "Enterprise",
        description: "Unified communication tool for distributed teams.",
        tags: ["Enterprise", "Communication", "Design System"],
        caseStudyCount: 5,
        image: "https://placehold.co/600x400/171717/ededed?text=Unify+App",
        video: "https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-call-center-4890-large.mp4",
        metrics: [
            { label: "Adoption", value: "95%" },
            { label: "Time Saved", value: "2h/day" },
        ],
    },
];
