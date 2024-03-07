const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()

async function seeding() {
    // await prisma.user.create({
    //     data: {
    //         username: "john123",
    //         password: "123456",
    //         role: "USER",
    //         firstName: "john",
    //         lastName: "doe",
    //         email: "j@mail.com",
    //         mobile: "0890000000",
    //     },
    // })
    // await prisma.province.createMany({
    //     data: [
    //         {
    //             province: "กรุงเทพมหานคร",
    //         },
    //     ],
    // })
    // await prisma.facility.createMany({
    //     data: [
    //         {
    //             name: "Kitchen",
    //         },
    //         {
    //             name: "Bathtub",
    //         },
    //         {
    //             name: "Water heater",
    //         },
    //         {
    //             name: "Refrigerator",
    //         },
    //         {
    //             name: "Laundry",
    //         },
    //         {
    //             name: "Balcony",
    //         },
    //         {
    //             name: "TV",
    //         },
    //         {
    //             name: "Air-conditioner",
    //         },
    //         {
    //             name: "City view",
    //         },
    //         {
    //             name: "Elevator",
    //         },
    //         {
    //             name: "Free parking",
    //         },
    //         {
    //             name: "Fitness",
    //         },
    //         {
    //             name: "Co-working space",
    //         },
    //         {
    //             name: "Garden",
    //         },
    //         {
    //             name: "Swimming pool",
    //         },
    //         {
    //             name: "Rooftop",
    //         },
    //         {
    //             name: "Games room",
    //         },
    //         {
    //             name: "EV charging station",
    //         },
    //         {
    //             name: "Security",
    //         },
    //         {
    //             name: "Pet friendly",
    //         },
    //     ],
    // })
    // await prisma.district.createMany({
    //     data: [
    //         // {
    //         //     district: "คลองสาน",
    //         // },
    //         {
    //             district: "คลองสามวา",
    //         },
    //         {
    //             district: "คลองเตย",
    //         },
    //         {
    //             district: "คันนายาว",
    //         },
    //         {
    //             district: "จตุจักร",
    //         },
    //         {
    //             district: "จอมทอง",
    //         },
    //         {
    //             district: "ดอนเมือง",
    //         },
    //         {
    //             district: "ดินแดง",
    //         },
    //         {
    //             district: "ดุสิต",
    //         },
    //         {
    //             district: "ตลิ่งชัน",
    //         },
    //         {
    //             district: "ทวีวัฒนา",
    //         },
    //         {
    //             district: "ทุ่งครุ",
    //         },
    //         {
    //             district: "ธนบุรี",
    //         },
    //         {
    //             district: "บางกอกน้อย",
    //         },
    //         {
    //             district: "บางกอกใหญ่",
    //         },
    //         {
    //             district: "บางกะปิ",
    //         },
    //         {
    //             district: "บางขุนเทียน",
    //         },
    //         {
    //             district: "บางคอแหลม",
    //         },
    //         {
    //             district: "บางซื่อ",
    //         },
    //         {
    //             district: "บางนา",
    //         },
    //         {
    //             district: "บางบอน",
    //         },
    //         {
    //             district: "บางพลัด",
    //         },
    //         {
    //             district: "บางรัก",
    //         },
    //         {
    //             district: "บางเขน",
    //         },
    //         {
    //             district: "บางแค",
    //         },
    //         {
    //             district: "บึงกุ่ม",
    //         },
    //         {
    //             district: "ปทุมวัน",
    //         },
    //         {
    //             district: "ประเวศ",
    //         },
    //         {
    //             district: "ป้อมปราบศัตรูพ่าย",
    //         },
    //         {
    //             district: "พญาไท",
    //         },
    //         {
    //             district: "พระนคร",
    //         },
    //         {
    //             district: "พระโขนง",
    //         },
    //         {
    //             district: "ภาษีเจริญ",
    //         },
    //         {
    //             district: "มีนบุรี",
    //         },
    //         {
    //             district: "ยานนาวา",
    //         },
    //         {
    //             district: "ราชเทวี",
    //         },
    //         {
    //             district: "ราษฎร์บูรณะ",
    //         },
    //         {
    //             district: "ลาดกระบัง",
    //         },
    //         {
    //             district: "ลาดพร้าว",
    //         },
    //         {
    //             district: "วังทองหลาง",
    //         },
    //         {
    //             district: "วัฒนา",
    //         },
    //         {
    //             district: "สวนหลวง",
    //         },
    //         {
    //             district: "สะพานสูง",
    //         },
    //         {
    //             district: "สัมพันธวงศ์",
    //         },
    //         {
    //             district: "สาทร",
    //         },
    //         {
    //             district: "สายไหม",
    //         },
    //         {
    //             district: "หนองจอก",
    //         },
    //         {
    //             district: "หนองแขม",
    //         },
    //         {
    //             district: "หลักสี่",
    //         },
    //         {
    //             district: "ห้วยขวาง",
    //         },
    //     ],
    // })
    // await prisma.condo.createMany({
    //     data: [
    //         {
    //             nameTh: "59 Heritage Condo",
    //             nameEn: "59 Heritage Condo",
    //             lat: "13.724464",
    //             long: "100.581770",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "18 ซอย สุขุมวิท 59 แขวงคลองตันเหนือ",
    //             postCode: "10110",
    //             condoImage: "https://condodee.com/wp-content/uploads/59-Heritage-Sukhumvit-Bangkok-condominium-swimming.jpg",
    //         },
    //         {
    //             nameTh: "พลัมคอนโด รามคำแหง สเตชั่น",
    //             nameEn: "พลัมคอนโด รามคำแหง สเตชั่น",
    //             lat: "13.7434154",
    //             long: "100.6030859",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "1398 ถนน รามคำแหง แขวงสวนหลวง",
    //             postCode: "10250",
    //             condoImage: "https://th.zmyhome.com/library/content/878/08-16-2022-12-24-431062264771_Original.jpg",
    //         },
    //         {
    //             nameTh: "เดอะ ลอฟท์ อโศก",
    //             nameEn: "เดอะ ลอฟท์ อโศก",
    //             lat: "13.7467359",
    //             long: "100.5626015",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "243 ซอย สุขุมวิท 21 แขวงคลองเตยเหนือ",
    //             postCode: "10110",
    //             condoImage: "https://www.tooktee.com/images/project/3596/1550736335952.jpg",
    //         },
    //         {
    //             nameTh: "หลังสวนวิลล์",
    //             nameEn: "หลังสวนวิลล์",
    //             lat: "13.739668",
    //             long: "100.5427051",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "50 ซ.หลังสวน แขวงลุมพินี",
    //             postCode: "10330",
    //             condoImage: "https://www.thaicozy.com/images/property/600x600_4923_467.jpg",
    //         },
    //         {
    //             nameTh: "วิลล่า อโศก คอนโดมิเนียม",
    //             nameEn: "วิลล่า อโศก คอนโดมิเนียม",
    //             lat: "13.7485389",
    //             long: "100.5613557",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "1588 ถนน เพชรบุรีตัดใหม่ แขวงมักกะสัน",
    //             postCode: "10400",
    //             condoImage:
    //                 "https://herorealtor.com/wp-content/uploads/2019/02/BRE2050_For_Sale_Villa_Asoke_Condo_on_Asoke_Road_and_MRT_Petchburi_in_Bangkok_(2).jpg",
    //         },
    //         {
    //             nameTh: "เดอะ แคปปิตอล คอนโด",
    //             nameEn: "เดอะ แคปปิตอล คอนโด",
    //             lat: "13.764091",
    //             long: "100.5460332",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "99 ถ. อโศก - ดินแดง แขวงสามเสนใน",
    //             postCode: "10400",
    //             condoImage: "https://www.livinginsider.com/upload/project/624f0bb8db846_admin_49012.jpeg",
    //         },
    //         {
    //             nameTh: "The Silk Aree 2 Condominium",
    //             nameEn: "The Silk Aree 2 Condominium",
    //             lat: "13.7794345",
    //             long: "100.5411734",
    //             districtId: 1,
    //             provinceId: 1,
    //             location: "ซอย พหลโยธิน 7 (อารีย์ 2) ถนนพหลโยธิน แขวงพญาไท",
    //             postCode: "10400",
    //             condoImage:
    //                 "https://homefinderbangkok.com/wp-content/uploads/2019/07/the-silk-phaholyothin-aree-2-condo-bangkok-58f5f95c6d275e03d6000562_full-770x386.jpg",
    //         },
    //     ],
    // })
    await prisma.chat.createMany({
        data: [
            {
                senderId: 1,
                receiverId: 2,
                message: "hey",
            },
            {
                senderId: 1,
                receiverId: 2,
                message: "whatsup",
            },
            {
                senderId: 2,
                receiverId: 1,
                message: "hi",
            },
            {
                senderId: 2,
                receiverId: 1,
                message: "im gooood",
            },
            {
                senderId: 2,
                receiverId: 1,
                message: "wbu",
            },
            {
                senderId: 1,
                receiverId: 2,
                message: "good good",
            },
            {
                senderId: 1,
                receiverId: 2,
                message: "lets meet",
            },
            {
                senderId: 2,
                receiverId: 3,
                message: "boo",
            },
            {
                senderId: 3,
                receiverId: 2,
                message: "what",
            },
        ],
    })
}
// seeding()
