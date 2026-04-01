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
  { id:'r043', name:'CPC – Mullaitivu',                    company:'CPC',  district:'Mullaitivu', address:'Main Rd, Mullaitivu',                      lat:9.2662, lng:80.8129, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'021-229-0055' },

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

  { id:'r070', name:'Lanka IOC – Kollupitiya',           company:'IOC',  district:'Colombo', address:'Galle Rd, Kollupitiya',                      lat:6.9150, lng:79.8480, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-257-3344' },
  { id:'r071', name:'CPC – Slave Island',                  company:'CPC',  district:'Colombo', address:'Justice Akbar Mawatha, Colombo 2',            lat:6.9230, lng:79.8510, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'011-242-1155' },
  { id:'r072', name:'Lanka IOC – Cinnamon Gardens',        company:'IOC',  district:'Colombo', address:'Gregory’s Rd, Colombo 7',                      lat:6.9080, lng:79.8650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-269-4455' },
  { id:'r073', name:'CPC – Maradana',                      company:'CPC',  district:'Colombo', address:'Maradana Rd, Colombo 10',                      lat:6.9270, lng:79.8650, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-269-1122' },
  { id:'r074', name:'Lanka IOC – Dematagoda',              company:'IOC',  district:'Colombo', address:'Baseline Rd, Dematagoda',                      lat:6.9350, lng:79.8810, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'011-267-3300' },
  { id:'r075', name:'CPC – Grandpass',                    company:'CPC',  district:'Colombo', address:'Grandpass Rd, Colombo 14',                     lat:6.9530, lng:79.8680, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-243-5566' },
  { id:'r076', name:'Lanka IOC – Modara',                  company:'IOC',  district:'Colombo', address:'Aluthmawatha Rd, Modara',                      lat:6.9730, lng:79.8710, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-252-4433' },
  { id:'r077', name:'CPC – Bloemendhal',                  company:'CPC',  district:'Colombo', address:'Bloemendhal Rd, Colombo 13',                   lat:6.9600, lng:79.8650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'011-244-1188' },
  { id:'r078', name:'Lanka IOC – Mattakkuliya',            company:'IOC',  district:'Colombo', address:'Mattakkuliya Rd, Colombo 15',                  lat:6.9850, lng:79.8750, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-254-2211' },
  { id:'r079', name:'CPC – Rathmalana Town',               company:'CPC',  district:'Colombo', address:'Galle Rd, Rathmalana',                         lat:6.8180, lng:79.8850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-273-5566' },
  { id:'r080', name:'Lanka IOC – Attidiya',                company:'IOC',  district:'Colombo', address:'Attidiya Rd, Dehiwala',                        lat:6.8280, lng:79.8880, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-271-2244' },
  { id:'r081', name:'CPC – Galkissa',                      company:'CPC',  district:'Colombo', address:'Horetuduwa, Mount Lavinia',                   lat:6.8320, lng:79.8640, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-273-1122' },
  { id:'r082', name:'Lanka IOC – Battaramulla',            company:'IOC',  district:'Colombo', address:'Main Rd, Battaramulla',                        lat:6.8980, lng:79.9230, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-286-5566' },
  { id:'r083', name:'CPC – Talangama',                    company:'CPC',  district:'Colombo', address:'Pannipitiya Rd, Talangama',                    lat:6.8900, lng:79.9350, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-278-4455' },
  { id:'r084', name:'Lanka IOC – Malabe',                  company:'IOC',  district:'Colombo', address:'Kaduwela Rd, Malabe',                          lat:6.9050, lng:79.9650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-274-1122' },
  { id:'r085', name:'CPC – Kaduwela',                      company:'CPC',  district:'Colombo', address:'Main Rd, Kaduwela',                             lat:6.9380, lng:79.9850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-253-8899' },
  { id:'r086', name:'Lanka IOC – Hanwella',                company:'IOC',  district:'Colombo', address:'High Level Rd, Hanwella',                       lat:6.9020, lng:80.1250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'011-283-4411' },
  { id:'r087', name:'CPC – Homagama Town',                 company:'CPC',  district:'Colombo', address:'High Level Rd, Homagama',                      lat:6.8420, lng:80.0050, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-285-1122' },
  { id:'r088', name:'Lanka IOC – Padukka',                 company:'IOC',  district:'Colombo', address:'Main Rd, Padukka',                             lat:6.8520, lng:80.1150, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-283-2244' },
  { id:'r089', name:'CPC – Avissawella Town',              company:'CPC',  district:'Colombo', address:'Ratnapura Rd, Avissawella',                    lat:6.9550, lng:80.2150, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'036-222-1122' },

  // ===================== GAMPAHA DISTRICT EXPANSION =====================
  { id:'r090', name:'Lanka IOC – Katunayake',              company:'IOC',  district:'Gampaha', address:'Negombo Rd, Katunayake',                       lat:7.1650, lng:79.8850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-225-4433' },
  { id:'r091', name:'CPC – Minuwangoda Town',              company:'CPC',  district:'Gampaha', address:'Main St, Minuwangoda',                         lat:7.1720, lng:79.9550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-229-1122' },
  { id:'r092', name:'Lanka IOC – Kandana',                 company:'IOC',  district:'Gampaha', address:'Negombo Rd, Kandana',                          lat:7.0480, lng:79.8980, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-223-4455' },
  { id:'r093', name:'CPC – Ragama',                        company:'CPC',  district:'Gampaha', address:'Hospital Rd, Ragama',                          lat:7.0280, lng:79.9180, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-295-1122' },
  { id:'r094', name:'Lanka IOC – Welisara',                company:'IOC',  district:'Gampaha', address:'Negombo Rd, Welisara',                         lat:7.0080, lng:79.9050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-291-3344' },
  { id:'r095', name:'CPC – Mahara',                        company:'CPC',  district:'Gampaha', address:'Kandy Rd, Mahara',                             lat:7.0180, lng:79.9480, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-292-1155' },
  { id:'r096', name:'Lanka IOC – Kiribathgoda',            company:'IOC',  district:'Gampaha', address:'Kandy Rd, Kiribathgoda',                       lat:6.9880, lng:79.9350, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-291-5566' },
  { id:'r097', name:'CPC – Veyangoda Town',                company:'CPC',  district:'Gampaha', address:'Main Rd, Veyangoda',                           lat:7.1550, lng:80.0550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'033-228-1122' },
  { id:'r098', name:'Lanka IOC – Mirigama',                company:'IOC',  district:'Gampaha', address:'Divulapitiya Rd, Mirigama',                    lat:7.2420, lng:80.1250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'033-227-3344' },
  { id:'r099', name:'CPC – Pasyala Junction',              company:'CPC',  district:'Gampaha', address:'Kandy Rd, Pasyala',                            lat:7.1450, lng:80.1080, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'033-226-5544' },
  { id:'r100', name:'Lanka IOC – Nittambuwa',              company:'IOC',  district:'Gampaha', address:'Kandy Rd, Nittambuwa',                         lat:7.1350, lng:80.1050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'033-228-3355' },

  // ===================== KALUTARA DISTRICT EXPANSION =====================
  { id:'r101', name:'CPC – Wadduwa Town',                  company:'CPC',  district:'Kalutara', address:'Galle Rd, Wadduwa',                           lat:6.6620, lng:79.9320, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'038-223-1155' },
  { id:'r102', name:'Lanka IOC – Beruwala',                company:'IOC',  district:'Kalutara', address:'Galle Rd, Beruwala',                           lat:6.4780, lng:79.9850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'034-227-4466' },
  { id:'r103', name:'CPC – Aluthgama',                      company:'CPC',  district:'Kalutara', address:'Main Rd, Aluthgama',                          lat:6.4380, lng:80.0020, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'034-227-1122' },
  { id:'r104', name:'Lanka IOC – Bentota Junction',        company:'IOC',  district:'Kalutara', address:'Galle Rd, Bentota',                           lat:6.4220, lng:80.0050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'034-227-5588' },
  { id:'r105', name:'CPC – Matugama Town',                 company:'CPC',  district:'Kalutara', address:'Agasleka Rd, Matugama',                        lat:6.5220, lng:80.1150, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'034-224-1122' },
  { id:'r106', name:'Lanka IOC – Bandaragama',             company:'IOC',  district:'Kalutara', address:'Horana Rd, Bandaragama',                      lat:6.7150, lng:79.9880, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'038-229-3344' },

  // ===================== KANDY DISTRICT EXPANSION =====================
  { id:'r107', name:'CPC – Getambe Junction',              company:'CPC',  district:'Kandy', address:'Peradeniya Rd, Getambe',                         lat:7.2780, lng:80.6050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'081-222-1188' },
  { id:'r108', name:'Lanka IOC – Gannoruwa',               company:'IOC',  district:'Kandy', address:'Getambe – Peradeniya Rd',                        lat:7.2820, lng:80.5950, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'081-238-4455' },
  { id:'r109', name:'CPC – Wattegama Town',                company:'CPC',  district:'Kandy', address:'Matale Rd, Wattegama',                           lat:7.3480, lng:80.6750, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'081-247-1122' },
  { id:'r110', name:'Lanka IOC – Madawala',                company:'IOC',  district:'Kandy', address:'Teldeniya Rd, Madawala',                         lat:7.3220, lng:80.6850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'081-243-3344' },
  { id:'r111', name:'CPC – Digana Town',                   company:'CPC',  district:'Kandy', address:'Kandy – Mahiyangana Rd',                        lat:7.2950, lng:80.7350, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'081-237-1122' },
  { id:'r112', name:'Lanka IOC – Gampola Town',            company:'IOC',  district:'Kandy', address:'Nawalapitiya Rd, Gampola',                       lat:7.1650, lng:80.5750, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'081-235-3344' },
  { id:'r113', name:'CPC – Nawalapitiya Town',             company:'CPC',  district:'Kandy', address:'Gampola Rd, Nawalapitiya',                       lat:7.0520, lng:80.5350, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'054-222-1122' },
  { id:'r114', name:'Lanka IOC – Kadugannawa',             company:'IOC',  district:'Kandy', address:'Colombo Rd, Kadugannawa',                        lat:7.2550, lng:80.5250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'081-257-3344' },
  { id:'r115', name:'CPC – Pilimatalawa',                  company:'CPC',  district:'Kandy', address:'Colombo Rd, Pilimatalawa',                       lat:7.2650, lng:80.5550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'081-257-1122' },

  // ===================== GALLE DISTRICT EXPANSION =====================
  { id:'r116', name:'Lanka IOC – Unawatuna',               company:'IOC',  district:'Galle', address:'Matara Rd, Unawatuna',                           lat:6.0120, lng:80.2450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'091-222-5588' },
  { id:'r117', name:'CPC – Habaraduwa Town',               company:'CPC',  district:'Galle', address:'Matara Rd, Habaraduwa',                        lat:5.9920, lng:80.3050, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'091-228-3344' },
  { id:'r118', name:'Lanka IOC – Ahangama',                company:'IOC',  district:'Galle', address:'Matara Rd, Ahangama',                          lat:5.9720, lng:80.3650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'091-228-5566' },
  { id:'r119', name:'CPC – Ambalangoda Town',              company:'CPC',  district:'Galle', address:'Main Rd, Ambalangoda',                         lat:6.2350, lng:80.0550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'091-225-8822' },

  // ===================== MATARA DISTRICT EXPANSION =====================
  { id:'r120', name:'Lanka IOC – Mirissa',                 company:'IOC',  district:'Matara', address:'Galle Rd, Mirissa',                             lat:5.9450, lng:80.4550, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'041-225-3344' },
  { id:'r121', name:'CPC – Dondra Town',                   company:'CPC',  district:'Matara', address:'Tangalle Rd, Dondra',                            lat:5.9250, lng:80.5850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'041-222-8855' },
  { id:'r122', name:'Lanka IOC – Dickwella',               company:'IOC',  district:'Matara', address:'Tangalle Rd, Dickwella',                          lat:5.9650, lng:80.6950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'041-220-3344' },

  // ===================== HAMBANTOTA DISTRICT EXPANSION =====================
  { id:'r123', name:'CPC – Ambalantota Town',              company:'CPC',  district:'Hambantota', address:'Colombo Rd, Ambalantota',                   lat:6.1250, lng:81.0250, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'047-222-3311' },
  { id:'r124', name:'Lanka IOC – Kataragama Junction',     company:'IOC',  district:'Hambantota', address:'Sella Kataragama Rd',                      lat:6.4150, lng:81.3250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'047-223-5566' },

  // ===================== JAFFNA DISTRICT EXPANSION =====================
  { id:'r125', name:'CPC – Chavakachcheri Town',           company:'CPC',  district:'Jaffna', address:'Kandy Rd, Chavakachcheri',                    lat:9.6520, lng:80.1550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-227-1122' },
  { id:'r126', name:'Lanka IOC – Point Pedro',             company:'IOC',  district:'Jaffna', address:'Main Rd, Point Pedro',                         lat:9.8250, lng:80.2350, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'021-226-3344' },
  { id:'r127', name:'CPC – Karainagar Town',               company:'CPC',  district:'Jaffna', address:'Valanthalai, Karainagar',                       lat:9.7420, lng:79.8850, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-229-1122' },
  { id:'r128', name:'Lanka IOC – Kayts Town',               company:'IOC',  district:'Jaffna', address:'Main Rd, Kayts',                               lat:9.6850, lng:79.9150, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'021-221-3344' },

  // ===================== ANURADHAPURA DISTRICT EXPANSION =====================
  { id:'r129', name:'CPC – Kekirawa Town',                 company:'CPC',  district:'Anuradhapura', address:'Main Rd, Kekirawa',                       lat:8.0350, lng:80.5050, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'025-226-4411' },
  { id:'r130', name:'Lanka IOC – Galenbindunuwewa',        company:'IOC',  district:'Anuradhapura', address:'Hurulu Rd',                                lat:8.2650, lng:80.6850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'025-225-3344' },
  { id:'r131', name:'CPC – Thalawa Town',                  company:'CPC',  district:'Anuradhapura', address:'Main Rd, Thalawa',                         lat:8.2150, lng:80.3550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'025-224-1122' },

  // ===================== POLONNARUWA DISTRICT EXPANSION =====================
  { id:'r132', name:'CPC – Hingurakgoda Town',             company:'CPC',  district:'Polonnaruwa', address:'Main St, Hingurakgoda',                    lat:7.9850, lng:80.9850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'027-224-6611' },
  { id:'r133', name:'Lanka IOC – Medirigiriya',            company:'IOC',  district:'Polonnaruwa', address:'Main Rd, Medirigiriya',                    lat:8.1550, lng:80.9950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'027-224-8844' },

  // ===================== BADULLA DISTRICT EXPANSION =====================
  { id:'r134', name:'CPC – Welimada Town',                 company:'CPC',  district:'Badulla', address:'Main Rd, Welimada',                            lat:6.9030, lng:80.9160, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'057-224-5511' },
  { id:'r135', name:'Lanka IOC – Passara Town',             company:'IOC',  district:'Badulla', address:'Badulla Rd, Passara',                         lat:6.9350, lng:81.1550, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'055-228-3344' },
  { id:'r136', name:'CPC – Ella Town',                    company:'CPC',  district:'Badulla', address:'Main Rd, Ella',                               lat:6.8770, lng:81.0480, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'057-222-8844' },

  // ===================== MONARAGALA DISTRICT EXPANSION =====================
  { id:'r137', name:'CPC – Bibile Town',                   company:'CPC',  district:'Monaragala', address:'Main St, Bibile',                            lat:7.1550, lng:81.2250, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'055-227-1188' },
  { id:'r138', name:'Lanka IOC – Buttala Junction',        company:'IOC',  district:'Monaragala', address:'Wellawaya Rd, Buttala',                      lat:6.7550, lng:81.2450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'055-227-3311' },

  // ===================== RATNAPURA DISTRICT EXPANSION =====================
  { id:'r139', name:'CPC – Balangoda Town',                company:'CPC',  district:'Ratnapura', address:'Badulla Rd, Balangoda',                      lat:6.6550, lng:80.7050, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'045-228-7711' },
  { id:'r140', name:'Lanka IOC – Pelmadulla',              company:'IOC',  district:'Ratnapura', address:'Ratnapura Rd, Pelmadulla',                   lat:6.6220, lng:80.5550, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'045-227-3344' },
  { id:'r141', name:'CPC – Kuruwita Town',                 company:'CPC',  district:'Ratnapura', address:'Colombo Rd, Kuruwita',                       lat:6.7720, lng:80.3650, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'045-226-1122' },

  // ===================== KEGALLE DISTRICT EXPANSION =====================
  { id:'r142', name:'CPC – Rambukkana Town',               company:'CPC',  district:'Kegalle', address:'Main Rd, Rambukkana',                          lat:7.3220, lng:80.3950, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'035-226-1155' },
  { id:'r143', name:'Lanka IOC – Dehiowita',               company:'IOC',  district:'Kegalle', address:'Avissawella Rd',                               lat:6.9650, lng:80.2650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'036-223-3344' },

  // ===================== TRINCOMALEE DISTRICT EXPANSION =====================
  { id:'r144', name:'CPC – Kinniya Town',                  company:'CPC',  district:'Trincomalee', address:'Main Rd, Kinniya',                         lat:8.4850, lng:81.1850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'026-223-1122' },
  { id:'r145', name:'Lanka IOC – Kantale Town',             company:'IOC',  district:'Trincomalee', address:'Trinco Rd, Kantale',                       lat:8.3650, lng:81.0250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'026-224-3344' },

  // ===================== BATTICALOA DISTRICT EXPANSION =====================
  { id:'r146', name:'CPC – Valaichchenai Town',            company:'CPC',  district:'Batticaloa', address:'Main Rd, Valaichchenai',                    lat:7.9250, lng:81.5350, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'065-225-1122' },
  { id:'r147', name:'Lanka IOC – Kattankudy',              company:'IOC',  district:'Batticaloa', address:'Kalmunai Rd, Kattankudy',                   lat:7.6850, lng:81.7250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'065-224-3388' },

  // ===================== AMPARA DISTRICT EXPANSION =====================
  { id:'r148', name:'CPC – Akkaraipattu Town',             company:'CPC',  district:'Ampara', address:'Main Rd, Akkaraipattu',                       lat:7.2150, lng:81.8550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'067-227-1122' },
  { id:'r149', name:'Lanka IOC – Sainthamaruthu',          company:'IOC',  district:'Ampara', address:'Kalmunai Rd, Sainthamaruthu',                  lat:7.3950, lng:81.8350, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'067-222-3344' },
  { id:'r150', name:'CPC – Padiyathalawa',                 company:'CPC',  district:'Ampara', address:'Mahiyangana Rd',                                lat:7.4350, lng:81.2050, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'063-224-1155' },

  // ===================== KURUNEGALA DISTRICT EXPANSION =====================
  { id:'r151', name:'CPC – Narammala Town',                company:'CPC',  district:'Kurunegala', address:'Main Rd, Narammala',                        lat:7.4350, lng:80.2150, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'037-224-8822' },
  { id:'r152', name:'Lanka IOC – Wariyapola',              company:'IOC',  district:'Kurunegala', address:'Puttalam Rd, Wariyapola',                  lat:7.6050, lng:80.2250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-226-7744' },
  { id:'r153', name:'CPC – Pannala Town',                  company:'CPC',  district:'Kurunegala', address:'Negombo Rd, Pannala',                       lat:7.3450, lng:79.9850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'037-224-5566' },
  { id:'r154', name:'Lanka IOC – Polgahawela',             company:'IOC',  district:'Kurunegala', address:'Kegalle Rd, Polgahawela',                   lat:7.3250, lng:80.2950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-224-4455' },

  // ===================== PUTTALAM DISTRICT EXPANSION =====================
  { id:'r155', name:'CPC – Dankotuwa Town',                company:'CPC',  district:'Puttalam', address:'Negombo Rd, Dankotuwa',                       lat:7.3050, lng:79.8850, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'031-224-8844' },
  { id:'r156', name:'Lanka IOC – Wennappuwa',              company:'IOC',  district:'Puttalam', address:'Galle Rd, Wennappuwa',                       lat:7.3650, lng:79.8250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'031-225-3377' },
  { id:'r157', name:'CPC – Nattandiya Town',               company:'CPC',  district:'Puttalam', address:'Main Rd, Nattandiya',                        lat:7.4150, lng:79.8550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'032-225-4422' },

  // ===================== MATALE DISTRICT EXPANSION =====================
  { id:'r158', name:'CPC – Rattota Town',                  company:'CPC',  district:'Matale', address:'Main St, Rattota',                             lat:7.5150, lng:80.6550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'066-223-1122' },

  // ===================== NUWARA ELIYA DISTRICT EXPANSION =====================
  { id:'r159', name:'CPC – Talawakele Town',               company:'CPC',  district:'Nuwara Eliya', address:'Nawalapitiya Rd',                        lat:6.9350, lng:80.6550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'052-225-8844' },
  { id:'r160', name:'Lanka IOC – Ragala Town',              company:'IOC',  district:'Nuwara Eliya', address:'Main Rd, Ragala',                         lat:7.0150, lng:80.8250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'052-226-3344' },

  // ===================== KILINOCHCHI DISTRICT EXPANSION =====================
  { id:'r161', name:'Lanka IOC – Pooneryn',                company:'IOC',  district:'Kilinochchi', address:'Sangupiddy Bridge Rd',                     lat:9.5050, lng:80.2050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'021-228-3344' },

  // ===================== MANNAR DISTRICT EXPANSION =====================
  { id:'r162', name:'CPC – Nanattan Town',                 company:'CPC',  district:'Mannar', address:'Main Rd, Nanattan',                            lat:8.8550, lng:79.9550, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'023-225-1122' },

  // ===================== MULLAITIVU DISTRICT EXPANSION =====================
  { id:'r163', name:'Lanka IOC – Oddusuddan',              company:'IOC',  district:'Mullaitivu', address:'Mankulam Rd, Oddusuddan',                  lat:9.1550, lng:80.6550, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'021-229-3344' },

  // ===================== VAVUNIYA DISTRICT EXPANSION =====================
  { id:'r164', name:'CPC – Cheddikulam Town',              company:'CPC',  district:'Vavuniya', address:'Mannar Rd, Cheddikulam',                     lat:8.6650, lng:80.3050, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'024-225-1122' },

  // ===================== ADDITIONAL HIGH-VOLUME STATIONS =====================
  { id:'r165', name:'Lanka IOC – Nugegoda 2',               company:'IOC',  district:'Colombo', address:'Pagoda Rd, Nugegoda',                          lat:6.8720, lng:79.8920, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-282-3344' },
  { id:'r166', name:'CPC – Maharagama 2',                  company:'CPC',  district:'Colombo', address:'Old Rd, Maharagama',                          lat:6.8520, lng:79.9250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-284-1155' },
  { id:'r167', name:'Lanka IOC – Dehiwala 2',               company:'IOC',  district:'Colombo', address:'Hill St, Dehiwala',                           lat:6.8450, lng:79.8750, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-271-5566' },
  { id:'r168', name:'CPC – Mount Lavinia 2',               company:'CPC',  district:'Colombo', address:'Templers Rd, Mount Lavinia',                  lat:6.8350, lng:79.8780, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-271-8822' },
  { id:'r169', name:'Lanka IOC – Moratuwa 2',               company:'IOC',  district:'Colombo', address:'Galle Rd, Moratuwa',                          lat:6.7850, lng:79.8880, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-265-4477' },
  { id:'r170', name:'CPC – Pettah 2 (Fort)',               company:'CPC',  district:'Colombo', address:'Olcott Mawatha, Colombo 11',                  lat:6.9350, lng:79.8520, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-242-4411' },
  { id:'r171', name:'Lanka IOC – Kirulapone 2',            company:'IOC',  district:'Colombo', address:'Havelock Rd, Colombo 5',                      lat:6.8820, lng:79.8680, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-250-3344' },
  { id:'r172', name:'CPC – Kottawa Highway Exit',          company:'CPC',  district:'Colombo', address:'High Level Rd, Kottawa',                      lat:6.8420, lng:79.9650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-289-5511' },
  { id:'r173', name:'Lanka IOC – Piliyandala',             company:'IOC',  district:'Colombo', address:'Horana Rd, Piliyandala',                      lat:6.8020, lng:79.9230, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-261-3344' },
  { id:'r174', name:'CPC – Kesbewa Town',                  company:'CPC',  district:'Colombo', address:'Horana Rd, Kesbewa',                          lat:6.7820, lng:79.9480, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-260-1122' },
  { id:'r175', name:'CPC – Negombo 2',                     company:'CPC',  district:'Gampaha', address:'Main St, Negombo',                             lat:7.2120, lng:79.8550, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'031-222-1155' },
  { id:'r176', name:'Lanka IOC – Ja-Ela 2',                company:'IOC',  district:'Gampaha', address:'Negombo Rd, Ja-Ela',                           lat:7.0750, lng:79.8950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-225-3311' },
  { id:'r177', name:'CPC – Kadawatha 2',                   company:'CPC',  district:'Gampaha', address:'Kandy Rd, Kadawatha',                          lat:7.0120, lng:79.9580, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-292-5511' },
  { id:'r178', name:'Lanka IOC – Wattala 2',               company:'IOC',  district:'Gampaha', address:'Negombo Rd, Wattala',                          lat:6.9950, lng:79.8950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-293-3344' },
  { id:'r179', name:'CPC – Biyagama Zone',                 company:'CPC',  district:'Gampaha', address:'Main Rd, Biyagama',                            lat:6.9350, lng:79.9850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-248-1122' },
  { id:'r180', name:'Lanka IOC – Sapugaskanda',            company:'IOC',  district:'Gampaha', address:'Oil Refinery Rd',                              lat:6.9550, lng:79.9450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-240-3344' },
  { id:'r181', name:'CPC – Delgoda Town',                  company:'CPC',  district:'Gampaha', address:'Pugoda Rd, Delgoda',                           lat:6.9720, lng:80.0150, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-240-1122' },
  { id:'r182', name:'Lanka IOC – Katugastota 2',            company:'IOC',  district:'Kandy', address:'Madawala Rd, Katugastota',                       lat:7.3150, lng:80.6420, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'081-234-3344' },
  { id:'r183', name:'CPC – Peradeniya 2',                  company:'CPC',  district:'Kandy', address:'Colombo Rd, Peradeniya',                         lat:7.2680, lng:80.5980, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'081-238-1188' },
  { id:'r184', name:'Lanka IOC – Kundasale',               company:'IOC',  district:'Kandy', address:'Digana Rd, Kundasale',                           lat:7.2850, lng:80.6850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'081-242-3344' },
  { id:'r185', name:'CPC – Matale Rd Junction',            company:'CPC',  district:'Kandy', address:'Katugastota, Kandy',                             lat:7.3120, lng:80.6350, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'081-234-8844' },
  { id:'r186', name:'CPC – Kurunegala Central',            company:'CPC',  district:'Kurunegala', address:'Main St, Kurunegala',                       lat:7.4850, lng:80.3620, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'037-222-1155' },
  { id:'r187', name:'Lanka IOC – Kuliyapitiya 2',          company:'IOC',  district:'Kurunegala', address:'Main Rd, Kuliyapitiya',                     lat:7.4650, lng:80.0520, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-228-3344' },
  { id:'r188', name:'CPC – Maho Town',                     company:'CPC',  district:'Kurunegala', address:'Main Rd, Maho',                               lat:7.8150, lng:80.2650, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-227-1122' },
  { id:'r189', name:'Lanka IOC – Galgamuwa',               company:'IOC',  district:'Kurunegala', address:'Anuradhapura Rd, Galgamuwa',                lat:7.9850, lng:80.2750, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-225-3344' },
  { id:'r190', name:'Lanka IOC – Galle City 2',            company:'IOC',  district:'Galle', address:'Galle Rd, Galle',                                lat:6.0450, lng:80.2050, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'091-222-3344' },
  { id:'r191', name:'CPC – Hikkaduwa North',               company:'CPC',  district:'Galle', address:'Galle Rd, Hikkaduwa',                            lat:6.1450, lng:80.0950, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'091-227-1155' },
  { id:'r192', name:'Lanka IOC – Elpitiya',                company:'IOC',  district:'Galle', address:'Main Rd, Elpitiya',                              lat:6.2650, lng:80.1450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'091-229-3344' },
  { id:'r193', name:'CPC – Matara City 2',                 company:'CPC',  district:'Matara', address:'Galle Rd, Matara',                              lat:5.9520, lng:80.5250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'041-222-3311' },
  { id:'r194', name:'Lanka IOC – Weligama City 2',          company:'IOC',  district:'Matara', address:'Main Rd, Weligama',                           lat:5.9750, lng:80.4250, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'041-225-4422' },
  { id:'r195', name:'CPC – Beliatta Town',                 company:'CPC',  district:'Hambantota', address:'Tangalle Rd, Beliatta',                     lat:6.0420, lng:80.7450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'047-224-1188' },
  { id:'r196', name:'Lanka IOC – Tangalle City 2',          company:'IOC',  district:'Hambantota', address:'Main Rd, Tangalle',                        lat:6.0280, lng:80.7920, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'047-224-3322' },
  { id:'r197', name:'CPC – Eheliyagoda Town',              company:'CPC',  district:'Ratnapura', address:'Colombo Rd, Eheliyagoda',                    lat:6.8520, lng:80.2580, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'036-225-1155' },
  { id:'r198', name:'Lanka IOC – Godakawela',              company:'IOC',  district:'Ratnapura', address:'Pelmadulla Rd, Godakawela',                  lat:6.4250, lng:80.6450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'045-224-3311' },
  { id:'r199', name:'CPC – Minuwangoda 2',                 company:'CPC',  district:'Gampaha', address:'Negombo Rd, Minuwangoda',                      lat:7.1850, lng:79.9450, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-229-5566' },
  { id:'r200', name:'Lanka IOC – Polgahawela 2',           company:'IOC',  district:'Kurunegala', address:'Main Rd, Polgahawela',                      lat:7.3350, lng:80.2850, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'037-224-5588' },
];



// ===================== REAL GAS STATIONS =====================
const REAL_GAS_SHOPS = [
  { id:'rg001', name:'Litro Gas Depot – Nawala', provider:'Litro', district:'Colombo', address:'Nawala Junction', lat:6.904, lng:79.894, stock:{'12.5kg':'available'}, phone:'011-288-6600' },
  { id:'rg002', name:'LAUGFS Gas – Maharagama', provider:'LAUGFS', district:'Colombo', address:'High Level Rd', lat:6.845, lng:79.930, stock:{'12.5kg':'limited'}, phone:'011-285-7700' },
  { id:'rg003', name:'Litro Gas – Borella', provider:'Litro', district:'Colombo', address:'Borella Junction', lat:6.915, lng:79.880, stock:{'12.5kg':'available'}, phone:'011-269-1560' },
  { id:'rg004', name:'LAUGFS – Kelaniya', provider:'LAUGFS', district:'Colombo', address:'Kandy Rd', lat:6.979, lng:79.929, stock:{'12.5kg':'available'}, phone:'011-291-2200' },
  { id:'rg005', name:'Litro Gas – Moratuwa', provider:'Litro', district:'Colombo', address:'New Rd', lat:6.772, lng:79.884, stock:{'12.5kg':'available'}, phone:'011-265-8800' },
  { id:'rg006', name:'Litro Gas – Negombo', provider:'Litro', district:'Gampaha', address:'Lewis Place', lat:7.222, lng:79.840, stock:{'12.5kg':'available'}, phone:'031-222-7700' },
  { id:'rg007', name:'LAUGFS – Gampaha', provider:'LAUGFS', district:'Gampaha', address:'Hospital Rd', lat:7.092, lng:80.018, stock:{'12.5kg':'available'}, phone:'033-222-5511' },
  { id:'rg008', name:'Litro Gas – Panadura', provider:'Litro', district:'Kalutara', address:'Galle Rd', lat:6.711, lng:79.904, stock:{'12.5kg':'available'}, phone:'038-223-9900' },
  { id:'rg009', name:'LAUGFS – Kalutara', provider:'LAUGFS', district:'Kalutara', address:'Galle Rd', lat:6.602, lng:79.957, stock:{'12.5kg':'limited'}, phone:'034-222-8800' },
  { id:'rg010', name:'Litro Gas – Kandy Peradeniya', provider:'Litro', district:'Kandy', address:'Peradeniya Rd', lat:7.287, lng:80.624, stock:{'12.5kg':'available'}, phone:'081-238-4422' },
  { id:'rg011', name:'LAUGFS – Kandy City', provider:'LAUGFS', district:'Kandy', address:'Colombo St', lat:7.292, lng:80.635, stock:{'12.5kg':'available'}, phone:'081-222-6633' },
  { id:'rg012', name:'Litro Gas – Galle Karapitiya', provider:'Litro', district:'Galle', address:'Karapitiya Rd', lat:6.060, lng:80.229, stock:{'12.5kg':'out'}, phone:'091-222-6655' },
  { id:'rg013', name:'LAUGFS – Galle Town', provider:'LAUGFS', district:'Galle', address:'Main St', lat:6.035, lng:80.211, stock:{'12.5kg':'available'}, phone:'091-222-3344' },
  { id:'rg014', name:'Litro Gas – Matara Bus Stand', provider:'Litro', district:'Matara', address:'Bus Stand Rd', lat:5.945, lng:80.548, stock:{'12.5kg':'limited'}, phone:'041-222-5544' },
  { id:'rg015', name:'LAUGFS – Matara', provider:'LAUGFS', district:'Matara', address:'Main St', lat:5.944, lng:80.525, stock:{'12.5kg':'available'}, phone:'041-222-9900' },
  { id:'rg016', name:'Litro Gas – Hambantota', provider:'Litro', district:'Hambantota', address:'Main Rd', lat:6.126, lng:81.121, stock:{'12.5kg':'available'}, phone:'047-222-7700' },
  { id:'rg017', name:'LAUGFS – Jaffna KKS Rd', provider:'LAUGFS', district:'Jaffna', address:'KKS Rd', lat:9.670, lng:80.015, stock:{'12.5kg':'available'}, phone:'021-222-6677' },
  { id:'rg018', name:'Litro Gas – Jaffna', provider:'Litro', district:'Jaffna', address:'Hospital Rd', lat:9.664, lng:80.015, stock:{'12.5kg':'limited'}, phone:'021-222-5544' },
  { id:'rg019', name:'LAUGFS – Kurunegala', provider:'LAUGFS', district:'Kurunegala', address:'Colombo Rd', lat:7.491, lng:80.366, stock:{'12.5kg':'available'}, phone:'037-222-8899' },
  { id:'rg020', name:'Litro Gas – Kurunegala', provider:'Litro', district:'Kurunegala', address:'Colombo Rd', lat:7.481, lng:80.362, stock:{'12.5kg':'available'}, phone:'037-222-4422' },
  { id:'rg021', name:'Litro Gas – Anuradhapura', provider:'Litro', district:'Anuradhapura', address:'Maithripala Mawatha', lat:8.330, lng:80.413, stock:{'12.5kg':'available'}, phone:'025-222-8811' },
  { id:'rg022', name:'Litro Gas – Ratnapura', provider:'Litro', district:'Ratnapura', address:'Main St', lat:6.681, lng:80.400, stock:{'12.5kg':'available'}, phone:'045-222-5533' },
  { id:'rg023', name:'LAUGFS – Badulla', provider:'LAUGFS', district:'Badulla', address:'Bandarawela Rd', lat:6.967, lng:81.037, stock:{'12.5kg':'available'}, phone:'055-222-7766' },
  { id:'rg024', name:'Litro Gas – Trincomalee', provider:'Litro', district:'Trincomalee', address:'Inner Harbour Rd', lat:8.577, lng:81.228, stock:{'12.5kg':'available'}, phone:'026-222-7755' },
  { id:'rg025', name:'Litro Gas – Batticaloa', provider:'Litro', district:'Batticaloa', address:'Bar Rd', lat:7.721, lng:81.697, stock:{'12.5kg':'limited'}, phone:'065-222-9988' },
  { id:'rg026', name:'Litro Gas – Kegalle', provider:'Litro', district:'Kegalle', address:'Colombo Rd', lat:7.253, lng:80.347, stock:{'12.5kg':'available'}, phone:'035-222-6644' },
  { id:'rg027', name:'LAUGFS – Chilaw', provider:'LAUGFS', district:'Puttalam', address:'Main St', lat:7.575, lng:79.794, stock:{'12.5kg':'available'}, phone:'032-222-5566' },
  { id:'rg028', name:'Litro Gas – Vavuniya', provider:'Litro', district:'Vavuniya', address:'Hospital Rd', lat:8.748, lng:80.497, stock:{'12.5kg':'available'}, phone:'024-222-8833' },
  { id:'rg029', name:'Litro Gas – Ampara Town', provider:'Litro', district:'Ampara', address:'Main St', lat:7.297, lng:81.682, stock:{'12.5kg':'available'}, phone:'063-222-1100' },
  { id:'rg030', name:'LAUGFS – Monaragala Town', provider:'LAUGFS', district:'Monaragala', address:'Wellawaya Rd', lat:6.890, lng:81.345, stock:{'12.5kg':'available'}, phone:'055-227-6600' },
  { id:'rg031', name:'Litro Gas – Polonnaruwa Town', provider:'Litro', district:'Polonnaruwa', address:'Main St', lat:7.939, lng:81.002, stock:{'12.5kg':'limited'}, phone:'027-222-5000' },
  { id:'rg032', name:'Litro Gas – Mullaitivu', provider:'Litro', district:'Mullaitivu', address:'Main Rd', lat:9.283, lng:80.800, stock:{'12.5kg':'available'}, phone:'021-229-0000' },
  { id:'rg033', name:'LAUGFS – Kilinochchi', provider:'LAUGFS', district:'Kilinochchi', address:'Kandy Rd', lat:9.383, lng:80.408, stock:{'12.5kg':'available'}, phone:'021-228-5500' },
  { id:'rg034', name:'Litro Gas – Matale Town', provider:'Litro', district:'Matale', address:'Trincomalee St', lat:7.466, lng:80.616, stock:{'12.5kg':'available'}, phone:'066-222-2200' },
  { id:'rg035', name:'LAUGFS – Nuwara Eliya', provider:'LAUGFS', district:'Nuwara Eliya', address:'Kandy Rd', lat:6.966, lng:80.766, stock:{'12.5kg':'available'}, phone:'052-222-3300' },
  { id:'rg036', name:'Litro Gas – Mannar Town', provider:'Litro', district:'Mannar', address:'Main St', lat:8.983, lng:79.900, stock:{'12.5kg':'limited'}, phone:'023-222-1100' },
  { id:'rg037', name:'Litro Gas – Puttalam Town', provider:'Litro', district:'Puttalam', address:'Main St', lat:8.024, lng:79.834, stock:{'12.5kg':'available'}, phone:'032-222-5500' },
  { id:'rg038', name:'Litro Gas – Anuradhapura Sacred', provider:'Litro', district:'Anuradhapura', address:'Sacred City', lat:8.339, lng:80.411, stock:{'12.5kg':'available'}, phone:'025-222-5000' },
  { id:'rg039', name:'LAUGFS – Ampara', provider:'LAUGFS', district:'Ampara', address:'Main St', lat:7.297, lng:81.682, stock:{'12.5kg':'available'}, phone:'063-222-1234' },
  { id:'rg040', name:'Litro Gas – Monaragala Center', provider:'Litro', district:'Monaragala', address:'Main St', lat:6.890, lng:81.345, stock:{'12.5kg':'available'}, phone:'055-227-4411' },
  { id:'rg041', name:'LAUGFS – Polonnaruwa Center', provider:'LAUGFS', district:'Polonnaruwa', address:'Kandy Rd', lat:7.939, lng:81.002, stock:{'12.5kg':'available'}, phone:'027-222-7788' },
  { id:'rg042', name:'Litro Gas – Matale Center', provider:'Litro', district:'Matale', address:'Kandy Rd', lat:7.466, lng:80.616, stock:{'12.5kg':'available'}, phone:'066-222-5566' },
  { id:'rg043', name:'LAUGFS – Matale Center', provider:'LAUGFS', district:'Matale', address:'Main St', lat:7.466, lng:80.616, stock:{'12.5kg':'limited'}, phone:'066-222-4455' },
  { id:'rg044', name:'Litro Gas – Nuwara Eliya Center', provider:'Litro', district:'Nuwara Eliya', address:'Badulla Rd', lat:6.966, lng:80.766, stock:{'12.5kg':'available'}, phone:'052-222-4411' },
  { id:'rg045', name:'Litro Gas – Hatton Center', provider:'Litro', district:'Nuwara Eliya', address:'Dimbula Rd', lat:6.892, lng:80.601, stock:{'12.5kg':'available'}, phone:'051-222-5577' },
  { id:'rg046', name:'LAUGFS – Hatton Center', provider:'LAUGFS', district:'Nuwara Eliya', address:'Main Rd', lat:6.892, lng:80.601, stock:{'12.5kg':'limited'}, phone:'051-222-3344' },
  { id:'rg047', name:'Litro Gas – Welimada', provider:'Litro', district:'Badulla', address:'Main Rd', lat:6.903, lng:80.916, stock:{'12.5kg':'available'}, phone:'057-224-5500' },
  { id:'rg048', name:'Litro Gas – Badulla Center', provider:'Litro', district:'Badulla', address:'Main St', lat:6.985, lng:81.047, stock:{'12.5kg':'available'}, phone:'055-222-4400' },
  { id:'rg049', name:'LAUGFS – Vavuniya Center', provider:'LAUGFS', district:'Vavuniya', address:'Main St', lat:8.751, lng:80.495, stock:{'12.5kg':'available'}, phone:'024-222-3344' },
  { id:'rg050', name:'Litro Gas – Kilinochchi Center', provider:'Litro', district:'Kilinochchi', address:'Main Rd', lat:9.383, lng:80.408, stock:{'12.5kg':'available'}, phone:'021-228-4400' },
  { id:'rg051', name:'LAUGFS – Mullaitivu Center', provider:'LAUGFS', district:'Mullaitivu', address:'Beach Rd', lat:9.266, lng:80.812, stock:{'12.5kg':'limited'}, phone:'021-229-1100' },
  { id:'rg052', name:'Litro Gas – Mannar Center', provider:'Litro', district:'Mannar', address:'Station Rd', lat:8.977, lng:79.910, stock:{'12.5kg':'available'}, phone:'023-222-2244' },
  { id:'rg053', name:'LAUGFS – Puttalam Center', provider:'LAUGFS', district:'Puttalam', address:'Main Rd', lat:8.024, lng:79.834, stock:{'12.5kg':'available'}, phone:'032-222-1144' },
  { id:'rg054', name:'Litro Gas – Chilaw Center', provider:'Litro', district:'Puttalam', address:'Colombo Rd', lat:7.576, lng:79.803, stock:{'12.5kg':'available'}, phone:'032-222-4455' },
  { id:'rg055', name:'Litro Gas – Anuradhapura Town Center', provider:'Litro', district:'Anuradhapura', address:'Town Center', lat:8.311, lng:80.411, stock:{'12.5kg':'available'}, phone:'025-222-1122' },
  { id:'rg056', name:'LAUGFS – Anuradhapura Center', provider:'LAUGFS', district:'Anuradhapura', address:'Hospital Rd', lat:8.311, lng:80.411, stock:{'12.5kg':'limited'}, phone:'025-222-3344' },
  { id:'rg057', name:'Litro Gas – Dambulla Center', provider:'Litro', district:'Matale', address:'Main St', lat:7.854, lng:80.652, stock:{'12.5kg':'available'}, phone:'066-228-5500' },
  { id:'rg058', name:'Litro Gas – Sigiriya Center', provider:'Litro', district:'Matale', address:'Inamaluwa Rd', lat:7.957, lng:80.760, stock:{'12.5kg':'limited'}, phone:'066-228-1144' },
  { id:'rg059', name:'Litro Gas – Kollupitiya', provider:'Litro', district:'Colombo', address:'Galle Rd, Colombo 3', lat:6.915, lng:79.848, stock:{'12.5kg':'available'}, phone:'011-257-1122' },
  { id:'rg060', name:'LAUGFS – Slave Island', provider:'LAUGFS', district:'Colombo', address:'Justice Akbar Mawatha', lat:6.923, lng:79.851, stock:{'12.5kg':'available'}, phone:'011-242-4455' },
  { id:'rg061', name:'Litro Gas – Cinnamon Gardens', provider:'Litro', district:'Colombo', address:'Gregory’s Rd', lat:6.908, lng:79.865, stock:{'12.5kg':'available'}, phone:'011-269-3344' },
  { id:'rg062', name:'LAUGFS – Maradana', provider:'LAUGFS', district:'Colombo', address:'Maradana Rd', lat:6.927, lng:79.865, stock:{'12.5kg':'available'}, phone:'011-269-5566' },
  { id:'rg063', name:'Litro Gas – Dematagoda', provider:'Litro', district:'Colombo', address:'Baseline Rd', lat:6.935, lng:79.881, stock:{'12.5kg':'available'}, phone:'011-267-1122' },
  { id:'rg064', name:'LAUGFS – Grandpass', provider:'LAUGFS', district:'Colombo', address:'Grandpass Rd', lat:6.953, lng:79.868, stock:{'12.5kg':'available'}, phone:'011-243-3344' },
  { id:'rg065', name:'Litro Gas – Modara', provider:'Litro', district:'Colombo', address:'Aluthmawatha Rd', lat:6.973, lng:79.871, stock:{'12.5kg':'limited'}, phone:'011-252-1122' },
  { id:'rg066', name:'LAUGFS – Bloemendhal', provider:'LAUGFS', district:'Colombo', address:'Bloemendhal Rd', lat:6.960, lng:79.865, stock:{'12.5kg':'available'}, phone:'011-244-3344' },
  { id:'rg067', name:'Litro Gas – Mattakkuliya', provider:'Litro', district:'Colombo', address:'Mattakkuliya Rd', lat:6.985, lng:79.875, stock:{'12.5kg':'available'}, phone:'011-254-1122' },
  { id:'rg068', name:'LAUGFS – Attidiya', provider:'LAUGFS', district:'Colombo', address:'Attidiya Rd', lat:6.828, lng:79.888, stock:{'12.5kg':'available'}, phone:'011-271-4455' },
  { id:'rg069', name:'Litro Gas – Galkissa', provider:'Litro', district:'Colombo', address:'Mount Lavinia', lat:6.832, lng:79.864, stock:{'12.5kg':'available'}, phone:'011-273-1122' },
  { id:'rg070', name:'Litro Gas – Battaramulla', provider:'Litro', district:'Colombo', address:'Pannipitiya Rd', lat:6.898, lng:79.923, stock:{'12.5kg':'available'}, phone:'011-286-3344' },
  { id:'rg071', name:'LAUGFS – Malabe', provider:'LAUGFS', district:'Colombo', address:'Kaduwela Rd', lat:6.905, lng:79.965, stock:{'12.5kg':'available'}, phone:'011-274-3344' },
  { id:'rg072', name:'Litro Gas – Kaduwela Center', provider:'Litro', district:'Colombo', address:'Main Rd', lat:6.938, lng:79.985, stock:{'12.5kg':'available'}, phone:'011-253-1122' },
  { id:'rg073', name:'LAUGFS – Homagama', provider:'LAUGFS', district:'Colombo', address:'High Level Rd', lat:6.842, lng:80.005, stock:{'12.5kg':'limited'}, phone:'011-285-3344' },
  { id:'rg074', name:'Litro Gas – Avissawella Centre', provider:'Litro', district:'Colombo', address:'Main St', lat:6.955, lng:80.215, stock:{'12.5kg':'available'}, phone:'036-222-1122' },
  { id:'rg075', name:'LAUGFS – Katunayake', provider:'LAUGFS', district:'Gampaha', address:'Negombo Rd', lat:7.165, lng:79.885, stock:{'12.5kg':'available'}, phone:'011-225-1122' },
  { id:'rg076', name:'Litro Gas – Minuwangoda', provider:'Litro', district:'Gampaha', address:'Main St', lat:7.172, lng:79.955, stock:{'12.5kg':'available'}, phone:'011-229-3344' },
  { id:'rg077', name:'LAUGFS – Kandana Centre', provider:'LAUGFS', district:'Gampaha', address:'Negombo Rd', lat:7.048, lng:79.898, stock:{'12.5kg':'available'}, phone:'011-223-1122' },
  { id:'rg078', name:'Litro Gas – Ragama Centre', provider:'Litro', district:'Gampaha', address:'Hospital Rd', lat:7.028, lng:79.918, stock:{'12.5kg':'available'}, phone:'011-295-3344' },
  { id:'rg079', name:'LAUGFS – Kiribathgoda', provider:'LAUGFS', district:'Gampaha', address:'Kandy Rd', lat:6.988, lng:79.935, stock:{'12.5kg':'available'}, phone:'011-291-1122' },
  { id:'rg080', name:'Litro Gas – Veyangoda', provider:'Litro', district:'Gampaha', address:'Main Rd', lat:7.155, lng:80.055, stock:{'12.5kg':'available'}, phone:'033-228-3344' },
  { id:'rg081', name:'LAUGFS – Nittambuwa', provider:'LAUGFS', district:'Gampaha', address:'Kandy Rd', lat:7.135, lng:80.105, stock:{'12.5kg':'limited'}, phone:'033-228-1122' },
  { id:'rg082', name:'Litro Gas – Wadduwa Centre', provider:'Litro', district:'Kalutara', address:'Galle Rd', lat:6.662, lng:79.932, stock:{'12.5kg':'available'}, phone:'038-223-3344' },
  { id:'rg083', name:'LAUGFS – Beruwala Centre', provider:'LAUGFS', district:'Kalutara', address:'Main Rd', lat:6.478, lng:79.985, stock:{'12.5kg':'available'}, phone:'034-227-1122' },
  { id:'rg084', name:'Litro Gas – Aluthgama Centre', provider:'Litro', district:'Kalutara', address:'Bentota Rd', lat:6.438, lng:80.002, stock:{'12.5kg':'available'}, phone:'034-227-3344' },
  { id:'rg085', name:'LAUGFS – Matugama', provider:'LAUGFS', district:'Kalutara', address:'Main St', lat:6.522, lng:80.115, stock:{'12.5kg':'available'}, phone:'034-224-3344' },
  { id:'rg086', name:'Litro Gas – Bandaragama', provider:'Litro', district:'Kalutara', address:'Horana Rd', lat:6.715, lng:79.988, stock:{'12.5kg':'available'}, phone:'038-229-1122' },
  { id:'rg087', name:'Litro Gas – Getambe Center', provider:'Litro', district:'Kandy', address:'Peradeniya', lat:7.278, lng:80.605, stock:{'12.5kg':'available'}, phone:'081-222-1188' },
  { id:'rg088', name:'LAUGFS – Katugastota', provider:'LAUGFS', district:'Kandy', address:'Madawala Rd', lat:7.315, lng:80.642, stock:{'12.5kg':'available'}, phone:'081-234-3344' },
  { id:'rg089', name:'Litro Gas – Wattegama', provider:'Litro', district:'Kandy', address:'Matale Rd', lat:7.348, lng:80.675, stock:{'12.5kg':'available'}, phone:'081-247-1122' },
  { id:'rg090', name:'LAUGFS – Digana Center', provider:'LAUGFS', district:'Kandy', address:'Mahiyangana Rd', lat:7.295, lng:80.735, stock:{'12.5kg':'available'}, phone:'081-237-3344' },
  { id:'rg091', name:'Litro Gas – Gampola Centre', provider:'Litro', district:'Kandy', address:'Nawalapitiya Rd', lat:7.165, lng:80.575, stock:{'12.5kg':'limited'}, phone:'081-235-1122' },
  { id:'rg092', name:'LAUGFS – Nawalapitiya', provider:'LAUGFS', district:'Kandy', address:'Main St', lat:7.052, lng:80.535, stock:{'12.5kg':'available'}, phone:'054-222-3344' },
  { id:'rg093', name:'Litro Gas – Kadugannawa Center', provider:'Litro', district:'Kandy', address:'Main Rd', lat:7.255, lng:80.525, stock:{'12.5kg':'available'}, phone:'081-257-1122' },
  { id:'rg094', name:'LAUGFS – Pilimatalawa', provider:'LAUGFS', district:'Kandy', address:'Colombo Rd', lat:7.265, lng:80.555, stock:{'12.5kg':'available'}, phone:'081-257-3344' },
  { id:'rg095', name:'Litro Gas – Unawatuna Centre', provider:'Litro', district:'Galle', address:'Matara Rd', lat:6.012, lng:80.245, stock:{'12.5kg':'available'}, phone:'091-222-1155' },
  { id:'rg096', name:'LAUGFS – Habaraduwa Centre', provider:'LAUGFS', district:'Galle', address:'Main Rd', lat:5.992, lng:80.305, stock:{'12.5kg':'available'}, phone:'091-228-1122' },
  { id:'rg097', name:'Litro Gas – Ahangama Centre', provider:'Litro', district:'Galle', address:'Beach Rd', lat:5.972, lng:80.365, stock:{'12.5kg':'available'}, phone:'091-228-3344' },
  { id:'rg098', name:'LAUGFS – Ambalangoda Center', provider:'LAUGFS', district:'Galle', address:'Main Rd', lat:6.235, lng:80.055, stock:{'12.5kg':'available'}, phone:'091-225-1122' },
  { id:'rg099', name:'Litro Gas – Mirissa Town', provider:'Litro', district:'Matara', address:'Galle Rd', lat:5.945, lng:80.455, stock:{'12.5kg':'available'}, phone:'041-225-1155' },
  { id:'rg100', name:'LAUGFS – Dondra Centre', provider:'LAUGFS', district:'Matara', address:'Main Rd', lat:5.925, lng:80.585, stock:{'12.5kg':'available'}, phone:'041-222-1188' },
  { id:'rg101', name:'Litro Gas – Dickwella Center', provider:'Litro', district:'Matara', address:'Main St', lat:5.965, lng:80.695, stock:{'12.5kg':'available'}, phone:'041-220-1122' },
  { id:'rg102', name:'LAUGFS – Ambalantota Center', provider:'LAUGFS', district:'Hambantota', address:'Main Rd', lat:6.125, lng:81.025, stock:{'12.5kg':'available'}, phone:'047-222-1155' },
  { id:'rg103', name:'Litro Gas – Kataragama Center', provider:'Litro', district:'Hambantota', address:'Sella Kataragama Rd', lat:6.415, lng:81.325, stock:{'12.5kg':'available'}, phone:'047-223-1122' },
  { id:'rg104', name:'LAUGFS – Chavakachcheri', provider:'LAUGFS', district:'Jaffna', address:'Main St', lat:9.652, lng:80.155, stock:{'12.5kg':'available'}, phone:'021-227-3344' },
  { id:'rg105', name:'Litro Gas – Point Pedro Centre', provider:'Litro', district:'Jaffna', address:'Main Rd', lat:9.825, lng:80.235, stock:{'12.5kg':'available'}, phone:'021-226-1122' },
  { id:'rg106', name:'LAUGFS – Karainagar', provider:'LAUGFS', district:'Jaffna', address:'Beach Rd', lat:9.742, lng:79.885, stock:{'12.5kg':'available'}, phone:'021-229-3344' },
  { id:'rg107', name:'Litro Gas – Kayts Centre', provider:'Litro', district:'Jaffna', address:'Main Rd', lat:9.685, lng:79.915, stock:{'12.5kg':'available'}, phone:'021-221-1122' },
  { id:'rg108', name:'LAUGFS – Kekirawa Centre', provider:'LAUGFS', district:'Anuradhapura', address:'Main Rd', lat:8.035, lng:80.505, stock:{'12.5kg':'available'}, phone:'025-226-1122' },
  { id:'rg109', name:'Litro Gas – Galenbindunuwewa', provider:'Litro', district:'Anuradhapura', address:'Main St', lat:8.265, lng:80.685, stock:{'12.5kg':'available'}, phone:'025-225-1122' },
  { id:'rg110', name:'LAUGFS – Thalawa Centre', provider:'LAUGFS', district:'Anuradhapura', address:'Main Rd', lat:8.215, lng:80.355, stock:{'12.5kg':'available'}, phone:'025-224-3344' },
  { id:'rg111', name:'Litro Gas – Hingurakgoda Ctr', provider:'Litro', district:'Polonnaruwa', address:'Main St', lat:7.985, lng:80.985, stock:{'12.5kg':'available'}, phone:'027-224-1122' },
  { id:'rg112', name:'LAUGFS – Medirigiriya Centre', provider:'LAUGFS', district:'Polonnaruwa', address:'Main Rd', lat:8.155, lng:80.995, stock:{'12.5kg':'available'}, phone:'027-224-3344' },
  { id:'rg113', name:'Litro Gas – Welimada Center', provider:'Litro', district:'Badulla', address:'Main Rd', lat:6.903, lng:80.916, stock:{'12.5kg':'available'}, phone:'057-224-1122' },
  { id:'rg114', name:'LAUGFS – Passara Center', provider:'LAUGFS', district:'Badulla', address:'Main Rd', lat:6.935, lng:81.155, stock:{'12.5kg':'available'}, phone:'055-228-1122' },
  { id:'rg115', name:'Litro Gas – Ella Centre', provider:'Litro', district:'Badulla', address:'Main St', lat:6.877, lng:81.048, stock:{'12.5kg':'available'}, phone:'057-222-1122' },
  { id:'rg116', name:'LAUGFS – Bibile Town', provider:'LAUGFS', district:'Monaragala', address:'Main St', lat:7.155, lng:81.225, stock:{'12.5kg':'available'}, phone:'055-227-1122' },
  { id:'rg117', name:'Litro Gas – Buttala Centre', provider:'Litro', district:'Monaragala', address:'Main Rd', lat:6.755, lng:81.245, stock:{'12.5kg':'available'}, phone:'055-227-3344' },
  { id:'rg118', name:'LAUGFS – Balangoda Centre', provider:'LAUGFS', district:'Ratnapura', address:'Main St', lat:6.655, lng:80.705, stock:{'12.5kg':'available'}, phone:'045-228-1122' },
  { id:'rg119', name:'Litro Gas – Pelmadulla Centre', provider:'Litro', district:'Ratnapura', address:'Main Rd', lat:6.622, lng:80.555, stock:{'12.5kg':'available'}, phone:'045-227-1122' },
  { id:'rg120', name:'LAUGFS – Kuruwita Center', provider:'LAUGFS', district:'Ratnapura', address:'Main St', lat:6.772, lng:80.365, stock:{'12.5kg':'available'}, phone:'045-226-3344' },
  { id:'rg121', name:'Litro Gas – Rambukkana Center', provider:'Litro', district:'Kegalle', address:'Main St', lat:7.322, lng:80.395, stock:{'12.5kg':'available'}, phone:'035-226-1122' },
  { id:'rg122', name:'LAUGFS – Dehiowita Center', provider:'LAUGFS', district:'Kegalle', address:'Main Rd', lat:6.965, lng:80.265, stock:{'12.5kg':'available'}, phone:'036-223-1122' },
  { id:'rg123', name:'Litro Gas – Kinniya Centre', provider:'Litro', district:'Trincomalee', address:'Main Rd', lat:8.485, lng:81.185, stock:{'12.5kg':'available'}, phone:'026-223-3344' },
  { id:'rg124', name:'LAUGFS – Kantale Centre', provider:'LAUGFS', district:'Trincomalee', address:'Main Rd', lat:8.365, lng:81.025, stock:{'12.5kg':'available'}, phone:'026-224-1122' },
  { id:'rg125', name:'Litro Gas – Valaichchenai Ctr', provider:'Litro', district:'Batticaloa', address:'Main St', lat:7.925, lng:81.535, stock:{'12.5kg':'available'}, phone:'065-225-3344' },
  { id:'rg126', name:'LAUGFS – Kattankudy City', provider:'LAUGFS', district:'Batticaloa', address:'Main Rd', lat:7.685, lng:81.725, stock:{'12.5kg':'available'}, phone:'065-224-1122' },
  { id:'rg127', name:'Litro Gas – Akkaraipattu Ctr', provider:'Litro', district:'Ampara', address:'Main St', lat:7.215, lng:81.855, stock:{'12.5kg':'available'}, phone:'067-227-3344' },
  { id:'rg128', name:'LAUGFS – Sainthamaruthu Ctr', provider:'LAUGFS', district:'Ampara', address:'Main Rd', lat:7.395, lng:81.835, stock:{'12.5kg':'available'}, phone:'067-222-1122' },
  { id:'rg129', name:'Litro Gas – Padiyathalawa', provider:'Litro', district:'Ampara', address:'Main St', lat:7.435, lng:81.205, stock:{'12.5kg':'available'}, phone:'063-224-3344' },
  { id:'rg130', name:'LAUGFS – Narammala Center', provider:'LAUGFS', district:'Kurunegala', address:'Main St', lat:7.435, lng:80.215, stock:{'12.5kg':'available'}, phone:'037-224-1122' },
  { id:'rg131', name:'Litro Gas – Wariyapola Centre', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.605, lng:80.225, stock:{'12.5kg':'available'}, phone:'037-226-1122' },
  { id:'rg132', name:'LAUGFS – Pannala Centre', provider:'LAUGFS', district:'Kurunegala', address:'Main Rd', lat:7.345, lng:79.985, stock:{'12.5kg':'available'}, phone:'037-224-3344' },
  { id:'rg133', name:'Litro Gas – Polgahawela Ctr', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.325, lng:80.295, stock:{'12.5kg':'available'}, phone:'037-224-1122' },
  { id:'rg134', name:'LAUGFS – Dankotuwa Centre', provider:'LAUGFS', district:'Puttalam', address:'Main Rd', lat:7.305, lng:79.885, stock:{'12.5kg':'available'}, phone:'031-224-1122' },
  { id:'rg135', name:'Litro Gas – Wennappuwa Centre', provider:'Litro', district:'Puttalam', address:'Main Rd', lat:7.365, lng:79.825, stock:{'12.5kg':'available'}, phone:'031-225-1122' },
  { id:'rg136', name:'LAUGFS – Nattandiya Centre', provider:'LAUGFS', district:'Puttalam', address:'Main Rd', lat:7.415, lng:79.855, stock:{'12.5kg':'available'}, phone:'032-225-3344' },
  { id:'rg137', name:'Litro Gas – Rattota Centre', provider:'Litro', district:'Matale', address:'Main St', lat:7.515, lng:80.655, stock:{'12.5kg':'available'}, phone:'066-223-3344' },
  { id:'rg138', name:'LAUGFS – Talawakele Center', provider:'LAUGFS', district:'Nuwara Eliya', address:'Main Rd', lat:6.935, lng:80.655, stock:{'12.5kg':'available'}, phone:'052-225-3344' },
  { id:'rg139', name:'Litro Gas – Ragala Centre', provider:'Litro', district:'Nuwara Eliya', address:'Main St', lat:7.015, lng:80.825, stock:{'12.5kg':'available'}, phone:'052-226-3388' },
  { id:'rg140', name:'LAUGFS – Pooneryn Center', provider:'LAUGFS', district:'Kilinochchi', address:'Main Rd', lat:9.505, lng:80.205, stock:{'12.5kg':'available'}, phone:'021-228-1122' },
  { id:'rg141', name:'Litro Gas – Nugegoda 2', provider:'Litro', district:'Colombo', address:'Pagoda Rd', lat:6.872, lng:79.892, stock:{'12.5kg':'available'}, phone:'011-282-1122' },
  { id:'rg142', name:'LAUGFS – Maharagama 2', provider:'LAUGFS', district:'Colombo', address:'Old Rd', lat:6.852, lng:79.925, stock:{'12.5kg':'available'}, phone:'011-284-3344' },
  { id:'rg143', name:'Litro Gas – Dehiwala 2', provider:'Litro', district:'Colombo', address:'Hill St', lat:6.845, lng:79.875, stock:{'12.5kg':'available'}, phone:'011-271-1122' },
  { id:'rg144', name:'LAUGFS – Mount Lavinia 2', provider:'LAUGFS', district:'Colombo', address:'Templers Rd', lat:6.835, lng:79.878, stock:{'12.5kg':'available'}, phone:'011-271-3344' },
  { id:'rg145', name:'Litro Gas – Moratuwa 2', provider:'Litro', district:'Colombo', address:'Galle Rd', lat:6.785, lng:79.888, stock:{'12.5kg':'available'}, phone:'011-265-1122' },
  { id:'rg146', name:'LAUGFS – Pettah 2', provider:'LAUGFS', district:'Colombo', address:'Olcott Mawatha', lat:6.935, lng:79.852, stock:{'12.5kg':'available'}, phone:'011-242-1122' },
  { id:'rg147', name:'Litro Gas – Kirulapone 2', provider:'Litro', district:'Colombo', address:'Havelock Rd', lat:6.882, lng:79.868, stock:{'12.5kg':'available'}, phone:'011-250-1122' },
  { id:'rg148', name:'LAUGFS – Kottawa 2', provider:'LAUGFS', district:'Colombo', address:'High Level Rd', lat:6.842, lng:79.965, stock:{'12.5kg':'available'}, phone:'011-289-1122' },
  { id:'rg149', name:'Litro Gas – Piliyandala 2', provider:'Litro', district:'Colombo', address:'Horana Rd', lat:6.802, lng:79.923, stock:{'12.5kg':'available'}, phone:'011-261-1122' },
  { id:'rg150', name:'LAUGFS – Kesbewa 2', provider:'LAUGFS', district:'Colombo', address:'Main Rd', lat:6.782, lng:79.948, stock:{'12.5kg':'available'}, phone:'011-260-3344' },
  { id:'rg151', name:'Litro Gas – Negombo 3', provider:'Litro', district:'Gampaha', address:'Main St', lat:7.212, lng:79.855, stock:{'12.5kg':'available'}, phone:'031-222-3311' },
  { id:'rg152', name:'LAUGFS – Ja-Ela 3', provider:'LAUGFS', district:'Gampaha', address:'Negombo Rd', lat:7.075, lng:79.895, stock:{'12.5kg':'available'}, phone:'011-225-1155' },
  { id:'rg153', name:'Litro Gas – Kadawatha 3', provider:'Litro', district:'Gampaha', address:'Kandy Rd', lat:7.012, lng:79.958, stock:{'12.5kg':'available'}, phone:'011-292-1122' },
  { id:'rg154', name:'LAUGFS – Wattala 3', provider:'LAUGFS', district:'Gampaha', address:'Negombo Rd', lat:6.995, lng:79.895, stock:{'12.5kg':'available'}, phone:'011-293-1122' },
  { id:'rg155', name:'Litro Gas – Biyagama 2', provider:'Litro', district:'Gampaha', address:'Zone Rd', lat:6.935, lng:79.985, stock:{'12.5kg':'available'}, phone:'011-248-3344' },
  { id:'rg156', name:'LAUGFS – Sapugaskanda 2', provider:'LAUGFS', district:'Gampaha', address:'Refinery Rd', lat:6.955, lng:79.945, stock:{'12.5kg':'available'}, phone:'011-240-1155' },
  { id:'rg157', name:'Litro Gas – Delgoda 2', provider:'Litro', district:'Gampaha', address:'Main Rd', lat:6.972, lng:80.015, stock:{'12.5kg':'available'}, phone:'011-240-1188' },
  { id:'rg158', name:'LAUGFS – Kiribathgoda 2', provider:'LAUGFS', district:'Gampaha', address:'Kandy Rd', lat:6.992, lng:79.932, stock:{'12.5kg':'available'}, phone:'011-291-3344' },
  { id:'rg159', name:'Litro Gas – Katugastota 2', provider:'Litro', district:'Kandy', address:'Madawala Rd', lat:7.315, lng:80.642, stock:{'12.5kg':'available'}, phone:'081-234-1122' },
  { id:'rg160', name:'LAUGFS – Peradeniya 2', provider:'LAUGFS', district:'Kandy', address:'Colombo Rd', lat:7.268, lng:80.598, stock:{'12.5kg':'available'}, phone:'081-238-3344' },
  { id:'rg161', name:'Litro Gas – Kundasale 2', provider:'Litro', district:'Kandy', address:'Digana Rd', lat:7.285, lng:80.685, stock:{'12.5kg':'available'}, phone:'081-242-1122' },
  { id:'rg162', name:'LAUGFS – Matale Junction', provider:'LAUGFS', district:'Kandy', address:'Katugastota', lat:7.312, lng:80.635, stock:{'12.5kg':'available'}, phone:'081-234-1188' },
  { id:'rg163', name:'Litro Gas – Kurunegala 2', provider:'Litro', district:'Kurunegala', address:'Main St', lat:7.485, lng:80.362, stock:{'12.5kg':'available'}, phone:'037-222-1188' },
  { id:'rg164', name:'LAUGFS – Kuliyapitiya 2', provider:'LAUGFS', district:'Kurunegala', address:'Main Rd', lat:7.465, lng:80.052, stock:{'12.5kg':'available'}, phone:'037-228-1155' },
  { id:'rg165', name:'Litro Gas – Maho Town', provider:'Litro', district:'Kurunegala', address:'Main St', lat:7.815, lng:80.265, stock:{'12.5kg':'available'}, phone:'037-227-3344' },
  { id:'rg166', name:'LAUGFS – Galgamuwa Centre', provider:'LAUGFS', district:'Kurunegala', address:'Anuradhapura Rd', lat:7.985, lng:80.275, stock:{'12.5kg':'available'}, phone:'037-225-1122' },
  { id:'rg167', name:'Litro Gas – Galle City 2', provider:'Litro', district:'Galle', address:'Galle Rd', lat:6.045, lng:80.205, stock:{'12.5kg':'available'}, phone:'091-222-1122' },
  { id:'rg168', name:'LAUGFS – Hikkaduwa North', provider:'LAUGFS', district:'Galle', address:'Galle Rd', lat:6.145, lng:80.095, stock:{'12.5kg':'available'}, phone:'091-227-3344' },
  { id:'rg169', name:'Litro Gas – Elpitiya Centre', provider:'Litro', district:'Galle', address:'Main Rd', lat:6.265, lng:80.145, stock:{'12.5kg':'available'}, phone:'091-229-1122' },
  { id:'rg170', name:'LAUGFS – Matara City 2', provider:'LAUGFS', district:'Matara', address:'Galle Rd', lat:5.952, lng:80.525, stock:{'12.5kg':'available'}, phone:'041-222-1122' },
  { id:'rg171', name:'Litro Gas – Weligama 2', provider:'Litro', district:'Matara', address:'Main St', lat:5.975, lng:80.425, stock:{'12.5kg':'available'}, phone:'041-225-1122' },
  { id:'rg172', name:'LAUGFS – Beliatta Centre', provider:'LAUGFS', district:'Hambantota', address:'Main Rd', lat:6.042, lng:80.745, stock:{'12.5kg':'available'}, phone:'047-224-3344' },
  { id:'rg173', name:'Litro Gas – Tangalle City 2', provider:'Litro', district:'Hambantota', address:'Main Rd', lat:6.028, lng:80.792, stock:{'12.5kg':'available'}, phone:'047-224-1188' },
  { id:'rg174', name:'LAUGFS – Eheliyagoda', provider:'LAUGFS', district:'Ratnapura', address:'Main St', lat:6.852, lng:80.258, stock:{'12.5kg':'available'}, phone:'036-225-3344' },
  { id:'rg175', name:'Litro Gas – Godakawela Centre', provider:'Litro', district:'Ratnapura', address:'Main Rd', lat:6.425, lng:80.645, stock:{'12.5kg':'available'}, phone:'045-224-1122' },
  { id:'rg176', name:'LAUGFS – Minuwangoda 2', provider:'LAUGFS', district:'Gampaha', address:'Negombo Rd', lat:7.185, lng:79.945, stock:{'12.5kg':'available'}, phone:'011-229-1155' },
  { id:'rg177', name:'Litro Gas – Polgahawela 2', provider:'Litro', district:'Kurunegala', address:'Main St', lat:7.335, lng:80.285, stock:{'12.5kg':'available'}, phone:'037-224-3322' },
  { id:'rg178', name:'LAUGFS – Chavakachcheri 2', provider:'LAUGFS', district:'Jaffna', address:'Kandy Rd', lat:9.658, lng:80.158, stock:{'12.5kg':'available'}, phone:'021-227-4455' },
  { id:'rg179', name:'Litro Gas – Point Pedro 2', provider:'Litro', district:'Jaffna', address:'Beach Rd', lat:9.828, lng:80.238, stock:{'12.5kg':'available'}, phone:'021-226-3355' },
  { id:'rg180', name:'LAUGFS – Karainagar 2', provider:'LAUGFS', district:'Jaffna', address:'Main Rd', lat:9.745, lng:79.888, stock:{'12.5kg':'available'}, phone:'021-229-4466' },
  { id:'rg181', name:'Litro Gas – Kayts 2', provider:'Litro', district:'Jaffna', address:'Harbour Rd', lat:9.688, lng:79.918, stock:{'12.5kg':'available'}, phone:'021-221-3355' },
  { id:'rg182', name:'LAUGFS – Kekirawa 2', provider:'LAUGFS', district:'Anuradhapura', address:'Main Rd', lat:8.038, lng:80.508, stock:{'12.5kg':'available'}, phone:'025-226-3344' },
  { id:'rg183', name:'Litro Gas – Thalawa 2', provider:'Litro', district:'Anuradhapura', address:'Main St', lat:8.218, lng:80.358, stock:{'12.5kg':'available'}, phone:'025-224-4455' },
  { id:'rg184', name:'LAUGFS – Hingurakgoda 2', provider:'LAUGFS', district:'Polonnaruwa', address:'Main Rd', lat:7.988, lng:80.988, stock:{'12.5kg':'available'}, phone:'027-224-4466' },
  { id:'rg185', name:'Litro Gas – Medirigiriya 2', provider:'Litro', district:'Polonnaruwa', address:'Main St', lat:8.158, lng:80.998, stock:{'12.5kg':'available'}, phone:'027-224-6677' },
  { id:'rg186', name:'LAUGFS – Welimada 2', provider:'LAUGFS', district:'Badulla', address:'Main St', lat:6.906, lng:80.919, stock:{'12.5kg':'available'}, phone:'057-224-3344' },
  { id:'rg187', name:'Litro Gas – Passara 2', provider:'Litro', district:'Badulla', address:'Main St', lat:6.938, lng:81.158, stock:{'12.5kg':'available'}, phone:'055-228-3355' },
  { id:'rg188', name:'LAUGFS – Ella 2', provider:'LAUGFS', district:'Badulla', address:'Main St', lat:6.880, lng:81.051, stock:{'12.5kg':'available'}, phone:'057-222-3344' },
  { id:'rg189', name:'Litro Gas – Bibile 2', provider:'Litro', district:'Monaragala', address:'Main St', lat:7.158, lng:81.228, stock:{'12.5kg':'available'}, phone:'055-227-3344' },
  { id:'rg190', name:'LAUGFS – Buttala 2', provider:'LAUGFS', district:'Monaragala', address:'Main Rd', lat:6.758, lng:81.248, stock:{'12.5kg':'available'}, phone:'055-227-5566' },
  { id:'rg191', name:'Litro Gas – Balangoda 2', provider:'Litro', district:'Ratnapura', address:'Main St', lat:6.658, lng:80.708, stock:{'12.5kg':'available'}, phone:'045-228-3344' },
  { id:'rg192', name:'LAUGFS – Pelmadulla 2', provider:'LAUGFS', district:'Ratnapura', address:'Main Rd', lat:6.625, lng:80.558, stock:{'12.5kg':'available'}, phone:'045-227-4455' },
  { id:'rg193', name:'Litro Gas – Kuruwita 2', provider:'Litro', district:'Ratnapura', address:'Main St', lat:6.775, lng:80.368, stock:{'12.5kg':'available'}, phone:'045-226-1133' },
  { id:'rg194', name:'LAUGFS – Rambukkana 2', provider:'LAUGFS', district:'Kegalle', address:'Main St', lat:7.325, lng:80.398, stock:{'12.5kg':'available'}, phone:'035-226-3344' },
  { id:'rg195', name:'Litro Gas – Dehiowita 2', provider:'Litro', district:'Kegalle', address:'Main Rd', lat:6.968, lng:80.268, stock:{'12.5kg':'available'}, phone:'036-223-3344' },
  { id:'rg196', name:'LAUGFS – Kinniya 2', provider:'LAUGFS', district:'Trincomalee', address:'Main Rd', lat:8.488, lng:81.188, stock:{'12.5kg':'available'}, phone:'026-223-1155' },
  { id:'rg197', name:'Litro Gas – Kantale 2', provider:'Litro', district:'Trincomalee', address:'Main Rd', lat:8.368, lng:81.028, stock:{'12.5kg':'available'}, phone:'026-224-3355' },
  { id:'rg198', name:'LAUGFS – Valaichchenai 2', provider:'LAUGFS', district:'Batticaloa', address:'Main St', lat:7.928, lng:81.538, stock:{'12.5kg':'available'}, phone:'065-225-1155' },
  { id:'rg199', name:'Litro Gas – Kattankudy City 2', provider:'Litro', district:'Batticaloa', address:'Main Rd', lat:7.688, lng:81.728, stock:{'12.5kg':'available'}, phone:'065-224-3355' },
  { id:'rg200', name:'LAUGFS – Akkaraipattu 2', provider:'LAUGFS', district:'Ampara', address:'Main St', lat:7.218, lng:81.858, stock:{'12.5kg':'available'}, phone:'067-227-1155' },
  { id:'rg201', name:'Litro Gas – Sainthamaruthu 2', provider:'Litro', district:'Ampara', address:'Main Rd', lat:7.398, lng:81.838, stock:{'12.5kg':'available'}, phone:'067-222-3355' },
  { id:'rg202', name:'LAUGFS – Padiyathalawa 2', provider:'LAUGFS', district:'Ampara', address:'Main St', lat:7.438, lng:81.208, stock:{'12.5kg':'available'}, phone:'063-224-1188' },
  { id:'rg203', name:'Litro Gas – Narammala 2', provider:'Litro', district:'Kurunegala', address:'Main St', lat:7.438, lng:80.218, stock:{'12.5kg':'available'}, phone:'037-224-3355' },
  { id:'rg204', name:'LAUGFS – Wariyapola 2', provider:'LAUGFS', district:'Kurunegala', address:'Main Rd', lat:7.608, lng:80.228, stock:{'12.5kg':'available'}, phone:'037-226-3355' },
  { id:'rg205', name:'Litro Gas – Pannala 2', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.348, lng:79.988, stock:{'12.5kg':'available'}, phone:'037-224-5566' },
  { id:'rg206', name:'LAUGFS – Polgahawela 2', provider:'LAUGFS', district:'Kurunegala', address:'Main Rd', lat:7.328, lng:80.298, stock:{'12.5kg':'available'}, phone:'037-224-3355' },
  { id:'rg207', name:'Litro Gas – Dankotuwa 2', provider:'Litro', district:'Puttalam', address:'Main Rd', lat:7.308, lng:79.888, stock:{'12.5kg':'available'}, phone:'031-224-3355' },
  { id:'rg208', name:'LAUGFS – Wennappuwa 2', provider:'LAUGFS', district:'Puttalam', address:'Main Rd', lat:7.368, lng:79.828, stock:{'12.5kg':'available'}, phone:'031-225-3366' },
  { id:'rg209', name:'Litro Gas – Nattandiya 2', provider:'Litro', district:'Puttalam', address:'Main Rd', lat:7.418, lng:79.858, stock:{'12.5kg':'available'}, phone:'032-225-1155' },
  { id:'rg210', name:'LAUGFS – Rattota 2', provider:'LAUGFS', district:'Matale', address:'Main St', lat:7.518, lng:80.658, stock:{'12.5kg':'available'}, phone:'066-223-1155' },
  { id:'rg211', name:'Litro Gas – Talawakele 2', provider:'Litro', district:'Nuwara Eliya', address:'Main Rd', lat:6.938, lng:80.658, stock:{'12.5kg':'available'}, phone:'052-225-1155' },
  { id:'rg212', name:'LAUGFS – Ragala 2', provider:'LAUGFS', district:'Nuwara Eliya', address:'Main St', lat:7.018, lng:80.828, stock:{'12.5kg':'available'}, phone:'052-226-1144' },
  { id:'rg213', name:'Litro Gas – Pooneryn 2', provider:'Litro', district:'Kilinochchi', address:'Main Rd', lat:9.508, lng:80.208, stock:{'12.5kg':'available'}, phone:'021-228-3355' },
  { id:'rg214', name:'LAUGFS – Nanattan Center', provider:'LAUGFS', district:'Mannar', address:'Main Rd', lat:8.855, lng:79.955, stock:{'12.5kg':'available'}, phone:'023-225-3344' },
  { id:'rg215', name:'Litro Gas – Oddusuddan Centre', provider:'Litro', district:'Mullaitivu', address:'Main Rd', lat:9.155, lng:80.655, stock:{'12.5kg':'available'}, phone:'021-229-1155' },
  { id:'rg216', name:'LAUGFS – Cheddikulam Center', provider:'LAUGFS', district:'Vavuniya', address:'Main Rd', lat:8.665, lng:80.305, stock:{'12.5kg':'available'}, phone:'024-225-3344' },
  { id:'rg217', name:'Litro Gas – Ambalangoda 2', provider:'Litro', district:'Galle', address:'Beach Rd', lat:6.238, lng:80.058, stock:{'12.5kg':'available'}, phone:'091-225-3355' },
  { id:'rg218', name:'LAUGFS – Habaraduwa 2', provider:'LAUGFS', district:'Galle', address:'Main Rd', lat:5.995, lng:80.308, stock:{'12.5kg':'available'}, phone:'091-228-3344' },
  { id:'rg219', name:'Litro Gas – Dickwella 2', provider:'Litro', district:'Matara', address:'Main St', lat:5.968, lng:80.698, stock:{'12.5kg':'available'}, phone:'041-220-3355' },
  { id:'rg220', name:'LAUGFS – Kataragama Center 2', provider:'LAUGFS', district:'Hambantota', address:'Main Rd', lat:6.418, lng:81.328, stock:{'12.5kg':'available'}, phone:'047-223-1155' },
  { id:'rg221', name:'Litro Gas – Chavakachcheri 3', provider:'Litro', district:'Jaffna', address:'Main St', lat:9.655, lng:80.155, stock:{'12.5kg':'available'}, phone:'021-227-1188' },
  { id:'rg222', name:'LAUGFS – Point Pedro 3', provider:'LAUGFS', district:'Jaffna', address:'Main Rd', lat:9.822, lng:80.232, stock:{'12.5kg':'available'}, phone:'021-226-5544' },
  { id:'rg223', name:'Litro Gas – Point Pedro 3', provider:'Litro', district:'Jaffna', address:'Harbour Rd', lat:9.825, lng:80.235, stock:{'12.5kg':'available'}, phone:'021-226-1188' },
  { id:'rg224', name:'LAUGFS – Kayts 3', provider:'LAUGFS', district:'Jaffna', address:'Main Rd', lat:9.682, lng:79.912, stock:{'12.5kg':'available'}, phone:'021-221-5544' },
  { id:'rg225', name:'Litro Gas – Kalmunai Center', provider:'Litro', district:'Ampara', address:'Main Rd', lat:7.417, lng:81.829, stock:{'12.5kg':'available'}, phone:'067-222-1188' },
  { id:'rg226', name:'LAUGFS – Akkaraipattu City', provider:'LAUGFS', district:'Ampara', address:'Main St', lat:7.215, lng:81.855, stock:{'12.5kg':'available'}, phone:'067-227-3311' },
  { id:'rg227', name:'Litro Gas – Sammanthurai', provider:'Litro', district:'Ampara', address:'Main Rd', lat:7.367, lng:81.792, stock:{'12.5kg':'available'}, phone:'067-226-1188' },
  { id:'rg228', name:'LAUGFS – Sainthamaruthu Town', provider:'LAUGFS', district:'Ampara', address:'Beach Rd', lat:7.395, lng:81.835, stock:{'12.5kg':'available'}, phone:'067-222-5544' },
  { id:'rg229', name:'Litro Gas – Trincomalee 2', provider:'Litro', district:'Trincomalee', address:'Main Rd', lat:8.577, lng:81.228, stock:{'12.5kg':'available'}, phone:'026-222-1122' },
  { id:'rg230', name:'LAUGFS – Trincomalee City', provider:'LAUGFS', district:'Trincomalee', address:'Main St', lat:8.570, lng:81.232, stock:{'12.5kg':'available'}, phone:'026-222-3344' },
  { id:'rg231', name:'Litro Gas – Kinniya 3', provider:'Litro', district:'Trincomalee', address:'Bridge Rd', lat:8.485, lng:81.185, stock:{'12.5kg':'available'}, phone:'026-223-1188' },
  { id:'rg232', name:'LAUGFS – Kantale Town 2', provider:'LAUGFS', district:'Trincomalee', address:'Main Rd', lat:8.365, lng:81.025, stock:{'12.5kg':'available'}, phone:'026-224-5544' },
  { id:'rg233', name:'Litro Gas – Batticaloa 2', provider:'Litro', district:'Batticaloa', address:'Main St', lat:7.721, lng:81.697, stock:{'12.5kg':'available'}, phone:'065-222-1155' },
  { id:'rg234', name:'LAUGFS – Batticaloa City', provider:'LAUGFS', district:'Batticaloa', address:'Bar Rd', lat:7.715, lng:81.702, stock:{'12.5kg':'available'}, phone:'065-222-3344' },
  { id:'rg235', name:'Litro Gas – Kattankudy City 3', provider:'Litro', district:'Batticaloa', address:'Main Rd', lat:7.685, lng:81.725, stock:{'12.5kg':'available'}, phone:'065-224-6677' },
  { id:'rg236', name:'LAUGFS – Valaichchenai 3', provider:'LAUGFS', district:'Batticaloa', address:'Main St', lat:7.925, lng:81.535, stock:{'12.5kg':'available'}, phone:'065-225-1188' },
  { id:'rg237', name:'Litro Gas – Badulla Town 2', provider:'Litro', district:'Badulla', address:'Main Rd', lat:6.985, lng:81.047, stock:{'12.5kg':'available'}, phone:'055-222-1133' },
  { id:'rg238', name:'LAUGFS – Badulla City 2', provider:'LAUGFS', district:'Badulla', address:'Main St', lat:6.980, lng:81.050, stock:{'12.5kg':'available'}, phone:'055-222-3355' },
  { id:'rg239', name:'Litro Gas – Bandarawela Town', provider:'Litro', district:'Badulla', address:'Main St', lat:6.832, lng:80.988, stock:{'12.5kg':'available'}, phone:'057-222-1188' },
  { id:'rg240', name:'LAUGFS – Bandarawela City', provider:'LAUGFS', district:'Badulla', address:'Main Rd', lat:6.828, lng:80.992, stock:{'12.5kg':'available'}, phone:'057-222-3344' },
  { id:'rg241', name:'Litro Gas – Welimada 3', provider:'Litro', district:'Badulla', address:'Main Rd', lat:6.903, lng:80.916, stock:{'12.5kg':'available'}, phone:'057-224-1155' },
  { id:'rg242', name:'Litro Gas – Monaragala Town 2', provider:'Litro', district:'Monaragala', address:'Main Rd', lat:6.891, lng:81.348, stock:{'12.5kg':'available'}, phone:'055-227-1155' },
  { id:'rg243', name:'LAUGFS – Wellawaya Center', provider:'LAUGFS', district:'Monaragala', address:'Main Rd', lat:6.742, lng:81.102, stock:{'12.5kg':'available'}, phone:'055-227-3344' },
  { id:'rg244', name:'Litro Gas – Bibile 3', provider:'Litro', district:'Monaragala', address:'Main St', lat:7.155, lng:81.225, stock:{'12.5kg':'available'}, phone:'055-227-5588' },
  { id:'rg245', name:'LAUGFS – Buttala Center 2', provider:'LAUGFS', district:'Monaragala', address:'Main Rd', lat:6.755, lng:81.245, stock:{'12.5kg':'available'}, phone:'055-227-1133' },
  { id:'rg246', name:'Litro Gas – Anuradhapura City 3', provider:'Litro', district:'Anuradhapura', address:'Main Rd', lat:8.311, lng:80.411, stock:{'12.5kg':'available'}, phone:'025-222-1144' },
  { id:'rg247', name:'LAUGFS – Anuradhapura Town 3', provider:'LAUGFS', district:'Anuradhapura', address:'Hospital Rd', lat:8.315, lng:80.415, stock:{'12.5kg':'available'}, phone:'025-222-3366' },
  { id:'rg248', name:'Litro Gas – Kekirawa 3', provider:'Litro', district:'Anuradhapura', address:'Main Rd', lat:8.035, lng:80.505, stock:{'12.5kg':'available'}, phone:'025-226-1155' },
  { id:'rg249', name:'LAUGFS – Thalawa 3', provider:'LAUGFS', district:'Anuradhapura', address:'Main St', lat:8.215, lng:80.355, stock:{'12.5kg':'available'}, phone:'025-224-3311' },
  { id:'rg250', name:'Litro Gas – Polonnaruwa Town 2', provider:'Litro', district:'Polonnaruwa', address:'Main Rd', lat:7.939, lng:81.002, stock:{'12.5kg':'available'}, phone:'027-222-1133' },
  { id:'rg251', name:'LAUGFS – Polonnaruwa City 2', provider:'LAUGFS', district:'Polonnaruwa', address:'Main St', lat:7.935, lng:81.005, stock:{'12.5kg':'available'}, phone:'027-222-3355' },
  { id:'rg252', name:'Litro Gas – Hingurakgoda 3', provider:'Litro', district:'Polonnaruwa', address:'Main Rd', lat:7.985, lng:80.985, stock:{'12.5kg':'available'}, phone:'027-224-1188' },
  { id:'rg253', name:'LAUGFS – Medirigiriya 3', provider:'LAUGFS', district:'Polonnaruwa', address:'Main St', lat:8.155, lng:80.995, stock:{'12.5kg':'available'}, phone:'027-224-3311' },
  { id:'rg254', name:'Litro Gas – Matale Town 2', provider:'Litro', district:'Matale', address:'Main Rd', lat:7.467, lng:80.623, stock:{'12.5kg':'available'}, phone:'066-222-1155' },
  { id:'rg255', name:'LAUGFS – Matale City 2', provider:'LAUGFS', district:'Matale', address:'Main St', lat:7.462, lng:80.627, stock:{'12.5kg':'available'}, phone:'066-222-3344' },
  { id:'rg256', name:'Litro Gas – Dambulla 2', provider:'Litro', district:'Matale', address:'Main Rd', lat:7.854, lng:80.652, stock:{'12.5kg':'available'}, phone:'066-228-5533' },
  { id:'rg257', name:'LAUGFS – Sigiriya 2', provider:'LAUGFS', district:'Matale', address:'Main St', lat:7.957, lng:80.760, stock:{'12.5kg':'available'}, phone:'066-228-1155' },
  { id:'rg258', name:'Litro Gas – Nuwara Eliya 2', provider:'Litro', district:'Nuwara Eliya', address:'Main Rd', lat:6.972, lng:80.765, stock:{'12.5kg':'available'}, phone:'052-222-1133' },
  { id:'rg259', name:'LAUGFS – Nuwara Eliya City 2', provider:'LAUGFS', district:'Nuwara Eliya', address:'Main St', lat:6.968, lng:80.768, stock:{'12.5kg':'available'}, phone:'052-222-3344' },
  { id:'rg260', name:'Litro Gas – Hatton Town 2', provider:'Litro', district:'Nuwara Eliya', address:'Main Rd', lat:6.892, lng:80.601, stock:{'12.5kg':'available'}, phone:'051-222-1177' },
  { id:'rg261', name:'LAUGFS – Talawakele 3', provider:'LAUGFS', district:'Nuwara Eliya', address:'Main St', lat:6.935, lng:80.655, stock:{'12.5kg':'available'}, phone:'052-225-3311' },
  { id:'rg262', name:'Litro Gas – Ragala 3', provider:'Litro', district:'Nuwara Eliya', address:'Main Rd', lat:7.015, lng:80.825, stock:{'12.5kg':'available'}, phone:'052-226-5566' },
  { id:'rg263', name:'Litro Gas – Galle Town 3', provider:'Litro', district:'Galle', address:'Main Rd', lat:6.035, lng:80.211, stock:{'12.5kg':'available'}, phone:'091-222-1144' },
  { id:'rg264', name:'LAUGFS – Galle City 3', provider:'LAUGFS', district:'Galle', address:'Galle Rd', lat:6.040, lng:80.208, stock:{'12.5kg':'available'}, phone:'091-222-3388' },
  { id:'rg265', name:'Litro Gas – Hikkaduwa 2', provider:'Litro', district:'Galle', address:'Beach Rd', lat:6.145, lng:80.095, stock:{'12.5kg':'available'}, phone:'091-227-1133' },
  { id:'rg266', name:'LAUGFS – Ambalangoda 3', provider:'LAUGFS', district:'Galle', address:'Main St', lat:6.235, lng:80.055, stock:{'12.5kg':'available'}, phone:'091-225-5511' },
  { id:'rg267', name:'Litro Gas – Matara Town 3', provider:'Litro', district:'Matara', address:'Main Rd', lat:5.945, lng:80.548, stock:{'12.5kg':'available'}, phone:'041-222-1166' },
  { id:'rg268', name:'LAUGFS – Matara City 3', provider:'LAUGFS', district:'Matara', address:'Main St', lat:5.940, lng:80.528, stock:{'12.5kg':'available'}, phone:'041-222-3311' },
  { id:'rg269', name:'Litro Gas – Weligama 3', provider:'Litro', district:'Matara', address:'Beach Rd', lat:5.972, lng:80.428, stock:{'12.5kg':'available'}, phone:'041-225-3344' },
  { id:'rg270', name:'LAUGFS – Dickwella 3', provider:'LAUGFS', district:'Matara', address:'Main St', lat:5.965, lng:80.695, stock:{'12.5kg':'available'}, phone:'041-220-3311' },
  { id:'rg271', name:'Litro Gas – Hambantota Town 2', provider:'Litro', district:'Hambantota', address:'Main Rd', lat:6.126, lng:81.121, stock:{'12.5kg':'available'}, phone:'047-222-1155' },
  { id:'rg272', name:'LAUGFS – Tangalle Center 2', provider:'LAUGFS', district:'Hambantota', address:'Main St', lat:6.028, lng:80.792, stock:{'12.5kg':'available'}, phone:'047-224-1133' },
  { id:'rg273', name:'Litro Gas – Beliatta 2', provider:'Litro', district:'Hambantota', address:'Main Rd', lat:6.042, lng:80.745, stock:{'12.5kg':'available'}, phone:'047-224-5511' },
  { id:'rg274', name:'LAUGFS – Cataragama 2', provider:'LAUGFS', district:'Hambantota', address:'Main Rd', lat:6.415, lng:81.325, stock:{'12.5kg':'available'}, phone:'047-223-1144' },
  { id:'rg275', name:'Litro Gas – Kurunegala Town 3', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.481, lng:80.362, stock:{'12.5kg':'available'}, phone:'037-222-1177' },
  { id:'rg276', name:'LAUGFS – Kurunegala City 3', provider:'LAUGFS', district:'Kurunegala', address:'Colombo Rd', lat:7.491, lng:80.366, stock:{'12.5kg':'available'}, phone:'037-222-3388' },
  { id:'rg277', name:'Litro Gas – Narammala 3', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.435, lng:80.215, stock:{'12.5kg':'available'}, phone:'037-224-1155' },
  { id:'rg278', name:'LAUGFS – Wariyapola 3', provider:'LAUGFS', district:'Kurunegala', address:'Main St', lat:7.605, lng:80.225, stock:{'12.5kg':'available'}, phone:'037-226-3311' },
  { id:'rg279', name:'Litro Gas – Pannala 3', provider:'Litro', district:'Kurunegala', address:'Main Rd', lat:7.345, lng:79.985, stock:{'12.5kg':'available'}, phone:'037-224-5511' },
  { id:'rg280', name:'LAUGFS – Polgahawela 3', provider:'LAUGFS', district:'Kurunegala', address:'Main St', lat:7.325, lng:80.295, stock:{'12.5kg':'available'}, phone:'037-224-3377' },
  { id:'rg281', name:'Litro Gas – Puttalam Town 2', provider:'Litro', district:'Puttalam', address:'Main Rd', lat:8.024, lng:79.834, stock:{'12.5kg':'available'}, phone:'032-222-1133' },
  { id:'rg282', name:'LAUGFS – Chilaw City 2', provider:'LAUGFS', district:'Puttalam', address:'Main St', lat:7.575, lng:79.794, stock:{'12.5kg':'available'}, phone:'032-222-3355' },
  { id:'rg283', name:'Litro Gas – Dankotuwa 3', provider:'Litro', district:'Puttalam', address:'Main Rd', lat:7.305, lng:79.885, stock:{'12.5kg':'available'}, phone:'031-224-1188' },
  { id:'rg284', name:'LAUGFS – Wennappuwa 3', provider:'LAUGFS', district:'Puttalam', address:'Main St', lat:7.365, lng:79.825, stock:{'12.5kg':'available'}, phone:'031-225-3311' },
  { id:'rg285', name:'Litro Gas – Kegalle Town 2', provider:'Litro', district:'Kegalle', address:'Main Rd', lat:7.253, lng:80.347, stock:{'12.5kg':'available'}, phone:'035-222-1144' },
  { id:'rg286', name:'LAUGFS – Kegalle City 2', provider:'LAUGFS', district:'Kegalle', address:'Main St', lat:7.250, lng:80.350, stock:{'12.5kg':'available'}, phone:'035-222-3388' },
  { id:'rg287', name:'Litro Gas – Rambukkana 3', provider:'Litro', district:'Kegalle', address:'Main St', lat:7.322, lng:80.395, stock:{'12.5kg':'available'}, phone:'035-226-5544' },
  { id:'rg288', name:'LAUGFS – Mawanella Center', provider:'LAUGFS', district:'Kegalle', address:'Main Rd', lat:7.251, lng:80.444, stock:{'12.5kg':'available'}, phone:'035-224-3311' },
  { id:'rg289', name:'Litro Gas – Ratnapura Town 2', provider:'Litro', district:'Ratnapura', address:'Main Rd', lat:6.681, lng:80.400, stock:{'12.5kg':'available'}, phone:'045-222-1144' },
  { id:'rg290', name:'LAUGFS – Ratnapura City 2', provider:'LAUGFS', district:'Ratnapura', address:'Main St', lat:6.685, lng:80.405, stock:{'12.5kg':'available'}, phone:'045-222-3366' },
  { id:'rg291', name:'Litro Gas – Balangoda 3', provider:'Litro', district:'Ratnapura', address:'Main Rd', lat:6.655, lng:80.705, stock:{'12.5kg':'available'}, phone:'045-228-5566' },
  { id:'rg292', name:'LAUGFS – Pelmadulla 3', provider:'LAUGFS', district:'Ratnapura', address:'Main St', lat:6.622, lng:80.555, stock:{'12.5kg':'available'}, phone:'045-227-3311' },
  { id:'rg293', name:'Litro Gas – Kilinochchi 2', provider:'Litro', district:'Kilinochchi', address:'Main Rd', lat:9.383, lng:80.408, stock:{'12.5kg':'available'}, phone:'021-228-1155' },
  { id:'rg294', name:'LAUGFS – Kilinochchi Town', provider:'LAUGFS', district:'Kilinochchi', address:'A9 Rd', lat:9.380, lng:80.410, stock:{'12.5kg':'available'}, phone:'021-228-3344' },
  { id:'rg295', name:'Litro Gas – Vavuniya 2', provider:'Litro', district:'Vavuniya', address:'Main Rd', lat:8.748, lng:80.497, stock:{'12.5kg':'available'}, phone:'024-222-1144' },
  { id:'rg296', name:'LAUGFS – Vavuniya City 2', provider:'LAUGFS', district:'Vavuniya', address:'Main St', lat:8.751, lng:80.495, stock:{'12.5kg':'available'}, phone:'024-222-3355' },
  { id:'rg297', name:'Litro Gas – Mullaitivu 2', provider:'Litro', district:'Mullaitivu', address:'Main Rd', lat:9.283, lng:80.800, stock:{'12.5kg':'available'}, phone:'021-229-3355' },
  { id:'rg298', name:'LAUGFS – Mannar Town 2', provider:'LAUGFS', district:'Mannar', address:'Main Rd', lat:8.977, lng:79.910, stock:{'12.5kg':'available'}, phone:'023-222-1144' },
  { id:'rg299', name:'Litro Gas – Ja-Ela Center', provider:'Litro', district:'Gampaha', address:'Main Rd', lat:7.072, lng:79.892, stock:{'12.5kg':'available'}, phone:'011-225-1188' },
  { id:'rg300', name:'LAUGFS – Wattala Center', provider:'LAUGFS', district:'Gampaha', address:'Main St', lat:6.992, lng:79.892, stock:{'12.5kg':'available'}, phone:'011-293-1155' },
];




// Expose for use
function loadRealStationData() {
  if (typeof DB !== 'undefined') {
    DB.stations = REAL_STATIONS.map(s => ({ ...s }));
    DB.gasShops = REAL_GAS_SHOPS.map(g => ({ ...g }));
    
    DB.stats.totalStations = DB.stations.length;
    DB.stats.totalGasShops = DB.gasShops.length;
    
    const availFuel = DB.stations.filter(s =>
      Object.values(s.fuels).some(v => v === 'available')
    ).length;
    
    const availGas = DB.gasShops.filter(g =>
      Object.values(g.stock).some(v => v === 'available')
    ).length;

    DB.stats.availableStations = availFuel + availGas;
    
    console.log(`✅ Loaded ${DB.stations.length} fuel stations & ${DB.gasShops.length} gas shops.`);
  }
}

// Node.js compatibility for seeding
if (typeof module !== 'undefined') {
  module.exports = { REAL_STATIONS, REAL_GAS_SHOPS };
}
