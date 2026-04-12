const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = siteNav.querySelectorAll('a');
const langToggle = document.getElementById('langToggle');

const elements = {
  brand: document.getElementById('brand'),
  navFacilities: document.getElementById('navFacilities'),
  navServices: document.getElementById('navServices'),
  navPlans: document.getElementById('navPlans'),
  navContact: document.getElementById('navContact'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroCopy: document.getElementById('heroCopy'),
  heroMembershipBtn: document.getElementById('heroMembershipBtn'),
  heroFacilitiesBtn: document.getElementById('heroFacilitiesBtn'),
  heroTag: document.getElementById('heroTag'),
  heroStat1: document.getElementById('heroStat1'),
  heroStat2: document.getElementById('heroStat2'),
  heroStat3: document.getElementById('heroStat3'),
  facilitiesLabel: document.getElementById('facilitiesLabel'),
  facilitiesTitle: document.getElementById('facilitiesTitle'),
  strengthTitle: document.getElementById('strengthTitle'),
  strengthDesc: document.getElementById('strengthDesc'),
  cardioTitle: document.getElementById('cardioTitle'),
  cardioDesc: document.getElementById('cardioDesc'),
  functionalTitle: document.getElementById('functionalTitle'),
  functionalDesc: document.getElementById('functionalDesc'),
  servicesLabel: document.getElementById('servicesLabel'),
  servicesTitle: document.getElementById('servicesTitle'),
  personalTrainingTitle: document.getElementById('personalTrainingTitle'),
  personalTrainingDesc: document.getElementById('personalTrainingDesc'),
  groupClassesTitle: document.getElementById('groupClassesTitle'),
  groupClassesDesc: document.getElementById('groupClassesDesc'),
  nutritionGuidanceTitle: document.getElementById('nutritionGuidanceTitle'),
  nutritionGuidanceDesc: document.getElementById('nutritionGuidanceDesc'),
  promoLabel: document.getElementById('promoLabel'),
  promoTitle: document.getElementById('promoTitle'),
  promoLine1: document.getElementById('promoLine1'),
  promoLine2: document.getElementById('promoLine2'),
  promoLine3: document.getElementById('promoLine3'),
  promoLine4: document.getElementById('promoLine4'),
  promoLine5: document.getElementById('promoLine5'),
  promoLine6: document.getElementById('promoLine6'),
  promoLine7: document.getElementById('promoLine7'),
  promoContactLine: document.getElementById('promoContactLine'),
  promoWhatsAppBtn: document.getElementById('promoWhatsAppBtn'),
  plansLabel: document.getElementById('plansLabel'),
  plansTitle: document.getElementById('plansTitle'),
  plan1Title: document.getElementById('plan1Title'),
  plan1Price: document.getElementById('plan1Price'),
  plan1li1: document.getElementById('plan1li1'),
  plan1li2: document.getElementById('plan1li2'),
  plan1li3: document.getElementById('plan1li3'),
  plan1Btn: document.getElementById('plan1Btn'),
  plan2Badge: document.getElementById('plan2Badge'),
  plan2Title: document.getElementById('plan2Title'),
  plan2Price: document.getElementById('plan2Price'),
  plan2li1: document.getElementById('plan2li1'),
  plan2li2: document.getElementById('plan2li2'),
  plan2li3: document.getElementById('plan2li3'),
  plan2Btn: document.getElementById('plan2Btn'),
  plan3Title: document.getElementById('plan3Title'),
  plan3Price: document.getElementById('plan3Price'),
  plan3li1: document.getElementById('plan3li1'),
  plan3li2: document.getElementById('plan3li2'),
  plan3li3: document.getElementById('plan3li3'),
  plan3Btn: document.getElementById('plan3Btn'),
  testimonialsLabel: document.getElementById('testimonialsLabel'),
  testimonialsTitle: document.getElementById('testimonialsTitle'),
  testimonialText: document.getElementById('testimonialText'),
  testimonialAuthor: document.getElementById('testimonialAuthor'),
  footerTitle: document.getElementById('footerTitle'),
  footerLine1: document.getElementById('footerLine1'),
  footerLine2: document.getElementById('footerLine2'),
  footerButton: document.getElementById('footerButton'),
};

const translations = {
  en: {
    brand: 'Muscle Up Gym',
    navFacilities: 'Facilities',
    navServices: 'Services',
    navPlans: 'Membership',
    navContact: 'Contact',
    heroEyebrow: 'Train hard. Live strong.',
    heroTitle: 'Muscle Up Gym — 24/7 training in Cairo',
    heroCopy: 'Located on Nasseya Abdel Aziz Nassar Street, El-Nozha, Muscle Up Gym offers round-the-clock access, modern equipment, and expert coaching.',
    heroMembershipBtn: 'View Membership',
    heroFacilitiesBtn: 'Explore Facilities',
    heroTag: '24/7 Access',
    heroStat1: '<strong>150+</strong> Machines',
    heroStat2: '<strong>30+</strong> Classes/week',
    heroStat3: '<strong>Expert</strong> Trainers',
    facilitiesLabel: 'Facilities',
    facilitiesTitle: 'Everything you need for a complete workout',
    strengthTitle: 'Strength Zone',
    strengthDesc: 'Free weights, squat racks, and powerlifting platforms for serious gains.',
    cardioTitle: 'Cardio Studio',
    cardioDesc: 'Treadmills, bikes, rowers, and class-based HIIT sessions to keep your heart racing.',
    functionalTitle: 'Functional Area',
    functionalDesc: 'Battle ropes, rigs, kettlebells, and mobility zones built for dynamic training.',
    servicesLabel: 'Services',
    servicesTitle: 'Personalized support for every fitness goal',
    personalTrainingTitle: 'Personal Training',
    personalTrainingDesc: 'One-on-one coaching with certified trainers tailored to your progress.',
    groupClassesTitle: 'Group Classes',
    groupClassesDesc: 'Yoga, spin, HIIT, and strength classes available day and night.',
    nutritionGuidanceTitle: 'Nutrition Guidance',
    nutritionGuidanceDesc: 'Meal planning and coaching that help you stay fueled and consistent.',
    promoLabel: 'Special Offer',
    promoTitle: '50% off all gym subscriptions for a limited time',
    promoLine1: 'Month: <strong>250 EGP</strong> instead of 450 EGP',
    promoLine2: 'Two months: <strong>450 EGP</strong> instead of 900 EGP',
    promoLine3: '3 months: <strong>750 EGP</strong> instead of 1350 EGP',
    promoLine4: '6 months: <strong>1000 EGP</strong> instead of 2700 EGP',
    promoLine5: 'With a subscription to the Champions Follow-Up program supervised by Coach Ismail and Coach Adam.',
    promoLine6: 'Limited time offer 😉',
    promoLine7: 'One-month follow-up subscription with 75% discount <strong>(512 EGP)</strong> only for one month.',
    promoContactLine: 'To subscribe and get details, send the word <strong>"أنا بطل"</strong> to <a href="tel:01023161490" class="footer-link">010 2316 1490</a> or click the following link.',
    promoWhatsAppBtn: 'WhatsApp Message',
    plansLabel: 'Membership',
    plansTitle: 'Flexible plans for every lifestyle',
    plan1Title: '1 Month',
    plan1Price: '250 EGP<span>/month</span>',
    plan1li1: '24/7 gym access',
    plan1li2: 'Locker room access',
    plan1li3: 'Group classes',
    plan1Btn: 'Join 1 Month',
    plan2Badge: 'Best Value',
    plan2Title: '2 Months',
    plan2Price: '450 EGP<span>/2 months</span>',
    plan2li1: 'Everything included in the monthly plan',
    plan2li2: 'Champions follow-up program',
    plan2li3: 'Support from Coach Ismail and Coach Adam',
    plan2Btn: 'Join 2 Months',
    plan3Title: '3 Months',
    plan3Price: '750 EGP<span>/3 months</span>',
    plan3li1: '50% discount on subscription',
    plan3li2: 'Continuous follow-up',
    plan3li3: 'Professional training sessions',
    plan3Btn: 'Join 3 Months',
    testimonialsLabel: 'Testimonials',
    testimonialsTitle: 'Real results from our members',
    testimonialText: '“Muscle Up Gym gave me energy, confidence, and a training plan that actually works. The trainers are amazing.”',
    testimonialAuthor: '– Emma, member',
    footerTitle: 'Ready to start?',
    footerLine1: 'Visit us at Nasseya Abdel Aziz Nassar Street, El-Nozha, Cairo.',
    footerLine2: 'Call us: <a href="tel:01023161490" class="footer-link">010 2316 1490</a>',
    footerButton: 'Call Now',
  },
  ar: {
    brand: 'مسكل أب جيم',
    navFacilities: 'المرافق',
    navServices: 'الخدمات',
    navPlans: 'الاشتراك',
    navContact: 'اتصل',
    heroEyebrow: 'تدرب بقوة. عش بصحة.',
    heroTitle: 'مسكل أب جيم — تدريب 24/7 في القاهرة',
    heroCopy: 'يقع في شارع ناصية عبد العزيز نصار، النزهة، يوفر مسكل أب جيم وصولاً طوال الوقت، معدات حديثة، وتدريبًا محترفًا.',
    heroMembershipBtn: 'عرض الاشتراك',
    heroFacilitiesBtn: 'استكشف المرافق',
    heroTag: 'دخول 24/7',
    heroStat1: '<strong>150+</strong> جهاز',
    heroStat2: '<strong>30+</strong> حصص/أسبوع',
    heroStat3: '<strong>مدرب</strong> محترف',
    facilitiesLabel: 'المرافق',
    facilitiesTitle: 'كل ما تحتاجه لتمرين مكتمل',
    strengthTitle: 'منطقة القوة',
    strengthDesc: 'أوزان حرة، رفوف القرفصاء، ومنصات رفع القوة لنتائج قوية.',
    cardioTitle: 'استوديو الكارديو',
    cardioDesc: 'المشايات، الدراجات، أجهزة التجديف، وحصص HIIT لزيادة معدل ضربات القلب.',
    functionalTitle: 'المنطقة الوظيفية',
    functionalDesc: 'حبال المعركة، الحلقات، كيتلبيلز، ومنطقة المرونة للتدريب الديناميكي.',
    servicesLabel: 'الخدمات',
    servicesTitle: 'دعم مخصص لكل هدف لياقة',
    personalTrainingTitle: 'تدريب شخصي',
    personalTrainingDesc: 'تدريب فردي مع مدربين معتمدين متناسق مع تقدمك.',
    groupClassesTitle: 'حصص جماعية',
    groupClassesDesc: 'يوجا، سبين، HIIT، وحصص القوة متاحة يومياً.',
    nutritionGuidanceTitle: 'إرشاد تغذوي',
    nutritionGuidanceDesc: 'تخطيط وجبات ومتابعة تساعدك على البقاء نشيطاً.',
    promoLabel: 'عرض خاص',
    promoTitle: 'خصم 50% على كل اشتراكات الجيم لفترة محدودة',
    promoLine1: 'الشهر : <strong>250 جنيه</strong> بدل 450 جنيه',
    promoLine2: 'الشهرين : <strong>450 جنيه</strong> بدل 900 جنيه',
    promoLine3: '3 شهور : <strong>750 جنيه</strong> بدل 1350 جنيه',
    promoLine4: '6 شهور : <strong>1000 جنيه</strong> بدل 2700 جنيه',
    promoLine5: 'بشرط الاشتراك فى برنامج متابعة الأبطال تحت إشراف كابتن / إسماعيل و كابتن / أدم.',
    promoLine6: 'والسعر لفترة محدودة 😉',
    promoLine7: 'اشتراك الشهر متابعة بخصم 75% <strong>(512 جنيه)</strong> فقط للشهر.',
    promoContactLine: 'للإشتراك و التفاصيل أرسل كلمة <strong>"أنا بطل"</strong> على رقم <a href="tel:01023161490" class="footer-link">010 2316 1490</a> أو اضغط على الرابط التالي.',
    promoWhatsAppBtn: 'رسالة واتساب',
    plansLabel: 'الاشتراك',
    plansTitle: 'خطط مرنة لكل أسلوب حياة',
    plan1Title: '1 شهر',
    plan1Price: '250ج<span>/شهر</span>',
    plan1li1: 'الجيم مفتوح طوال الوقت',
    plan1li2: 'دخول غرفة تبديل الملابس',
    plan1li3: 'حصص جماعية',
    plan1Btn: 'اشتراك الشهر',
    plan2Badge: 'أفضل عرض',
    plan2Title: '2 شهر',
    plan2Price: '450ج<span>/شهرين</span>',
    plan2li1: 'كل مميزات الاشتراك الشهري',
    plan2li2: 'برنامج متابعة الأبطال',
    plan2li3: 'دعم كابتن إسماعيل وكابتن أدم',
    plan2Btn: 'اشتراك الشهرين',
    plan3Title: '3 شهور',
    plan3Price: '750ج<span>/3 شهور</span>',
    plan3li1: 'تخفيض 50% على الاشتراك',
    plan3li2: 'متابعة مستمرة',
    plan3li3: 'جلسات ومتابعة احترافية',
    plan3Btn: 'اشتراك 3 شهور',
    testimonialsLabel: 'آراء العملاء',
    testimonialsTitle: 'نتائج حقيقية من أعضائنا',
    testimonialText: '“مسكل أب جيم أعطاني طاقة وثقة وخطة تدريب فعالة. المدربين رائعون.”',
    testimonialAuthor: '– إيميلا، عضوة',
    footerTitle: 'هل أنت مستعد؟',
    footerLine1: 'قم بزيارتنا في شارع ناصية عبد العزيز نصار، النزهة، القاهرة.',
    footerLine2: 'اتصل بنا: <a href="tel:01023161490" class="footer-link">010 2316 1490</a>',
    footerButton: 'اتصل الآن',
  },
};

function setLanguage(language) {
  const translation = translations[language] || translations.en;
  Object.keys(elements).forEach((key) => {
    const element = elements[key];
    if (!element || typeof translation[key] === 'undefined') {
      return;
    }
    element.innerHTML = translation[key];
  });

  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', language === 'ar');
  langToggle.textContent = language === 'ar' ? 'EN' : 'عربي';
  langToggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  localStorage.setItem('siteLanguage', language);
}

function getSavedLanguage() {
  return localStorage.getItem('siteLanguage') || 'en';
}

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
  });
});

langToggle.addEventListener('click', () => {
  const nextLang = document.documentElement.lang === 'ar' ? 'en' : 'ar';
  setLanguage(nextLang);
});

window.addEventListener('load', () => {
  setLanguage(getSavedLanguage());
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 24) {
    header.classList.add('shadow');
  } else {
    header.classList.remove('shadow');
  }
});
