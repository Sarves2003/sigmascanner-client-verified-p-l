/*
  HOW TO ADD A NEW VERIFIED PORTFOLIO LINK
  -----------------------------------------
  Add a new object to the LINKS array below. No admin panel needed —
  just edit this file directly and re-upload/deploy the site.

  {id:'l5', name:'Someone', capital:'₹1L', duration:'6 Months', link:'https://...'}

  OPTIONAL FIELDS (work on both LINKS and SNAPS — cards display them
  automatically when present, and hide them when absent):
    pnl:     '+₹1,77,026'   → shown as the big Net P&L number (green; red if it starts with -)
    pnlPct:  '+18.41%'      → shown as a return-percentage pill next to the P&L
    segment: 'Equity'        → shown as a chip (e.g. Equity / F&O / Options)
    date:    'Jun 2026'      → shown in the snapshot card subtitle
*/
const LINKS = [
  {id:'l1',name:'Thenmozhi',capital:'₹70K',duration:'8 Months',link:'https://profile.mynt.in/dailypnl?ucode=6zCsvBLyNBlfYFyiGGJ2eqcG'},
  {id:'l2',name:'Sruthi',capital:'₹1L',duration:'8 Months',link:'https://profile.mynt.in/dailypnl?ucode=KcYhqkt3hMPTDAQmQEaUKU4x'},
  {id:'l3',name:'Kani',capital:'₹2.3L',duration:'7 Months',link:'https://profile.mynt.in/dailypnl?ucode=u5r7rp0Hcr11qrLZQnG75XHd'},
  {id:'l4',name:'Ravi',capital:'₹1L',duration:'1 Month',link:'https://console.zerodha.com/verified/767c4a37'},
  {id:'l5',name:'Rajan',capital:'₹1L',duration:'3 Month',link:'https://console.zerodha.com/verified/c91d74d6'},
  {id:'l6',name:'Karunanidhi',capital:'₹50k',duration:'1 Year',link:'https://drive.google.com/file/d/1oslHMjr8fVHgzV2Vz2w5mV9LeDgbMvf_/view?usp=sharing'}
];

/*
  HOW TO ADD A NEW PORTFOLIO SNAPSHOT
  -----------------------------------------
  1. Save the screenshot image file into: assets/screenshots/
  2. Add a new object to the SNAPS array below pointing to that file's path.

  {id:'s2', name:'Someone', capital:'₹1L', duration:'6 Months', image:'assets/screenshots/someone-1.png'}
*/
const SNAPS = [
  { id: 's1', name: 'Thamaraikannan', capital: '₹1L', duration: '1 Year', image: 'assets/screenshots/thamaraikannan1.jpg' },
  { id: 's2', name: 'Mathi', capital: '₹70k', duration: '2 Months', image: 'assets/screenshots/mathi1.jpg' },
  { id: 's3', name: 'Srinivas', capital: '₹9.6L', duration: '4 Months', image: 'assets/screenshots/Srinivas1.jpg' },
  { id: 's4', name: 'Thirumaran', capital: '₹2.9L', duration: '10 Months', image: 'assets/screenshots/Thirumaran1.jpg' },
  { id: 's5', name: 'Shahin', capital: '₹3L', duration: '2 Months', image: 'assets/screenshots/Shahin1.jpg' },
  { id: 's6', name: 'Sundar', capital: '₹1.33L', duration: '1 Year', image: 'assets/screenshots/sundarc1.png' },
  { id: 's7', name: 'Varatharaj', capital: '₹1.43L', duration: '6 Months', image: 'assets/screenshots/Varatharaj1.jpg' },
  { id: 's8', name: 'Thiru', capital: '₹77k', duration: '2 Months', image: 'assets/screenshots/Thiru1.jpg' },
  { id: 's9', name: 'Mohideen', capital: '₹50k', duration: '3 Months', image: 'assets/screenshots/Mohideen1.jpg' },
  { id: 's10', name: 'Vijay', capital: '₹60k', duration: '9 Months', image: 'assets/screenshots/Vijay1.jpg' }
]

/*
  TESTIMONIALS — real member quotes. Add/remove entries freely;
  set to an empty array [] to hide the whole section.
  Optional: since:'...' shows a small sub-line under the name.
*/
const TESTIMONIALS = [
  { quote: 'It is the best I have seen in my 5 years of the stock market. Backtest results were excellent and it captured many multibaggers with 200% to 600% returns in single stocks. Also I manually validated the accuracy. I got a hope to make excellent profit in share market as a layman.', who: 'Mathi' },
  { quote: 'The only way in share market to make decent return in a logical way. After a search of 10 years, I got the gem which gives me full control over my portfolio without depending on mutual fund & smallcase managers. The only platform to back-test our portfolio before going live.', who: 'Dushyanth Chandran' },
  { quote: 'Momentum score-based logic is very reliable, and we don\'t have to go through stock details to find good stocks. Based on our needs, we can choose an aggressive or moderate portfolio. Drawdown-arresting mechanisms help restrict any loss. The team is continuously improving the tool\'s usability and adding new features for our benefit.', who: 'Parthiban' },
  { quote: 'It\'s really nice to watch a good result using your Sigma Scanner for almost 2 months. Bunch of thanks for your hard work and bringing it to the common man. Though the Nifty goes down drastically, the stocks picked by the system are not moving that much in the negative. It beats FD — decent return more than FD. Once again thanks.', who: 'Veeramani' },
  { quote: 'Sigma Scanner platform is a very useful and scientific way of approaching investment plans for every kind of people, especially for job-going and business people. Tension free — helps us save our time instead of spending all our time in searching stocks.', who: 'Vasu Nathan' },
  { quote: 'GS is quite a unique community which provides value like no other, as it mainly focuses on adding value to the members than making money out of it. Their momentum investment strategy is backed with rigorous backtesting and I myself witnessed its potential.', who: 'Prem Pranav' },
  { quote: 'The mentorship experience has been good. Mr. Tamil has a remarkable ability to break down complex subjects into understandable segments, making the learning process smooth and comprehensive. The Sigma Scanner is a powerful tool, and its functionality has significantly enhanced my ability to identify and act on investment opportunities.', who: 'Senthil' },
  { quote: 'It\'s an amazing momentum tribe, and using the scanner is very helpful for my trading journey — it saves my time and analysis, with huge returns from momentum stocks. Definitely I will recommend this mentorship to my friends, relatives and whoever is willing in the stock market.', who: 'Gokilakrishnan' },
  { quote: 'Excellent course to recommend for stock enthusiasts. Their support is brilliant — we can ask any questions without any hesitation. Green Sigma Scanner is a good tool to analyse stocks and find the best stocks. The time we spend in momentum investment is way lesser compared to other methods.', who: 'Sowmitha' }
];
