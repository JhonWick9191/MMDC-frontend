export default function TrustedByBrands() {
  const companiesLogo = [
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517391/Fender_logo_rc6c4k.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517391/0_Logo_Cordoba_Blue_Cordoba_with_Arches-large_m9yjcu.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517390/296-2962465_schecter-guitar-reasearch-schecter-guitar-research-logo_qhbku9.jpg" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517390/800px-Martin_guitar_logo_eoe0u3.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517390/1280px-Jackson_guitars_logo.svg_j9yazl.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517390/1280px-Shure_Logo.svg_jhwpfo.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517387/1888454_wqmjrm.jpg" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517387/akai-professional-vector-logo_uupr6u.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517387/a86b256ceab02397aa5640056a2823eb_vvhlo6.jpg" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517386/ampeg_upuosq.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517383/Aria_guitars_logo_ztw11n.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517382/both_logo_swngwf.jpg" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517382/Charvel_Guitars_Logo_nkgts5.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517382/di42n8o8ai7yqq6yldq2_aivmtn.jpg" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517382/download_mfzp4w.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517380/Ernie-Ball-Logo_z79imk.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517380/evh-logo_h9xvja.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517379/FAS_logo_full_rktthb.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517379/ghs-strings-logo-D9B1A50164-seeklogo.com_msjes5.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517378/gretsch-guitars-logo-vector_ndufgb.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517377/images-1-809684_s_ngjr5d.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517377/Line_6_logo_h8uftk.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517376/jim-dunlop_lvrdy1.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517376/Ludwig_logo_d1dvrd.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517374/logo-header_pkwguq.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517373/ns-designs_kmvgg2.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517373/Music-Man-logo_siznbr.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517373/nux-logo-01_ateqpr.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517372/Orangewood_Logo_Primary_BK_1200x_fi0pfk.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517372/Remo_ref682.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517371/Rotosound-Home-slider_430H_wsjnly.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517370/Sabian_cymbals_logo.svg_zyw8xh.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517370/sbmm-logo-main_hz6mer.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517369/Sonor_logo_ebv1sh.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517369/Santana_xlom8d.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517369/Slash_w0aoum.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517369/wingo_iy9tct.png" },
  { logo: "https://res.cloudinary.com/dfilhi9ku/image/upload/v1762517368/vic-firth-logo-png-transparent_jf4bp8.png" }
];


    return (

        <>
         
            
                    <div className="line-with-text width-80-for-line">
                        <div className="left-line w-20">
                            <hr></hr>
                        </div>

                        <div className="text-heading">
                            <h2 className="main-heading-recom">TOP BRANDS</h2>
                        </div>

                        <div className="right-line">
                            <hr></hr>
                        </div>
                    </div>
            <div class="overflow-hidden w-full relative  select-none">
                <div class="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                <div class="flex marquee-inner will-change-transform  wrape-copmanies-logo">
                    {[ ...companiesLogo].map((company, index) => (
                        <img key={index} className="mx-11" src={company.logo} alt={company.name} loading="lazy" />
                    ))}
                </div>

                <div class="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
}
