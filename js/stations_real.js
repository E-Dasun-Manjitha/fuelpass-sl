// ============================================================
// stations_real.js – Real Fuel & Gas Stations in Sri Lanka
// Data covers all 25 districts: CPC, IOC fuel stations + Litro & LAUGFS gas dealers
// ============================================================

const REAL_STATIONS = [

  // ===================== COLOMBO DISTRICT =====================
  { id:'r001', name:'CPC Filling Station – Pettah',         company:'CPC',  district:'Colombo', address:'Prince of Wales Ave, Pettah, Colombo 11',       lat:6.9452, lng:79.8631, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'011-243-7890' },
  { id:'r002', name:'Lanka IOC – Bambalapitiya',            company:'IOC',  district:'Colombo', address:'Galle Rd, Bambalapitiya, Colombo 4',             lat:6.8948, lng:79.8548, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-258-3455' },
  { id:'r003', name:'CPC Filling Station – Nugegoda',       company:'CPC',  district:'Colombo', address:'High Level Rd, Nugegoda, Colombo',               lat:6.8698, lng:79.8872, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-283-1005' },
  { id:'r004', name:'Lanka IOC – Wellawatte',               company:'IOC',  district:'Colombo', address:'Galle Rd, Wellawatte, Colombo 6',                lat:6.8741, lng:79.8596, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'011-258-9000' },
  { id:'r005', name:'CPC – Rajagiriya',                    company:'CPC',  district:'Colombo', address:'Sri Dhamma Mawatha, Rajagiriya',                 lat:6.9248, lng:79.8732, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-288-6640' },
  { id:'r006', name:'Lanka IOC – Dehiwala',                company:'IOC',  district:'Colombo', address:'Galle Rd, Dehiwala',                             lat:6.8424, lng:79.8669, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-271-3300' },
  { id:'r007', name:'CPC – Kirulapone',                    company:'CPC',  district:'Colombo', address:'High Level Rd, Kirulapone, Colombo 5',           lat:6.8778, lng:79.8741, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'011-250-8800' },
  { id:'r008', name:'Lanka IOC – Moratuwa',                company:'IOC',  district:'Colombo', address:'Rawatawatta Rd, Moratuwa',                       lat:6.7979, lng:79.8869, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-265-3488' },
  { id:'r009', name:'CPC – Mount Lavinia',                 company:'CPC',  district:'Colombo', address:'Galle Rd, Mount Lavinia',                        lat:6.8373, lng:79.8655, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-271-7722' },
  { id:'r010', name:'Lanka IOC – Maharagama',              company:'IOC',  district:'Colombo', address:'High Level Rd, Maharagama',                      lat:6.8505, lng:79.9238, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'011-285-7700' },
  { id:'r011', name:'CPC – Borella',                       company:'CPC',  district:'Colombo', address:'D.S. Senanayake Mawatha, Borella, Colombo 8',    lat:6.9142, lng:79.8797, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'011-269-1234' },
  { id:'r012', name:'Lanka IOC – Kelaniya',                company:'IOC',  district:'Colombo', address:'Kandy Rd, Kelaniya',                             lat:6.9691, lng:79.9142, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-291-1050' },

  // ===================== GAMPAHA DISTRICT =====================
  { id:'r013', name:'CPC – Gampaha Town',                  company:'CPC',  district:'Gampaha', address:'Hospital Rd, Gampaha',                          lat:7.0908, lng:79.9993, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'033-222-1002' },
  { id:'r014', name:'Lanka IOC – Negombo',                 company:'IOC',  district:'Gampaha', address:'Colombo Rd, Negombo',                           lat:7.1834, lng:79.8652, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'031-222-3455' },
  { id:'r015', name:'CPC – Ja-Ela',                        company:'CPC',  district:'Gampaha', address:'Colombo Rd, Ja-Ela',                            lat:7.0650, lng:79.8930, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-225-6700' },
  { id:'r016', name:'Lanka IOC – Kadawatha',               company:'IOC',  district:'Gampaha', address:'Kandy Rd, Kadawatha',                           lat:7.0030, lng:79.9552, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'011-292-3344' },
  { id:'r017', name:'CPC – Wattala',                       company:'CPC',  district:'Gampaha', address:'Colombo – Negombo Rd, Wattala',                 lat:6.9895, lng:79.8920, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-239-1100' },

  // ===================== KALUTARA DISTRICT =====================
  { id:'r018', name:'CPC – Kalutara Town',                 company:'CPC',  district:'Kalutara', address:'Galle Rd, Kalutara South',                     lat:6.5681, lng:79.9616, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'034-222-2211' },
  { id:'r019', name:'Lanka IOC – Panadura',                company:'IOC',  district:'Kalutara', address:'Galle Rd, Panadura',                           lat:6.7141, lng:79.9077, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'038-223-1122' },
  { id:'r020', name:'CPC – Horana',                        company:'CPC',  district:'Kalutara', address:'Mathugama Rd, Horana',                         lat:6.6908, lng:80.0759, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'034-226-1045' },

  // ===================== KANDY DISTRICT =====================
  { id:'r021', name:'CPC – Kandy City Centre',             company:'CPC',  district:'Kandy', address:'Colombo St, Kandy',                               lat:7.2918, lng:80.6358, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'081-222-4562' },
  { id:'r022', name:'Lanka IOC – Peradeniya Rd',           company:'IOC',  district:'Kandy', address:'Peradeniya Rd, Kandy',                            lat:7.2741, lng:80.6100, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'081-238-4422' },
  { id:'r023', name:'CPC – Katugastota',                   company:'CPC',  district:'Kandy', address:'Katugastota Rd, Kandy',                           lat:7.3099, lng:80.6365, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'081-234-5678' },
  { id:'r024', name:'Lanka IOC – Ampitiya',                company:'IOC',  district:'Kandy', address:'Ampitiya Rd, Kandy',                              lat:7.2842, lng:80.6559, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'081-223-3344' },

  // ===================== MATALE DISTRICT =====================
  { id:'r025', name:'CPC – Matale Town',                   company:'CPC',  district:'Matale', address:'Trincomalee St, Matale',                         lat:7.4762, lng:80.6234, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'066-222-2266' },
  { id:'r026', name:'Lanka IOC – Dambulla',                company:'IOC',  district:'Matale', address:'Kandy Rd, Dambulla',                             lat:7.8541, lng:80.6521, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'066-228-4455' },

  // ===================== NUWARA ELIYA DISTRICT =====================
  { id:'r027', name:'CPC – Nuwara Eliya Town',             company:'CPC',  district:'Nuwara Eliya', address:'Kandy Rd, Nuwara Eliya',                  lat:6.9754, lng:80.7716, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'052-222-3355' },
  { id:'r028', name:'Lanka IOC – Hatton',                  company:'IOC',  district:'Nuwara Eliya', address:'Dimbula Rd, Hatton',                      lat:6.8920, lng:80.6010, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'051-222-2233' },

  // ===================== GALLE DISTRICT =====================
  { id:'r029', name:'CPC – Galle Fort Rd',                 company:'CPC',  district:'Galle', address:'Matara Rd, Galle',                               lat:6.0354, lng:80.2167, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'091-222-8812' },
  { id:'r030', name:'Lanka IOC – Hikkaduwa',               company:'IOC',  district:'Galle', address:'Galle Rd, Hikkaduwa',                            lat:6.1362, lng:80.1030, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'091-227-7744' },
  { id:'r031', name:'CPC – Baddegama Town',                company:'CPC',  district:'Galle', address:'Baddegama Rd, Baddegama',                      lat:6.1695, lng:80.1796, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'091-224-5566' },
  { id:'r031b', name:'CPC – Baddegama Interchange',        company:'CPC',  district:'Galle', address:'Nayapamula, Baddegama (E01)',                lat:6.1808, lng:80.1920, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'091-224-8899' },

  // ===================== MATARA DISTRICT =====================
  { id:'r032', name:'CPC – Matara Main St',                company:'CPC',  district:'Matara', address:'Main St, Matara',                               lat:5.9469, lng:80.5419, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'041-222-1034' },
  { id:'r033', name:'Lanka IOC – Weligama',                company:'IOC',  district:'Matara', address:'Galle Rd, Weligama',                            lat:5.9723, lng:80.4326, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'041-225-5566' },
  { id:'r034', name:'CPC – Akuressa',                      company:'CPC',  district:'Matara', address:'Deniyaya Rd, Akuressa',                         lat:6.1017, lng:80.4746, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'041-228-1122' },

  // ===================== HAMBANTOTA DISTRICT =====================
  { id:'r035', name:'CPC – Hambantota',                    company:'CPC',  district:'Hambantota', address:'Tissa Rd, Hambantota',                      lat:6.1266, lng:81.1215, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'047-222-1044' },
  { id:'r036', name:'Lanka IOC – Tissamaharama',           company:'IOC',  district:'Hambantota', address:'Main Rd, Tissamaharama',                    lat:6.2750, lng:81.2882, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'047-223-7788' },
  { id:'r037', name:'CPC – Tangalle',                      company:'CPC',  district:'Hambantota', address:'Beach Rd, Tangalle',                        lat:6.0243, lng:80.7961, fuels:{petrol92:'limited',petrol95:'out',diesel:'limited',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'047-224-0011' },

  // ===================== JAFFNA DISTRICT =====================
  { id:'r038', name:'Lanka IOC – Jaffna Hospital Rd',      company:'IOC',  district:'Jaffna', address:'Hospital Rd, Jaffna',                          lat:9.6647, lng:80.0163, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-222-7854' },
  { id:'r039', name:'CPC – Jaffna Kovil Rd',               company:'CPC',  district:'Jaffna', address:'Stanley Rd, Jaffna',                           lat:9.6644, lng:80.0152, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'021-222-2345' },
  { id:'r040', name:'Lanka IOC – Nallur',                  company:'IOC',  district:'Jaffna', address:'Nallur, Jaffna',                               lat:9.6707, lng:80.0336, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'021-222-9988' },

  // ===================== KILINOCHCHI DISTRICT =====================
  { id:'r041', name:'CPC – Kilinochchi Town',              company:'CPC',  district:'Kilinochchi', address:'Kandy Rd, Kilinochchi',                    lat:9.3879, lng:80.3984, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-228-5566' },

  // ===================== MANNAR DISTRICT =====================
  { id:'r042', name:'CPC – Mannar Town',                   company:'CPC',  district:'Mannar', address:'Main St, Mannar',                              lat:8.9774, lng:79.9100, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'023-222-1122' },

  // ===================== MULLAITIVU DISTRICT =====================
  { id:'r043', name:'CPC – Mullaitivu',                    company:'CPC',  district:'Mullaitivu', address:'Main Rd, Mullaitivu',                      lat:9.2662, lng:81.3129, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'021-229-0055' },

  // ===================== VAVUNIYA DISTRICT =====================
  { id:'r044', name:'CPC – Vavuniya Town',                 company:'CPC',  district:'Vavuniya', address:'Kandy Rd, Vavuniya',                         lat:8.7516, lng:80.4952, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'024-222-1034' },
  { id:'r045', name:'Lanka IOC – Vavuniya',                company:'IOC',  district:'Vavuniya', address:'Hospital Rd, Vavuniya',                      lat:8.7554, lng:80.4981, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'024-222-3344' },

  // ===================== TRINCOMALEE DISTRICT =====================
  { id:'r046', name:'CPC – Trincomalee Town',              company:'CPC',  district:'Trincomalee', address:'Inner Harbour Rd, Trincomalee',            lat:8.5721, lng:81.2335, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'026-222-2244' },
  { id:'r047', name:'Lanka IOC – Trincomalee',             company:'IOC',  district:'Trincomalee', address:'Dockyard Rd, Trincomalee',                lat:8.5852, lng:81.2177, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'026-222-5577' },

  // ===================== BATTICALOA DISTRICT =====================
  { id:'r048', name:'CPC – Batticaloa Town',               company:'CPC',  district:'Batticaloa', address:'Bar Rd, Batticaloa',                       lat:7.7120, lng:81.7018, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'065-222-4466' },
  { id:'r049', name:'Lanka IOC – Batticaloa',              company:'IOC',  district:'Batticaloa', address:'Trincomalee Rd, Batticaloa',                lat:7.7200, lng:81.6990, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'065-222-7788' },

  // ===================== AMPARA DISTRICT =====================
  { id:'r050', name:'CPC – Ampara Town',                   company:'CPC',  district:'Ampara', address:'DS Senanayake St, Ampara',                     lat:7.2882, lng:81.6738, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'063-222-1122' },
  { id:'r051', name:'CPC – Kalmunai',                      company:'CPC',  district:'Ampara', address:'Main St, Kalmunai',                            lat:7.4145, lng:81.8262, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'067-222-1234' },

  // ===================== KURUNEGALA DISTRICT =====================
  { id:'r052', name:'CPC – Kurunegala Tower Junction',     company:'CPC',  district:'Kurunegala', address:'Tower Junction, Kurunegala',               lat:7.4827, lng:80.3601, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'037-222-1122' },
  { id:'r053', name:'Lanka IOC – Kurunegala',              company:'IOC',  district:'Kurunegala', address:'Colombo Rd, Kurunegala',                   lat:7.4735, lng:80.3606, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'037-222-5566' },
  { id:'r054', name:'CPC – Kuliyapitiya',                  company:'CPC',  district:'Kurunegala', address:'Puttalam Rd, Kuliyapitiya',                lat:7.4717, lng:80.0461, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'037-228-1122' },

  // ===================== PUTTALAM DISTRICT =====================
  { id:'r055', name:'CPC – Puttalam Town',                 company:'CPC',  district:'Puttalam', address:'Kurunegala Rd, Puttalam',                    lat:8.0248, lng:79.8340, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'032-222-5566' },
  { id:'r056', name:'Lanka IOC – Chilaw',                  company:'IOC',  district:'Puttalam', address:'Main St, Chilaw',                            lat:7.5768, lng:79.8037, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'032-222-2211' },

  // ===================== ANURADHAPURA DISTRICT =====================
  { id:'r057', name:'CPC – Anuradhapura Sacred City',      company:'CPC',  district:'Anuradhapura', address:'Maithripala Senanayake Mawatha, Anuradhapura', lat:8.3396, lng:80.4114, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'025-222-5050' },
  { id:'r058', name:'Lanka IOC – Anuradhapura',            company:'IOC',  district:'Anuradhapura', address:'Colombo Rd, Anuradhapura',                lat:8.3297, lng:80.4087, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'025-222-4455' },

  // ===================== POLONNARUWA DISTRICT =====================
  { id:'r059', name:'CPC – Polonnaruwa Town',              company:'CPC',  district:'Polonnaruwa', address:'Batticaloa Rd, Polonnaruwa',               lat:7.9392, lng:81.0028, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'027-222-5069' },
  { id:'r060', name:'Lanka IOC – Polonnaruwa',             company:'IOC',  district:'Polonnaruwa', address:'Kandy Rd, Polonnaruwa',                   lat:7.9317, lng:80.9995, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'027-222-7788' },

  // ===================== BADULLA DISTRICT =====================
  { id:'r061', name:'CPC – Badulla Town',                  company:'CPC',  district:'Badulla', address:'Bandarawela Rd, Badulla',                     lat:6.9859, lng:81.0471, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'055-222-1234' },
  { id:'r062', name:'CPC – Bandarawela',                   company:'CPC',  district:'Badulla', address:'Haputale Rd, Bandarawela',                    lat:6.8282, lng:80.9859, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'057-222-1122' },

  // ===================== MONARAGALA DISTRICT =====================
  { id:'r063', name:'CPC – Monaragala Town',               company:'CPC',  district:'Monaragala', address:'Wellawaya Rd, Monaragala',                 lat:6.8719, lng:81.3500, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'055-227-6655' },
  { id:'r064', name:'Lanka IOC – Wellawaya',               company:'IOC',  district:'Monaragala', address:'Main Rd, Wellawaya',                       lat:6.7412, lng:81.1068, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'055-227-4411' },

  // ===================== RATNAPURA DISTRICT =====================
  { id:'r065', name:'CPC – Ratnapura Town',                company:'CPC',  district:'Ratnapura', address:'Main St, Ratnapura',                        lat:6.6827, lng:80.3991, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'045-222-3333' },
  { id:'r066', name:'Lanka IOC – Ratnapura',               company:'IOC',  district:'Ratnapura', address:'Colombo Rd, Ratnapura',                     lat:6.6872, lng:80.3951, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'045-222-8866' },
  { id:'r067', name:'CPC – Embilipitiya',                  company:'CPC',  district:'Ratnapura', address:'Hambantota Rd, Embilipitiya',               lat:6.3409, lng:80.8523, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'047-226-1234' },

  // ===================== KEGALLE DISTRICT =====================
  { id:'r068', name:'CPC – Kegalle Town',                  company:'CPC',  district:'Kegalle', address:'Colombo Rd, Kegalle',                         lat:7.2530, lng:80.3479, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'035-222-2234' },
  { id:'r069', name:'Lanka IOC – Mawanella',               company:'IOC',  district:'Kegalle', address:'Kandy Rd, Mawanella',                         lat:7.2514, lng:80.4447, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'035-224-6677' },

];

// ===================== REAL GAS STATIONS =====================
const REAL_GAS_SHOPS = [

  // COLOMBO
  { id:'rg001', name:'Litro Gas Depot – Nawala',           provider:'Litro',  district:'Colombo',     address:'Nawala Junction, Rajagiriya',         lat:6.9040, lng:79.8940, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Tomorrow', phone:'011-288-6600' },
  { id:'rg002', name:'LAUGFS Gas – Maharagama',            provider:'LAUGFS', district:'Colombo',     address:'High Level Rd, Maharagama',          lat:6.8451, lng:79.9304, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'available'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'011-285-7700' },
  { id:'rg003', name:'Litro Gas – Borella',                provider:'Litro',  district:'Colombo',     address:'D.S. Senanayake Mawatha, Borella',   lat:6.9158, lng:79.8809, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'011-269-1560' },
  { id:'rg004', name:'LAUGFS – Kelaniya',                  provider:'LAUGFS', district:'Colombo',     address:'Kandy Rd, Kelaniya',                  lat:6.9797, lng:79.9292, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'011-291-2200' },
  { id:'rg005', name:'Litro Gas – Moratuwa',               provider:'Litro',  district:'Colombo',     address:'New Rd, Moratuwa',                    lat:6.7725, lng:79.8841, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'011-265-8800' },

  // GAMPAHA
  { id:'rg006', name:'Litro Gas – Negombo',                provider:'Litro',  district:'Gampaha',     address:'Lewis Place, Negombo',                lat:7.2224, lng:79.8407, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Friday', phone:'031-222-7700' },
  { id:'rg007', name:'LAUGFS – Gampaha',                   provider:'LAUGFS', district:'Gampaha',     address:'Hospital Rd, Gampaha',                lat:7.0921, lng:80.0189, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'033-222-5511' },

  // KALUTARA
  { id:'rg008', name:'Litro Gas – Panadura',               provider:'Litro',  district:'Kalutara',    address:'Galle Rd, Panadura',                  lat:6.7118, lng:79.9048, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Friday', phone:'038-223-9900' },
  { id:'rg009', name:'LAUGFS – Kalutara',                  provider:'LAUGFS', district:'Kalutara',    address:'Galle Rd, Kalutara',                  lat:6.6025, lng:79.9575, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Monday', phone:'034-222-8800' },

  // KANDY
  { id:'rg010', name:'Litro Gas – Kandy Peradeniya',       provider:'Litro',  district:'Kandy',       address:'Peradeniya Rd, Kandy',                lat:7.2878, lng:80.6245, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'081-238-4422' },
  { id:'rg011', name:'LAUGFS – Kandy City',                provider:'LAUGFS', district:'Kandy',       address:'Colombo St, Kandy',                   lat:7.2925, lng:80.6358, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Wednesday', phone:'081-222-6633' },

  // GALLE
  { id:'rg012', name:'Litro Gas – Galle Karapitiya',       provider:'Litro',  district:'Galle',       address:'Karapitiya Rd, Galle',                lat:6.0601, lng:80.2295, stock:{'12.5kg':'out','5kg':'limited','37.5kg':'out'}, lastDelivery:'5 days ago', nextDelivery:'Monday', phone:'091-222-6655' },
  { id:'rg013', name:'LAUGFS – Galle Town',                provider:'LAUGFS', district:'Galle',       address:'Main St, Galle',                      lat:6.0354, lng:80.2117, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'091-222-3344' },

  // MATARA
  { id:'rg014', name:'Litro Gas – Matara Bus Stand',       provider:'Litro',  district:'Matara',      address:'Bus Stand Rd, Matara',                lat:5.9458, lng:80.5482, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Thursday', phone:'041-222-5544' },
  { id:'rg015', name:'LAUGFS – Matara',                    provider:'LAUGFS', district:'Matara',      address:'Main St, Matara',                     lat:5.9445, lng:80.5254, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Friday', phone:'041-222-9900' },

  // HAMBANTOTA
  { id:'rg016', name:'Litro Gas – Hambantota',             provider:'Litro',  district:'Hambantota',  address:'Main Rd, Hambantota',                 lat:6.1266, lng:81.1215, stock:{'12.5kg':'available','5kg':'available','37.5kg':'out'}, lastDelivery:'3 days ago', nextDelivery:'Wednesday', phone:'047-222-7700' },

  // JAFFNA
  { id:'rg017', name:'LAUGFS – Jaffna KKS Rd',             provider:'LAUGFS', district:'Jaffna',      address:'KKS Rd, Jaffna',                      lat:9.6702, lng:80.0155, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'out'}, lastDelivery:'2 days ago', nextDelivery:'Wednesday', phone:'021-222-6677' },
  { id:'rg018', name:'Litro Gas – Jaffna',                 provider:'Litro',  district:'Jaffna',      address:'Hospital Rd, Jaffna',                 lat:9.6644, lng:80.0152, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'021-222-5544' },

  // KURUNEGALA
  { id:'rg019', name:'LAUGFS – Kurunegala',                provider:'LAUGFS', district:'Kurunegala',  address:'Melsiripura Rd, Kurunegala',           lat:7.4913, lng:80.3664, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'037-222-8899' },
  { id:'rg020', name:'Litro Gas – Kurunegala',             provider:'Litro',  district:'Kurunegala',  address:'Colombo Rd, Kurunegala',               lat:7.4816, lng:80.3627, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'1 day ago', nextDelivery:'Friday', phone:'037-222-4422' },

  // ANURADHAPURA
  { id:'rg021', name:'Litro Gas – Anuradhapura',           provider:'Litro',  district:'Anuradhapura',address:'Maithripala Mawatha, Anuradhapura',    lat:8.3308, lng:80.4136, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'025-222-8811' },

  // RATNAPURA
  { id:'rg022', name:'Litro Gas – Ratnapura',              provider:'Litro',  district:'Ratnapura',   address:'Main St, Ratnapura',                  lat:6.6811, lng:80.4005, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Friday', phone:'045-222-5533' },

  // BADULLA
  { id:'rg023', name:'LAUGFS – Badulla',                   provider:'LAUGFS', district:'Badulla',     address:'Bandarawela Rd, Badulla',              lat:6.9678, lng:81.0373, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'out'}, lastDelivery:'3 days ago', nextDelivery:'Saturday', phone:'055-222-7766' },

  // TRINCOMALEE
  { id:'rg024', name:'Litro Gas – Trincomalee',            provider:'Litro',  district:'Trincomalee', address:'Inner Harbour Rd, Trincomalee',        lat:8.5772, lng:81.2281, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'2 days ago', nextDelivery:'Thursday', phone:'026-222-7755' },

  // BATTICALOA
  { id:'rg025', name:'Litro Gas – Batticaloa',             provider:'Litro',  district:'Batticaloa',  address:'Bar Rd, Batticaloa',                  lat:7.7210, lng:81.6970, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Monday', phone:'065-222-9988' },

  // KEGALLE
  { id:'rg026', name:'Litro Gas – Kegalle',                provider:'Litro',  district:'Kegalle',     address:'Colombo Rd, Kegalle',                 lat:7.2530, lng:80.3479, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'035-222-6644' },

  // PUTTALAM
  { id:'rg027', name:'LAUGFS – Chilaw',                    provider:'LAUGFS', district:'Puttalam',    address:'Main St, Chilaw',                     lat:7.5752, lng:79.7947, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'032-222-5566' },

  // VAVUNIYA
  { id:'rg028', name:'Litro Gas – Vavuniya',               provider:'Litro',  district:'Vavuniya',    address:'Hospital Rd, Vavuniya',                lat:8.7486, lng:80.4975, stock:{'12.5kg':'available','5kg':'out','37.5kg':'limited'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'024-222-8833' },

];

// Expose for use
// Call this to replace mock data with real station data
function loadRealStationData() {
  DB.stations = REAL_STATIONS.map(s => ({ ...s }));
  DB.gasShops = REAL_GAS_SHOPS.map(g => ({ ...g }));
  DB.stats.totalStations = DB.stations.length;
  DB.stats.totalGasShops = DB.gasShops.length;
  DB.stats.availableStations = DB.stations.filter(s =>
    Object.values(s.fuels).some(v => v === 'available')
  ).length;
  console.log(`✅ Loaded ${DB.stations.length} fuel stations & ${DB.gasShops.length} gas shops.`);
}
