import { Description } from "@mui/icons-material";
import { IProduct } from "@/lib/models/interfaces/IProduct";
import { IProductCategory } from "@/lib/models/interfaces/IProductCategory";
import { ICompanyInfo } from "@/lib/models/interfaces/ICompanyInfo";
import { Types } from "mongoose";

const CompanyInfo: ICompanyInfo = {
  companyId: new Types.ObjectId(),
  companyName: "Imaginarium Of Vancouver",
  address: "150 - 2188 No.5 Road, Richmond, BC, V6X 2T1",
  email: "info@imaginariumofvancouver.com",
  phone: "604.447.1644",
};

const UiCarouselImages = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    redirectURL: "/",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=2000&h=1000&q=60",
  },
  {
    label: "Bird",
    redirectURL: "/",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=2000&h=1000&q=60",
  },
  {
    label: "Bali, Indonesia",
    redirectURL: "/",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&h=1000",
  },
  {
    label: "Goč, Serbia",
    redirectURL: "/",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=2000&h=1000&q=60",
  },
];

const Products: IProduct[] = [
  {
    productId: "1",
    sku: "SKU-1",
    defaultCategoryIds: ["all", "banner"],
    categoryIds: ["banner-stand"],
    productName: "Product 1",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/b/bbdrbs01_roll-up-banner-stands-02.jpg",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/b/bbdrbs01_roll-up-banner-stands-02.jpg",
      "https://swiperjs.com/demos/images/nature-1.jpg",
      "https://swiperjs.com/demos/images/nature-2.jpg",
      "https://swiperjs.com/demos/images/nature-3.jpg",
      "https://swiperjs.com/demos/images/nature-4.jpg",
      "https://swiperjs.com/demos/images/nature-5.jpg",
      "https://swiperjs.com/demos/images/nature-6.jpg",
      "https://swiperjs.com/demos/images/nature-7.jpg",
      "https://swiperjs.com/demos/images/nature-8.jpg",
      "https://swiperjs.com/demos/images/nature-9.jpg",
      "https://swiperjs.com/demos/images/nature-10.jpg",
    ],
    description: "This is a description for product 1",
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '12"x 12"',
            price: 15.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['12"x 12"', 15.99],
    bulkDiscounts: [
      {
        quantity: 10,
        percentageOff: 10,
      },
      {
        quantity: 50,
        percentageOff: 20,
      },
    ],
    promoPercentageOff: 0,
    isUploadFiles: false,
  },
  {
    productId: "2",
    sku: "SKU-2",
    defaultCategoryIds: ["all", "flag"],
    categoryIds: ["hand-flag"],
    productName: "Product 2",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/h/a/hand-flags-2.jpg",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/h/a/hand-flags-2.jpg",
      "https://swiperjs.com/demos/images/nature-1.jpg",
      "https://swiperjs.com/demos/images/nature-2.jpg",
      "https://swiperjs.com/demos/images/nature-3.jpg",
      "https://swiperjs.com/demos/images/nature-4.jpg",
      "https://swiperjs.com/demos/images/nature-5.jpg",
      "https://swiperjs.com/demos/images/nature-6.jpg",
      "https://swiperjs.com/demos/images/nature-7.jpg",
      "https://swiperjs.com/demos/images/nature-8.jpg",
      "https://swiperjs.com/demos/images/nature-9.jpg",
      "https://swiperjs.com/demos/images/nature-10.jpg",
    ],
    description: "This is a description for product 2",
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: "Large",
            price: 25.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Medium",
            price: 20.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Small",
            price: 15.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Custom Size",
            price: 4.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
      {
        optionName: "Color",
        selections: [
          {
            selectionName: "Red",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Blue",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Green",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Yellow",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Black",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },

          {
            selectionName: "Brown",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Grey",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Turquoise",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "White",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "Custom Color",
            price: 20,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
      {
        optionName: "Wind Flaps",
        selections: [
          {
            selectionName: "No",
            price: 0,
            hasExplainPic: true,
            explainPic:
              "https://cdn.bannerbuzz.ca/media/optionvalue/Wind-Flap_Alpha1No.jpg",
          },
          {
            selectionName: "Yes",
            price: 10.99,
            hasExplainPic: true,
            explainPic:
              "https://cdn.bannerbuzz.ca/media/optionvalue/Banner-Stands-Wind-Flaps-116x116.jpg.jpg",
          },
        ],
      },
      {
        optionName: "Write Your Text",
        selections: [
          {
            selectionName: "Custom Text",
            price: 10,
            hasExplainPic: false,
            explainPic: undefined,
          },
          {
            selectionName: "No Text",
            price: 0,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ["Large", 25.99],
    bulkDiscounts: [
      {
        quantity: 10,
        percentageOff: 15,
      },
      {
        quantity: 50,
        percentageOff: 25,
      },
    ],
    promoPercentageOff: 5,
    isUploadFiles: true,
  },
  {
    productId: "3",
    sku: "SKU-3",
    defaultCategoryIds: ["all", "business-card"],
    categoryIds: ["business-card", "best-sellers"], //save the last child
    productName: "Product 3",
    productCoverPic: "Not Found",
    productPics: [],
    description: "This is a description for product 3",
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "4",
    sku: "BBVBCB00",
    defaultCategoryIds: ["all", "best-sellers"],
    categoryIds: ["best-sellers"], //save the last child
    productName: "Custom Vinyl Banners",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/c/u/custom-vinyl-banner-white-bg.jpg",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/c/u/custom-vinyl-banners-2.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/c/u/custom-vinyl-banner-lifestyle.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_26__1.png",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/c/u/custom-vinyl-banner-dimensions.jpg",
    ],
    description: `Order Vinyl Banners For Brand Awareness 
    From grand openings to store sales, you can advertize your cause with our versatile vinyl banners. We offer a huge inventory of pre-designed vinyl banners to suit your advertizing needs. You can get the most out of these banners through custom sizing and personalizing. Get creative and create a persistent impression on your prospect customers now.
    
    You can create your own banner design with our easy-to-use online design tool, upload an image or hire a professional designer at an additional fee of $9.99. We print your custom designs in full colour, 720 DPI using eco solvent printing technology to ensure impactful visibility. You can then choose between printing your custom design on one or two sides.
    
     
    If you choose double-sided printing, the custom graphics on either side can be identical and different. Our vinyl display also comes with finishing options, lamination, hanging options, wind flaps, and many more accessories. You can get completely unique indoor and outdoor banners to suit your needs.
    
    We offer pre-defined sizes and custom sizes to choose from. Depending on your requirement, you can select your ideal banner size up to 10 ft width and height.
    
    High-Quality Durable Business Banners to Display Anywhere
    Our business banners can last for seven years, making them an excellent return on investment. They are durable enough to withstand outdoor elements over a period. We make them with high-quality PVC flex. Their graphic weight is 13 Oz and becomes 16 Oz after upgrading to a UV-resistant print.
    
    You can easily clean them using a soft, damp cloth without a cleaning solution. We make them ideal for both indoor and outdoor use, so that you can display your business banner anywhere.
    
    Bulk Quantity Discount on Eco-Solvent Banners
    We offer bulk discounts on purchase of eco-solvent banners in quantities ranging from 2 to 500. Check the eligibility and overview table to see the special discounts offered for your purchase. Place your order now!
    
    Shop Custom Vinyl Banners online at BannerBuzz.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "5",
    sku: "BBSTRE01",
    defaultCategoryIds: ["all", "banners", "vinyl-banner", "event-banners"],
    categoryIds: ["event-banners"], //save the last child
    productName: "Step and Repeat Banners",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_17_.png",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/s/t/step-and-repeat-banners.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/s/t/step-and-repeat-banners-1.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/s/t/step-and-repeat-banners-2.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/s/t/step-and-repeat-banners-4.jpg",
    ],
    description: `BannerBuzz is the most affordable online printing solutions platform for quality trade show displays, banner stands, and signages. Step and Repeat banners are one of the most selling display products that we offer. This ‘Step and Repeat Banner’ is custom printed in-house using full-color printing. We offer door-step delivery in the fastest turnaround time. This superior display product is also backed by the finest customer service. BannerBuzz has got you covered no matter what type of Step and Repeat Banner you are looking for. This highly competitive booth display solution is one of the most compelling ways to market your business and sponsors at any event. Get one for your business and watch how it helps you to grow your customer base and sell more products.

    Adjustable Telescopic Poles- Install Your Banner in Minutes
    A telescopic banner stand is one of the most versatile banners stands in the market today. The adjustable stand allows you to adjust the width and height to accommodate your banner. It works equally well for both- single and double-sided banner advertising. The steel base and aluminum stand make this banner extra-durable. If you order this step and repeat banner, these quick steps will help you set it up in minutes:
    
    Remove the banner from its caseAttach the side poles to the baseExtend the length of the side polesSlide your graphic through the side polesTake off the side bolts from the top and bottom of the polesPlace the side bolts into the slots near the top of the polesSlide the top pole through the graphicAdhere the top pole to the standPlace side bolts into the slots at the bottom of the polesSlide the bottom pole through the graphic
    Give Your Brand the Best Exposure and Your guests the best sharing experience
    Get your hands on this premium quality polyester fabric banner. This smooth and no glare fabric will help you to capture those perfect event pictures. Portable, easy to carry and install; you literally can’t go wrong with this step and repeat banner. Give your brand the best exposure and your guests the best sharing experience. Expand the reach of your product/service and get a much bigger audience with this super powerful advertising tool.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "6",
    sku: "BBVBCB01",
    defaultCategoryIds: ["all", "best-sellers"],
    categoryIds: ["best-sellers"], //save the last child
    productName: "Indoor Banners",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_17_.png",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners-4.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners_3.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banner-1.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/a/banner-finishing-options_10_2.jpg",
    ],
    description: `Indoor Banners are Durable, Customizable, and High-Quality
    Passing on your brand message to your target audience is necessary for many companies. Our vinyl custom banners offer you an effective way to attract new customers. Choose from various templates to make your unique brand designs.
    
    Made of high-quality PVC, these vinyl banners are durable and will convey your message to customers effectively for a long time. The UV-resistant material won't fade, retaining vibrant colours. These indoor marketing products are also ideal for outdoor events.
    
    With resolutions of up to 720 DPI, our store banners provide quality and sharp images that attract the customer's attention from a distance. Full-colour printing has a large gamut that provides quality and vibrant prints, ensuring every detail is visible.
    
    Our custom banners offer versatility with multiple options to choose from. They come in various sizes and graphics to suit the style of your brand. These customizable banners allow you to upload the artwork to make unique designs. Enhance your banners with accessories such as hanging clamp bars and nylon ropes.
    
    Portable and Eco-friendly Indoor Banners
    We use an eco-solvent printing mechanism to produce these vinyl banners. The biodegradable ink is safe for the environment and contains no harmful ingredients. These marketing materials contribute to sustainable business practices.
    
    Our lightweight store banners are easy to relocate to any of your events. They fold and unfold easily without leaving permanent wrinkles. Since they allow multiple uses, you don't have to purchase new banners, saving on your long-term ad spend.
    
    Vinyl Banners are Easy to Clean and Maintain
    Easy to clean, vinyl banners don't require detergents. These low-maintenance banners require simple dusting to achieve a clear new look. You can also gently wipe them with a damp, soft cloth, thus saving you time and money.
    
    Shop for indoor banners for your business online at BannerBuzz.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "6",
    sku: "BBVBCB01",
    defaultCategoryIds: ["all", "business-card"],
    categoryIds: ["business-card"], //save the last child
    productName: "Indoor Banners",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_17_.png",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners-4.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners_3.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banner-1.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/a/banner-finishing-options_10_2.jpg",
    ],
    description: `Indoor Banners are Durable, Customizable, and High-Quality
    Passing on your brand message to your target audience is necessary for many companies. Our vinyl custom banners offer you an effective way to attract new customers. Choose from various templates to make your unique brand designs.
    
    Made of high-quality PVC, these vinyl banners are durable and will convey your message to customers effectively for a long time. The UV-resistant material won't fade, retaining vibrant colours. These indoor marketing products are also ideal for outdoor events.
    
    With resolutions of up to 720 DPI, our store banners provide quality and sharp images that attract the customer's attention from a distance. Full-colour printing has a large gamut that provides quality and vibrant prints, ensuring every detail is visible.
    
    Our custom banners offer versatility with multiple options to choose from. They come in various sizes and graphics to suit the style of your brand. These customizable banners allow you to upload the artwork to make unique designs. Enhance your banners with accessories such as hanging clamp bars and nylon ropes.
    
    Portable and Eco-friendly Indoor Banners
    We use an eco-solvent printing mechanism to produce these vinyl banners. The biodegradable ink is safe for the environment and contains no harmful ingredients. These marketing materials contribute to sustainable business practices.
    
    Our lightweight store banners are easy to relocate to any of your events. They fold and unfold easily without leaving permanent wrinkles. Since they allow multiple uses, you don't have to purchase new banners, saving on your long-term ad spend.
    
    Vinyl Banners are Easy to Clean and Maintain
    Easy to clean, vinyl banners don't require detergents. These low-maintenance banners require simple dusting to achieve a clear new look. You can also gently wipe them with a damp, soft cloth, thus saving you time and money.
    
    Shop for indoor banners for your business online at BannerBuzz.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "6",
    sku: "BBVBCB01",
    defaultCategoryIds: ["all", "business-card"],
    categoryIds: ["business-card"], //save the last child
    productName: "Indoor Banners",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_17_.png",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners-4.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners_3.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banner-1.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/a/banner-finishing-options_10_2.jpg",
    ],
    description: `Indoor Banners are Durable, Customizable, and High-Quality
    Passing on your brand message to your target audience is necessary for many companies. Our vinyl custom banners offer you an effective way to attract new customers. Choose from various templates to make your unique brand designs.
    
    Made of high-quality PVC, these vinyl banners are durable and will convey your message to customers effectively for a long time. The UV-resistant material won't fade, retaining vibrant colours. These indoor marketing products are also ideal for outdoor events.
    
    With resolutions of up to 720 DPI, our store banners provide quality and sharp images that attract the customer's attention from a distance. Full-colour printing has a large gamut that provides quality and vibrant prints, ensuring every detail is visible.
    
    Our custom banners offer versatility with multiple options to choose from. They come in various sizes and graphics to suit the style of your brand. These customizable banners allow you to upload the artwork to make unique designs. Enhance your banners with accessories such as hanging clamp bars and nylon ropes.
    
    Portable and Eco-friendly Indoor Banners
    We use an eco-solvent printing mechanism to produce these vinyl banners. The biodegradable ink is safe for the environment and contains no harmful ingredients. These marketing materials contribute to sustainable business practices.
    
    Our lightweight store banners are easy to relocate to any of your events. They fold and unfold easily without leaving permanent wrinkles. Since they allow multiple uses, you don't have to purchase new banners, saving on your long-term ad spend.
    
    Vinyl Banners are Easy to Clean and Maintain
    Easy to clean, vinyl banners don't require detergents. These low-maintenance banners require simple dusting to achieve a clear new look. You can also gently wipe them with a damp, soft cloth, thus saving you time and money.
    
    Shop for indoor banners for your business online at BannerBuzz.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },
  {
    productId: "7",
    sku: "BBVBCB07",
    defaultCategoryIds: ["all", "business-card"],
    categoryIds: ["business-card"], //save the last child
    productName: "Business Cards",
    productCoverPic:
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/m/i/microsoftteams-image_17_.png",
    productPics: [
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners-4.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banners_3.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/i/n/indoor-banner-1.jpg",
      "https://cdn.bannerbuzz.ca/media/catalog/product/resize/650/b/a/banner-finishing-options_10_2.jpg",
    ],
    description: `Indoor Banners are Durable, Customizable, and High-Quality
    Passing on your brand message to your target audience is necessary for many companies. Our vinyl custom banners offer you an effective way to attract new customers. Choose from various templates to make your unique brand designs.
    
    Made of high-quality PVC, these vinyl banners are durable and will convey your message to customers effectively for a long time. The UV-resistant material won't fade, retaining vibrant colours. These indoor marketing products are also ideal for outdoor events.
    
    With resolutions of up to 720 DPI, our store banners provide quality and sharp images that attract the customer's attention from a distance. Full-colour printing has a large gamut that provides quality and vibrant prints, ensuring every detail is visible.
    
    Our custom banners offer versatility with multiple options to choose from. They come in various sizes and graphics to suit the style of your brand. These customizable banners allow you to upload the artwork to make unique designs. Enhance your banners with accessories such as hanging clamp bars and nylon ropes.
    
    Portable and Eco-friendly Indoor Banners
    We use an eco-solvent printing mechanism to produce these vinyl banners. The biodegradable ink is safe for the environment and contains no harmful ingredients. These marketing materials contribute to sustainable business practices.
    
    Our lightweight store banners are easy to relocate to any of your events. They fold and unfold easily without leaving permanent wrinkles. Since they allow multiple uses, you don't have to purchase new banners, saving on your long-term ad spend.
    
    Vinyl Banners are Easy to Clean and Maintain
    Easy to clean, vinyl banners don't require detergents. These low-maintenance banners require simple dusting to achieve a clear new look. You can also gently wipe them with a damp, soft cloth, thus saving you time and money.
    
    Shop for indoor banners for your business online at BannerBuzz.`,
    attributes: [
      {
        optionName: "Size",
        selections: [
          {
            selectionName: '10"x 10"',
            price: 10.99,
            hasExplainPic: false,
            explainPic: undefined,
          },
        ],
      },
    ],
    minSelection: ['10"x 10"', 10.99],
    bulkDiscounts: [],
    promoPercentageOff: 0,
    isUploadFiles: true,
  },

];

const ProductCategories: IProductCategory[] = [
  {
    categoryId: "all",
    name: "All",
    description: "All products",
    children: [
      "design-service",
      "Regilar-format-print",
      "wide-format-print",
      "installation-service",
      "others",
      "best-sellers",
    ],
  },
  // First level
  {
    categoryId: "design-service",
    name: "Design Service",
    description: "All Design Service",
    children: ["logo-design", "banner-design", "business-card-design"],
  },
  {
    categoryId: "Regilar-format-print",
    name: "Regilar Format Print",
    description: "Regilar Format Print",
    children: ["card", "book", "label", "flyer"],
  },
  {
    categoryId: "wide-format-print",
    name: "Wide Format Print",
    description: "Wide Format Print",
    children: ["signage", "banner"],
  },
  {
    categoryId: "installation-service",
    name: "Installation Service",
    description: "Installation Service",
    children: ["stage-decor", "vehicle-decal", "wall-window-decal"],
  },
  {
    categoryId: "others",
    name: "Others",
    description: "Others",
    children: ["custom-t-shirt", "flag", "foam-sign", "table-throw"],
  },
  {
    categoryId: "best-sellers",
    name: "Best Sellers",
    description: "Best Sellers",
    children: [],
  },
  // Second level
  // - Design Service
  {
    categoryId: "logo-design",
    name: "Logo Design",
    description: "Logo Design",
    children: [],
  },
  {
    categoryId: "banner-design",
    name: "Banner Design",
    description: "Banner Design",
    children: [],
  },
  {
    categoryId: "business-card-design",
    name: "Business Card Design",
    description: "Business Card Design",
    children: [],
  },

  // - Regilar Format Print
  {
    categoryId: "card",
    name: "Card",
    description: "All Card",
    children: ["business-card", "card-ticket"],
  },
  {
    categoryId: "book",
    name: "Book",
    description: "All book",
    children: ["booklet"],
  },
  {
    categoryId: "label",
    name: "Label",
    description: "All label",
    children: ["label-sticker"],
  },
  // - Wide Format Print
  {
    categoryId: "signage",
    name: "Signage",
    description: "Signage",
    children: ["sign-board", "yard-sign"],
  },
  {
    categoryId: "banner",
    name: "Banner",
    description: "All banner",
    children: ["banner-stand", "retractable-banner"],
  },

  // Installation Service
  {
    categoryId: "stage-decor",
    name: "Stage Decor",
    description: "Stage Decor",
    children: ["backdrop", "step-repeat-banner"],
  },
  {
    categoryId: "vehicle-decal",
    name: "Vehicle Decal",
    description: "Vehicle Decal",
    children: ["car-decal", "truck-decal"],
  },
  {
    categoryId: "wall-window-decal",
    name: "Wall & Window Decal",
    description: "Wall & Window Decal",
    children: ["wall-decal", "window-decal"],
  },
  // Others
  {
    categoryId: "custom-t-shirt",
    name: "Custom T-Shirt",
    description: "Custom T-Shirt",
    children: ["t-shirt", "hoodie"],
  },
  {
    categoryId: "flag",
    name: "Flag",
    description: "Flag",
    children: ["hand-flag", "feather-flag"],
  },
  {
    categoryId: "foam-sign",
    name: "Foam Sign",
    description: "Foam Sign",
    children: ["foam-board", "coroplast-sign"],
  },
  {
    categoryId: "table-throw",
    name: "Table Throw",
    description: "Table Throw",
    children: ["fitted-table-throw", "stretch-table-throw"],
  },

  // Third level
  // - Card
  {
    categoryId: "business-card",
    name: "Business Card",
    description: "Business Card",
    children: [],
  },
  {
    categoryId: "card-ticket",
    name: "Card Ticket",
    description: "Card Ticket",
    children: [],
  },
  // - Book
  {
    categoryId: "booklet",
    name: "Booklet",
    description: "Booklet",
    children: [],
  },
  // - Label
  {
    categoryId: "label-sticker",
    name: "Label Sticker",
    description: "Label Sticker",
    children: [],
  },
  // - Signage
  {
    categoryId: "sign-board",
    name: "Sign Board",
    description: "Sign Board",
    children: [],
  },
  {
    categoryId: "yard-sign",
    name: "Yard Sign",
    description: "Yard Sign",
    children: [],
  },
  // - Banner
  {
    categoryId: "banner-stand",
    name: "Banner Stand",
    description: "Banner Stand",
    children: [],
  },
  {
    categoryId: "retractable-banner",
    name: "Retractable Banner",
    description: "Retractable Banner",
    children: [],
  },
  // - Stage Decor
  {
    categoryId: "backdrop",
    name: "Backdrop",
    description: "Backdrop",
    children: [],
  },
  {
    categoryId: "step-repeat-banner",
    name: "Step Repeat Banner",
    description: "Step Repeat Banner",
    children: [],
  },
  // - Vehicle Decal
  {
    categoryId: "car-decal",
    name: "Car Decal",
    description: "Car Decal",
    children: [],
  },
  {
    categoryId: "truck-decal",
    name: "Truck Decal",
    description: "Truck Decal",
    children: [],
  },
  // - Wall & Window Decal
  {
    categoryId: "wall-decal",
    name: "Wall Decal",
    description: "Wall Decal",
    children: [],
  },
  {
    categoryId: "window-decal",
    name: "Window Decal",
    description: "Window Decal",
    children: [],
  },
  // - Custom T-Shirt
  {
    categoryId: "t-shirt",
    name: "T-Shirt",
    description: "T-Shirt",
    children: [],
  },
  {
    categoryId: "hoodie",
    name: "Hoodie",
    description: "Hoodie",
    children: [],
  },
  // - Flag
  {
    categoryId: "hand-flag",
    name: "Hand Flag",
    description: "Hand Flag",
    children: [],
  },
  {
    categoryId: "feather-flag",
    name: "Feather Flag",
    description: "Feather Flag",
    children: [],
  },
  // - Foam Sign
  {
    categoryId: "foam-board",
    name: "Foam Board",
    description: "Foam Board",
    children: [],
  },
  {
    categoryId: "coroplast-sign",
    name: "Coroplast Sign",
    description: "Coroplast Sign",
    children: [],
  },
  // - Table Throw
  {
    categoryId: "fitted-table-throw",
    name: "Fitted Table Throw",
    description: "Fitted Table Throw",
    children: [],
  },
  {
    categoryId: "stretch-table-throw",
    name: "Stretch Table Throw",
    description: "Stretch Table Throw",
    children: [],
  },  
];

export { CompanyInfo, UiCarouselImages, Products, ProductCategories };
