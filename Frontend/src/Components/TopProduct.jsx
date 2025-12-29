import { useState, useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const catogeryesProducts = [
    {
        id: 1,
        name: "Effects",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666738/Untitled_design_5_1_lydd7q.jpg",
    },
    {
        id: 2,
        name: "Guitars",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762931734/guitar_cjm03t.png",
    },
    {
        id: 3,
        name: "Accessories",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762931660/Accessories_nbowzd.png",
    },
    {
        id: 4,
        name: "Ukuleles",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666737/Untitled_design_3_axzwoh.jpg",
    },
    {
        id: 5,
        name: "Amplifiers",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762931660/Amplifier_zhdmzo.png",
    },
    {
        id: 6,
        name: "Pro Audio",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_8_1_ggdncm.jpg",
    },
    {
        id: 7,
        name: "Pino and Keyboard",
        image: "https://pub-d5d786d675024a039884449faea17b9e.r2.dev/banners/Piano%20and%20keyboard.png",
    },
    {
        id: 8,
        name: "Drums And Accessories",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1757666740/Untitled_design_6_kna0dx.jpg",
    },
    {
        id: 9,
        name: "Harmonica",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762931660/Hermonica_q92ezh.png",
    },
    {
        id: 10,
        name: "Drums",
        image: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762931660/Drums_pdn4y2.png",
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
        video: "https://res.cloudinary.com/dfilhi9ku/video/upload/v1757925345/WhatsApp_Video_2025-09-15_at_14.04.17_f724c6fd_hrrmmw.mp4"
    },
 


]


export default function TopProducts() {
    const Navigate = useNavigate();
    const [topProducts, setTopProducts] = useState([]);
    const [currentIndexImage, setCurrentIndexImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const visibleCount = 5;

    // ✅ FIXED API CALL - SAFE DATA HANDLING
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4100/api/v1/newProducts");
                const data = await response.json();
                
                console.log("✅ API Response:", data); // Structure check karo
                
                // ✅ SAFE ARRAY EXTRACTION
                let productsArray = [];
                if (data && Array.isArray(data)) {
                    productsArray = data;
                } else if (data && data.data && Array.isArray(data.data)) {
                    productsArray = data.data;
                } else if (data && data.products && Array.isArray(data.products)) {
                    productsArray = data.products;
                }
                
                setTopProducts(productsArray);
                setLoading(false);
            } catch (error) {
                console.log("❌ Error:", error);
                setTopProducts([]); // Empty array fallback
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    function priviousImageFunction() {
        if (currentIndexImage === 0) return;
        setCurrentIndexImage((prevIndex) => prevIndex - 1);
    }

    function nextImageFunction() {
        if (currentIndexImage + visibleCount >= topProducts.length) return;
        setCurrentIndexImage((prevIndex) => prevIndex + 1);
    }

    function ClickHandler(items) {
        console.log("Button is clicked:", items);
        Navigate(`/products?type=${items}`);
    }

    // ✅ LOADING SCREEN
    if (loading) {
        return (
            <section className="hide-from-mobile">
                <div className="margin-and-padding-main" style={{ textAlign: 'center', padding: '50px' }}>
                    Loading new products...
                </div>
            </section>
        );
    }

    return (
        <>
            {/* ✅ CATEGORIES SECTION - SAME */}
            <section>
                <div className="margin-and-padding-main">
                    <div className="line-with-text width-80-for-line">
                        <div className="left-line w-20"><hr /></div>
                        <div className="text-heading">
                            <h2 className="main-heading-recom">OUR CATEGORIES</h2>
                        </div>
                        <div className="right-line"><hr /></div>
                    </div>

                    <div className="Categories">
                        <div className="main-display-seaction">
                            {catogeryesProducts.map((items) => (
                                <div
                                    className="main-catogries"
                                    key={items.id}
                                    onClick={() => ClickHandler(items.name)}
                                >
                                    <div className="catogries-images">
                                        <img src={items.image} loading="lazy" />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className="catogries-name">
                                        <p>{items.name.toUpperCase()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ NEW ARRIVALS - API PRODUCTS */}
            <section className="hide-from-mobile">
                <div className="margin-and-padding-main">
                    <div className="line-with-text width-80-for-line">
                        <div className="left-line w-20"><hr /></div>
                        <div className="text-heading">
                            <h2 className="main-heading-recom">NEW ARRIVALS</h2>
                        </div>
                        <div className="right-line"><hr /></div>
                    </div>

                    <div className="top-products-main-content" style={{ overflow: "hidden" }}>
                        {/* Previous Button */}
                        <div className="priviousimage">
                            {currentIndexImage <= 0 ? null : (
                                <button onClick={priviousImageFunction}>
                                    <GrPrevious />
                                </button>
                            )}
                        </div>

                        {/* ✅ FIXED SLIDING CONTAINER */}
                        <div
                            className="topTenItems-images"
                            style={{
                                transform: `translateX(-${currentIndexImage * (114 / visibleCount)}%)`,
                            }}
                        >
                            {Array.isArray(topProducts) && topProducts.length > 0 ? (
                                topProducts.map((item, index) => (
                                   
                                    <div
                                        className="main-image-with-number"
                                        key={item._id || item.id || index}
                                        style={{ flex: `0 0 ${100 / visibleCount}%` }}
                                    >
                                        <div className="main-image-top-ten">
                                            {/* ✅ SAFE IMAGE */}
                                           
                                            <button  onClick={()=> Navigate("/productDetails", { state: item })} >
                                           <div className="filter-product-image">
                                            <img 
                                           
                                                src={item.image_01 } 
                                                alt={item.name || `Product ${index + 1}`}
                                                loading="lazy"
                                               
                                            />

                                            <div className="overlay-products"/>
                                            <div className="new-animations-logo">
                                            <img src="https://pub-b88455fc17c04e63a0f32324fc1620df.r2.dev/animations/new.gif" loading="lazy"></img>
                                            </div>
                                            </div>
                                            <div className="number">
                                                <p>{index + 1}</p>
                                            </div>

                                         
                                             
                                            </button>
                                            
                                            </div>
                                                
                                        </div>
                                     
                                  
                                ))
                            ) : (
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    width: '100%', 
                                    height: '200px',
                                    color: '#666'
                                }}>
                                    No new products available
                                </div>
                            )}
                        </div>

                        {/* Next Button */}
                        <div className="nextImage">
                            {currentIndexImage >= topProducts.length - visibleCount ? null : (
                                <button onClick={nextImageFunction}>
                                    <GrNext />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            
             <section className="hide-from-mobile">
                <div className="margin-and-padding-main">
                    <div className="main-sectionHeading ">
                        <h1>OUR COMMUNITY</h1>
                    </div>
                    <div className="our-community-reels-and-content">
                        
                        <div className="our-community-rells-section">
                            {
                                ourCommunityVideos.map((video) => (
                                    <div className="main-image-with-video " key={video.id}>
                                        <div className="main-rells-sections">
                                            <video src={video.video} controls muted playsInline loading="lazy" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            </section>  

        </>
    );
}
