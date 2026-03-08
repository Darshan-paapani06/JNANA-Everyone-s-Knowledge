// ── JNANA i18n — UI Translations ─────────────────────────────────────────────
// Covers all visible UI strings across the app.
// Add more languages by copying the 'en' block and translating.

export const translations = {

  en: {
    // Nav
    nav_query:     'Query',
    nav_map:       'Live Map',
    nav_pipeline:  'Pipeline',
    nav_network:   'Network',
    nav_insights:  'Insights',
    nav_dashboard: 'Dashboard',

    // Query Page
    query_hero_line1:  'Your Voice. Your Language.',
    query_hero_line2:  'Your Rights.',
    query_label:       '▸ YOUR QUERY',
    query_placeholder: 'Ask anything in any language…\ne.g. "My crops failed and I cannot repay my loan. What are my rights?"',
    query_btn:         '⚡ Query JNANA',
    query_processing:  'Processing',
    query_hint:        'Ctrl+Enter to send',
    query_voice_ready: '🎤 Voice ready',
    query_listening:   'Listening… speak now',
    query_history:     '▸ HISTORY',

    // Pipeline
    pipeline_title:    'RAG Pipeline Execution',
    pipeline_label:    '▸ RAG PIPELINE EXECUTION',

    // Response
    response_label:    'JNANA RESPONSE',
    response_helpful:  'Helpful?',
    response_yes:      '👍 Yes',
    response_no:       '👎 No',
    response_thanks:   '✓ Feedback recorded',
    response_stages:   '⚡ 7 stages',
    response_docs:     '📄 640K docs',
    response_langs:    '🌐 22 languages',
    response_verified: '📍 District-verified',

    // Auth
    auth_signin:       '🔑 Sign In',
    auth_signup:       '✨ Sign Up',
    auth_enter:        '⚡ Enter JNANA',
    auth_join:         '🚀 Join JNANA',
    auth_email:        'Email Address',
    auth_password:     'Password',
    auth_name:         'Full Name',
    auth_tagline:      'Serving 1.4 billion citizens · Free forever',

    // Map
    map_title:         'India Intelligence Map',
    map_subtitle:      'Real-time citizen queries flowing across 28 states',
    map_queries_today: 'QUERIES TODAY',
    map_top_states:    '▸ TOP STATES TODAY',
    map_live_feed:     'LIVE QUERIES',

    // Dashboard
    dash_title:        'National Dashboard',
    dash_live:         'LIVE DATA',
    dash_week:         '▸ QUERY VOLUME — 7 DAYS',
    dash_domain:       '▸ DOMAIN BREAKDOWN',
    dash_emotion:      '▸ EMOTIONAL CONTEXT TODAY',
    dash_hourly:       '▸ QUERIES — 24 HOURS',
    dash_recent:       '▸ RECENT CITIZEN QUERIES',
    dash_demo_note:    '⚙️ Showing demo data — connect Supabase to see real citizen queries',

    // Insights
    insights_title:    'National Insight Engine',
    insights_label:    '◉ NATIONAL INSIGHT',
    insights_empty:    'Select a topic to generate a national insight report',

    // About
    about_tagline:     'Deep Knowledge + Understanding',
    about_quote1:      '"JNANA is not a chatbot.',
    about_quote2:      'It is the nervous system of a nation — feeling its people\'s pain, connecting their wisdom, and delivering justice at the speed of thought."',

    // Status
    status_live:       'LIVE',
    status_nodes:      'NODES',
    status_phase:      'PHASE 2 · LIVE',

    // Errors
    err_rate_limit:    'Rate limit reached. Please wait before trying again.',
    err_no_key:        '⚠️ Add your Anthropic API key to .env to activate JNANA.',
  },

  hi: {
    nav_query:     'प्रश्न',
    nav_map:       'लाइव मानचित्र',
    nav_pipeline:  'पाइपलाइन',
    nav_network:   'नेटवर्क',
    nav_insights:  'अंतर्दृष्टि',
    nav_dashboard: 'डैशबोर्ड',

    query_hero_line1:  'आपकी आवाज़। आपकी भाषा।',
    query_hero_line2:  'आपके अधिकार।',
    query_label:       '▸ आपका प्रश्न',
    query_placeholder: 'कोई भी भाषा में पूछें…\nजैसे: "मेरी फसल बर्बाद हो गई और मैं कर्ज नहीं चुका सकता। मेरे क्या अधिकार हैं?"',
    query_btn:         '⚡ ज्ञान से पूछें',
    query_processing:  'प्रसंस्करण हो रहा है',
    query_hint:        'Ctrl+Enter दबाएँ',
    query_voice_ready: '🎤 वॉइस तैयार',
    query_listening:   'सुन रहे हैं… अभी बोलें',
    query_history:     '▸ इतिहास',

    pipeline_title:    'RAG पाइपलाइन निष्पादन',
    pipeline_label:    '▸ RAG पाइपलाइन निष्पादन',

    response_label:    'ज्ञान का उत्तर',
    response_helpful:  'सहायक था?',
    response_yes:      '👍 हाँ',
    response_no:       '👎 नहीं',
    response_thanks:   '✓ प्रतिक्रिया दर्ज हुई',
    response_stages:   '⚡ 7 चरण',
    response_docs:     '📄 6.4 लाख दस्तावेज़',
    response_langs:    '🌐 22 भाषाएँ',
    response_verified: '📍 जिला-सत्यापित',

    auth_signin:       '🔑 साइन इन',
    auth_signup:       '✨ साइन अप',
    auth_enter:        '⚡ ज्ञान में प्रवेश करें',
    auth_join:         '🚀 ज्ञान से जुड़ें',
    auth_email:        'ईमेल पता',
    auth_password:     'पासवर्ड',
    auth_name:         'पूरा नाम',
    auth_tagline:      '1.4 अरब नागरिकों की सेवा में · निःशुल्क',

    map_title:         'भारत इंटेलिजेंस मानचित्र',
    map_subtitle:      '28 राज्यों में नागरिक प्रश्नों का लाइव प्रवाह',
    map_queries_today: 'आज के प्रश्न',
    map_top_states:    '▸ आज के शीर्ष राज्य',
    map_live_feed:     'लाइव प्रश्न',

    dash_title:        'राष्ट्रीय डैशबोर्ड',
    dash_live:         'लाइव डेटा',
    dash_week:         '▸ 7 दिनों की प्रश्न मात्रा',
    dash_domain:       '▸ डोमेन विवरण',
    dash_emotion:      '▸ आज भावनात्मक संदर्भ',
    dash_hourly:       '▸ 24 घंटे के प्रश्न',
    dash_recent:       '▸ हाल के नागरिक प्रश्न',
    dash_demo_note:    '⚙️ डेमो डेटा दिखाया जा रहा है — असली डेटा के लिए Supabase जोड़ें',

    insights_title:    'राष्ट्रीय अंतर्दृष्टि इंजन',
    insights_label:    '◉ राष्ट्रीय अंतर्दृष्टि',
    insights_empty:    'रिपोर्ट बनाने के लिए एक विषय चुनें',

    about_tagline:     'गहरा ज्ञान + समझ',
    about_quote1:      '"ज्ञान सिर्फ एक चैटबॉट नहीं है।',
    about_quote2:      'यह एक राष्ट्र की तंत्रिका प्रणाली है — लोगों का दर्द महसूस करती है, उनकी बुद्धि को जोड़ती है, और विचार की गति से न्याय दिलाती है।"',

    status_live:       'लाइव',
    status_nodes:      'नोड्स',
    status_phase:      'चरण 2 · लाइव',

    err_rate_limit:    'सीमा पूरी हो गई। कृपया प्रतीक्षा करें।',
    err_no_key:        '⚠️ JNANA सक्रिय करने के लिए .env में API Key जोड़ें।',
  },

  ta: {
    nav_query:     'கேள்வி',
    nav_map:       'நேரடி வரைபடம்',
    nav_pipeline:  'குழாய்',
    nav_network:   'வலைப்பின்னல்',
    nav_insights:  'நுண்ணறிவு',
    nav_dashboard: 'டாஷ்போர்டு',

    query_hero_line1:  'உங்கள் குரல். உங்கள் மொழி.',
    query_hero_line2:  'உங்கள் உரிமைகள்.',
    query_label:       '▸ உங்கள் கேள்வி',
    query_placeholder: 'எந்த மொழியிலும் கேளுங்கள்…\nஎ.கா: "என் பயிர் நாசமானது, கடனை திரும்ப செலுத்த முடியவில்லை. என் உரிமைகள் என்ன?"',
    query_btn:         '⚡ ஞானத்திடம் கேளுங்கள்',
    query_processing:  'செயலாக்கப்படுகிறது',
    query_hint:        'Ctrl+Enter அழுத்துங்கள்',
    query_voice_ready: '🎤 குரல் தயார்',
    query_listening:   'கேட்கிறோம்… இப்போது பேசுங்கள்',
    query_history:     '▸ வரலாறு',

    pipeline_label:    '▸ RAG குழாய் செயல்பாடு',
    pipeline_title:    'RAG குழாய் செயல்பாடு',

    response_label:    'ஞான பதில்',
    response_helpful:  'உதவியாக இருந்ததா?',
    response_yes:      '👍 ஆம்',
    response_no:       '👎 இல்லை',
    response_thanks:   '✓ கருத்து பதிவாகியது',
    response_stages:   '⚡ 7 நிலைகள்',
    response_docs:     '📄  6.4 லட்சம் ஆவணங்கள்',
    response_langs:    '🌐 22 மொழிகள்',
    response_verified: '📍 மாவட்ட சரிபார்ப்பு',

    auth_signin:       '🔑 உள்நுழைக',
    auth_signup:       '✨ பதிவு செய்க',
    auth_enter:        '⚡ ஞானத்தில் நுழைக',
    auth_join:         '🚀 ஞானத்தில் சேருங்கள்',
    auth_email:        'மின்னஞ்சல் முகவரி',
    auth_password:     'கடவுச்சொல்',
    auth_name:         'முழு பெயர்',
    auth_tagline:      '1.4 பில்லியன் குடிமக்களுக்கு சேவை · இலவசம்',

    map_title:         'இந்தியா நுண்ணறிவு வரைபடம்',
    map_subtitle:      '28 மாநிலங்களில் நேரடி கேள்விகள்',
    map_queries_today: 'இன்றைய கேள்விகள்',
    map_top_states:    '▸ இன்றைய முதல் மாநிலங்கள்',
    map_live_feed:     'நேரடி கேள்விகள்',

    dash_title:        'தேசிய டாஷ்போர்டு',
    dash_live:         'நேரடி தரவு',
    dash_recent:       '▸ சமீபத்திய கேள்விகள்',
    dash_demo_note:    '⚙️ டெமோ தரவு காட்டப்படுகிறது',

    insights_title:    'தேசிய நுண்ணறிவு இயந்திரம்',
    insights_label:    '◉ தேசிய நுண்ணறிவு',
    insights_empty:    'அறிக்கை உருவாக்க ஒரு தலைப்பை தேர்ந்தெடுக்கவும்',

    about_tagline:     'ஆழமான அறிவு + புரிதல்',
    about_quote1:      '"ஞானம் வெறும் சாட்போட் அல்ல.',
    about_quote2:      'இது ஒரு தேசத்தின் நரம்பு மண்டலம்."',

    status_live:       'நேரடி',
    status_nodes:      'முனைகள்',
    status_phase:      'கட்டம் 2 · நேரடி',

    err_rate_limit:    'வரம்பு எட்டிவிட்டது. சிறிது நேரம் காத்திருங்கள்.',
    err_no_key:        '⚠️ JNANA செயல்படுத்த .env-ல் API Key சேர்க்கவும்.',
  },

  te: {
    nav_query:     'ప్రశ్న',
    nav_map:       'లైవ్ మ్యాప్',
    nav_pipeline:  'పైప్‌లైన్',
    nav_network:   'నెట్‌వర్క్',
    nav_insights:  'అంతర్దృష్టి',
    nav_dashboard: 'డాష్‌బోర్డ్',

    query_hero_line1:  'మీ గొంతు. మీ భాష.',
    query_hero_line2:  'మీ హక్కులు.',
    query_label:       '▸ మీ ప్రశ్న',
    query_placeholder: 'ఏ భాషలోనైనా అడగండి…',
    query_btn:         '⚡ జ్ఞానాన్ని అడగండి',
    query_processing:  'ప్రాసెస్ అవుతోంది',
    query_hint:        'Ctrl+Enter నొక్కండి',
    query_voice_ready: '🎤 వాయిస్ సిద్ధం',
    query_listening:   'వింటున్నాం… ఇప్పుడు మాట్లాడండి',
    query_history:     '▸ చరిత్ర',

    pipeline_label:    '▸ RAG పైప్‌లైన్ అమలు',
    pipeline_title:    'RAG పైప్‌లైన్ అమలు',

    response_label:    'జ్ఞాన సమాధానం',
    response_helpful:  'సహాయకరంగా ఉందా?',
    response_yes:      '👍 అవును',
    response_no:       '👎 కాదు',
    response_thanks:   '✓ అభిప్రాయం నమోదైంది',
    response_stages:   '⚡ 7 దశలు',
    response_docs:     '📄 6.4 లక్షల పత్రాలు',
    response_langs:    '🌐 22 భాషలు',
    response_verified: '📍 జిల్లా-ధృవీకరించబడింది',

    auth_signin:       '🔑 సైన్ ఇన్',
    auth_signup:       '✨ సైన్ అప్',
    auth_enter:        '⚡ జ్ఞానంలో ప్రవేశించండి',
    auth_join:         '🚀 జ్ఞానంలో చేరండి',
    auth_email:        'ఇమెయిల్ చిరునామా',
    auth_password:     'పాస్‌వర్డ్',
    auth_name:         'పూర్తి పేరు',
    auth_tagline:      '1.4 బిలియన్ పౌరులకు సేవ · ఉచితం',

    map_title:         'భారత ఇంటెలిజెన్స్ మ్యాప్',
    map_subtitle:      '28 రాష్ట్రాల్లో లైవ్ ప్రశ్నలు',
    map_queries_today: 'ఈరోజు ప్రశ్నలు',
    map_top_states:    '▸ ఈరోజు టాప్ రాష్ట్రాలు',
    map_live_feed:     'లైవ్ ప్రశ్నలు',

    dash_title:        'జాతీయ డాష్‌బోర్డ్',
    dash_live:         'లైవ్ డేటా',
    dash_recent:       '▸ ఇటీవలి పౌర ప్రశ్నలు',
    dash_demo_note:    '⚙️ డెమో డేటా చూపబడుతోంది',

    insights_title:    'జాతీయ అంతర్దృష్టి ఇంజిన్',
    insights_label:    '◉ జాతీయ అంతర్దృష్టి',
    insights_empty:    'నివేదిక రూపొందించడానికి ఒక అంశాన్ని ఎంచుకోండి',

    about_tagline:     'లోతైన జ్ఞానం + అవగాహన',
    about_quote1:      '"జ్ఞానం కేవలం చాట్‌బాట్ కాదు.',
    about_quote2:      'ఇది ఒక దేశం యొక్క నాడీ వ్యవస్థ."',

    status_live:       'లైవ్',
    status_nodes:      'నోడ్స్',
    status_phase:      'దశ 2 · లైవ్',

    err_rate_limit:    'పరిమితి చేరింది. దయచేసి వేచి ఉండండి.',
    err_no_key:        '⚠️ JNANA సక్రియం చేయడానికి .env లో API Key జోడించండి.',
  },

  bn: {
    nav_query:     'প্রশ্ন',
    nav_map:       'লাইভ মানচিত্র',
    nav_pipeline:  'পাইপলাইন',
    nav_network:   'নেটওয়ার্ক',
    nav_insights:  'অন্তর্দৃষ্টি',
    nav_dashboard: 'ড্যাশবোর্ড',

    query_hero_line1:  'আপনার কণ্ঠস্বর। আপনার ভাষা।',
    query_hero_line2:  'আপনার অধিকার।',
    query_label:       '▸ আপনার প্রশ্ন',
    query_placeholder: 'যেকোনো ভাষায় জিজ্ঞাসা করুন…',
    query_btn:         '⚡ জ্ঞানকে জিজ্ঞাসা করুন',
    query_processing:  'প্রক্রিয়াকরণ হচ্ছে',
    query_hint:        'Ctrl+Enter চাপুন',
    query_voice_ready: '🎤 ভয়েস প্রস্তুত',
    query_listening:   'শুনছি… এখন বলুন',
    query_history:     '▸ ইতিহাস',

    pipeline_label:    '▸ RAG পাইপলাইন চালু',
    pipeline_title:    'RAG পাইপলাইন চালু',

    response_label:    'জ্ঞানের উত্তর',
    response_helpful:  'সহায়ক ছিল?',
    response_yes:      '👍 হ্যাঁ',
    response_no:       '👎 না',
    response_thanks:   '✓ মতামত নথিভুক্ত',
    response_stages:   '⚡ ৭টি পর্যায়',
    response_docs:     '📄 ৬.৪ লক্ষ নথি',
    response_langs:    '🌐 ২২টি ভাষা',
    response_verified: '📍 জেলা-যাচাইকৃত',

    auth_signin:       '🔑 সাইন ইন',
    auth_signup:       '✨ সাইন আপ',
    auth_enter:        '⚡ জ্ঞানে প্রবেশ করুন',
    auth_join:         '🚀 জ্ঞানে যোগ দিন',
    auth_email:        'ইমেইল ঠিকানা',
    auth_password:     'পাসওয়ার্ড',
    auth_name:         'পুরো নাম',
    auth_tagline:      '১.৪ বিলিয়ন নাগরিকের সেবায় · বিনামূল্যে',

    map_title:         'ভারত ইন্টেলিজেন্স মানচিত্র',
    map_subtitle:      '২৮টি রাজ্যে লাইভ প্রশ্নের প্রবাহ',
    map_queries_today: 'আজকের প্রশ্ন',
    map_top_states:    '▸ আজকের শীর্ষ রাজ্য',
    map_live_feed:     'লাইভ প্রশ্ন',

    dash_title:        'জাতীয় ড্যাশবোর্ড',
    dash_live:         'লাইভ ডেটা',
    dash_recent:       '▸ সাম্প্রতিক নাগরিক প্রশ্ন',
    dash_demo_note:    '⚙️ ডেমো ডেটা দেখানো হচ্ছে',

    insights_title:    'জাতীয় অন্তর্দৃষ্টি ইঞ্জিন',
    insights_label:    '◉ জাতীয় অন্তর্দৃষ্টি',
    insights_empty:    'একটি বিষয় বেছে নিন',

    about_tagline:     'গভীর জ্ঞান + বোঝাপড়া',
    about_quote1:      '"জ্ঞান শুধু একটি চ্যাটবট নয়।',
    about_quote2:      'এটি একটি জাতির স্নায়ুতন্ত্র।"',

    status_live:       'লাইভ',
    status_nodes:      'নোড',
    status_phase:      'পর্যায় ২ · লাইভ',

    err_rate_limit:    'সীমা পৌঁছে গেছে। অনুগ্রহ করে অপেক্ষা করুন।',
    err_no_key:        '⚠️ JNANA সক্রিয় করতে .env-এ API Key যোগ করুন।',
  },
}

// ── i18n Hook ─────────────────────────────────────────────────────────────────
export const getT = (langCode) => {
  const lang = translations[langCode] || translations.en
  return (key) => lang[key] || translations.en[key] || key
}

// Language display names for UI switcher
export const UI_LANGUAGES = [
  { code:'en', label:'English',  native:'English'  },
  { code:'hi', label:'Hindi',    native:'हिन्दी'    },
  { code:'ta', label:'Tamil',    native:'தமிழ்'    },
  { code:'te', label:'Telugu',   native:'తెలుగు'   },
  { code:'bn', label:'Bengali',  native:'বাংলা'    },
]
