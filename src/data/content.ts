export const IMAGES = {
  hero: 'https://images.pexels.com/photos/36145985/pexels-photo-36145985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  skyline2: 'https://images.pexels.com/photos/34218532/pexels-photo-34218532.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  skyline3: '/images/projects/tower-2.jpg',
  villa1: '/images/projects/villa-1.jpg',
  villa2: '/images/projects/villa-2.jpg',
  villa3: '/images/projects/villa-3.jpg',
  commercial1: '/images/projects/commercial-1.jpg',
  commercial2: '/images/projects/commercial-2.jpg',
  commercial3: '/images/projects/commercial-3.jpg',
  engineers1: 'https://images.pexels.com/photos/8961146/pexels-photo-8961146.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  engineers2: 'https://images.pexels.com/photos/8482865/pexels-photo-8482865.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  engineers3: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  mosque1: '/images/projects/mosque-1.jpg',
  interior1: '/images/projects/interior-1.jpg',
  industrial1: '/images/projects/industrial-1.jpg',
};

export const SERVICES = [
  {
    title: 'Architectural Design',
    description: 'Creating innovative and sustainable architectural solutions that balance aesthetics, functionality, and regulatory compliance for diverse project typologies.',
    icon: 'Building2',
  },
  {
    title: 'Structural Engineering',
    description: 'Designing robust structural systems that ensure safety, durability, and performance using advanced analysis and cutting-edge engineering methodologies.',
    icon: 'Columns3',
  },
  {
    title: 'MEP Drawings',
    description: 'Comprehensive mechanical, electrical, and plumbing design services that optimize building performance, energy efficiency, and occupant comfort.',
    icon: 'Zap',
  },
  {
    title: 'Authority Approvals',
    description: 'Expert navigation of municipality and authority approval processes across the UAE, ensuring full regulatory compliance and timely permit acquisition.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Project Management',
    description: 'End-to-end project management services that deliver projects on time, within budget, and to the highest quality standards.',
    icon: 'ClipboardList',
  },
  {
    title: 'Site Supervision',
    description: 'Rigorous on-site supervision ensuring construction quality, safety compliance, and adherence to approved designs and specifications.',
    icon: 'HardHat',
  },
  {
    title: 'Interior Design',
    description: 'Crafting sophisticated interior environments that reflect client vision while optimizing space utilization and aesthetic appeal.',
    icon: 'Palette',
  },
  {
    title: 'BIM Modeling',
    description: 'Leveraging Building Information Modeling technology for enhanced design coordination, clash detection, and project lifecycle management.',
    icon: 'Box',
  },
  {
    title: 'Quantity Surveying',
    description: 'Precise cost estimation and quantity take-off services that provide transparency and control over project budgets.',
    icon: 'Calculator',
  },
  {
    title: 'Feasibility Studies',
    description: 'Comprehensive project feasibility assessments covering technical, financial, and regulatory aspects to inform investment decisions.',
    icon: 'BarChart3',
  },
  {
    title: 'Renovation & Extension',
    description: 'Expert design solutions for building renovations, extensions, and adaptive reuse projects that breathe new life into existing structures.',
    icon: 'RefreshCw',
  },
];

export const PROJECTS = [
  {
    title: 'Khalidiya Tower',
    location: 'Abu Dhabi, UAE',
    type: 'Residential Tower',
    services: ['Architectural Design', 'Structural Engineering', 'MEP'],
    status: 'Completed',
    image: IMAGES.commercial1,
    featured: true,
  },
  {
    title: 'Residential Modern Villa',
    location: 'Abu Dhabi, UAE',
    type: 'Modern Villa',
    services: ['Architectural Design', 'Interior Design', 'MEP'],
    status: 'In Progress',
    image: IMAGES.villa1,
    featured: true,
  },
  {
    title: 'Commerical Building',
    location: 'Al Ain, UAE',
    type: 'Commercial Complex',
    services: ['Structural Engineering', 'Project Management'],
    status: 'Completed',
    image: IMAGES.commercial2,
    featured: true,
  },
  {
    title: 'Khalifa City Mosque',
    location: 'Abu Dhabi, UAE',
    type: 'Mosque',
    services: ['Architectural Design', 'Authority Approvals'],
    status: 'Completed',
    image: IMAGES.mosque1,
    featured: false,
  },
  {
    title: 'Residential Private Villa',
    location: 'Madinat Riyad, Abu Dhabi, UAE',
    type: 'Residential Community',
    services: ['Architectural Design', 'BIM Modeling', 'MEP'],
    status: 'In Progress',
    image: IMAGES.villa2,
    featured: false,
  },
  {
    title: 'Industrial Zone Facility',
    location: 'Al Dhafra Region, UAE',
    type: 'Industrial Facility',
    services: ['Structural Engineering', 'Construction Supervision'],
    status: 'Completed',
    image: IMAGES.industrial1,
    featured: false,
  },
  {
    title: 'Shams Townhouse',
    location: 'Al Dhafra, Abu Dhabi, UAE',
    type: 'Mixed-use Development',
    services: ['Architectural Design', 'MEP', 'Interior Design'],
    status: 'Completed',
    image: IMAGES.skyline3,
    featured: true,
  },
  {
    title: 'Executive Penthouse Collection',
    location: 'Dubai, UAE',
    type: 'Luxury Residences',
    services: ['Interior Design', 'MEP'],
    status: 'Completed',
    image: IMAGES.interior1,
    featured: false,
  },
];

export const TENDERS = [
  {
    title: 'Villa G+2 — Al Shamkha',
    location: 'Al Shamkha, Abu Dhabi',
    submissionDate: '2026-02-15',
    description: 'Construction of a G+1 luxury villa and boundary wall works.',
    drawingsLink: 'https://www.youtube.com/',
    image: IMAGES.villa3,
  },
  {
    title: 'Residential Villa G+2',
    location: 'Madinat Riyad, Abu Dhabi',
    submissionDate: '2026-02-28',
    description: 'Construction of a G+1 luxury villa and boundary wall works.',
    drawingsLink: 'https://www.youtube.com/',
    image: IMAGES.villa1,
  },
  {
    title: 'Residential Villa G+2',
    location: 'Madinat Riyad, Abu Dhabi',
    submissionDate: '2026-03-10',
    description: 'New construction of a G+2 residential building with boundarywall.',
    drawingsLink: 'https://www.youtube.com/',
    image: IMAGES.villa2,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ahmed Al Mansouri',
    company: 'Al Mansouri Properties',
    text: 'Universal Building Engineering Consultants delivered exceptional architectural design for our residential towers. Their attention to detail and innovative approach exceeded our expectations.',
    role: 'Managing Director',
  },
  {
    name: 'Sarah Mitchell',
    company: 'Gulf Development Group',
    text: 'Working with UBEC on our commercial complex was a seamless experience. Their municipality approval expertise saved us months, and the engineering quality was outstanding.',
    role: 'Head of Projects',
  },
  {
    name: 'Mohammed Al Hashmi',
    company: 'Royal Investment LLC',
    text: 'The team at UBEC combines technical excellence with creative design thinking. They transformed our vision into a landmark project that we are incredibly proud of.',
    role: 'CEO',
  },
  {
    name: 'Fatima Al Ketbi',
    company: 'Emirates Estate Development',
    text: "UBEC's comprehensive approach to project management and construction supervision ensured our villa community was delivered on time and to the highest standards.",
    role: 'Project Director',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Experienced Engineering Team',
    description: 'Our multidisciplinary team of architects, engineers, and specialists brings decades of combined experience to every project.',
    icon: 'Users',
  },
  {
    title: 'Municipality Approval Experts',
    description: 'Deep expertise in UAE regulatory frameworks ensures smooth and timely permit acquisition across all emirates.',
    icon: 'Award',
  },
  {
    title: 'Innovative Design Solutions',
    description: 'We leverage cutting-edge technology and creative thinking to deliver designs that push boundaries while remaining practical.',
    icon: 'Lightbulb',
  },
  {
    title: 'Sustainable Engineering',
    description: 'Committed to environmentally responsible design practices that minimize ecological impact and optimize resource efficiency.',
    icon: 'Leaf',
  },
  {
    title: 'On-Time Project Delivery',
    description: 'Rigorous project planning and execution methodologies ensure consistent delivery within agreed timelines.',
    icon: 'Clock',
  },
  {
    title: 'International Standards',
    description: 'All projects are executed in compliance with international engineering standards and UAE building codes.',
    icon: 'Globe',
  },
  {
    title: 'Cost Optimization',
    description: 'Strategic value engineering and quantity surveying services that maximize quality while minimizing unnecessary expenditure.',
    icon: 'TrendingDown',
  },
  {
    title: 'Dedicated Client Support',
    description: 'Personalized service with dedicated project teams and direct communication channels throughout the project lifecycle.',
    icon: 'HeadphonesIcon',
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'We begin with a thorough understanding of your vision, requirements, site conditions, and project objectives.',
  },
  {
    step: 2,
    title: 'Concept Design',
    description: 'Our design team develops creative concepts and preliminary layouts that align with your brief and budget.',
  },
  {
    step: 3,
    title: 'Detailed Engineering',
    description: 'Comprehensive architectural, structural, and MEP design documentation is prepared with precision.',
  },
  {
    step: 4,
    title: 'Municipality Approvals',
    description: 'We manage the entire approval process with relevant authorities, ensuring full regulatory compliance.',
  },
  {
    step: 5,
    title: 'Construction Documentation',
    description: 'Detailed construction drawings, specifications, and BOQs are prepared for tendering and execution.',
  },
  {
    step: 6,
    title: 'Site Supervision',
    description: 'Our engineers provide rigorous on-site supervision to ensure quality and adherence to approved designs.',
  },
  {
    step: 7,
    title: 'Project Completion',
    description: 'Final inspections, authority clearances, and handover documentation ensure a smooth project completion.',
  },
];

export const BLOG_POSTS = [
  {
    title: 'UAE Building Regulations 2026: What Developers Need to Know',
    category: 'Regulations',
    date: 'January 15, 2026',
    excerpt: 'A comprehensive guide to the latest building code updates and their impact on new developments across the UAE.',
    readTime: '8 min read',
  },
  {
    title: 'Sustainable Design Strategies for Hot Climate Architecture',
    category: 'Sustainability',
    date: 'January 8, 2026',
    excerpt: 'Exploring passive design strategies and innovative technologies for energy-efficient buildings in the Gulf region.',
    readTime: '6 min read',
  },
  {
    title: 'The Future of Smart Buildings in the Middle East',
    category: 'Innovation',
    date: 'December 28, 2025',
    excerpt: 'How IoT, AI, and BIM technology are transforming building design, construction, and operations in the region.',
    readTime: '7 min read',
  },
  {
    title: 'A Guide to Municipality Permit Approvals in Abu Dhabi',
    category: 'Permits',
    date: 'December 15, 2025',
    excerpt: 'Step-by-step walkthrough of the ADM permit process, common pitfalls, and expert tips for faster approvals.',
    readTime: '10 min read',
  },
];

export const PARTNERS = [
  'Abu Dhabi Municipality',
  'Dubai Municipality',
  'DMT',
  'Civil Defense ADCD',
  'TAQA',
  'ADDC',
  'Etisalat',
  'ADNOC',
  
  
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tenders', href: '#tenders' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];
