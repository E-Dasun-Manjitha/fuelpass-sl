// ============================================================
// i18n.js – FuelPass SL Trilingual Support
// Languages: English (en), Sinhala (si), Tamil (ta)
// ============================================================

const TRANSLATIONS = {
  en: {
    // --- Navbar ---
    nav_dashboard:   'Dashboard',
    nav_stations:    'Stations',
    nav_gas:         'LPG Gas',
    nav_prices:      'Prices',
    nav_eligibility: 'Eligibility',
    nav_report:      'Report',
    nav_owner_login: 'Owner Login',
    nav_admin:       'Admin',
    nav_live:        'LIVE',

    // --- Hero ---
    hero_badge:      'Sri Lanka Fuel Intelligence',
    hero_title:      'Real-Time Fuel &<br/>Gas Tracking',
    hero_subtitle:   'Check fuel availability, verify your National Fuel Pass quota, find nearby stations, and stay informed during shortage situations.',
    hero_search_ph:  'Search stations, cities, or vehicle number…',
    hero_search_btn: 'Search',
    stat_stations:   'Stations',
    stat_available:  'Available',
    stat_gas_shops:  'Gas Shops',
    stat_last_upd:   'Last Update',

    // --- Overview ---
    overview_title:  "Today's Overview",
    overview_upd:    'Updated just now',
    card_petrol92:   'Petrol 92',
    card_petrol95:   'Petrol 95',
    card_diesel:     'Auto Diesel',
    card_gas:        'LP Gas 12.5kg',
    lkr:             'LKR',

    // --- Dashboard Station List ---
    all_stations:    'All Stations',
    district_filter: 'All Districts',
    fuel_filter:     'All Fuel Types',
    company_filter:  'All Companies',

    // --- Map ---
    map_title:       'Live Station Map',
    map_fuel_btn:    '⛽ Fuel',
    map_gas_btn:     '🔥 Gas',
    map_all_btn:     '📍 All',
    map_locate:      '📍 My Location',
    map_legend_avail:'Available',
    map_legend_lim:  'Limited',
    map_legend_out:  'Out of Stock',
    map_legend_gas:  'LPG Gas',
    map_no_internet: 'Map requires an internet connection to load tiles.',

    // --- Nearest Stations ---
    nearest_title:   '📍 Find Nearest Station',
    nearest_gps:     'Uses your GPS location',
    nearest_desc:    'Allow location access to instantly find the closest fuel stations and gas dealers, sorted by distance — with one-tap Google Maps directions.',
    nearest_fuel_btn:'⛽ Find Nearest Fuel Station',
    nearest_gas_btn: '🔥 Find Nearest Gas Shop',

    // --- Stations Page ---
    page_stations_h1:'Fuel Stations',
    page_stations_p: 'Browse all fuel stations across Sri Lanka with real-time availability',
    search_ph:       'Search by name, city, or district…',
    all_districts:   'All Districts',
    all_statuses:    'All Statuses',
    status_available:'Available',
    status_limited:  'Limited',
    status_out:      'Out of Stock',
    all_companies:   'All Companies',
    no_stations:     'No stations found. Try a different search.',

    // --- Gas Page ---
    page_gas_h1:     'LPG Gas Dealers',
    page_gas_p:      'Find Litro Gas & LAUGFS dealers near you',
    all_providers:   'All Providers',
    all_cylinders:   'All Cylinders',
    gas_dealers_h:   'Gas Dealers',
    no_gas:          'No gas dealers found.',

    // --- Prices Page ---
    page_prices_h1:  'Fuel & Gas Prices',
    page_prices_p:   'Official government-regulated prices updated in real-time',
    prices_fuel_h:   '⛽ Fuel Prices',
    prices_gas_h:    '🔥 LP Gas Prices',
    prices_type:     'Fuel Type',
    prices_cpc:      'CPC Price',
    prices_ioc:      'Lanka IOC Price',
    prices_change:   'Change',
    prices_unit:     'Per Litre',

    // --- Eligibility Page ---
    page_elig_h1:    'Fuel Eligibility Check',
    page_elig_p:     'Verify your odd/even eligibility and weekly fuel quota',
    elig_enter_plate:'Enter Vehicle Number',
    elig_plate_ph:   'e.g. CAR-1234 or ABC-1234',
    elig_check_btn:  'Check Eligibility',

    // --- Report Page ---
    page_report_h1:  'Report Fuel Status',
    page_report_p:   'Station owners submit verified updates · Community members report what they see',
    owner_verified:  '✅ VERIFIED OWNER',
    report_logout:   '🚪 Logout',
    owner_h3:        '🏪 Are you a Station Owner or Gas Dealer?',
    owner_desc:      'Log in with your Station Code and Password to submit verified real-time updates that users trust more.',
    owner_login_btn: '🔑 Owner Login',
    owner_reg_btn:   '📝 Register Station',
    recent_reports:  'Recent Reports',

    // --- Status / Queue ---
    queue_none:      'No Queue',
    queue_short:     'Short Queue',
    queue_medium:    'Medium Queue',
    queue_long:      'Long Queue',
    last_updated:    'Last Updated',
    directions:      'Directions',
    report_update:   '📋 Report Update',

    // --- Footer ---
    footer_providers:  'Providers',
    footer_feedback:   'Feedback & Contact',
    footer_email_prefix: 'Email:',
    fc_name_ph:        'Your Name',
    fc_email_ph:       'Your Email (optional)',
    fc_msg_ph:         'Your Feedback or Inquiry...',
    fc_submit_btn:     'Submit Feedback',
    footer_notice:     'Important Notice',
    footer_notice_p:   'This system aggregates publicly available data and community reports. For official information, always verify with CPC, Lanka IOC, or the Ministry of Power & Energy.',
    loading:         'Loading…',
    error_generic:   'Something went wrong. Please try again.',
  },

  si: {
    // --- Navbar ---
    nav_dashboard:   'ප්‍රධාන',
    nav_stations:    'පිරවුම් හල්',
    nav_gas:         'ගෑස් ලාප්',
    nav_prices:      'මිල ගණන්',
    nav_eligibility: 'සුදුසුකම',
    nav_report:      'වාර්තා',
    nav_owner_login: 'හිමිකරු පිවිසුම',
    nav_admin:       'පරිපාලක',
    nav_live:        'සජීවී',

    // --- Hero ---
    hero_badge:      'ශ්‍රී ලංකා ඉන්ධන සේවාව',
    hero_title:      'තත්‍ය කාල ඉන්ධන &<br/>ගෑස් ලුහුබෑම',
    hero_subtitle:   'ඉන්ධන ලබාගත හැකි බව පරීක්ෂා කරන්න, ඔබේ ජාතික ඉන්ධන සූදානම් කෝටාව සත්‍යාපනය කරන්න, ළগම නැවතුම් ස්ථාන සොයා ගන්න.',
    hero_search_ph:  'නගරය, දිස්ත්‍රික්කය හෝ වාහන අංකය සොයන්න…',
    hero_search_btn: 'සොයන්න',
    stat_stations:   'නැවතුම් ස්ථාන',
    stat_available:  'ලබාගත හැක',
    stat_gas_shops:  'ගෑස් ලාප්',
    stat_last_upd:   'අවසන් යාවත්කාලීන',

    // --- Overview ---
    overview_title:  'අද දිනයේ සාරාංශය',
    overview_upd:    'දැන් යාවත්කාලීන කරන ලදී',
    card_petrol92:   'පෙට්‍රල් 92',
    card_petrol95:   'පෙට්‍රල් 95',
    card_diesel:     'ඩීසල්',
    card_gas:        'ද්‍රවිය ගෑස් 12.5kg',
    lkr:             'රු.',

    // --- Dashboard Station List ---
    all_stations:    'සියලු නැවතුම් ස්ථාන',
    district_filter: 'සියලු දිස්ත්‍රික්ක',
    fuel_filter:     'සියලු ඉන්ධන වර්ග',
    company_filter:  'සියලු සමාගම්',

    // --- Map ---
    map_title:       'සජීවී ස්ථාන සිතියම',
    map_fuel_btn:    '⛽ ඉන්ධන',
    map_gas_btn:     '🔥 ගෑස්',
    map_all_btn:     '📍 සියල්ල',
    map_locate:      '📍 මගේ ස්ථානය',
    map_legend_avail:'ලබාගත හැක',
    map_legend_lim:  'සීමිතයි',
    map_legend_out:  'අවසන්',
    map_legend_gas:  'ද්‍රවිය ගෑස්',
    map_no_internet: 'සිතියම පූරණය කිරීමට අන්තර්ජාල සම්බන්ධතාවක් අවශ්‍යයි.',

    // --- Nearest Stations ---
    nearest_title:   '📍 ළගම නැවතුම් ස්ථානය සොයන්න',
    nearest_gps:     'GPS ස්ථානය භාවිතා කරයි',
    nearest_desc:    'ළගම ඉන්ධන නැවතුම් ස්ථාන සහ ගෑස් ලාප් සොයා ගැනීම සඳහා ස්ථාන ප්‍රවේශය ලබා දෙන්න.',
    nearest_fuel_btn:'⛽ ළගම ඉන්ධන ස්ථානය',
    nearest_gas_btn: '🔥 ළගම ගෑස් ලාප්',

    // --- Stations Page ---
    page_stations_h1:'ඉන්ධන නැවතුම් ස්ථාන',
    page_stations_p: 'ශ්‍රී ලංකාව පුරා සියලු ඉන්ධන නැවතුම් ස්ථාන',
    search_ph:       'නම, නගරය හෝ දිස්ත්‍රික්කය සොයන්න…',
    all_districts:   'සියලු දිස්ත්‍රික්ක',
    all_statuses:    'සියලු තත්ත්ව',
    status_available:'ලබාගත හැක',
    status_limited:  'සීමිතයි',
    status_out:      'අවසන්',
    all_companies:   'සියලු සමාගම්',
    no_stations:     'නැවතුම් ස්ථාන හමු නොවිණි. වෙනත් සෙවුමක් උත්සාහ කරන්න.',

    // --- Gas Page ---
    page_gas_h1:     'ද්‍රවිය ගෑස් ලාප්',
    page_gas_p:      'ළගම Litro Gas සහ LAUGFS ලාප් සොයා ගන්න',
    all_providers:   'සියලු සේවා සපයන්නන්',
    all_cylinders:   'සියලු ගෑස් සිලින්ඩර',
    gas_dealers_h:   'ගෑස් ලාප්',
    no_gas:          'ගෑස් ලාප් හමු නොවිණි.',

    // --- Prices Page ---
    page_prices_h1:  'ඉන්ධන හා ගෑස් මිල ගණන්',
    page_prices_p:   'රජය විසින් නියාමිත නිල මිල ගණන්',
    prices_fuel_h:   '⛽ ඉන්ධන මිල ගණන්',
    prices_gas_h:    '🔥 ද්‍රවිය ගෑස් මිල ගණන්',
    prices_type:     'ඉන්ධන වර්ගය',
    prices_cpc:      'CPC මිල',
    prices_ioc:      'Lanka IOC මිල',
    prices_change:   'වෙනස',
    prices_unit:     'ලීටරකට',

    // --- Eligibility Page ---
    page_elig_h1:    'ඉන්ධන සුදුසුකම් පරීක්ෂාව',
    page_elig_p:     'ස්ථාන ඔත්තේ/ගෙවේ සුදුසුකම සහ සතිපතා ඉන්ධන කෝටාව සත්‍යාපනය කරන්න',
    elig_enter_plate:'වාහන අංකය ඇතුළත් කරන්න',
    elig_plate_ph:   'උදා: CAR-1234 හෝ ABC-1234',
    elig_check_btn:  'සුදුසුකම් පරීක්ෂා කරන්න',

    // --- Report Page ---
    page_report_h1:  'ඉන්ධන තත්ත්වය වාර්තා කරන්න',
    page_report_p:   'ස්ථාන හිමිකරුවන් සත්‍යාපිත යාවත්කාලීන ගොනු කරයි · ප්‍රජා සාමාජිකයින් ඔවුන් දකින දෙය වාර්තා කරයි',
    owner_verified:  '✅ සත්‍යාපිත හිමිකරු',
    report_logout:   '🚪 ඉවත් වන්න',
    owner_h3:        '🏪 ඔබ නැවතුම් ස්ථාන හිමිකරු හෝ ගෑස් ලාප් හිමිකරු ද?',
    owner_desc:      'සත්‍යාපිත තත්‍ය කාල යාවත්කාලීන ඉදිරිපත් කිරීම සඳහා ස්ථාන කේතය සහ මුරපදය සමඟ ලොගින් වන්න.',
    owner_login_btn: '🔑 හිමිකරු පිවිසුම',
    owner_reg_btn:   '📝 ස්ථාන ලියාපදිංචිය',
    recent_reports:  'මෑත වාර්තා',

    // --- Status / Queue ---
    queue_none:      'පෝළිමක් නැත',
    queue_short:     'කෙටි පෝළිම',
    queue_medium:    'මධ්‍යම පෝළිම',
    queue_long:      'දිගු පෝළිම',
    last_updated:    'අවසන් යාවත්කාල',
    directions:      'මාර්ගෝපදේශ',
    report_update:   '📋 යාවත්කාල වාර්තා',

    // --- Footer ---
    footer_providers:  'සේවා සපයන්නන්',
    footer_feedback:   'ප්‍රතිචාර සහ සම්බන්ධතාව',
    footer_email_prefix: 'විද්‍යුත් තැපෑල:',
    fc_name_ph:        'ඔබේ නම',
    fc_email_ph:       'ඔබේ විද්‍යුත් තැපෑල (අත්‍යවශ්‍ය නොවේ)',
    fc_msg_ph:         'ඔබේ ප්‍රතිචාරය හෝ ප්‍රශ්නය...',
    fc_submit_btn:     'ප්‍රතිචාරය යොමු කරන්න',
    footer_notice:     'වැදගත් දැනුම්දීම',
    footer_notice_p:   'මෙම පද්ධතිය ප්‍රසිද්ධියේ පවතින දත්ත සහ ප්‍රජා වාර්තා එක්රැස් කරයි. නිල තොරතුරු සඳහා, සෑම විටම CPC, Lanka IOC, හෝ බලශක්ති අමාත්‍යාංශය සමඟ සත්‍යාපනය කරන්න.',
    loading:         'පූරණය වෙමින්…',
    error_generic:   'දෝශයක් ඇතිවිය. නැවත උත්සාහ කරන්න.',
  },

  ta: {
    // --- Navbar ---
    nav_dashboard:   'டாஷ்போர்டு',
    nav_stations:    'நிலையங்கள்',
    nav_gas:         'எல்பிஜி கேஸ்',
    nav_prices:      'விலைகள்',
    nav_eligibility: 'தகுதி',
    nav_report:      'அறிக்கை',
    nav_owner_login: 'உரிமையாளர் உள்நுழைவு',
    nav_admin:       'நிர்வாகி',
    nav_live:        'நேரலை',

    // --- Hero ---
    hero_badge:      'இலங்கை எரிபொருள் சேவை',
    hero_title:      'நேரடி எரிபொருள் &<br/>கேஸ் கண்காணிப்பு',
    hero_subtitle:   'எரிபொருள் கிடைக்கும் தன்மையை சரிபார்க்கவும், தேசிய எரிபொருள் கோட்டா உறுதிப்படுத்தவும், அருகிலுள்ள நிலையங்களை கண்டறியவும்.',
    hero_search_ph:  'நகரம், மாவட்டம் அல்லது வாகன எண் தேடுங்கள்…',
    hero_search_btn: 'தேடு',
    stat_stations:   'நிலையங்கள்',
    stat_available:  'கிடைக்கும்',
    stat_gas_shops:  'கேஸ் கடைகள்',
    stat_last_upd:   'கடைசி புதுப்பிப்பு',

    // --- Overview ---
    overview_title:  'இன்றைய சாரம்சம்',
    overview_upd:    'இப்போது புதுப்பிக்கப்பட்டது',
    card_petrol92:   'பெட்ரோல் 92',
    card_petrol95:   'பெட்ரோல் 95',
    card_diesel:     'டீசல்',
    card_gas:        'திரவ எரிவாயு 12.5kg',
    lkr:             'ரூ.',

    // --- Dashboard Station List ---
    all_stations:    'அனைத்து நிலையங்கள்',
    district_filter: 'அனைத்து மாவட்டங்கள்',
    fuel_filter:     'அனைத்து எரிபொருள் வகைகள்',
    company_filter:  'அனைத்து நிறுவனங்கள்',

    // --- Map ---
    map_title:       'நேரடி நிலைய வரைபடம்',
    map_fuel_btn:    '⛽ எரிபொருள்',
    map_gas_btn:     '🔥 கேஸ்',
    map_all_btn:     '📍 அனைத்தும்',
    map_locate:      '📍 என் இடம்',
    map_legend_avail:'கிடைக்கும்',
    map_legend_lim:  'குறைவு',
    map_legend_out:  'இல்லை',
    map_legend_gas:  'திரவ எரிவாயு',
    map_no_internet: 'வரைபடம் ஏற்றுவதற்கு இணைய இணைப்பு தேவை.',

    // --- Nearest Stations ---
    nearest_title:   '📍 அருகிலுள்ள நிலையம் கண்டறி',
    nearest_gps:     'உங்கள் GPS இடத்தை பயன்படுத்துகிறது',
    nearest_desc:    'அருகிலுள்ள எரிபொருள் நிலையங்கள் மற்றும் கேஸ் கடைகளை கண்டறிய இட அணுகலை அனுமதிக்கவும்.',
    nearest_fuel_btn:'⛽ அருகிலுள்ள எரிபொருள் நிலையம்',
    nearest_gas_btn: '🔥 அருகிலுள்ள கேஸ் கடை',

    // --- Stations Page ---
    page_stations_h1:'எரிபொருள் நிலையங்கள்',
    page_stations_p: 'இலங்கை முழுவதும் உள்ள அனைத்து எரிபொருள் நிலையங்கள்',
    search_ph:       'பெயர், நகரம் அல்லது மாவட்டம் தேடுங்கள்…',
    all_districts:   'அனைத்து மாவட்டங்கள்',
    all_statuses:    'அனைத்து நிலைகள்',
    status_available:'கிடைக்கும்',
    status_limited:  'குறைவாக',
    status_out:      'இல்லை',
    all_companies:   'அனைத்து நிறுவனங்கள்',
    no_stations:     'நிலையங்கள் கிடைக்கவில்லை. வேறு தேடலை முயற்சிக்கவும்.',

    // --- Gas Page ---
    page_gas_h1:     'திரவ எரிவாயு விற்பனையாளர்கள்',
    page_gas_p:      'அருகிலுள்ள Litro Gas மற்றும் LAUGFS கடைகள் கண்டறியுங்கள்',
    all_providers:   'அனைத்து வழங்குனர்கள்',
    all_cylinders:   'அனைத்து சிலிண்டர்கள்',
    gas_dealers_h:   'கேஸ் விற்பனையாளர்கள்',
    no_gas:          'கேஸ் கடைகள் கிடைக்கவில்லை.',

    // --- Prices Page ---
    page_prices_h1:  'எரிபொருள் மற்றும் கேஸ் விலைகள்',
    page_prices_p:   'அரசாங்கத்தால் நிர்ணயிக்கப்பட்ட அதிகாரப்பூர்வ விலைகள்',
    prices_fuel_h:   '⛽ எரிபொருள் விலைகள்',
    prices_gas_h:    '🔥 திரவ எரிவாயு விலைகள்',
    prices_type:     'எரிபொருள் வகை',
    prices_cpc:      'CPC விலை',
    prices_ioc:      'Lanka IOC விலை',
    prices_change:   'மாற்றம்',
    prices_unit:     'ஒரு லிட்டருக்கு',

    // --- Eligibility Page ---
    page_elig_h1:    'எரிபொருள் தகுதி சரிபார்ப்பு',
    page_elig_p:     'இரட்டை/ஒற்றை தகுதி மற்றும் வாராந்திர எரிபொருள் கோட்டா உறுதிப்படுத்துங்கள்',
    elig_enter_plate:'வாகன எண் உள்ளிடுங்கள்',
    elig_plate_ph:   'உதா: CAR-1234 அல்லது ABC-1234',
    elig_check_btn:  'தகுதி சரிபார்',

    // --- Report Page ---
    page_report_h1:  'எரிபொருள் நிலையை அறிக்கையிடுங்கள்',
    page_report_p:   'நிலைய உரிமையாளர்கள் சரிபார்க்கப்பட்ட புதுப்பிப்புகளை சமர்ப்பிக்கின்றனர் · சமூக உறுப்பினர்கள் தாம் காண்பதை அறிக்கையிடுகின்றனர்',
    owner_verified:  '✅ சரிபார்க்கப்பட்ட உரிமையாளர்',
    report_logout:   '🚪 வெளியேறு',
    owner_h3:        '🏪 நீங்கள் நிலைய உரிமையாளரா அல்லது கேஸ் விற்பனையாளரா?',
    owner_desc:      'சரிபார்க்கப்பட்ட நேரடி புதுப்பிப்புகளை சமர்ப்பிக்க உங்கள் நிலைய குறியீடு மற்றும் கடவுச்சொல்லுடன் உள்நுழையுங்கள்.',
    owner_login_btn: '🔑 உரிமையாளர் உள்நுழைவு',
    owner_reg_btn:   '📝 நிலையம் பதிவு',
    recent_reports:  'சமீபத்திய அறிக்கைகள்',

    // --- Status / Queue ---
    queue_none:      'வரிசை இல்லை',
    queue_short:     'குறுகிய வரிசை',
    queue_medium:    'நடுத்தர வரிசை',
    queue_long:      'நீண்ட வரிசை',
    last_updated:    'கடைசி புதுப்பிப்பு',
    directions:      'வழிகாட்டுதல்கள்',
    report_update:   '📋 புதுப்பிப்பு அறிக்கை',

    // --- Footer ---
    footer_providers:  'வழங்குநர்கள்',
    footer_feedback:   'கருத்து மற்றும் தொடர்பு',
    footer_email_prefix: 'மின்னஞ்சல்:',
    fc_name_ph:        'உங்கள் பெயர்',
    fc_email_ph:       'உங்கள் மின்னஞ்சல் (விரும்பினால்)',
    fc_msg_ph:         'உங்கள் கருத்து அல்லது விசாரணை...',
    fc_submit_btn:     'கருத்தைச் சமர்ப்பிக்கவும்',
    footer_notice:     'முக்கிய அறிவிப்பு',
    footer_notice_p:   'இந்த அமைப்பு பொதுவில் கிடைக்கும் தரவு மற்றும் சமூக அறிக்கைகளை ஒருங்கிணைக்கிறது. அதிகாரப்பூர்வ தகவலுக்கு, எப்போதும் CPC, Lanka IOC அல்லது எரிசக்தி அமைச்சகத்துடன் சரிபார்க்கவும்.',
    loading:         'ஏற்றுகிறது…',
    error_generic:   'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
  }
};

// ---- Current language ----
let currentLang = localStorage.getItem('fp_lang') || 'en';

// ---- Get a translation string ----
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['en']       && TRANSLATIONS['en'][key])        ||
         key;
}

// ---- Apply language to all tagged elements ----
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fp_lang', lang);

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Update lang switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Re-render pages so status badges, queue labels, etc. update
  try { filterStations(); }    catch(e) {}
  try { searchStations(); }    catch(e) {}
  try { filterGasShops(); }    catch(e) {}
  try { renderGasPage(); }     catch(e) {}
  try { renderPricesPage(); }  catch(e) {}
  try { buildTicker(); }       catch(e) {}
  try { updateStats(); }       catch(e) {}

  // Update html lang attribute for accessibility
  document.documentElement.lang = lang === 'si' ? 'si' : lang === 'ta' ? 'ta' : 'en';
}

// Expose globally
window.applyLanguage = applyLanguage;
window.t = t;
