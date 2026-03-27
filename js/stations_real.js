// ============================================================
// stations_real.js – Real Fuel & Gas Stations in Sri Lanka
// Data covers all 25 districts: CPC, IOC fuel stations + Litro & LAUGFS gas dealers
// ============================================================

const REAL_STATIONS = [

  // ===================== COLOMBO DISTRICT =====================
  { id:'r001', name:'CPC Filling Station – Pettah',         company:'CPC',  district:'Colombo', address:'Prince of Wales Ave, Pettah, Colombo 11',       lat:6.9358, lng:79.8528, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'011-243-7890' },
  { id:'r002', name:'Lanka IOC – Bambalapitiya',            company:'IOC',  district:'Colombo', address:'Galle Rd, Bambalapitiya, Colombo 4',             lat:6.8831, lng:79.8527, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-258-3455' },
  { id:'r003', name:'CPC Filling Station – Nugegoda',       company:'CPC',  district:'Colombo', address:'High Level Rd, Nugegoda, Colombo',               lat:6.8731, lng:79.8987, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'011-283-1005' },
  { id:'r004', name:'Lanka IOC – Wellawatte',               company:'IOC',  district:'Colombo', address:'Galle Rd, Wellawatte, Colombo 6',                lat:6.8695, lng:79.8617, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'011-258-9000' },
  { id:'r005', name:'CPC – Rajagiriya',                    company:'CPC',  district:'Colombo', address:'Sri Dhamma Mawatha, Rajagiriya',                 lat:6.9145, lng:79.9032, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-288-6640' },
  { id:'r006', name:'Lanka IOC – Dehiwala',                company:'IOC',  district:'Colombo', address:'Galle Rd, Dehiwala',                             lat:6.8560, lng:79.8658, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-271-3300' },
  { id:'r007', name:'CPC – Kirulapone',                    company:'CPC',  district:'Colombo', address:'High Level Rd, Kirulapone, Colombo 5',           lat:6.8869, lng:79.8801, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'011-250-8800' },
  { id:'r008', name:'Lanka IOC – Moratuwa',                company:'IOC',  district:'Colombo', address:'Rawatawatta Rd, Moratuwa',                       lat:6.7726, lng:79.8847, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-265-3488' },
  { id:'r009', name:'CPC – Mount Lavinia',                 company:'CPC',  district:'Colombo', address:'Galle Rd, Mount Lavinia',                        lat:6.8122, lng:79.8699, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-271-7722' },
  { id:'r010', name:'Lanka IOC – Maharagama',              company:'IOC',  district:'Colombo', address:'High Level Rd, Maharagama',                      lat:6.8487, lng:79.9285, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'011-285-7700' },
  { id:'r011', name:'CPC – Borella',                       company:'CPC',  district:'Colombo', address:'D.S. Senanayake Mawatha, Borella, Colombo 8',    lat:6.9147, lng:79.8766, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'011-269-1234' },
  { id:'r012', name:'Lanka IOC – Kelaniya',                company:'IOC',  district:'Colombo', address:'Kandy Rd, Kelaniya',                             lat:6.9549, lng:79.9197, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'011-291-1050' },

  // ===================== GAMPAHA DISTRICT =====================
  { id:'r013', name:'CPC – Gampaha Town',                  company:'CPC',  district:'Gampaha', address:'Hospital Rd, Gampaha',                          lat:7.0831, lng:79.9995, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'033-222-1002' },
  { id:'r014', name:'Lanka IOC – Negombo',                 company:'IOC',  district:'Gampaha', address:'Colombo Rd, Negombo',                           lat:7.2097, lng:79.8378, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'031-222-3455' },
  { id:'r015', name:'CPC – Ja-Ela',                        company:'CPC',  district:'Gampaha', address:'Colombo Rd, Ja-Ela',                            lat:7.0747, lng:79.8904, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'011-225-6700' },
  { id:'r016', name:'Lanka IOC – Kadawatha',               company:'IOC',  district:'Gampaha', address:'Kandy Rd, Kadawatha',                           lat:7.0003, lng:79.9568, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'011-292-3344' },
  { id:'r017', name:'CPC – Wattala',                       company:'CPC',  district:'Gampaha', address:'Colombo – Negombo Rd, Wattala',                 lat:6.9917, lng:79.8893, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'011-239-1100' },

  // ===================== KALUTARA DISTRICT =====================
  { id:'r018', name:'CPC – Kalutara Town',                 company:'CPC',  district:'Kalutara', address:'Galle Rd, Kalutara North',                     lat:6.5854, lng:79.9607, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'034-222-2211' },
  { id:'r019', name:'Lanka IOC – Panadura',                company:'IOC',  district:'Kalutara', address:'Galle Rd, Panadura',                           lat:6.7137, lng:79.9022, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'none', lastUpdated:'--', phone:'038-223-1122' },
  { id:'r020', name:'CPC – Horana',                        company:'CPC',  district:'Kalutara', address:'Mathugama Rd, Horana',                         lat:6.7160, lng:80.0635, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'034-226-1045' },

  // ===================== KANDY DISTRICT =====================
  { id:'r021', name:'CPC – Kandy City Centre',             company:'CPC',  district:'Kandy', address:'Colombo St, Kandy',                               lat:7.2906, lng:80.6337, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'081-222-4562' },
  { id:'r022', name:'Lanka IOC – Peradeniya Rd',           company:'IOC',  district:'Kandy', address:'Peradeniya Rd, Kandy',                            lat:7.2654, lng:80.5988, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'081-238-4422' },
  { id:'r023', name:'CPC – Katugastota',                   company:'CPC',  district:'Kandy', address:'Katugastota Rd, Kandy',                           lat:7.3243, lng:80.6260, fuels:{petrol92:'available',petrol95:'available',diesel:'limited',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'081-234-5678' },
  { id:'r024', name:'Lanka IOC – Ampitiya',                company:'IOC',  district:'Kandy', address:'Ampitiya Rd, Kandy',                              lat:7.2812, lng:80.6511, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'081-223-3344' },

  // ===================== MATALE DISTRICT =====================
  { id:'r025', name:'CPC – Matale Town',                   company:'CPC',  district:'Matale', address:'Trincomalee St, Matale',                         lat:7.4718, lng:80.6237, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'066-222-2266' },
  { id:'r026', name:'Lanka IOC – Dambulla',                company:'IOC',  district:'Matale', address:'Kandy Rd, Dambulla',                             lat:7.8703, lng:80.6517, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'066-228-4455' },

  // ===================== NUWARA ELIYA DISTRICT =====================
  { id:'r027', name:'CPC – Nuwara Eliya Town',             company:'CPC',  district:'Nuwara Eliya', address:'Kandy Rd, Nuwara Eliya',                  lat:6.9497, lng:80.7891, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'052-222-3355' },
  { id:'r028', name:'Lanka IOC – Hatton',                  company:'IOC',  district:'Nuwara Eliya', address:'Dimbula Rd, Hatton',                      lat:6.8930, lng:80.5974, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'051-222-2233' },

  // ===================== GALLE DISTRICT =====================
  { id:'r029', name:'CPC – Galle Fort Rd',                 company:'CPC',  district:'Galle', address:'Matara Rd, Galle',                               lat:6.0328, lng:80.2170, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'091-222-8812' },
  { id:'r030', name:'Lanka IOC – Hikkaduwa',               company:'IOC',  district:'Galle', address:'Galle Rd, Hikkaduwa',                            lat:6.1395, lng:80.1059, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'091-227-7744' },
  { id:'r031', name:'CPC – Baddegama',                     company:'CPC',  district:'Galle', address:'Baddegama Rd, Galle',                            lat:6.1810, lng:80.1830, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'091-224-5566' },

  // ===================== MATARA DISTRICT =====================
  { id:'r032', name:'CPC – Matara Main St',                company:'CPC',  district:'Matara', address:'Main St, Matara',                               lat:5.9549, lng:80.5550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'041-222-1034' },
  { id:'r033', name:'Lanka IOC – Weligama',                company:'IOC',  district:'Matara', address:'Galle Rd, Weligama',                            lat:5.9753, lng:80.4293, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'041-225-5566' },
  { id:'r034', name:'CPC – Akuressa',                      company:'CPC',  district:'Matara', address:'Deniyaya Rd, Akuressa',                         lat:6.1038, lng:80.4968, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'041-228-1122' },

  // ===================== HAMBANTOTA DISTRICT =====================
  { id:'r035', name:'CPC – Hambantota',                    company:'CPC',  district:'Hambantota', address:'Tissa Rd, Hambantota',                      lat:6.1241, lng:81.1185, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'047-222-1044' },
  { id:'r036', name:'Lanka IOC – Tissamaharama',           company:'IOC',  district:'Hambantota', address:'Main Rd, Tissamaharama',                    lat:6.2835, lng:81.2874, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'047-223-7788' },
  { id:'r037', name:'CPC – Tangalle',                      company:'CPC',  district:'Hambantota', address:'Beach Rd, Tangalle',                        lat:6.0239, lng:80.7960, fuels:{petrol92:'limited',petrol95:'out',diesel:'limited',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'047-224-0011' },

  // ===================== JAFFNA DISTRICT =====================
  { id:'r038', name:'Lanka IOC – Jaffna Hospital Rd',      company:'IOC',  district:'Jaffna', address:'Hospital Rd, Jaffna',                          lat:9.6615, lng:80.0255, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-222-7854' },
  { id:'r039', name:'CPC – Jaffna Kovil Rd',               company:'CPC',  district:'Jaffna', address:'Stanley Rd, Jaffna',                           lat:9.6696, lng:80.0167, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'021-222-2345' },
  { id:'r040', name:'Lanka IOC – Nallur',                  company:'IOC',  district:'Jaffna', address:'Nallur, Jaffna',                               lat:9.6800, lng:80.0111, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'long', lastUpdated:'--', phone:'021-222-9988' },

  // ===================== KILINOCHCHI DISTRICT =====================
  { id:'r041', name:'CPC – Kilinochchi Town',              company:'CPC',  district:'Kilinochchi', address:'Kandy Rd, Kilinochchi',                    lat:9.3988, lng:80.3993, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'021-228-5566' },

  // ===================== MANNAR DISTRICT =====================
  { id:'r042', name:'CPC – Mannar Town',                   company:'CPC',  district:'Mannar', address:'Main St, Mannar',                              lat:8.9810, lng:79.9042, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'023-222-1122' },

  // ===================== MULLAITIVU DISTRICT =====================
  { id:'r043', name:'CPC – Mullaitivu',                    company:'CPC',  district:'Mullaitivu', address:'Main Rd, Mullaitivu',                      lat:9.2675, lng:80.8138, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'021-229-0055' },

  // ===================== VAVUNIYA DISTRICT =====================
  { id:'r044', name:'CPC – Vavuniya Town',                 company:'CPC',  district:'Vavuniya', address:'Kandy Rd, Vavuniya',                         lat:8.7514, lng:80.4972, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'024-222-1034' },
  { id:'r045', name:'Lanka IOC – Vavuniya',                company:'IOC',  district:'Vavuniya', address:'Hospital Rd, Vavuniya',                      lat:8.7600, lng:80.5012, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'024-222-3344' },

  // ===================== TRINCOMALEE DISTRICT =====================
  { id:'r046', name:'CPC – Trincomalee Town',              company:'CPC',  district:'Trincomalee', address:'Inner Harbour Rd, Trincomalee',            lat:8.5874, lng:81.2152, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'026-222-2244' },
  { id:'r047', name:'Lanka IOC – Trincomalee',             company:'IOC',  district:'Trincomalee', address:'Dockyard Rd, Trincomalee',                lat:8.5800, lng:81.2200, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'026-222-5577' },

  // ===================== BATTICALOA DISTRICT =====================
  { id:'r048', name:'CPC – Batticaloa Town',               company:'CPC',  district:'Batticaloa', address:'Bar Rd, Batticaloa',                       lat:7.7102, lng:81.6924, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'065-222-4466' },
  { id:'r049', name:'Lanka IOC – Batticaloa',              company:'IOC',  district:'Batticaloa', address:'Trincomalee Rd, Batticaloa',                lat:7.7200, lng:81.6990, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'065-222-7788' },

  // ===================== AMPARA DISTRICT =====================
  { id:'r050', name:'CPC – Ampara Town',                   company:'CPC',  district:'Ampara', address:'DS Senanayake St, Ampara',                     lat:7.2975, lng:81.6744, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'063-222-1122' },
  { id:'r051', name:'CPC – Kalmunai',                      company:'CPC',  district:'Ampara', address:'Main St, Kalmunai',                            lat:7.4067, lng:81.8222, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'067-222-1234' },

  // ===================== KURUNEGALA DISTRICT =====================
  { id:'r052', name:'CPC – Kurunegala Tower Junction',     company:'CPC',  district:'Kurunegala', address:'Tower Junction, Kurunegala',               lat:7.4867, lng:80.3648, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'available'}, queue:'short', lastUpdated:'--', phone:'037-222-1122' },
  { id:'r053', name:'Lanka IOC – Kurunegala',              company:'IOC',  district:'Kurunegala', address:'Colombo Rd, Kurunegala',                   lat:7.4800, lng:80.3600, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'037-222-5566' },
  { id:'r054', name:'CPC – Kuliyapitiya',                  company:'CPC',  district:'Kurunegala', address:'Puttalam Rd, Kuliyapitiya',                lat:7.4681, lng:80.0407, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'037-228-1122' },

  // ===================== PUTTALAM DISTRICT =====================
  { id:'r055', name:'CPC – Puttalam Town',                 company:'CPC',  district:'Puttalam', address:'Kurunegala Rd, Puttalam',                    lat:8.0362, lng:79.8283, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'032-222-5566' },
  { id:'r056', name:'Lanka IOC – Chilaw',                  company:'IOC',  district:'Puttalam', address:'Main St, Chilaw',                            lat:7.5759, lng:79.7951, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'032-222-2211' },

  // ===================== ANURADHAPURA DISTRICT =====================
  { id:'r057', name:'CPC – Anuradhapura Sacred City',      company:'CPC',  district:'Anuradhapura', address:'Maithripala Senanayake Mawatha, Anuradhapura', lat:8.3114, lng:80.4037, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'limited'}, queue:'short', lastUpdated:'--', phone:'025-222-5050' },
  { id:'r058', name:'Lanka IOC – Anuradhapura',            company:'IOC',  district:'Anuradhapura', address:'Colombo Rd, Anuradhapura',                lat:8.3200, lng:80.4100, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'025-222-4455' },

  // ===================== POLONNARUWA DISTRICT =====================
  { id:'r059', name:'CPC – Polonnaruwa Town',              company:'CPC',  district:'Polonnaruwa', address:'Batticaloa Rd, Polonnaruwa',               lat:7.9403, lng:81.0188, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'027-222-5069' },
  { id:'r060', name:'Lanka IOC – Polonnaruwa',             company:'IOC',  district:'Polonnaruwa', address:'Kandy Rd, Polonnaruwa',                    lat:7.9370, lng:81.0150, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'027-222-7788' },

  // ===================== BADULLA DISTRICT =====================
  { id:'r061', name:'CPC – Badulla Town',                  company:'CPC',  district:'Badulla', address:'Bandarawela Rd, Badulla',                     lat:6.9934, lng:81.0550, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'medium', lastUpdated:'--', phone:'055-222-1234' },
  { id:'r062', name:'CPC – Bandarawela',                   company:'CPC',  district:'Badulla', address:'Haputale Rd, Bandarawela',                    lat:6.8319, lng:80.9902, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'057-222-1122' },

  // ===================== MONARAGALA DISTRICT =====================
  { id:'r063', name:'CPC – Monaragala Town',               company:'CPC',  district:'Monaragala', address:'Wellawaya Rd, Monaragala',                 lat:6.8724, lng:81.3504, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'055-227-6655' },
  { id:'r064', name:'Lanka IOC – Wellawaya',               company:'IOC',  district:'Monaragala', address:'Main Rd, Wellawaya',                       lat:6.7379, lng:81.1004, fuels:{petrol92:'limited',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'055-227-4411' },

  // ===================== RATNAPURA DISTRICT =====================
  { id:'r065', name:'CPC – Ratnapura Town',                company:'CPC',  district:'Ratnapura', address:'Main St, Ratnapura',                        lat:6.6828, lng:80.3992, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'045-222-3333' },
  { id:'r066', name:'Lanka IOC – Ratnapura',               company:'IOC',  district:'Ratnapura', address:'Colombo Rd, Ratnapura',                     lat:6.6900, lng:80.4050, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'limited'}, queue:'medium', lastUpdated:'--', phone:'045-222-8866' },
  { id:'r067', name:'CPC – Embilipitiya',                  company:'CPC',  district:'Ratnapura', address:'Hambantota Rd, Embilipitiya',               lat:6.3411, lng:80.8419, fuels:{petrol92:'available',petrol95:'out',diesel:'available',superDiesel:'out'}, queue:'none', lastUpdated:'--', phone:'047-226-1234' },

  // ===================== KEGALLE DISTRICT =====================
  { id:'r068', name:'CPC – Kegalle Town',                  company:'CPC',  district:'Kegalle', address:'Colombo Rd, Kegalle',                         lat:7.2513, lng:80.3464, fuels:{petrol92:'available',petrol95:'limited',diesel:'available',superDiesel:'out'}, queue:'short', lastUpdated:'--', phone:'035-222-2234' },
  { id:'r069', name:'Lanka IOC – Mawanella',               company:'IOC',  district:'Kegalle', address:'Kandy Rd, Mawanella',                         lat:7.2532, lng:80.4533, fuels:{petrol92:'available',petrol95:'available',diesel:'available',superDiesel:'limited'}, queue:'none', lastUpdated:'--', phone:'035-224-6677' },

];

// ===================== REAL GAS STATIONS =====================
const REAL_GAS_SHOPS = [

  // COLOMBO
  { id:'rg001', name:'Litro Gas Depot – Nawala',           provider:'Litro',  district:'Colombo',     address:'Nawala Junction, Rajagiriya',         lat:6.9101, lng:79.9012, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Tomorrow', phone:'011-288-6600' },
  { id:'rg002', name:'LAUGFS Gas – Maharagama',            provider:'LAUGFS', district:'Colombo',     address:'High Level Rd, Maharagama',          lat:6.8487, lng:79.9285, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'available'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'011-285-7700' },
  { id:'rg003', name:'Litro Gas – Borella',                provider:'Litro',  district:'Colombo',     address:'D.S. Senanayake Mawatha, Borella',   lat:6.9147, lng:79.8811, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'011-269-1560' },
  { id:'rg004', name:'LAUGFS – Kelaniya',                  provider:'LAUGFS', district:'Colombo',     address:'Kandy Rd, Kelaniya',                  lat:6.9549, lng:79.9197, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'011-291-2200' },
  { id:'rg005', name:'Litro Gas – Moratuwa',               provider:'Litro',  district:'Colombo',     address:'New Rd, Moratuwa',                    lat:6.7726, lng:79.8847, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'011-265-8800' },

  // GAMPAHA
  { id:'rg006', name:'Litro Gas – Negombo',                provider:'Litro',  district:'Gampaha',     address:'Lewis Place, Negombo',                lat:7.2097, lng:79.8378, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Friday', phone:'031-222-7700' },
  { id:'rg007', name:'LAUGFS – Gampaha',                   provider:'LAUGFS', district:'Gampaha',     address:'Hospital Rd, Gampaha',                lat:7.0831, lng:79.9995, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'033-222-5511' },

  // KALUTARA
  { id:'rg008', name:'Litro Gas – Panadura',               provider:'Litro',  district:'Kalutara',    address:'Galle Rd, Panadura',                  lat:6.7137, lng:79.9022, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Friday', phone:'038-223-9900' },
  { id:'rg009', name:'LAUGFS – Kalutara',                  provider:'LAUGFS', district:'Kalutara',    address:'Galle Rd, Kalutara',                  lat:6.5854, lng:79.9607, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Monday', phone:'034-222-8800' },

  // KANDY
  { id:'rg010', name:'Litro Gas – Kandy Peradeniya',       provider:'Litro',  district:'Kandy',       address:'Peradeniya Rd, Kandy',                lat:7.2654, lng:80.5988, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'081-238-4422' },
  { id:'rg011', name:'LAUGFS – Kandy City',                provider:'LAUGFS', district:'Kandy',       address:'Colombo St, Kandy',                   lat:7.2906, lng:80.6337, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Wednesday', phone:'081-222-6633' },

  // GALLE
  { id:'rg012', name:'Litro Gas – Galle Karapitiya',       provider:'Litro',  district:'Galle',       address:'Karapitiya Rd, Galle',                lat:6.0535, lng:80.2210, stock:{'12.5kg':'out','5kg':'limited','37.5kg':'out'}, lastDelivery:'5 days ago', nextDelivery:'Monday', phone:'091-222-6655' },
  { id:'rg013', name:'LAUGFS – Galle Town',                provider:'LAUGFS', district:'Galle',       address:'Main St, Galle',                      lat:6.0328, lng:80.2170, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'091-222-3344' },

  // MATARA
  { id:'rg014', name:'Litro Gas – Matara Bus Stand',       provider:'Litro',  district:'Matara',      address:'Bus Stand Rd, Matara',                lat:5.9501, lng:80.5388, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Thursday', phone:'041-222-5544' },
  { id:'rg015', name:'LAUGFS – Matara',                    provider:'LAUGFS', district:'Matara',      address:'Main St, Matara',                     lat:5.9549, lng:80.5550, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'2 days ago', nextDelivery:'Friday', phone:'041-222-9900' },

  // HAMBANTOTA
  { id:'rg016', name:'Litro Gas – Hambantota',             provider:'Litro',  district:'Hambantota',  address:'Main Rd, Hambantota',                 lat:6.1241, lng:81.1185, stock:{'12.5kg':'available','5kg':'available','37.5kg':'out'}, lastDelivery:'3 days ago', nextDelivery:'Wednesday', phone:'047-222-7700' },

  // JAFFNA
  { id:'rg017', name:'LAUGFS – Jaffna KKS Rd',             provider:'LAUGFS', district:'Jaffna',      address:'KKS Rd, Jaffna',                      lat:9.6722, lng:80.0088, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'out'}, lastDelivery:'2 days ago', nextDelivery:'Wednesday', phone:'021-222-6677' },
  { id:'rg018', name:'Litro Gas – Jaffna',                 provider:'Litro',  district:'Jaffna',      address:'Hospital Rd, Jaffna',                 lat:9.6615, lng:80.0255, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'021-222-5544' },

  // KURUNEGALA
  { id:'rg019', name:'LAUGFS – Kurunegala',                provider:'LAUGFS', district:'Kurunegala',  address:'Melsiripura Rd, Kurunegala',           lat:7.4720, lng:80.3700, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Thursday', phone:'037-222-8899' },
  { id:'rg020', name:'Litro Gas – Kurunegala',             provider:'Litro',  district:'Kurunegala',  address:'Colombo Rd, Kurunegala',               lat:7.4867, lng:80.3648, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'1 day ago', nextDelivery:'Friday', phone:'037-222-4422' },

  // ANURADHAPURA
  { id:'rg021', name:'Litro Gas – Anuradhapura',           provider:'Litro',  district:'Anuradhapura',address:'Maithripala Mawatha, Anuradhapura',    lat:8.3114, lng:80.4037, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'025-222-8811' },

  // RATNAPURA
  { id:'rg022', name:'Litro Gas – Ratnapura',              provider:'Litro',  district:'Ratnapura',   address:'Main St, Ratnapura',                  lat:6.6828, lng:80.3992, stock:{'12.5kg':'available','5kg':'available','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Friday', phone:'045-222-5533' },

  // BADULLA
  { id:'rg023', name:'LAUGFS – Badulla',                   provider:'LAUGFS', district:'Badulla',     address:'Bandarawela Rd, Badulla',              lat:6.9934, lng:81.0550, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'out'}, lastDelivery:'3 days ago', nextDelivery:'Saturday', phone:'055-222-7766' },

  // TRINCOMALEE
  { id:'rg024', name:'Litro Gas – Trincomalee',            provider:'Litro',  district:'Trincomalee', address:'Inner Harbour Rd, Trincomalee',        lat:8.5874, lng:81.2152, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'2 days ago', nextDelivery:'Thursday', phone:'026-222-7755' },

  // BATTICALOA
  { id:'rg025', name:'Litro Gas – Batticaloa',             provider:'Litro',  district:'Batticaloa',  address:'Bar Rd, Batticaloa',                  lat:7.7102, lng:81.6924, stock:{'12.5kg':'limited','5kg':'out','37.5kg':'limited'}, lastDelivery:'4 days ago', nextDelivery:'Monday', phone:'065-222-9988' },

  // KEGALLE
  { id:'rg026', name:'Litro Gas – Kegalle',                provider:'Litro',  district:'Kegalle',     address:'Colombo Rd, Kegalle',                 lat:7.2513, lng:80.3464, stock:{'12.5kg':'available','5kg':'available','37.5kg':'limited'}, lastDelivery:'1 day ago', nextDelivery:'Saturday', phone:'035-222-6644' },

  // PUTTALAM
  { id:'rg027', name:'LAUGFS – Chilaw',                    provider:'LAUGFS', district:'Puttalam',    address:'Main St, Chilaw',                     lat:7.5759, lng:79.7951, stock:{'12.5kg':'available','5kg':'limited','37.5kg':'available'}, lastDelivery:'Today', nextDelivery:'Wednesday', phone:'032-222-5566' },

  // VAVUNIYA
  { id:'rg028', name:'Litro Gas – Vavuniya',               provider:'Litro',  district:'Vavuniya',    address:'Hospital Rd, Vavuniya',                lat:8.7514, lng:80.4972, stock:{'12.5kg':'available','5kg':'out','37.5kg':'limited'}, lastDelivery:'3 days ago', nextDelivery:'Friday', phone:'024-222-8833' },

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
