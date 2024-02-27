const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()

async function seeding() {
    // await prisma.user.create({
    //     data: {
    //         username: "admin",
    //         password: "admin1234",
    //         role: Role.ADMIN,
    //         firstName: "admin",
    //         lastName: "cc16",
    //     },
    // })

    await prisma.condo.createMany({
        data: [
            {
                name: "59 Heritage Condo",
                lat: "13.724464",
                long: "100.581770",
                district: "เขตวัฒนา",
                province: "กรุงเทพมหานคร",
                location: "18 ซอย สุขุมวิท 59 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",
                condoPic: "https://condodee.com/wp-content/uploads/59-Heritage-Sukhumvit-Bangkok-condominium-swimming.jpg",
            },
            {
                name: "พลัมคอนโด รามคำแหง สเตชั่น",
                lat: "13.7434154",
                long: "100.6030859",
                district: "เขตสวนหลวง",
                province: "กรุงเทพมหานคร",
                location: "1398 ถนน รามคำแหง แขวงสวนหลวง เขตสวนหลวง กรุงเทพมหานคร 10250",
                condoPic: "https://th.zmyhome.com/library/content/878/08-16-2022-12-24-431062264771_Original.jpg",
            },
            {
                name: "เดอะ ลอฟท์ อโศก",
                lat: "13.7467359",
                long: "100.5626015",
                district: "เขตวัฒนา",
                province: "กรุงเทพมหานคร",
                location: "243 ซอย สุขุมวิท 21 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",
                condoPic: "https://www.tooktee.com/images/project/3596/1550736335952.jpg",
            },
            {
                name: "หลังสวนวิลล์",
                lat: "13.739668",
                long: "100.5427051",
                district: "เขตปทุมวัน",
                province: "กรุงเทพมหานคร",
                location: "50 ซ.หลังสวน แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330",
                condoPic: "https://www.thaicozy.com/images/property/600x600_4923_467.jpg",
            },
            {
                name: "วิลล่า อโศก คอนโดมิเนียม",
                lat: "13.7485389",
                long: "100.5613557",
                district: "เขตราชเทวี",
                province: "กรุงเทพมหานคร",
                location: "1588 ถนน เพชรบุรีตัดใหม่ แขวงมักกะสัน เขตราชเทวี กรุงเทพมหานคร 10400",
                condoPic:
                    "https://herorealtor.com/wp-content/uploads/2019/02/BRE2050_For_Sale_Villa_Asoke_Condo_on_Asoke_Road_and_MRT_Petchburi_in_Bangkok_(2).jpg",
            },
            {
                name: "เดอะ แคปปิตอล คอนโด",
                lat: "13.764091",
                long: "100.5460332",
                district: "เขตพญาไท",
                province: "กรุงเทพมหานคร",
                location: "99 ถ. อโศก - ดินแดง แขวงสามเสนใน เขตพญาไท กรุงเทพมหานคร 10400",
                condoPic: "https://www.livinginsider.com/upload/project/624f0bb8db846_admin_49012.jpeg",
            },
            {
                name: "The Silk Aree 2 Condominium",
                lat: "13.7794345",
                long: "100.5411734",
                district: "เขตพญาไท",
                province: "กรุงเทพมหานคร",
                location: "ซอย พหลโยธิน 7 (อารีย์ 2) ถนนพหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400",
                condoPic:
                    "https://homefinderbangkok.com/wp-content/uploads/2019/07/the-silk-phaholyothin-aree-2-condo-bangkok-58f5f95c6d275e03d6000562_full-770x386.jpg",
            },
        ],
    })
}
// seeding()
