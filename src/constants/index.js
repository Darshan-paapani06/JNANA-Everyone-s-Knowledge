export const LANGUAGES = [
  { code:'en', name:'English',   native:'English'   },
  { code:'hi', name:'Hindi',     native:'हिन्दी'     },
  { code:'ta', name:'Tamil',     native:'தமிழ்'     },
  { code:'te', name:'Telugu',    native:'తెలుగు'    },
  { code:'bn', name:'Bengali',   native:'বাংলা'     },
  { code:'mr', name:'Marathi',   native:'मराठी'     },
  { code:'gu', name:'Gujarati',  native:'ગુજરાતી'   },
  { code:'kn', name:'Kannada',   native:'ಕನ್ನಡ'    },
  { code:'ml', name:'Malayalam', native:'മലയാളം'   },
  { code:'pa', name:'Punjabi',   native:'ਪੰਜਾਬੀ'   },
]

export const DOMAINS = [
  { id:'agriculture', label:'Agriculture',  icon:'🌾', color:'#00FF88' },
  { id:'healthcare',  label:'Healthcare',   icon:'🏥', color:'#00E5FF' },
  { id:'legal',       label:'Legal Rights', icon:'⚖️', color:'#7C3AED' },
  { id:'education',   label:'Education',    icon:'📚', color:'#FFD700' },
  { id:'finance',     label:'Finance',      icon:'💰', color:'#FF4466' },
  { id:'employment',  label:'Employment',   icon:'💼', color:'#FF8C00' },
  { id:'governance',  label:'Governance',   icon:'🏛️', color:'#FF6B00' },
  { id:'environment', label:'Environment',  icon:'🌿', color:'#4ECDC4' },
]

export const PIPELINE_STAGES = [
  { id:1, name:'Emotional Context Analysis',  icon:'❤️', color:'#FF4466' },
  { id:2, name:'Query Embedding',             icon:'🧠', color:'#7C3AED' },
  { id:3, name:'Temporal Layer Scan',         icon:'⏳', color:'#FF6B00' },
  { id:4, name:'Federated Node Retrieval',    icon:'🛰️', color:'#00E5FF' },
  { id:5, name:'Cross-Domain Causal Mapping', icon:'🔗', color:'#FFD700' },
  { id:6, name:'Citizen Truth Validation',    icon:'👥', color:'#00FF88' },
  { id:7, name:'Multilingual Synthesis',      icon:'🗣️', color:'#FF9A45' },
]

export const EMOTION_PROFILES = {
  distressed: { label:'Distressed', icon:'🔴', color:'#FF4466', priority:'CRISIS',  keywords:/distress|help|crisis|urgent|emergency|debt|starv|ruin|desperate|lost everything/i },
  angry:      { label:'Angry',      icon:'🟠', color:'#FF8C00', priority:'HIGH',    keywords:/angry|unfair|cheated|fraud|corrupt|injustice|scam/i },
  sad:        { label:'Melancholic',icon:'🟣', color:'#7C3AED', priority:'HIGH',    keywords:/sad|depressed|hopeless|alone|lonely|grief/i },
  curious:    { label:'Curious',    icon:'🔵', color:'#00E5FF', priority:'NORMAL',  keywords:/what is|how do|explain|understand|learn|tell me/i },
  optimistic: { label:'Optimistic', icon:'🟢', color:'#00FF88', priority:'LOW',     keywords:/happy|great|amazing|excited|wonderful|want to/i },
}

export const INSIGHT_TOPICS = [
  'Farmer Debt Crisis','Youth Unemployment','Rural Healthcare Gap',
  'Education Inequality','Water Scarcity','Urban Migration',
  'Women Empowerment','Digital Divide',
]

export const NAV_ROUTES = [
  { path:'/',          label:'Query',     icon:'⚡' },
  { path:'/map',       label:'Live Map',  icon:'🌍' },
  { path:'/pipeline',  label:'Pipeline',  icon:'🔬' },
  { path:'/network',   label:'Network',   icon:'🛰️' },
  { path:'/insights',  label:'Insights',  icon:'📊' },
  { path:'/dashboard', label:'Dashboard', icon:'🏛️' },
]

export const PLATFORM_STATS = [
  { label:'Citizens Served',   value:'4.2M+',  icon:'👥', color:'var(--saffron)' },
  { label:'Documents Indexed', value:'640K',   icon:'📄', color:'var(--cyan)'    },
  { label:'Village Nodes',     value:'1,240',  icon:'🛰️', color:'var(--green)'  },
  { label:'Languages Active',  value:'22',     icon:'🗣️', color:'var(--violet)' },
  { label:'Queries Today',     value:'18,442', icon:'⚡', color:'var(--gold)'   },
  { label:'Accuracy Rate',     value:'94.7%',  icon:'✅', color:'#4ECDC4'       },
]

// India states with approximate map positions (x%, y% on bounding box)
export const INDIA_STATES = [
  { id:'JK', name:'Jammu & Kashmir', x:38, y:4,  pop:12.5, color:'#00E5FF' },
  { id:'HP', name:'Himachal Pradesh',x:42, y:10, pop:6.8,  color:'#7C3AED' },
  { id:'PB', name:'Punjab',          x:34, y:13, pop:27.7, color:'#FF6B00' },
  { id:'UK', name:'Uttarakhand',     x:47, y:14, pop:10.1, color:'#00FF88' },
  { id:'HR', name:'Haryana',         x:38, y:18, pop:25.4, color:'#FFD700' },
  { id:'DL', name:'Delhi',           x:41, y:20, pop:18.7, color:'#FF4466' },
  { id:'RJ', name:'Rajasthan',       x:30, y:26, pop:68.5, color:'#FF8C00' },
  { id:'UP', name:'Uttar Pradesh',   x:50, y:24, pop:199.8,color:'#FF6B00' },
  { id:'BR', name:'Bihar',           x:60, y:27, pop:104.1,color:'#00E5FF' },
  { id:'SK', name:'Sikkim',          x:68, y:20, pop:0.6,  color:'#4ECDC4' },
  { id:'AR', name:'Arunachal',       x:82, y:18, pop:1.4,  color:'#7C3AED' },
  { id:'NL', name:'Nagaland',        x:83, y:24, pop:2.0,  color:'#FF4466' },
  { id:'MN', name:'Manipur',         x:83, y:27, pop:2.7,  color:'#00FF88' },
  { id:'MZ', name:'Mizoram',         x:80, y:30, pop:1.1,  color:'#FFD700' },
  { id:'TR', name:'Tripura',         x:77, y:29, pop:3.7,  color:'#FF8C00' },
  { id:'ME', name:'Meghalaya',       x:76, y:24, pop:3.0,  color:'#00E5FF' },
  { id:'AS', name:'Assam',           x:75, y:21, pop:31.2, color:'#FF6B00' },
  { id:'WB', name:'West Bengal',     x:68, y:31, pop:91.3, color:'#7C3AED' },
  { id:'JH', name:'Jharkhand',       x:62, y:33, pop:33.0, color:'#FF4466' },
  { id:'OD', name:'Odisha',          x:62, y:40, pop:41.9, color:'#4ECDC4' },
  { id:'CT', name:'Chhattisgarh',    x:54, y:37, pop:25.5, color:'#00FF88' },
  { id:'MP', name:'Madhya Pradesh',  x:46, y:33, pop:72.6, color:'#FFD700' },
  { id:'GJ', name:'Gujarat',         x:25, y:34, pop:60.4, color:'#FF8C00' },
  { id:'MH', name:'Maharashtra',     x:38, y:44, pop:112.4,color:'#FF6B00' },
  { id:'GA', name:'Goa',             x:33, y:52, pop:1.5,  color:'#00E5FF' },
  { id:'KA', name:'Karnataka',       x:38, y:57, pop:61.1, color:'#7C3AED' },
  { id:'TS', name:'Telangana',       x:47, y:52, pop:35.0, color:'#FF4466' },
  { id:'AP', name:'Andhra Pradesh',  x:50, y:59, pop:49.4, color:'#4ECDC4' },
  { id:'TN', name:'Tamil Nadu',      x:46, y:68, pop:72.1, color:'#00FF88' },
  { id:'KL', name:'Kerala',          x:40, y:70, pop:33.4, color:'#FFD700' },
]
