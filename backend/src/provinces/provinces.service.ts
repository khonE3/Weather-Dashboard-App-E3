import { Injectable } from '@nestjs/common';

interface Province {
    name: string;
    name_en: string;
    lat: number;
    lon: number;
}

@Injectable()
export class ProvincesService {
    private readonly provinces: Province[] = [
        { name: 'กรุงเทพมหานคร', name_en: 'Bangkok', lat: 13.7563, lon: 100.5018 },
        { name: 'กระบี่', name_en: 'Krabi', lat: 8.0863, lon: 98.9063 },
        { name: 'กาญจนบุรี', name_en: 'Kanchanaburi', lat: 14.0043, lon: 99.5483 },
        { name: 'กาฬสินธุ์', name_en: 'Kalasin', lat: 16.4315, lon: 103.5059 },
        { name: 'กำแพงเพชร', name_en: 'Kamphaeng Phet', lat: 16.4828, lon: 99.5229 },
        { name: 'ขอนแก่น', name_en: 'Khon Kaen', lat: 16.4419, lon: 102.8360 },
        { name: 'จันทบุรี', name_en: 'Chanthaburi', lat: 12.6111, lon: 102.1039 },
        { name: 'ฉะเชิงเทรา', name_en: 'Chachoengsao', lat: 13.6904, lon: 101.0779 },
        { name: 'ชลบุรี', name_en: 'Chon Buri', lat: 13.3611, lon: 100.9847 },
        { name: 'ชัยนาท', name_en: 'Chai Nat', lat: 15.1852, lon: 100.1251 },
        { name: 'ชัยภูมิ', name_en: 'Chaiyaphum', lat: 15.8068, lon: 102.0317 },
        { name: 'ชุมพร', name_en: 'Chumphon', lat: 10.4930, lon: 99.1800 },
        { name: 'เชียงราย', name_en: 'Chiang Rai', lat: 19.9105, lon: 99.8406 },
        { name: 'เชียงใหม่', name_en: 'Chiang Mai', lat: 18.7883, lon: 98.9853 },
        { name: 'ตรัง', name_en: 'Trang', lat: 7.5563, lon: 99.6114 },
        { name: 'ตราด', name_en: 'Trat', lat: 12.2428, lon: 102.5177 },
        { name: 'ตาก', name_en: 'Tak', lat: 16.8840, lon: 99.1259 },
        { name: 'นครนายก', name_en: 'Nakhon Nayok', lat: 14.2068, lon: 101.2131 },
        { name: 'นครปฐม', name_en: 'Nakhon Pathom', lat: 13.8196, lon: 100.0641 },
        { name: 'นครพนม', name_en: 'Nakhon Phanom', lat: 17.4110, lon: 104.7785 },
        { name: 'นครราชสีมา', name_en: 'Nakhon Ratchasima', lat: 14.9799, lon: 102.0978 },
        { name: 'นครศรีธรรมราช', name_en: 'Nakhon Si Thammarat', lat: 8.4304, lon: 99.9631 },
        { name: 'นครสวรรค์', name_en: 'Nakhon Sawan', lat: 15.7030, lon: 100.1371 },
        { name: 'นนทบุรี', name_en: 'Nonthaburi', lat: 13.8621, lon: 100.5144 },
        { name: 'นราธิวาส', name_en: 'Narathiwat', lat: 6.4263, lon: 101.8233 },
        { name: 'น่าน', name_en: 'Nan', lat: 18.7756, lon: 100.7730 },
        { name: 'บึงกาฬ', name_en: 'Bueng Kan', lat: 18.3609, lon: 103.6466 },
        { name: 'บุรีรัมย์', name_en: 'Buri Ram', lat: 14.9951, lon: 103.1029 },
        { name: 'ปทุมธานี', name_en: 'Pathum Thani', lat: 14.0208, lon: 100.5250 },
        { name: 'ประจวบคีรีขันธ์', name_en: 'Prachuap Khiri Khan', lat: 11.8126, lon: 99.7957 },
        { name: 'ปราจีนบุรี', name_en: 'Prachin Buri', lat: 14.0579, lon: 101.3726 },
        { name: 'ปัตตานี', name_en: 'Pattani', lat: 6.8686, lon: 101.2502 },
        { name: 'พระนครศรีอยุธยา', name_en: 'Phra Nakhon Si Ayutthaya', lat: 14.3692, lon: 100.5877 },
        { name: 'พะเยา', name_en: 'Phayao', lat: 19.1664, lon: 99.9019 },
        { name: 'พังงา', name_en: 'Phang Nga', lat: 8.4509, lon: 98.5253 },
        { name: 'พัทลุง', name_en: 'Phatthalung', lat: 7.6167, lon: 100.0833 },
        { name: 'พิจิตร', name_en: 'Phichit', lat: 16.4399, lon: 100.3488 },
        { name: 'พิษณุโลก', name_en: 'Phitsanulok', lat: 16.8211, lon: 100.2659 },
        { name: 'เพชรบุรี', name_en: 'Phetchaburi', lat: 13.1119, lon: 99.9398 },
        { name: 'เพชรบูรณ์', name_en: 'Phetchabun', lat: 16.4189, lon: 101.1591 },
        { name: 'แพร่', name_en: 'Phrae', lat: 18.1445, lon: 100.1403 },
        { name: 'ภูเก็ต', name_en: 'Phuket', lat: 7.8804, lon: 98.3923 },
        { name: 'มหาสารคาม', name_en: 'Maha Sarakham', lat: 16.1847, lon: 103.3009 },
        { name: 'มุกดาหาร', name_en: 'Mukdahan', lat: 16.5424, lon: 104.7235 },
        { name: 'แม่ฮ่องสอน', name_en: 'Mae Hong Son', lat: 19.3020, lon: 97.9654 },
        { name: 'ยโสธร', name_en: 'Yasothon', lat: 15.7944, lon: 104.1452 },
        { name: 'ยะลา', name_en: 'Yala', lat: 6.5411, lon: 101.2803 },
        { name: 'ร้อยเอ็ด', name_en: 'Roi Et', lat: 16.0538, lon: 103.6520 },
        { name: 'ระนอง', name_en: 'Ranong', lat: 9.9529, lon: 98.6085 },
        { name: 'ระยอง', name_en: 'Rayong', lat: 12.6814, lon: 101.2816 },
        { name: 'ราชบุรี', name_en: 'Ratchaburi', lat: 13.5282, lon: 99.8134 },
        { name: 'ลพบุรี', name_en: 'Lop Buri', lat: 14.8026, lon: 100.6535 },
        { name: 'ลำปาง', name_en: 'Lampang', lat: 18.2888, lon: 99.4909 },
        { name: 'ลำพูน', name_en: 'Lamphun', lat: 18.5744, lon: 99.0087 },
        { name: 'เลย', name_en: 'Loei', lat: 17.4860, lon: 101.7223 },
        { name: 'ศรีสะเกษ', name_en: 'Si Sa Ket', lat: 15.1186, lon: 104.3229 },
        { name: 'สกลนคร', name_en: 'Sakon Nakhon', lat: 17.1545, lon: 104.1348 },
        { name: 'สงขลา', name_en: 'Songkhla', lat: 7.1897, lon: 100.5953 },
        { name: 'สตูล', name_en: 'Satun', lat: 6.6238, lon: 100.0673 },
        { name: 'สมุทรปราการ', name_en: 'Samut Prakan', lat: 13.5990, lon: 100.5998 },
        { name: 'สมุทรสงคราม', name_en: 'Samut Songkhram', lat: 13.4098, lon: 100.0022 },
        { name: 'สมุทรสาคร', name_en: 'Samut Sakhon', lat: 13.5475, lon: 100.2744 },
        { name: 'สระแก้ว', name_en: 'Sa Kaeo', lat: 13.8240, lon: 102.0645 },
        { name: 'สระบุรี', name_en: 'Saraburi', lat: 14.5289, lon: 100.9103 },
        { name: 'สิงห์บุรี', name_en: 'Sing Buri', lat: 14.8936, lon: 100.3967 },
        { name: 'สุโขทัย', name_en: 'Sukhothai', lat: 17.0156, lon: 99.8230 },
        { name: 'สุพรรณบุรี', name_en: 'Suphan Buri', lat: 14.4744, lon: 100.1177 },
        { name: 'สุราษฎร์ธานี', name_en: 'Surat Thani', lat: 9.1382, lon: 99.3217 },
        { name: 'สุรินทร์', name_en: 'Surin', lat: 14.8818, lon: 103.4936 },
        { name: 'หนองคาย', name_en: 'Nong Khai', lat: 17.8783, lon: 102.7420 },
        { name: 'หนองบัวลำภู', name_en: 'Nong Bua Lam Phu', lat: 17.2216, lon: 102.4260 },
        { name: 'อ่างทอง', name_en: 'Ang Thong', lat: 14.5896, lon: 100.4549 },
        { name: 'อำนาจเจริญ', name_en: 'Amnat Charoen', lat: 15.8656, lon: 104.6258 },
        { name: 'อุดรธานี', name_en: 'Udon Thani', lat: 17.4138, lon: 102.7874 },
        { name: 'อุตรดิตถ์', name_en: 'Uttaradit', lat: 17.6200, lon: 100.0993 },
        { name: 'อุทัยธานี', name_en: 'Uthai Thani', lat: 15.3835, lon: 100.0245 },
        { name: 'อุบลราชธานี', name_en: 'Ubon Ratchathani', lat: 15.2286, lon: 104.8564 },
    ];

    getAllProvinces(): Province[] {
        return this.provinces;
    }

    searchProvinces(query: string): Province[] {
        const normalizedQuery = query.toLowerCase().trim();

        return this.provinces
            .filter(
                (province) =>
                    province.name.toLowerCase().includes(normalizedQuery) ||
                    province.name_en.toLowerCase().includes(normalizedQuery),
            )
            .slice(0, 10);
    }
}
