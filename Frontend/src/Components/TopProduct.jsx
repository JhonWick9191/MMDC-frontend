import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { GiGuitar } from "react-icons/gi";
import { IoStar } from "react-icons/io5";
import { GrPrevious } from "react-icons/gr";


const catogeryesProducts = [
    {
        id: 1,
        name: "Acoustic Drum",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666738/Untitled_design_5_1_lydd7q.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20 %"
    },
    {
        id: 2,
        name: "Studio Moniter",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666738/download_rmyqgs.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20 %"

    },
    {
        id: 3,
        name: "Accessories",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666737/2020s_NS_Design_WAV_4_Electric_Violin_Amber_Burst_1_uwrbzc.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"
    },

    {
        id: 4,
        name: "Amp Rxtico",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666737/Untitled_design_3_axzwoh.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"

    },
    {
        id: 5,
        name: "Electric Guitars",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666739/Souldier_Hendrix_2__Guitar_Strap___Reverb_i9zcxh.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"
    },

    {
        id: 6,
        name: "Bass Guitars",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_8_1_ggdncm.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"

    },
    {
        id: 7,
        name: "Mixers",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_4_1_pqvyzs.jpg",


        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"

    },
    {
        id: 8,
        name: "Acoustic Guitars",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_6_kna0dx.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"

    },
    {
        id: 9,
        name: "Controller",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_7_1_a91fnh.jpg",

        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20%"

    },
    {
        id: 10,
        name: "Acoustic Drum",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666738/Untitled_design_5_1_lydd7q.jpg",
        model: "Model Name",
        discripction: "discripction",
        rating: "4",
        price: "1000",
        save: "20 %"
    },

];

const ourCommunityVideos = [
    {
        id: 1,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925345/WhatsApp_Video_2025-09-15_at_14.04.17_f724c6fd_hrrmmw.mp4"
    },

    {
        id: 2,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757676637/WhatsApp_Video_2025-09-12_at_11.59.51_b2782ad4_afv4vy.mp4"
    },

    {
        id: 3,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925344/WhatsApp_Video_2025-09-15_at_14.04.17_83c6c3b2_ill5jz.mp4"
    },

    {
        id: 4,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925344/WhatsApp_Video_2025-09-15_at_14.04.17_e1fdc9c0_faw8qz.mp4"
    },
    {
        id: 5,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925344/WhatsApp_Video_2025-09-15_at_14.04.17_a4836fd4_a4ll1r.mp4"
    },

    {
        id: 6,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925343/WhatsApp_Video_2025-09-15_at_14.04.17_07b60da8_kcvgla.mp4"
    },

    {
        id: 7,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757676637/WhatsApp_Video_2025-09-12_at_11.59.51_b2782ad4_afv4vy.mp4"
    },

    {
        id: 8,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757676637/WhatsApp_Video_2025-09-12_at_11.59.51_b2782ad4_afv4vy.mp4"
    },

    {
        id: 9,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757676637/WhatsApp_Video_2025-09-12_at_11.59.51_b2782ad4_afv4vy.mp4"
    },

    {
        id: 10,
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757676637/WhatsApp_Video_2025-09-12_at_11.59.51_b2782ad4_afv4vy.mp4"
    },

]


const buttons = [
    "Acoustic Guitar ",
    "Acoustic Guitar ",
    "Acoustic Guitar ",
    "Acoustic Guitar ",
    "Acoustic Guitar ",
    "More Products "
];

// smooth sroll function 

export default function TopProducts() {

    const [topProducts] = useState(catogeryesProducts);
    const [currentIndexImage, setCurrentIndexImage] = useState(0);

    const visibleCount = 5;


    function priviousImageFunction() {
        if (currentIndexImage === 0) return;

        setCurrentIndexImage((prevIndex) => prevIndex - 1);

    }

    function nextImageFunction() {
        if (currentIndexImage + visibleCount >= ourCommunityVideos.length) return;

        setCurrentIndexImage((prevIndex) => prevIndex + 1);



    }

  

    // Tranding products 

    const [activeIndex, setActiveIndex] = useState(null);
    const translateClass = `translate-${currentIndexImage * 20}`;
    return (
        <>
            <section >
                <div className="margin-and-padding-main">
                    <div className="main-sectionHeading">
                        <h1>CATEGORIES</h1>
                    </div>

                    <div className="Categories">


                        <div className="main-display-seaction">
                            {catogeryesProducts.map((items) => (
                                <div className="main-catogries" key={items.id}>
                                    <div className="catogries-images">
                                        <img src={items.image} />
                                        <div className="overlay"></div>
                                    </div>

                                    <div className="catogries-name">
                                        <p>{items.name.toUpperCase()}</p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </section>



            <section className="hide-from-mobile">
                <div className="margin-and-padding-main">
                    <div className="main-sectionHeading">
                        <h1>TOP 10 PRODUCTS OF THE WEEK</h1>
                    </div>
                    <div className="top-products-main-content">
                        <div className="priviousimage">
                            <button onClick={priviousImageFunction}><GrPrevious /></button>
                        </div>
                        <div className={`topTenItems-images ${translateClass}`}>
                            {
                                topProducts.slice(currentIndexImage, currentIndexImage + visibleCount).map((topProductsItems) => (
                                    <div className="main-image-with-number" key={topProductsItems.id}>
                                        <div className="main-image-top-ten">
                                            <img src={topProductsItems.image} alt={topProductsItems.name} />
                                            <div className="number">
                                                <p>{topProductsItems.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="nextImage">
                            <button onClick={nextImageFunction}><GrNext /></button>
                        </div>
                    </div>
                </div>
            </section>


            {/* ------------------------------------------------------------------------------------- Best Sellar section Trandig Products -----------------------------------------------------------------------------------------------------------------*/}

        

        


            {/*--------------------------------------------------------------------------------------- Our Community section---------------------------------------------------------------------------------------------------------------------------------*/}


            <section className="hide-from-mobile">
                <div className="margin-and-padding-main">
                    <div className="main-sectionHeading ">
                        <h1>OUR COMMUNITY</h1>
                    </div>
                    <div className="our-community-reels-and-content">
                        <div className="privious-video">
                            <button onClick={priviousImageFunction}><GrPrevious /></button>
                        </div>
                        <div className="our-community-rells-section">
                            {
                                ourCommunityVideos.slice(currentIndexImage, currentIndexImage + visibleCount).map((video) => (
                                    <div className="main-image-with-video " key={video.id}>
                                        <div className="main-rells-sections">
                                            <video src={video.video} controls muted playsInline loading="lazy"  />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="next-video">
                            <button onClick={nextImageFunction}><GrNext /></button>
                        </div>
                    </div>
                </div>
            </section>


            {/*--------------------------------------------------------------------------------------- our community section ends-----------------------------------------------------------------------------------------------------------------------------*/}



        </>
    )

}