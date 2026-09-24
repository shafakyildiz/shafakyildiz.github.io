import { defineStore } from 'pinia'

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    profile: {
      firstName: 'Safak',
      lastName: 'Yildiz',
      role: 'Software Engineer',
      location: 'Ankara, Turkey',
      coordinates: '39° 55\' 00" N, 32° 51\' 00" E',
      email: 'shafakyildiz@gmail.com',
      phone: '+90 (506) 993 64 11',
      phoneHref: 'tel:+905069936411',
    },
    lede: 'Vast in scope, exact in the details — software shaped for the people who rely on it.',
    careerStart: 2017,
    certifications: [
      'AWS Certified Cloud Practitioner',
      'Professional Scrum Master I',
      'Professional Scrum Product Owner I',
    ],
    statement:
      'The quiet parts matter. A product should feel inevitable — fast, calm, and exact — so the person using it never has to think about the machinery.',
    stats: [
      { value: 15, label: 'Products shipped' },
      { value: 5, label: 'Companies' },
    ],
    navigation: [
      { id: 'home', label: 'Home', index: '00' },
      { id: 'work', label: 'Work', index: '01' },
      { id: 'about', label: 'About', index: '02' },
      { id: 'experience', label: 'Experience', index: '03' },
      { id: 'contact', label: 'Contact', index: '04' },
    ],
    stack: ['React', 'React Native', '.NET', 'Node.js', 'Flutter', 'Angular', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
    projects: [
      {
        name: 'WeSight',
        tag: 'Product',
        stack: 'React · Node.js · MongoDB · AWS',
        summary:
          'AI-based PPE monitoring, tied to IP cameras, for health and safety teams inside an organization.',
        href: 'https://wesight.io',
        image: '/images/bg_2.jpg',
        position: 'center',
      },
      {
        name: 'Hire.io',
        tag: 'Platform',
        stack: 'React · NestJS · MongoDB · Docker',
        summary:
          'An internal hiring platform that shortens interviews with the help of artificial intelligence.',
        image: '/images/bg_3.jpg',
        position: 'center',
      },
      {
        name: 'Caluva',
        tag: 'Mobile',
        stack: 'Flutter · Dart · Firebase',
        summary:
          'A social platform for ice hockey players, shipped on the App Store and Play Store.',
        image: '/images/bg_1.jpg',
        position: 'center bottom',
      },
      {
        name: 'Inventory Management',
        tag: 'Product',
        summary:
          'Tracks stock in real time, automates reordering, and reports sales and stock movement. It reduces stockouts and overstock, and connects with accounting and sales systems.',
        image: '/images/bg5.png',
        position: 'center top',
      },
    ],
    disciplines: [
      {
        index: '01',
        title: 'Interface',
        text: 'Screens and mobile apps that stay clear when the product gets complicated.',
        tools: ['React', 'React Native', 'Angular', 'Flutter'],
      },
      {
        index: '02',
        title: 'Systems',
        text: 'Services and data shaped for the way the product actually runs.',
        tools: ['.NET', 'Node.js', 'MongoDB', 'PostgreSQL'],
      },
      {
        index: '03',
        title: 'Delivery',
        text: 'From the first environment to a pipeline a team can trust.',
        tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins'],
      },
    ],
    experience: [
      {
        company: 'PixelCodex',
        role: 'Senior Software Consultant',
        dates: 'Jan 2026 — Present',
        code: 'PXC',
        text: 'Senior software consulting.',
      },
      {
        company: 'Limak Technology',
        role: 'Senior Software Engineer',
        dates: 'May 2024 — Dec 2025',
        code: 'LMT',
        text: 'Electricity trading applications for energy companies, plus web and mobile CRM and ERP for holdings. React, React Native, .NET, MsSQL, PostgreSQL, and Azure Pipelines.',
      },
      {
        company: 'Huawei',
        role: 'Senior Software Engineer',
        dates: 'Sep 2022 — May 2024',
        code: 'HUA',
        text: 'WeSight and Hire.io — single-page products for health, safety, and hiring. React, Node.js, Express, NestJS, MongoDB, AWS, Docker, Jenkins, and Kubernetes.',
      },
      {
        company: 'Arksoft',
        role: 'Software Engineer',
        dates: 'Oct 2021 — Sep 2022',
        code: 'ARK',
        text: 'Single-page applications for governmental organizations: Easy2Patch, SessionLimit, and ArkLicense. Angular, React, .NET Core, MsSQL, with releases to IIS and AWS.',
      },
    ],
    process: [
      {
        index: '01',
        title: 'Conversation',
        text: 'A call or a note. We talk about the product, the constraint, and what good looks like. No obligation.',
      },
      {
        index: '02',
        title: 'Shape',
        text: 'Scope, sequence, and the stack. Nothing starts until the edges of the work are clear.',
      },
      {
        index: '03',
        title: 'Build',
        text: 'Interfaces, services, and the unglamorous middle. Reviewed in the open, shipped in slices.',
      },
      {
        index: '04',
        title: 'Proof',
        text: 'The path a person actually takes. We test it, then we tighten what still feels heavy.',
      },
      {
        index: '05',
        title: 'Release',
        text: 'Pipelines, environments, and a calm launch — Azure, AWS, or the setup you already run.',
      },
      {
        index: '06',
        title: 'Keep',
        text: 'After it is live, I stay close. Fixes, follow-through, and the next careful step.',
      },
    ],
    socials: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/safakyildiz' },
      { label: 'GitHub', href: 'https://github.com/safakyildiz' },
      { label: 'Medium', href: 'https://medium.com/@safakyildiz' },
    ],
  }),
  getters: {
    years: (state) => new Date().getFullYear() - state.careerStart,
    bio() {
      return `I am a solution-oriented software engineer with ${this.years} years in full-stack development. I hold a master’s degree in Software Engineering from Hacettepe University, plus AWS Certified Cloud Practitioner, Professional Scrum Master I (PSM I), and Professional Scrum Product Owner I (PSPO I). I am a Senior Software Consultant at PixelCodex, after shipping products at Limak Technology, Huawei, and Arksoft. The work sits in React, .NET, and Node.js, and in mobile with React Native and Flutter.`
    },
  },
})
